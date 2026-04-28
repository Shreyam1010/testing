import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import mandala from "@/assets/mandala.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Kathe Gaararu — A Yakshagana Cultural Sanctuary" },
      { name: "description", content: "Learn about our mission to preserve and teach Yakshagana — Karnataka's 400-year-old folk theatre tradition." },
      { property: "og:title", content: "About Kathe Gaararu" },
      { property: "og:description", content: "Our story, mission, and heritage." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useLang();
  return (
    <Layout>
      <section className="container mx-auto px-6 py-20 relative">
        <img src={mandala} alt="" className="absolute right-0 top-10 w-96 opacity-5 animate-spin-slow" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="ornament-divider w-24 mb-6" />
          <h1 className="text-5xl md:text-6xl font-display mb-6">{t.about.title}</h1>
          <p className="text-xl text-primary mb-8 leading-relaxed">{t.about.lead}</p>
          {t.about.body.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-5">{p}</p>
          ))}
        </motion.div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.about.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition"
            >
              <div className="text-4xl md:text-5xl font-display text-gradient-gold mb-2">{s.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
