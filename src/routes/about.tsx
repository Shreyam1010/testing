import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import aboutImg from "@/assets/about-performer.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Kathe Gaararu — A Yakshagana Cultural Sanctuary" },
      {
        name: "description",
        content:
          "Learn about our mission to preserve and teach Yakshagana — Karnataka's 400-year-old folk theatre tradition.",
      },
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
      <section className="relative overflow-hidden min-h-[80vh] flex items-stretch">
        <div className="grid lg:grid-cols-[45%_55%] w-full">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block overflow-hidden border-r border-gold/10"
          >
            <img
              src={aboutImg}
              alt="Yakshagana performer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60" />
          </motion.div>

          {/* Text Content */}
          <div className="flex flex-col justify-center px-8 py-20 md:px-16 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-crimson font-medium mb-4 block">
                OUR STORY
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-10 text-foreground">
                {t.about.title}
              </h1>
              
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-primary font-medium leading-relaxed italic border-l-4 border-gold pl-6 py-2 bg-gold/5 rounded-r-lg">
                  {t.about.lead}
                </p>
                {t.about.body.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-[1.8] text-lg">
                    {p}
                  </p>
                ))}
              </div>

              {/* Stats Grid Integrated */}
              <div className="mt-16 grid grid-cols-2 gap-6">
                {t.about.stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-6 rounded-2xl bg-card/40 border border-border hover:border-gold/30 transition group"
                  >
                    <div className="text-3xl md:text-4xl font-display text-gradient-gold mb-1 group-hover:scale-110 transition-transform">
                      {s.value}
                    </div>
                    <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
