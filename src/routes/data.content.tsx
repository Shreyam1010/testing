import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/data/content")({
  loader: async () => {
    // This part runs on the client/server during navigation
    return {};
  },
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const lang = url.searchParams.get("lang") || "en";
        
        // In TanStack Start on Cloudflare, env is often on globalThis in production
        const env = (globalThis as any);
        const db = env.DB;

        if (!db) {
          return new Response(JSON.stringify({ error: "Database not found" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const [siteContent, teachers, classes, blogs, events, workshops, socialLinks, faqs] =
            await Promise.all([
              db.prepare("SELECT * FROM site_content WHERE lang = ?").bind(lang).all(),
              db.prepare("SELECT * FROM teachers").all(),
              db.prepare("SELECT * FROM classes").all(),
              db.prepare("SELECT * FROM blogs").all(),
              db.prepare("SELECT * FROM events").all(),
              db.prepare("SELECT * FROM workshops").all(),
              db.prepare("SELECT * FROM social_links ORDER BY order_index ASC").all(),
              db.prepare("SELECT * FROM faqs WHERE lang = ? ORDER BY order_index ASC").bind(lang).all(),
            ]);

          return new Response(
            JSON.stringify({
              siteContent: siteContent.results,
              teachers: teachers.results,
              classes: classes.results,
              blogs: blogs.results,
              events: events.results,
              workshops: workshops.results,
              socialLinks: socialLinks.results,
              faqs: faqs.results,
            }),
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        } catch (err: any) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
