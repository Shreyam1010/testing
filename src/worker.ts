// Minimal ambient typing for the Cloudflare bindings we use,
// to avoid pulling in @cloudflare/workers-types just for two names.
interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  all<T = unknown>(): Promise<{ results: T[] }>;
  run(): Promise<unknown>;
}
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
interface R2ObjectBody {
  body: ReadableStream;
  httpEtag: string;
  writeHttpMetadata(headers: Headers): void;
}
interface R2Bucket {
  get(key: string): Promise<R2ObjectBody | null>;
  put(key: string, value: ArrayBuffer | ReadableStream, options?: { httpMetadata?: { contentType?: string } }): Promise<unknown>;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

export interface Env {
  DB: D1Database;
  IMAGES?: R2Bucket;
}

console.log("[Worker] Global scope evaluating...");

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    console.log("[Worker] Incoming request:", request.method, url.pathname);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const json = (data: any) =>
      new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    const error = (msg: string, status = 500) =>
      new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    try {
      // ─── GET /api/content ───
      if (url.pathname === "/api/content" && request.method === "GET") {
        const lang = url.searchParams.get("lang") || "en";

        // Edge cache lookup. Keyed by full URL, so ?lang=en and ?lang=kn are
        // cached separately. Hits return in ~10-30ms instead of ~200ms.
        // POST /api/save purges these entries so admin edits propagate fast.
        const cacheKey = new Request(url.toString(), { method: "GET" });
        const cache = (globalThis as any).caches?.default as Cache | undefined;
        if (cache) {
          const cached = await cache.match(cacheKey);
          if (cached) {
            // Re-attach CORS headers (the cached response carries Cache-Control
            // and Content-Type already; CORS is needed because the Hostinger
            // origin and the Worker origin differ).
            const headers = new Headers(cached.headers);
            for (const [k, v] of Object.entries(corsHeaders)) headers.set(k, v);
            return new Response(cached.body, { status: cached.status, headers });
          }
        }

        const [
          siteContent,
          teachers,
          classes,
          blogs,
          events,
          workshops,
          socialLinks,
          faqs,
          gallery,
          highlights,
          classFeatures,
          servicesImages,
          homeFeatures,
          navLinks,
          footerLinks,
          branding,
        ] = await Promise.all([
          env.DB.prepare("SELECT * FROM site_content WHERE lang = ?").bind(lang).all(),
          env.DB.prepare("SELECT * FROM teachers").all(),
          env.DB.prepare("SELECT * FROM classes").all(),
          env.DB.prepare("SELECT * FROM blogs").all(),
          env.DB.prepare("SELECT * FROM events").all(),
          env.DB.prepare("SELECT * FROM workshops").all(),
          env.DB.prepare("SELECT * FROM social_links ORDER BY order_index ASC").all(),
          env.DB.prepare("SELECT * FROM faqs WHERE lang = ? ORDER BY order_index ASC").bind(lang).all(),
          env.DB.prepare("SELECT * FROM gallery").all(),
          env.DB.prepare("SELECT * FROM highlights ORDER BY order_index ASC").all(),
          env.DB.prepare("SELECT * FROM class_features ORDER BY order_index ASC").all(),
          env.DB.prepare("SELECT * FROM services_images ORDER BY category ASC, order_index ASC").all(),
          env.DB.prepare("SELECT * FROM home_features ORDER BY order_index ASC").all(),
          env.DB.prepare("SELECT * FROM nav_links ORDER BY order_index ASC").all(),
          env.DB.prepare("SELECT * FROM footer_links ORDER BY group_name ASC, order_index ASC").all(),
          env.DB.prepare("SELECT * FROM branding LIMIT 1").first(),
        ]);

        const payload = {
          siteContent: siteContent.results,
          teachers: teachers.results,
          classes: classes.results,
          blogs: blogs.results,
          events: events.results,
          workshops: workshops.results,
          socialLinks: socialLinks.results,
          faqs: faqs.results,
          gallery: gallery.results,
          highlights: highlights.results,
          classFeatures: classFeatures.results,
          servicesImages: servicesImages.results,
          homeFeatures: homeFeatures.results,
          navLinks: navLinks.results,
          footerLinks: footerLinks.results,
          branding,
        };
        const body = JSON.stringify(payload);
        // s-maxage=60: cache served fresh for 60s at the edge.
        // stale-while-revalidate=300: for the next 5 min after that, serve the
        // stale copy instantly while regenerating in the background. Net effect:
        // virtually no user waits the full 200ms after the first request in a
        // given Cloudflare PoP. Admin saves purge this cache below.
        const cacheableHeaders = {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        };
        // Store a copy in the edge cache (without CORS headers, since cache
        // matching is origin-agnostic and we re-attach CORS on serve).
        if (cache) {
          ctx.waitUntil(
            cache.put(cacheKey, new Response(body, { headers: cacheableHeaders }))
          );
        }
        return new Response(body, {
          headers: { ...corsHeaders, ...cacheableHeaders },
        });
      }

      // ─── POST /api/save ───
      if (url.pathname === "/api/save" && request.method === "POST") {
        const { section, data, lang } = (await request.json()) as any;

        // Helper: delete rows whose IDs are missing from the incoming list,
        // so that admin "delete" actions actually remove DB rows.
        const reconcileDeletes = async (table: string, keepIds: string[]) => {
          if (keepIds.length === 0) {
            await env.DB.prepare(`DELETE FROM ${table}`).run();
            return;
          }
          const placeholders = keepIds.map(() => "?").join(",");
          await env.DB.prepare(`DELETE FROM ${table} WHERE id NOT IN (${placeholders})`)
            .bind(...keepIds)
            .run();
        };

        // Map admin "section" identifiers to the site_content.section column.
        // Some pages have both a key/value meta block (stored in site_content) AND
        // structured rows (stored in their own table). The admin uses a distinct
        // *_meta name for the site_content writes so the table writer below isn't
        // shadowed (e.g. "highlights_meta" -> site_content.section = "highlights",
        // while "highlights" still writes individual rows to the highlights table).
        const siteContentSectionMap: Record<string, string> = {
          hero: "hero",
          about: "about",
          services: "services",
          contact: "contact",
          highlights_meta: "highlights",
        };
        if (siteContentSectionMap[section]) {
          const dbSection = siteContentSectionMap[section];
          for (const [key, value] of Object.entries(data)) {
            await env.DB.prepare(
              "INSERT OR REPLACE INTO site_content (id, lang, section, content_key, content_value) VALUES (?, ?, ?, ?, ?)"
            )
              .bind(`${dbSection}_${lang}_${key}`, lang, dbSection, key, value as string)
              .run();
          }
        }

        if (section === "events") {
          await reconcileDeletes("events", data.map((e: any) => e.id).filter(Boolean));
          for (const ev of data) {
            await env.DB.prepare(
              `INSERT INTO events (id, title_${lang}, teacher_${lang}, time_${lang}, badge_${lang}, status, image_url, date)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               title_${lang}=excluded.title_${lang},
               teacher_${lang}=excluded.teacher_${lang},
               time_${lang}=excluded.time_${lang},
               badge_${lang}=excluded.badge_${lang},
               status=excluded.status,
               image_url=excluded.image_url,
               date=excluded.date`
            )
              .bind(
                ev.id || `ev_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                ev.title?.[lang] || ev.title || "",
                ev.teacher?.[lang] || ev.teacher || "",
                ev.time?.[lang] || ev.time || "",
                ev.badge?.[lang] || ev.badge || "",
                ev.status || "coming_soon",
                ev.image_url || ev.image || "",
                ev.date || ""
              )
              .run();
          }
        }

        if (section === "blogs") {
          await reconcileDeletes("blogs", data.map((b: any) => b.id).filter(Boolean));
          for (const b of data) {
            await env.DB.prepare(
              `INSERT INTO blogs (id, title_${lang}, excerpt_${lang}, content_${lang}, category_${lang}, author_${lang}, date, image, slug)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               title_${lang}=excluded.title_${lang},
               excerpt_${lang}=excluded.excerpt_${lang},
               content_${lang}=excluded.content_${lang},
               category_${lang}=excluded.category_${lang},
               author_${lang}=excluded.author_${lang},
               date=excluded.date,
               image=excluded.image,
               slug=excluded.slug`
            )
              .bind(
                b.id,
                b.title?.[lang] || b.title || "",
                b.excerpt?.[lang] || b.excerpt || "",
                b.content?.[lang] || b.content || "",
                b.category?.[lang] || b.category || "",
                b.author?.[lang] || b.author || "",
                b.date || "",
                b.image || "",
                b.slug || ""
              )
              .run();
          }
        }

        if (section === "classes_full") {
          await reconcileDeletes("teachers", (data.teachers || []).map((t: any) => t.id).filter(Boolean));
          await reconcileDeletes("classes",  (data.classes  || []).map((c: any) => c.id).filter(Boolean));
          for (const t of data.teachers || []) {
            await env.DB.prepare(
              `INSERT INTO teachers (id, name_${lang}, expertise_${lang}, bio_${lang}, image_url)
               VALUES (?, ?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               name_${lang}=excluded.name_${lang},
               expertise_${lang}=excluded.expertise_${lang},
               bio_${lang}=excluded.bio_${lang},
               image_url=excluded.image_url`
            )
              .bind(t.id, t.name || "", t.expertise || "", t.bio || "", t.image || "")
              .run();
          }
          for (const c of data.classes || []) {
            await env.DB.prepare(
              `INSERT INTO classes (id, topic_${lang}, teacher_id, day_${lang}, time, level_${lang})
               VALUES (?, ?, ?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               topic_${lang}=excluded.topic_${lang},
               teacher_id=excluded.teacher_id,
               day_${lang}=excluded.day_${lang},
               time=excluded.time,
               level_${lang}=excluded.level_${lang}`
            )
              .bind(c.id, c.topic || "", c.teacherId || "", c.day || "", c.time || "", c.level || "")
              .run();
          }
        }

        if (section === "workshops") {
          await reconcileDeletes("workshops", data.map((w: any) => w.id).filter(Boolean));
          for (const w of data) {
            await env.DB.prepare(
              `INSERT INTO workshops (id, title_${lang}, timestamp_${lang}, image)
               VALUES (?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               title_${lang}=excluded.title_${lang},
               timestamp_${lang}=excluded.timestamp_${lang},
               image=excluded.image`
            )
              .bind(
                w.id,
                w.title?.[lang] || w.title || "",
                w.timestamp?.[lang] || w.timestamp || "",
                w.image || ""
              )
              .run();
          }
        }

        if (section === "social_links") {
          await env.DB.prepare("DELETE FROM social_links").run();
          for (const s of data) {
            await env.DB.prepare(
              `INSERT INTO social_links (id, title_${lang}, description_${lang}, link, image, order_index)
               VALUES (?, ?, ?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               title_${lang}=excluded.title_${lang},
               description_${lang}=excluded.description_${lang},
               link=excluded.link,
               image=excluded.image,
               order_index=excluded.order_index`
            )
              .bind(
                s.id || `social_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                s.title?.[lang] || s.title || "",
                s.description?.[lang] || s.description || "",
                s.link || "",
                s.image || "",
                s.order_index || 0
              )
              .run();
          }
        }

        if (section === "faqs") {
          await env.DB.prepare("DELETE FROM faqs").run();
          for (const f of data) {
            await env.DB.prepare(
              `INSERT INTO faqs (id, lang, blog_id, question, answer, order_index)
               VALUES (?, ?, ?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               question=excluded.question,
               answer=excluded.answer,
               blog_id=excluded.blog_id,
               order_index=excluded.order_index`
            )
              .bind(
                f.id || `faq_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                lang,
                f.blog_id || null,
                f.question || "",
                f.answer || "",
                f.order_index || 0
              )
              .run();
          }
        }

        if (section === "gallery") {
          // Backfill columns on legacy DBs. Idempotent: errors when columns already exist.
          try { await env.DB.prepare("ALTER TABLE gallery ADD COLUMN focal_x INTEGER DEFAULT 50").run(); } catch {}
          try { await env.DB.prepare("ALTER TABLE gallery ADD COLUMN focal_y INTEGER DEFAULT 50").run(); } catch {}
          try { await env.DB.prepare("ALTER TABLE gallery ADD COLUMN thumbnail TEXT").run(); } catch {}
          await reconcileDeletes("gallery", data.map((g: any) => g.id).filter(Boolean));
          for (const g of data) {
            const fx = Math.max(0, Math.min(100, Math.round(Number(g.focalX ?? g.focal_x ?? 50))));
            const fy = Math.max(0, Math.min(100, Math.round(Number(g.focalY ?? g.focal_y ?? 50))));
            await env.DB.prepare(
              `INSERT INTO gallery (id, label, type, src, category, focal_x, focal_y, thumbnail)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               label=excluded.label,
               type=excluded.type,
               src=excluded.src,
               category=excluded.category,
               focal_x=excluded.focal_x,
               focal_y=excluded.focal_y,
               thumbnail=excluded.thumbnail`
            )
              .bind(
                g.id || `g_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                g.label || "",
                g.type || "image",
                g.src || "",
                g.category || "performance",
                fx,
                fy,
                g.thumbnail || null
              )
              .run();
          }
        }

        if (section === "highlights") {
          await reconcileDeletes("highlights", data.map((h: any) => h.id).filter(Boolean));
          for (const h of data) {
            await env.DB.prepare(
              `INSERT INTO highlights (id, title_${lang}, desc_${lang}, icon, image, order_index)
               VALUES (?, ?, ?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               title_${lang}=excluded.title_${lang},
               desc_${lang}=excluded.desc_${lang},
               icon=excluded.icon,
               image=excluded.image,
               order_index=excluded.order_index`
            )
              .bind(
                h.id || `hl_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                h.title?.[lang] || h.title || "",
                h.desc?.[lang] || h.desc || "",
                h.icon || "",
                h.image || "",
                h.order_index || 0
              )
              .run();
          }
        }

        if (section === "class_features") {
          await reconcileDeletes("class_features", data.map((c: any) => c.id).filter(Boolean));
          for (const c of data) {
            await env.DB.prepare(
              `INSERT INTO class_features (id, title_${lang}, desc_${lang}, icon, order_index)
               VALUES (?, ?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               title_${lang}=excluded.title_${lang},
               desc_${lang}=excluded.desc_${lang},
               icon=excluded.icon,
               order_index=excluded.order_index`
            )
              .bind(
                c.id || `cf_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                c.title?.[lang] || c.title || "",
                c.desc?.[lang] || c.desc || "",
                c.icon || "",
                c.order_index || 0
              )
              .run();
          }
        }

        if (section === "services_images") {
          await reconcileDeletes("services_images", data.map((s: any) => s.id).filter(Boolean));
          for (const s of data) {
            await env.DB.prepare(
              `INSERT INTO services_images (id, category, image, order_index)
               VALUES (?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               category=excluded.category,
               image=excluded.image,
               order_index=excluded.order_index`
            )
              .bind(
                s.id || `si_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                s.category || "performance",
                s.image || "",
                s.order_index || 0
              )
              .run();
          }
        }

        if (section === "home_features") {
          await reconcileDeletes("home_features", data.map((h: any) => h.id).filter(Boolean));
          for (const h of data) {
            await env.DB.prepare(
              `INSERT INTO home_features (id, title_${lang}, desc_${lang}, icon, image, order_index)
               VALUES (?, ?, ?, ?, ?, ?)
               ON CONFLICT(id) DO UPDATE SET
               title_${lang}=excluded.title_${lang},
               desc_${lang}=excluded.desc_${lang},
               icon=excluded.icon,
               image=excluded.image,
               order_index=excluded.order_index`
            )
              .bind(
                h.id || `hf_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                h.title?.[lang] || h.title || "",
                h.desc?.[lang] || h.desc || "",
                h.icon || "",
                h.image || "",
                h.order_index || 0
              )
              .run();
          }
        }

        // Purge edge cache for both languages so the next /api/content request
        // re-queries D1 and serves the just-written content. Without this,
        // admin edits would be invisible to users for up to ~60s.
        const cache = (globalThis as any).caches?.default as Cache | undefined;
        if (cache) {
          const origin = new URL(request.url).origin;
          ctx.waitUntil(Promise.all([
            cache.delete(new Request(`${origin}/api/content?lang=en`, { method: "GET" })),
            cache.delete(new Request(`${origin}/api/content?lang=kn`, { method: "GET" })),
          ]));
        }

        return json({ success: true });
      }

      // ─── POST /api/login ───
      if (url.pathname === "/api/login" && request.method === "POST") {
        const body: any = await request.json();
        const { username, password } = body;

        if (!username || !password) {
          return error("Missing credentials", 400);
        }

        const user = await env.DB.prepare("SELECT * FROM admin_users WHERE username = ? AND password = ?")
          .bind(username, password)
          .first();

        if (user) {
          return json({ success: true, token: "admin_token_validated" });
        } else {
          return new Response(JSON.stringify({ success: false, error: "Invalid credentials" }), {
            status: 401,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          });
        }
      }

      // ─── POST /api/upload (R2-backed) ───
      if (url.pathname === "/api/upload" && request.method === "POST") {
        if (!env.IMAGES) return error("R2 bucket not bound", 500);

        const contentType = request.headers.get("content-type") || "";
        let body: ArrayBuffer;
        let extension = "bin";
        let mimeType = "application/octet-stream";

        if (contentType.includes("multipart/form-data")) {
          const form = await request.formData();
          const file = form.get("file") as File | null;
          if (!file) return error("Missing 'file' field in form", 400);
          body = await file.arrayBuffer();
          mimeType = file.type || mimeType;
          const dotIdx = file.name.lastIndexOf(".");
          if (dotIdx !== -1) extension = file.name.slice(dotIdx + 1).toLowerCase();
        } else {
          body = await request.arrayBuffer();
          mimeType = contentType || mimeType;
          const extFromMime = mimeType.split("/")[1]?.split(";")[0]?.trim();
          if (extFromMime) extension = extFromMime;
        }

        const id = crypto.randomUUID();
        const folder = url.searchParams.get("folder") || "uploads";
        const key = `${folder}/${id}.${extension}`;

        await env.IMAGES.put(key, body, {
          httpMetadata: { contentType: mimeType },
        });

        const publicUrl = `https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/${key}`;
        return json({ success: true, url: publicUrl, key });
      }

      // ─── GET /images/* (R2 passthrough) ───
      if (url.pathname.startsWith("/images/")) {
        if (!env.IMAGES) return new Response("R2 not bound", { status: 500 });
        const key = url.pathname.replace("/images/", "");
        const object = await env.IMAGES.get(key);

        if (!object) {
          return new Response("Image Not Found", { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("Cache-Control", "public, max-age=31536000, immutable");

        return new Response(object.body, { headers });
      }

      return new Response("Not Found", { status: 404 });
    } catch (err: any) {
      return error(err.message);
    }
  },
};
