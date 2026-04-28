import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Yakshagana Performances & Workshops" },
      { name: "description", content: "A visual journey through Yakshagana performances, costumes, masks, and student workshops." },
      { property: "og:title", content: "Gallery" },
      { property: "og:description", content: "Moments from the stage and the studio." },
      { property: "og:image", content: g2 },
    ],
  }),
  component: Gallery,
});

const items = [
  { src: g1, label: "The Mask" },
  { src: g2, label: "Stage Performance" },
  { src: g4, label: "Crown Heritage" },
  { src: g6, label: "The Warrior" },
  { src: g5, label: "Chande Master" },
  { src: g3, label: "Workshop" },
];

function Gallery() {
  const { t } = useLang();
  return (
    <Layout>
      <section className="container mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-display mb-4">{t.gallery.title}</h1>
          <p className="text-muted-foreground">{t.gallery.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border border-border hover:border-gold/50 transition ${
                i === 0 || i === 4 ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"
              }`}
            >
              <img
                src={it.src}
                alt={it.label}
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute bottom-0 inset-x-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition">
                <div className="font-display text-lg text-primary">{it.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
