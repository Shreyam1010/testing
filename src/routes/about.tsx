import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import aboutImg from "@/assets/about-performer.jpg";
import sticker1 from "@/assets/stickers/sticker_1.png";

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

import { useDbContent } from "@/hooks/useDb";

function About() {
  const { t, lang } = useLang();
  const { data, loading } = useDbContent();

  const aboutData = data?.siteContent?.about || t.about;

  return (
    <Layout>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <section className="relative overflow-hidden min-h-[80vh] flex items-stretch">
          <div className="grid lg:grid-cols-[45%_55%] w-full">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:block flex justify-center pt-16 lg:pt-0 overflow-hidden border-r border-gold/10 lg:h-auto"
            >
              <div className="relative h-full w-full">
                <img
                  src={aboutData.image || aboutImg}
                  alt="Yakshagana performer"
                  className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-full lg:h-full object-cover object-top rounded-full lg:rounded-none border border-gold/20 lg:border-none shadow-glow lg:shadow-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30 lg:to-background/60 rounded-full lg:rounded-none" />
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="flex flex-col justify-center px-8 py-12 lg:py-20 md:px-16 lg:px-24 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="text-xs uppercase tracking-[0.3em] text-crimson font-medium mb-4 block">
                  {lang === "en" ? "OUR STORY" : "ನಮ್ಮ ಕಥೆ"}
                </span>
                <h1 className="font-display text-[26px] sm:text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 lg:mb-10 text-foreground flex items-center justify-center lg:justify-start gap-4 md:gap-6">
                  <img src={sticker1} alt="" className="w-10 h-10 md:w-16 md:h-16 object-contain drop-shadow-md" />
                  {aboutData.title}
                </h1>
                
                <div className="space-y-6">
                  <p className="text-lg md:text-2xl text-gold font-medium leading-relaxed italic border-l-4 border-gold pl-6 py-2 bg-gold/5 rounded-r-lg">
                    {aboutData.lead}
                  </p>
                  {(aboutData.body || t.about.body).map((p: string, i: number) => (
                    <p key={i} className="text-muted-foreground leading-[1.8] text-base md:text-lg">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6">
                  {(aboutData.stats || t.about.stats).map((s: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="p-4 sm:p-6 rounded-2xl bg-card/40 border border-border hover:border-gold/30 transition group"
                    >
                      <div className="text-2xl sm:text-4xl font-display text-gradient-gold mb-1 group-hover:scale-110 transition-transform">
                        {s.value}
                      </div>
                      <div className="text-[8px] sm:text-xs text-muted-foreground uppercase tracking-widest">
                        {s.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
