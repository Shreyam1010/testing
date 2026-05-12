  import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";

import sticker5 from "@/assets/stickers/sticker_5.png";
import { useDbContent } from "@/hooks/useDb";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Kathe Gaararu Yakshagana" },
    ],
  }),
  component: Services,
});function Services() {
  const { t, lang } = useLang();
  const { data, loading } = useDbContent();

  const servicesMap = data?.siteContentMap?.services || {};

  const pageTitle = servicesMap.title || t.services.title;
  const pageSubtitle = servicesMap.subtitle || t.services.subtitle;

  const sections = [
    {
      id: "performance",
      title: servicesMap.perf_title || t.services.performance.title,
      desc: servicesMap.perf_desc || t.services.performance.desc,
      buttonText: servicesMap.perf_btn || t.services.performance.buttonText,
      images: ["/images/gallery-1.jpg", "/images/gallery-2.jpg", "/images/gallery-4.jpg", "/images/gallery-5.jpg", "/images/gallery-6.jpg"],
    },

    {
      id: "workshops",
      title: servicesMap.work_title || t.services.workshops.title,
      desc: servicesMap.work_desc || t.services.workshops.desc,
      buttonText: servicesMap.work_btn || t.services.workshops.buttonText,
      images: ["/images/gallery-4.jpg", "/images/gallery-1.jpg", "/images/gallery-3.jpg", "/images/gallery-6.jpg", "/images/gallery-5.jpg"],
    }
  ];



  return (
    <Layout>
      <section className="container mx-auto px-6 pt-10 pb-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-display mb-4 text-primary">
            {pageTitle}
          </h1>
          <p className="text-muted-foreground text-lg">
            {pageSubtitle}
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
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
                <h2 className="text-xl sm:text-2xl md:text-4xl font-display text-primary mb-4 flex items-center justify-center gap-4">
                  <img src={sticker5} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  {section.title}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {section.desc}
                </p>
              </div>

              {/* Photos Sequence + Dots Wrapper */}
              <div className="flex flex-col gap-2">
                <div className="w-full overflow-hidden">
                  <div className="flex flex-nowrap gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {section.images.map((img, imgIdx) => {
                      const isLast = imgIdx === 4;
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

                {/* Swipe Indicator Dots */}
                <div className="flex justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Book Demo Button */}
              <div className="flex justify-center mt-4">
                <Link 
                  to="/contact" 
                  className="group relative flex items-center justify-center gap-2 px-6 py-3 bg-gold text-background rounded-full font-bold uppercase tracking-widest text-xs shadow-glow hover:scale-105 transition-all overflow-hidden"
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

        </div>
      </section>
    </Layout>
  );
}

