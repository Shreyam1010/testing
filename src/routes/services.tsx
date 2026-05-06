  import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import sticker0 from "@/assets/stickers/sticker_0.png";
import sticker5 from "@/assets/stickers/sticker_5.png";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Kathe Gaararu Yakshagana" },
    ],
  }),
  component: Services,
});

function Services() {
  const { t } = useLang();

  const sections = [
    {
      id: "performance",
      title: t.services.performance.title,
      desc: t.services.performance.desc,
      buttonText: t.services.performance.buttonText,
      images: ["/images/gallery-1.jpg", "/images/gallery-2.jpg", "/images/gallery-4.jpg", "/images/gallery-5.jpg", "/images/gallery-6.jpg"],
    },
    {
      id: "classes",
      title: t.services.classes.title,
      desc: t.services.classes.desc,
      buttonText: t.services.classes.buttonText,
      images: ["/images/gallery-3.jpg", "/images/gallery-5.jpg", "/images/gallery-6.jpg", "/images/gallery-1.jpg", "/images/gallery-2.jpg"],
    },
    {
      id: "workshops",
      title: t.services.workshops.title,
      desc: t.services.workshops.desc,
      buttonText: t.services.workshops.buttonText,
      images: ["/images/gallery-4.jpg", "/images/gallery-1.jpg", "/images/gallery-3.jpg", "/images/gallery-6.jpg", "/images/gallery-5.jpg"],
    }
  ];

  return (
    <Layout>
      <section className="container mx-auto px-6 py-32 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-24"
        >
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display mb-4 text-primary">
            {t.services.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col gap-32">
          {sections.map((section) => (
            <motion.div 
              key={section.id}
              id={section.id}
              className="flex flex-col gap-12 scroll-mt-32"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display text-primary mb-6 flex items-center justify-center gap-4">
                  <img src={sticker5} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  {section.title}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {section.desc}
                </p>
              </div>

              {/* Photos Sequence (Slider Layout) */}
              <div className="w-full overflow-hidden pb-4">
                <div className="flex flex-nowrap gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {section.images.map((img, imgIdx) => {
                    const isLast = imgIdx === 4;
                    // Calculate exact widths to fit 4.5 items on lg, 3.5 on md, 2.5 on default
                    const cardClasses = "shrink-0 w-[calc((100%-1rem)/2.5)] sm:w-[calc((100%-2rem)/3.5)] lg:w-[calc((100%-6rem)/4.5)] relative aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-xl group snap-start";
                    
                    return isLast ? (
                      <Link 
                        key={imgIdx}
                        to="/gallery"
                        className={`${cardClasses} block cursor-pointer`}
                      >
                        <img 
                          src={img} 
                          alt="View more in gallery"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Position arrow at left 25% so it's visible even when right half is cut off */}
                        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center pl-[25%] transition-all group-hover:bg-black/70">
                          <ArrowRight className="w-8 h-8 text-white transition-transform group-hover:translate-x-1" />
                          <span className="text-xs font-bold uppercase tracking-widest text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity">More</span>
                        </div>
                      </Link>
                    ) : (
                      <motion.div 
                        key={imgIdx}
                        whileHover={{ y: -10 }}
                        className={cardClasses}
                      >
                        <img 
                          src={img} 
                          alt={`${section.title} image ${imgIdx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Book Demo Button */}
              <div className="flex justify-center mt-4">
                <Link 
                  to="/contact" 
                  className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-gold text-background rounded-full font-bold uppercase tracking-widest text-sm shadow-glow hover:scale-105 transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Star className="w-4 h-4" />
                    {section.buttonText}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-20"
          >
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display text-primary mb-6 flex items-center justify-center gap-4">
                <img src={sticker0} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                {t.services.social.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t.services.social.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  key: 'facebook', 
                  icon: Facebook, 
                  img: "/images/gallery-2.jpg",
                  href: "https://facebook.com"
                },
                { 
                  key: 'instagram', 
                  icon: Instagram, 
                  img: "/images/gallery-4.jpg",
                  href: "https://instagram.com"
                },
                { 
                  key: 'twitter', 
                  icon: Twitter, 
                  img: "/images/gallery-5.jpg",
                  href: "https://twitter.com"
                }
              ].map((social) => {
                const Icon = social.icon;
                const data = t.services.social[social.key];
                return (
                  <motion.div
                    key={social.key}
                    whileHover={{ y: -10 }}
                    className="relative rounded-3xl overflow-hidden border border-border group h-[400px] flex flex-col justify-end p-8"
                  >
                    <img 
                      src={social.img} 
                      alt={data.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center mb-6 shadow-glow">
                        <Icon className="w-6 h-6 text-background" />
                      </div>
                      <h3 className="text-2xl font-display text-primary mb-3">
                        {data.title}
                      </h3>
                      <p className="text-muted-foreground mb-8 line-clamp-2">
                        {data.desc}
                      </p>
                      <a 
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white font-bold uppercase tracking-widest text-[10px] hover:bg-gold hover:text-background hover:border-gold transition-all"
                      >
                        {data.buttonText}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
