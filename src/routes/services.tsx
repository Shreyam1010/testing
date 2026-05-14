  import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";


import { useDbContent } from "@/hooks/useDb";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Kathe Gaararu Yakshagana" },
    ],
  }),
  component: Services,
});

function PhotoCarousel({ images, title }: { images: string[], title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showArrow, setShowArrow] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    
    if (scrollLeft > 20 && showArrow) {
      setShowArrow(false);
    }

    const itemWidth = container.scrollWidth / images.length;
    const index = Math.round(scrollLeft / itemWidth);
    if (index !== activeIndex && index >= 0 && index < images.length) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full overflow-hidden">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-nowrap gap-2 lg:gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {images.map((img, imgIdx) => {
            const isLast = imgIdx === images.length - 1;
            const isThird = imgIdx === 2;
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
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/60 flex flex-col justify-center pl-[25%] transition-all group-hover:bg-background/80">
                  <ArrowRight className="w-8 h-8 text-gold transition-transform group-hover:translate-x-1" />
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">More</span>
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
                  alt={`${title} image ${imgIdx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {isThird && showArrow && (
                  <div className="absolute inset-0 flex items-center justify-start pl-4 pointer-events-none">
                    <motion.div
                      className="bg-background/50 rounded-full p-1.5 backdrop-blur-sm"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="w-4 h-4 text-gold" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Swipe Indicator Dots */}
      <div className="flex justify-center gap-1.5">
        {images.map((_, dotIdx) => (
          <div 
            key={dotIdx} 
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${dotIdx === activeIndex ? 'bg-gold' : 'bg-muted-foreground/30'}`}
          />
        ))}
      </div>
    </div>
  );
}function Services() {
  const { t, lang } = useLang();
  const { data, loading } = useDbContent();

  const servicesMap = data?.siteContentMap?.services || {};

  const pageTitle = servicesMap.title || t.services.title;
  const pageSubtitle = servicesMap.subtitle || t.services.subtitle;

  const perfImagesFallback = ["/images/gallery-1.jpg", "/images/gallery-2.jpg", "/images/gallery-4.jpg", "/images/gallery-5.jpg", "/images/gallery-6.jpg"];
  const workImagesFallback = ["/images/gallery-4.jpg", "/images/gallery-1.jpg", "/images/gallery-3.jpg", "/images/gallery-6.jpg", "/images/gallery-5.jpg"];
  const perfImages = data?.servicesImagesByCategory?.performance?.length ? data.servicesImagesByCategory.performance : perfImagesFallback;
  const workImages = data?.servicesImagesByCategory?.workshop?.length ? data.servicesImagesByCategory.workshop : workImagesFallback;

  const sections = [
    {
      id: "performance",
      title: servicesMap.perf_title || t.services.performance.title,
      desc: servicesMap.perf_desc || t.services.performance.desc,
      buttonText: servicesMap.perf_btn || t.services.performance.buttonText,
      images: perfImages,
    },

    {
      id: "workshops",
      title: servicesMap.work_title || t.services.workshops.title,
      desc: servicesMap.work_desc || t.services.workshops.desc,
      buttonText: servicesMap.work_btn || t.services.workshops.buttonText,
      images: workImages,
    }
  ];



  return (
    <Layout>
      <section className="container mx-auto px-6 pt-10 pb-16 min-h-screen">


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
                  {section.title}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {section.desc}
                </p>
              </div>

              {/* Photos Sequence + Dots Wrapper */}
              <PhotoCarousel images={section.images} title={section.title} />

              {/* Book Demo Button */}
              <div className="flex justify-center mt-0">
                <a
                  href="https://wa.me/919741508468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-2 px-6 py-3 bg-gold text-background rounded-full font-bold uppercase tracking-widest text-xs shadow-glow hover:scale-105 transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Star className="w-4 h-4" />
                    {section.buttonText}
                  </span>
                  <div className="absolute inset-0 bg-foreground/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          ))}

        </div>
      </section>
    </Layout>
  );
}

