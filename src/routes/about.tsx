import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import aboutImg from "@/assets/about-performer.jpg";
import mandala from "@/assets/mandala.png";
import sticker0 from "@/assets/stickers/sticker_0.png";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Tales of tradition — Kathe Gaararu" },
      {
        name: "description",
        content:
          "Learn about our mission to preserve and teach Yakshagana — Karnataka's 400-year-old folk theatre tradition.",
      },
      { property: "og:title", content: "Tales of tradition — Kathe Gaararu" },
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
  const bodyParagraphs = aboutData.body || t.about.body;

  return (
    <Layout>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <section className="relative w-full flex flex-col items-center justify-start pt-16 pb-20 px-4 md:px-8 overflow-hidden min-h-screen">
            {/* Full background */}
            <div className="absolute inset-0 z-0">
              <img
                src={aboutData.image || aboutImg}
                alt="Yakshagana Performer"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-black/60 to-background" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
              {/* Section Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-6 z-20"
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-[4rem] text-[#ffdf73] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-wide">
                  {lang === "en" ? "Tales of tradition" : "ಸಂಪ್ರದಾಯದ ಕಥೆಗಳು"}
                </h1>
              </motion.div>

              {/* Top Mask Sticker */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="z-20 -mb-12 md:-mb-16 relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              >
                <img
                  src={sticker0}
                  alt="Yakshagana Mask"
                  className="w-full h-full object-contain filter brightness-110 contrast-125"
                />
              </motion.div>

              {/* Scroll Container */}
              <div className="relative w-full max-w-[95%] sm:max-w-md md:max-w-2xl mx-auto">
                {/* Scroll Top Roller */}
                <div className="absolute -top-3 inset-x-0 h-6 bg-gradient-to-b from-[#e6d5b3] via-[#d4c39f] to-[#bda97e] rounded-full shadow-lg border border-[#a69265] z-10" />
                <div className="absolute -top-4 -left-2 w-4 h-8 bg-gradient-to-b from-[#8c7340] to-[#594723] rounded-full shadow-lg z-20 border border-[#bda97e]/30" />
                <div className="absolute -top-4 -right-2 w-4 h-8 bg-gradient-to-b from-[#8c7340] to-[#594723] rounded-full shadow-lg z-20 border border-[#bda97e]/30" />

                {/* Scroll Paper */}
                <div className="bg-gradient-to-b from-[#fdf6e3] via-[#faeed1] to-[#e8d5a5] px-6 py-16 sm:py-20 md:px-16 md:py-24 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative border-x-2 border-[#c2aa78] overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage:
                        "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'0.4\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')",
                    }}
                  />

                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 opacity-15 w-16 h-32 md:w-24 md:h-48 bg-contain bg-no-repeat bg-left"
                    style={{ backgroundImage: `url(${mandala})` }}
                  />
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 opacity-15 w-16 h-32 md:w-24 md:h-48 bg-contain bg-no-repeat bg-right scale-x-[-1]"
                    style={{ backgroundImage: `url(${mandala})` }}
                  />

                  {/* Lead text inside scroll */}
                  <p
                    className="text-[#3a2e18] text-center text-sm sm:text-base md:text-xl leading-relaxed font-medium relative z-10 px-2 md:px-4 italic"
                    dangerouslySetInnerHTML={{
                      __html: (aboutData.lead || bodyParagraphs[0] || "").replace(
                        /Kathe Gaararu|ಕಥೆಗಾರರು/gi,
                        '<strong class="font-bold text-[#2a2110]">$&</strong>'
                      ),
                    }}
                  />
                </div>

                {/* Scroll Bottom Roller */}
                <div className="absolute -bottom-3 inset-x-0 h-6 bg-gradient-to-b from-[#bda97e] via-[#d4c39f] to-[#e6d5b3] rounded-full shadow-lg border border-[#a69265] z-10" />
                <div className="absolute -bottom-4 -left-2 w-4 h-8 bg-gradient-to-b from-[#8c7340] to-[#594723] rounded-full shadow-lg z-20 border border-[#bda97e]/30" />
                <div className="absolute -bottom-4 -right-2 w-4 h-8 bg-gradient-to-b from-[#8c7340] to-[#594723] rounded-full shadow-lg z-20 border border-[#bda97e]/30" />
              </div>

              {/* Curved Timeline */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="relative w-full max-w-4xl mt-12 sm:mt-16 mb-8 h-24 sm:h-32 md:h-40"
              >
                <svg
                  className="absolute inset-0 w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M 0 50 Q 25 120 50 50 T 100 50"
                    fill="none"
                    stroke="url(#goldGradientAbout)"
                    strokeWidth="0.8"
                  />
                  <defs>
                    <linearGradient id="goldGradientAbout" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity="0.1" />
                      <stop offset="15%" stopColor="#ffdf73" stopOpacity="1" />
                      <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
                      <stop offset="85%" stopColor="#ffdf73" stopOpacity="1" />
                      <stop offset="100%" stopColor="#d4af37" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Timeline Nodes */}
                <div className="absolute top-[50%] left-[10%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full border-[2px] sm:border-[3px] border-gold/60 p-1 bg-black/60 backdrop-blur-md hover:scale-110 transition-transform cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  <img src={g1} className="w-full h-full rounded-full object-cover filter sepia opacity-80" />
                </div>
                <div className="absolute top-[85%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border-[2px] sm:border-[3px] border-gold p-1 bg-black/80 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-110 transition-transform cursor-pointer">
                  <img src={g2} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full border-[3px] sm:border-[4px] border-[#ffdf73] p-1 bg-black/90 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.8)] z-10 hover:scale-110 transition-transform cursor-pointer">
                  <img src={g4} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute top-[85%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border-[2px] sm:border-[3px] border-gold p-1 bg-black/80 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-110 transition-transform cursor-pointer">
                  <img src={g6} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute top-[50%] left-[90%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full border-[2px] sm:border-[3px] border-gold/60 p-1 bg-black/60 backdrop-blur-md hover:scale-110 transition-transform cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  <img src={g5} className="w-full h-full rounded-full object-cover filter sepia opacity-80" />
                </div>
              </motion.div>

              {/* Body paragraphs in glass card */}
              {bodyParagraphs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="w-full max-w-[90%] sm:max-w-md md:max-w-3xl mt-4 md:mt-12 p-5 sm:p-6 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-white/5 opacity-50" />
                  <div className="relative z-10 space-y-4">
                    {bodyParagraphs.map((p: string, i: number) => (
                      <p
                        key={i}
                        className="text-white/95 text-center text-xs sm:text-sm md:text-lg leading-relaxed font-medium"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </section>

          {/* Stats Section */}
          <section className="relative z-10 container mx-auto px-6 py-16 -mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {(aboutData.stats || t.about.stats).map((s: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-6 rounded-2xl bg-card/40 border border-border hover:border-gold/30 transition group text-center"
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
          </section>
        </>
      )}
    </Layout>
  );
}
