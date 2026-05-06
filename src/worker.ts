export interface Env {
  DB: D1Database;
  IMAGES?: R2Bucket; // Made optional
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

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

        const [siteContent, teachers, classes, blogs, events, workshops] =
          await Promise.all([
            env.DB.prepare("SELECT * FROM site_content WHERE lang = ?").bind(lang).all(),
            env.DB.prepare("SELECT * FROM teachers").all(),
            env.DB.prepare("SELECT * FROM classes").all(),
            env.DB.prepare("SELECT * FROM blogs").all(),
            env.DB.prepare("SELECT * FROM events").all(),
            env.DB.prepare("SELECT * FROM workshops").all(),
          ]);

        return json({
          siteContent: siteContent.results,
          teachers: teachers.results,
          classes: classes.results,
          blogs: blogs.results,
          events: events.results,
          workshops: workshops.results,
        });
      }

      // ─── POST /api/save ───
      if (url.pathname === "/api/save" && request.method === "POST") {
        const { section, data, lang } = (await request.json()) as any;

        if (section === "hero" || section === "about") {
          for (const [key, value] of Object.entries(data)) {
            await env.DB.prepare(
              "INSERT OR REPLACE INTO site_content (id, lang, section, content_key, content_value) VALUES (?, ?, ?, ?, ?)"
            )
              .bind(`${section}_${lang}_${key}`, lang, section, key, value as string)
              .run();
          }
        }

        if (section === "events") {
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
          // Sync teachers
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
          // Sync classes
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

        return json({ success: true });
      }

      // ─── POST /api/upload (R2 disabled) ───
      if (url.pathname === "/api/upload" && request.method === "POST") {
        return error("R2 Storage not configured", 400);
      }

      // ─── GET /images/* ───
      if (url.pathname.startsWith("/images/")) {
        const key = url.pathname.replace("/images/", "");
        const object = await env.IMAGES?.get(key);

        if (!object) {
          return new Response("Image Not Found", { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);
        headers.set("Access-Control-Allow-Origin", "*");
        // Add cache control for performance
        headers.set("Cache-Control", "public, max-age=31536000, immutable");

        return new Response(object.body, { headers });
      }

      return new Response("Not Found", { status: 404 });
    } catch (err: any) {
      return error(err.message);
    }
  },
};
