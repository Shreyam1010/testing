export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1. Handle CORS (Allow your frontend to talk to this worker)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 2. Routing
    try {
      // --- FETCH ALL CONTENT ---
      if (url.pathname === "/api/content" && request.method === "GET") {
        const lang = url.searchParams.get("lang") || "en";
        
        const siteContent = await env.DB.prepare("SELECT * FROM site_content WHERE lang = ?").bind(lang).all();
        const events = await env.DB.prepare("SELECT * FROM events WHERE lang = ?").bind(lang).all();
        const classes = await env.DB.prepare("SELECT * FROM classes WHERE lang = ?").bind(lang).all();
        const blogs = await env.DB.prepare("SELECT * FROM blogs WHERE lang = ?").bind(lang).all();
        const teachers = await env.DB.prepare("SELECT * FROM teachers WHERE lang = ?").bind(lang).all();

        return new Response(JSON.stringify({
          siteContent: siteContent.results,
          events: events.results,
          classes: classes.results,
          blogs: blogs.results,
          teachers: teachers.results
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // --- SAVE CONTENT ---
      if (url.pathname === "/api/save" && request.method === "POST") {
        const { section, data, lang } = await request.json() as any;

        if (section === "hero" || section === "about") {
          // Update individual keys in site_content
          for (const [key, value] of Object.entries(data)) {
            await env.DB.prepare(
              "INSERT OR REPLACE INTO site_content (id, lang, section, content_key, content_value) VALUES (?, ?, ?, ?, ?)"
            ).bind(`${section}_${lang}_${key}`, lang, section, key, value as string).run();
          }
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response("Not Found", { status: 404 });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  },
};
