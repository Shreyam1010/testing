import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, User, CalendarDays } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Yakshagana Classes & Workshops — Kathe Gaararu" },
      {
        name: "description",
        content:
          "Authentic Yakshagana training in dance, music, vocals, and costume from veteran gurus.",
      },
      { property: "og:title", content: "Classes & Workshops" },
      {
        property: "og:description",
        content: "Train under master gurus across vocals, drums, dance, and more.",
      },
    ],
  }),
  component: Classes,
});

function Classes() {
  const { t } = useLang();
  return (
    <Layout>
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-display mb-4">{t.classes.title}</h1>
          <p className="text-muted-foreground">{t.classes.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.classes.items.map((c, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-7 rounded-2xl bg-card border border-border hover:border-gold/50 hover:shadow-glow transition-all"
            >
              <div className="absolute top-0 left-7 w-12 h-1 bg-gold rounded-b-full" />
              <h3 className="font-display text-2xl text-primary mb-4">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{c.desc}</p>
              <div className="space-y-2.5 text-sm border-t border-border/50 pt-5">
                <div className="flex items-center gap-2.5 text-foreground/80">
                  <User className="w-4 h-4 text-gold" /> {c.teacher}
                </div>
                <div className="flex items-center gap-2.5 text-foreground/80">
                  <Clock className="w-4 h-4 text-gold" /> {c.time}
                </div>
                <div className="flex items-center gap-2.5 text-foreground/80">
                  <CalendarDays className="w-4 h-4 text-gold" /> {c.duration}
                </div>
              </div>
              <Link
                to="/contact"
                className="mt-6 inline-flex w-full items-center justify-center px-4 py-2.5 rounded-full border border-gold/40 text-primary text-sm hover:bg-gold hover:text-background transition-colors"
              >
                {t.classes.enroll}
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
