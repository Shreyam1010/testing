import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
              <GalleryItem key={i} it={it} i={i} />
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
              <GalleryItem key={i} it={it} i={i} />
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
              <GalleryItem key={i} it={it} i={i} />
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
    </Layout>
  );
}

function GalleryItem({ it, i }: { it: any; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl border border-border hover:border-gold/50 transition ${i === 0 || i === 3 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
        }`}
    >
      {it.type === "video" ? (
        <video
          src={it.src}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          muted
          loop
          playsInline
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
      ) : (
        <img
          src={it.src}
          alt={it.label}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition duration-500">
        <div className="font-display text-sm sm:text-lg text-primary drop-shadow-md">{it.label}</div>
      </div>
    </motion.div>
  );
}
