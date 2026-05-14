import { motion, AnimatePresence } from "framer-motion";
import { User, Clock, Calendar } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useDbContent } from "@/hooks/useDb";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";

const imgMap: Record<string, string> = { g1, g2, g4, g5 };

export function UpcomingEvents() {
  const { lang } = useLang();
  const { data, loading } = useDbContent();
  
  if (loading) return null;

  const events = data?.events || [];

  if (events.length === 0) return null;

  return (
    <section className="container mx-auto px-6 pb-24">
      <div className="text-center mb-12">
        <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-4 text-primary">
          {lang === "en" ? "Upcoming Events" : "ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು"}
        </h2>
        <div className="ornament-divider w-24 mx-auto" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <AnimatePresence>
          {events.map((ev: any, i: number) => {
            const displayImage = ev.image.startsWith('/') ? (imgMap[ev.id] || ev.image) : (ev.image.startsWith('g') ? imgMap[ev.image] : ev.image);
            
            return (
              <motion.article
                key={ev.id || i}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-[#0a0a0a] border border-border/50 rounded-xl overflow-hidden transition-all hover:border-gold/40 flex flex-col h-full"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={displayImage}
                    alt={ev.title?.[lang] || "Event Image"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                  {ev.badge?.[lang] && (
                    <span className="absolute top-2 right-2 bg-gold text-[#0a0a0a] text-[7px] md:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 md:px-2 md:py-1 rounded-sm">
                      {ev.badge[lang]}
                    </span>
                  )}
                </div>

                <div className="p-3 md:p-6 flex flex-col flex-grow">
                  <h3 className="font-display text-[13px] sm:text-lg md:text-xl text-primary mb-1 md:mb-4 leading-tight line-clamp-2">
                    {ev.title?.[lang]}
                  </h3>

                  <div className="space-y-1 md:space-y-3 text-[9px] md:text-sm text-foreground/70 mb-3 md:mb-8 flex-grow">
                    <div className="flex items-center gap-1.5 md:gap-3">
                      <Calendar size={10} className="text-gold shrink-0 md:w-3.5 md:h-3.5" />
                      <span>{ev.date || (lang === "en" ? "TBD" : "ಶೀಘ್ರದಲ್ಲೇ")}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-3">
                      <Clock size={10} className="text-gold shrink-0 md:w-3.5 md:h-3.5" />
                      <span>{ev.time?.[lang]}</span>
                    </div>
                  </div>

                  {ev.status === "booking" ? (
                    <a
                      href="https://wa.me/919741508468"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-1.5 md:py-3 px-2 md:px-4 border border-gold/30 text-[8px] md:text-xs font-bold uppercase tracking-widest text-gold hover:bg-gold hover:text-background transition-all rounded-md"
                    >
                      {lang === "en" ? "BOOK NOW" : "ಬುಕಿಂಗ್"}
                    </a>
                  ) : (
                    <div className="block w-full text-center py-1.5 md:py-3 px-2 md:px-4 border border-border/30 text-[8px] md:text-xs font-bold uppercase tracking-widest text-foreground/40 bg-background/20 rounded-md cursor-not-allowed">
                      {lang === "en" ? "SOON" : "ಶೀಘ್ರದಲ್ಲೇ"}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
