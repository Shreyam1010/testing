import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import { initialPerformanceItems, initialWorkshopItems, initialGurukulItems } from "@/lib/galleryData";
import sticker2 from "@/assets/stickers/sticker_2.png";
import sticker3 from "@/assets/stickers/sticker_3.png";
import sticker4 from "@/assets/stickers/sticker_4.png";

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

const performanceItems = initialPerformanceItems;
const gurukulItems = initialGurukulItems;
const workshopItems = initialWorkshopItems;


function Gallery() {
  const { t, lang } = useLang();
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
            <img src={sticker2} alt="" className="w-10 h-10 object-contain drop-shadow-md" />
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
            <img src={sticker3} alt="" className="w-10 h-10 object-contain drop-shadow-md" />
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
            <img src={sticker4} alt="" className="w-10 h-10 object-contain drop-shadow-md" />
            {lang === "en" ? "Workshops" : "ಕಾರ್ಯಾಗಾರಗಳು"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 grid-flow-dense">
            {workshopItems.map((it, i) => (
              <GalleryItem key={i} it={it} i={i} />
            ))}
          </div>
        </div>
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

      {/* Overlays removed to show only the photo/video content */}
    </motion.div>
  );
}
