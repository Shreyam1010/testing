export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const json = (data) =>
    new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  const error = (msg, status = 500) =>
    new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    // ─── GET /api/content ───
    if (url.pathname.includes("/api/content") && request.method === "GET") {
      const lang = url.searchParams.get("lang") || "en";
      const [siteContent, teachers, classes, blogs, events, workshops, socialLinks, faqs] =
        await Promise.all([
          env.DB.prepare("SELECT * FROM site_content WHERE lang = ?").bind(lang).all(),
          env.DB.prepare("SELECT * FROM teachers").all(),
          env.DB.prepare("SELECT * FROM classes").all(),
          env.DB.prepare("SELECT * FROM blogs").all(),
          env.DB.prepare("SELECT * FROM events").all(),
          env.DB.prepare("SELECT * FROM workshops").all(),
          env.DB.prepare("SELECT * FROM social_links ORDER BY order_index ASC").all(),
          env.DB.prepare("SELECT * FROM faqs WHERE lang = ? ORDER BY order_index ASC").bind(lang).all(),
        ]);

      return json({
        siteContent: siteContent.results,
        teachers: teachers.results,
        classes: classes.results,
        blogs: blogs.results,
        events: events.results,
        workshops: workshops.results,
        socialLinks: socialLinks.results,
        faqs: faqs.results,
      });
    }

    // ─── POST /api/save ───
    if (url.pathname.includes("/api/save") && request.method === "POST") {
      const { section, data, lang } = (await request.json());

      if (section === "hero" || section === "about" || section === "services") {
        for (const [key, value] of Object.entries(data)) {
          await env.DB.prepare(
            "INSERT OR REPLACE INTO site_content (id, lang, section, content_key, content_value) VALUES (?, ?, ?, ?, ?)"
          )
            .bind(`${section}_${lang}_${key}`, lang, section, key, value)
            .run();
        }
      }
      
      // ... (I'll keep it simple for now to verify the connection)
      return json({ success: true });
    }

    return new Response("Not Found", { status: 404 });
  } catch (err) {
    return error(err.message);
  }
}
