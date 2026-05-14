import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import { initialPerformanceItems, initialWorkshopItems, initialGurukulItems } from "@/lib/galleryData";

import { useDbContent } from "@/hooks/useDb";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Yakshagana Performances & Workshops" },
      {
        name: "description",
        content:
          "A visual journey through Yakshagana performances, costumes, masks, and student workshops.",
      },
      { property: "og:title", content: "Gallery" },
      { property: "og:description", content: "Moments from the stage and the studio." },
      { property: "og:image", content: initialPerformanceItems[0]?.src },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const { t, lang } = useLang();
  const { data, loading } = useDbContent();
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!videoSrc) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoSrc(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [videoSrc]);

  const performanceItems: any[] = data?.galleryByCategory?.performance?.length
    ? data.galleryByCategory.performance
    : initialPerformanceItems;
  const gurukulItems: any[] = data?.galleryByCategory?.gurukul?.length
    ? data.galleryByCategory.gurukul
    : initialGurukulItems;
  const workshopItems: any[] = data?.galleryByCategory?.workshop?.length
    ? data.galleryByCategory.workshop
    : initialWorkshopItems;

  const servicesMap = data?.siteContentMap?.services || {};
  const socialTitle = servicesMap.social_title || t.services.social.title;
  const socialSubtitle = servicesMap.social_subtitle || t.services.social.subtitle;
  const socialLinks = data?.socialLinks || [];

  return (
    <Layout>
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display mb-4">{t.gallery.title}</h1>
          <p className="text-muted-foreground">{t.gallery.subtitle}</p>
        </motion.div>

        {/* PERFORMANCES */}
        <div id="performances" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-display mb-10 text-primary flex items-center gap-3">
            {lang === "en" ? "Performances" : "ಪ್ರದರ್ಶನಗಳು"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 grid-flow-dense">
            {performanceItems.map((it, i) => (
              <GalleryItem key={i} it={it} i={i} onPlayVideo={setVideoSrc} />
            ))}
          </div>
        </div>
        
        {/* GURUKUL (CLASSES) */}
        <div id="gurukul" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-display mb-10 text-primary flex items-center gap-3">
            {lang === "en" ? "Classes" : "ಗುರುಕುಲ"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 grid-flow-dense">
            {gurukulItems.map((it, i) => (
              <GalleryItem key={i} it={it} i={i} onPlayVideo={setVideoSrc} />
            ))}
          </div>
        </div>

        {/* WORKSHOPS */}
        <div id="workshops" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-display mb-10 text-primary flex items-center gap-3">
            {lang === "en" ? "Workshops" : "ಕಾರ್ಯಾಗಾರಗಳು"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 grid-flow-dense">
            {workshopItems.map((it, i) => (
              <GalleryItem key={i} it={it} i={i} onPlayVideo={setVideoSrc} />
            ))}
          </div>
        </div>

        {/* SOCIAL MEDIA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-10 border-t border-border/30 mt-20"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-display text-primary mb-4 flex items-center justify-center gap-4 uppercase tracking-wider">
              {lang === "en" ? "Follow our journey on social media" : "ಸಾಮಾಜಿಕ ಜಾಲತಾಣಗಳಲ್ಲಿ ನಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಅನುಸರಿಸಿ"}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {loading ? (
              Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-2xl bg-muted/40 animate-pulse w-[calc((100%-1rem)/2)] sm:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-9rem)/7)]" />
              ))
            ) : (
              socialLinks.slice(0, 21).map((social: any) => {
                const hasText = social.title?.[lang] || social.description?.[lang];
                return (
                  <motion.a
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -10 }}
                    className="relative rounded-2xl overflow-hidden border border-border group aspect-[4/5] flex flex-col justify-end p-4 w-[calc((100%-1rem)/2)] sm:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-9rem)/7)]"
                  >
                    <img 
                      src={social.image || "/images/gallery-1.jpg"} 
                      alt={social.title?.[lang] || "Social post"}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {hasText && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                        <div className="relative z-10">
                          {social.title?.[lang] && (
                            <h3 className="text-sm font-display text-primary mb-1">
                              {social.title[lang]}
                            </h3>
                          )}
                          {social.description?.[lang] && (
                            <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">
                              {social.description[lang]}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </motion.a>
                );
              })
            )}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {videoSrc && <VideoLightbox src={videoSrc} onClose={() => setVideoSrc(null)} />}
      </AnimatePresence>
    </Layout>
  );
}

function GalleryItem({ it, i, onPlayVideo }: { it: any; i: number; onPlayVideo: (src: string) => void }) {
  const isVideo = it.type === "video";
  const handleClick = () => {
    if (isVideo && it.src) onPlayVideo(it.src);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-2xl border border-border hover:border-gold/50 transition ${isVideo ? "cursor-pointer" : ""} ${i === 0 || i === 3 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
        }`}
    >
      {isVideo ? (
        <>
          {it.thumbnail ? (
            <img
              src={it.thumbnail}
              alt={it.label || "Video thumbnail"}
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ objectPosition: `${it.focalX ?? 50}% ${it.focalY ?? 50}%` }}
            />
          ) : (
            <div className="w-full h-full bg-background" />
          )}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-background/60 backdrop-blur-sm border border-gold/60 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-glow">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-gold fill-gold ml-1" />
            </div>
          </div>
        </>
      ) : (
        <img
          src={it.src}
          alt={it.label}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: `${it.focalX ?? 50}% ${it.focalY ?? 50}%` }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition duration-500">
        <div className="font-display text-sm sm:text-lg text-primary drop-shadow-md">{it.label}</div>
      </div>
    </motion.div>
  );
}

function VideoLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10 bg-background/90 backdrop-blur-md"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 rounded-full bg-background/60 hover:bg-gold hover:text-background border border-border transition-colors z-10"
        aria-label="Close video"
      >
        <X className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-gold/40 shadow-2xl bg-black"
      >
        <video
          src={src}
          className="w-full h-full"
          controls
          autoPlay
          playsInline
          controlsList="nodownload"
        />
      </motion.div>
    </motion.div>
  );
}
