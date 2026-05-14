import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import { ClassesSchedule } from "@/components/ClassesSchedule";
import { useState, useRef } from "react";
import { X } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import classHero from "@/assets/testing1.png.jpeg";

import { useDbContent } from "@/hooks/useDb";
import mustache from "@/assets/stickers/mus.png";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Yakshagana Classes & Workshops — Kathe Gaararu" },
      {
        name: "description",
        content:
          "Authentic Yakshagana training in dance, music, vocals, and costume from veteran gurus.",
      },
      { property: "og:title", content: "Classes & Workshops" },
      {
        property: "og:description",
        content: "Train under master gurus across vocals, drums, dance, and more.",
      },
    ],
  }),
  component: Classes,
});

function Classes() {
  const { lang } = useLang();
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);
  const { data, loading } = useDbContent();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);
  const blur = useTransform(scrollYProgress, [0, 0.4], ["0px", "8px"]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);

  const dbTeachers = data?.teachers || [];
  const classesMap: any = data?.siteContentMap?.classes || {};
  const classesData = classesMap;
  const introFallbackEn = "Step into the sacred circle of learning where tradition meets discipline. Our classes are designed to provide a comprehensive understanding of Yakshagana, from the foundational rhythms to the complex expressions of the epics. Beyond the physical movements, we delve into the literary and musical heritage, ensuring each student becomes a custodian of the art's soul. Join us in this journey of rhythm, expression, and divinity.";
  const introFallbackKn = "ಪರಂಪರೆ ಮತ್ತು ಶಿಸ್ತು ಸಂಗಮಿಸುವ ಈ ಪವಿತ್ರ ಕಲಿಕಾ ವಲಯಕ್ಕೆ ಹೆಜ್ಜೆ ಇಡಿ. ಯಕ್ಷಗಾನದ ಮೂಲ ಲಯಗಳಿಂದ ಹಿಡಿದು ಪುರಾಣಗಳ ಸಂಕೀರ್ಣ ಅಭಿವ್ಯಕ್ತಿಗಳವರೆಗೆ ಸಮಗ್ರ ತಿಳುವಳಿಕೆಯನ್ನು ನೀಡಲು ನಮ್ಮ ತರಗತಿಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ದೈಹಿಕ ಚಲನೆಗಳ ಹೊರತಾಗಿ, ನಾವು ಸಾಹಿತ್ಯ ಮತ್ತು ಸಂಗೀತದ ಪರಂಪರೆಯನ್ನು ಆಳವಾಗಿ ಅಧ್ಯಯನ ಮಾಡುತ್ತೇವೆ, ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿಯು ಈ ಕಲೆಯ ಆತ್ಮದ ಸಂರಕ್ಷಕನಾಗುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳುತ್ತೇವೆ. ಲಯ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ದೈವಿಕತೆಯ ಈ ಪ್ರಯಾಣದಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ.";
  const classesIntro = classesMap.intro || (lang === "en" ? introFallbackEn : introFallbackKn);

  const fallbackFeatures = [
    { en: "Authentic Gurukula style training",                 kn: "ಅಪ್ಪಟ ಗುರುಕುಲ ಶೈಲಿಯ ತರಬೇತಿ" },
    { en: "Focus on both theory and practice",                 kn: "ಸೈದ್ಧಾಂತಿಕ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಕಲಿಕೆಗೆ ಒತ್ತು" },
    { en: "Personalized attention from veteran gurus",          kn: "ಅನುಭವಿ ಗುರುಗಳಿಂದ ವೈಯಕ್ತಿಕ ಗಮನ" },
    { en: "Opportunities for performances",                     kn: "ರಂಗ ಪ್ರದರ್ಶನಗಳಿಗೆ ಅವಕಾಶಗಳು" },
    { en: "Comprehensive curriculum for all levels",            kn: "ಎಲ್ಲಾ ಹಂತದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಮಗ್ರ ಪಠ್ಯಕ್ರಮ" },
    { en: "In-depth study of Bhagavata literature and music",   kn: "ಭಾಗವತ ಸಾಹಿತ್ಯ ಮತ್ತು ಸಂಗೀತದ ಆಳವಾದ ಅಧ್ಯಯನ" },
  ];
  const dbClassFeatures = data?.classFeatures?.length ? data.classFeatures : null;
  const featureList = dbClassFeatures
    ? dbClassFeatures.map((f: any) => ({
        en: f.title?.en || "",
        kn: f.title?.kn || "",
        icon: mustache,
      }))
    : fallbackFeatures.map((f) => ({ ...f, icon: mustache }));

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);

  return (
    <Layout>
      <div ref={containerRef} className="relative min-h-screen">
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
        {/* Scrolling Content */}
        <div className="relative z-10">

          <section className="relative pt-10 md:pt-20 pb-32">
            <div className="container mx-auto px-6">
              {/* Integrated Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center mb-8 md:mb-24"
              >
                <h1 className="text-4xl md:text-6xl font-display text-primary uppercase leading-none mb-6">
                  {classesData.title || (lang === "en" ? "Classes" : "ಗುರುಕುಲ")}
                </h1>
                <div className="h-0.5 w-16 md:w-24 bg-gold/50 mx-auto rounded-full shadow-glow mb-6 md:mb-12" />
                
                <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10 bg-card/60 border border-gold/20 rounded-[2.5rem] p-6 md:p-14 shadow-2xl backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-crimson/5 opacity-50" />
                  
                  <div className="relative z-10">
                    <p className={`text-sm md:text-xl text-primary/90 leading-relaxed font-medium transition-all duration-500 ${isIntroExpanded ? "" : "line-clamp-3 md:line-clamp-none"}`}>
                      {classesIntro}
                    </p>
                    
                    {/* Expand/Collapse Button (Mobile Only) */}
                    <div className="md:hidden mt-4">
                      <button 
                        onClick={() => setIsIntroExpanded(!isIntroExpanded)}
                        className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
                      >
                        {isIntroExpanded 
                          ? (lang === "en" ? "Read Less" : "ಕಡಿಮೆ ಓದಿ") 
                          : (lang === "en" ? "Read More" : "ಹೆಚ್ಚು ಓದಿ")}
                        <span className={`transform transition-transform duration-300 ${isIntroExpanded ? "rotate-180" : ""}`}>↓</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6 text-left max-w-3xl mx-auto mt-8 md:mt-10 pt-6 md:pt-0 border-t border-gold/10 md:border-0">
                    {featureList.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center !bg-transparent border-none group-hover/item:scale-110 transition-all duration-300">
                          <img src={mustache} alt="" loading="lazy" decoding="async" className="w-full h-full object-contain !bg-transparent border-none" />
                        </div>
                        <span className="text-sm md:text-base text-foreground/80 group-hover/item:text-primary transition-colors duration-300 leading-tight">
                          {item[lang] || item.en}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Classes Schedule Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-16"
              >
                <ClassesSchedule onFilterToggle={setIsFilterOpen} />
              </motion.div>

              {/* TEACHERS / GURUS SECTION */}
              <motion.section 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="pb-20"
              >
                <div className="text-center mb-16">
                  <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-4 text-primary flex items-center justify-center gap-4">
                    {lang === "en" ? "Our Gurus" : "ನಮ್ಮ ಗುರುಗಳು"}
                  </h2>
                  <p className="text-muted-foreground">
                    {lang === "en" ? "Masters of the craft with decades of stage experience." : "ದಶಕಗಳ ರಂಗಾನುಭವ ಹೊಂದಿರುವ ಕಲೆಯ ಧೀಮಂತರು."}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl mx-auto">
                  {dbTeachers.map((teacher: any, i: number) => (
                    <TeacherCard key={teacher.id} teacher={teacher} index={i} />
                  ))}
                </div>
              </motion.section>
            </div>
          </section>
        </div>
      </>
      )}
      </div>
    </Layout>
  );
}

const teacherImgMap: Record<string, string> = {
  raghavendra: "/images/gallery-2.jpg",
  shankara: "/images/gallery-3.jpg",
  lakshmi: "/images/gallery-1.jpg",
};

function TeacherCard({ teacher, index }: { teacher: any; index: number }) {
  const [showModal, setShowModal] = useState(false);
  const { lang } = useLang();

  // Handle local image assets vs remote R2 URLs
  const displayImage = (teacher.image && teacher.image.startsWith('/')) ? teacherImgMap[teacher.id] || teacher.image : (teacher.image || "");

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        onClick={() => setShowModal(true)}
        className="group relative w-[calc(50%-0.5rem)] md:w-64 lg:w-72 aspect-[3/4] rounded-[32px] overflow-hidden cursor-pointer border border-border shadow-2xl hover:shadow-glow transition-all duration-500"
      >
        <img
          src={displayImage}
          alt={teacher.name?.[lang] || teacher.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-0 inset-x-0 p-6">
          <h3 className="font-display text-xl md:text-2xl text-primary group-hover:text-gold transition-colors leading-tight">
            {teacher.name?.[lang] || teacher.name}
          </h3>
          <p className="text-xs md:text-sm text-gold/80 font-medium uppercase tracking-[0.1em] mt-1">
            {teacher.expertise?.[lang] || teacher.expertise}
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-background/95 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-[90vw] md:w-full max-w-md md:max-w-5xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-gold hover:text-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Mobile Header: Photo + Name */}
              <div className="flex flex-row md:hidden items-center gap-4 border-b border-border/50">
                <div className="w-24 h-32 shrink-0 overflow-hidden">
                  <img
                    src={displayImage}
                    alt={teacher.name?.[lang] || teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="py-4 pr-4">
                  <h2 className="font-display text-lg text-primary leading-tight">
                    {teacher.name?.[lang] || teacher.name}
                  </h2>
                </div>
              </div>

              {/* Desktop Image (hidden on mobile) */}
              <div className="hidden md:block md:w-2/5 aspect-[3/4] md:aspect-auto">
                <img
                  src={displayImage}
                  alt={teacher.name?.[lang] || teacher.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Area */}
              <div className="md:w-3/5 p-5 md:p-14 flex flex-col justify-center">
                {/* Desktop Title (hidden on mobile) */}
                <div className="hidden md:block">
                  <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-2 md:mb-4 block">
                    {teacher.expertise?.[lang] || teacher.expertise}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl text-primary mb-4 md:mb-8 leading-tight">
                    {teacher.name?.[lang] || teacher.name}
                  </h2>
                  <div className="h-1 w-20 bg-gold mb-4 md:mb-8 rounded-full" />
                </div>

                {/* Common Bio with Scroll */}
                <div className="max-h-52 md:max-h-64 overflow-y-auto pr-4 custom-scrollbar">
                  <div className="text-sm md:text-xl text-muted-foreground leading-relaxed italic">
                    <span className="text-gold font-bold not-italic mr-2 md:hidden">{teacher.expertise?.[lang] || teacher.expertise} •</span>
                    "{teacher.bio?.[lang] || teacher.bio}"
                  </div>
                </div>
                
                {/* Common Badges */}
                <div className="mt-4 md:mt-12 flex flex-wrap gap-2 md:gap-4">
                  <div className="px-2 py-1 md:px-6 md:py-3 rounded-full border border-gold/30 text-gold text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    {lang === 'en' ? 'Expert Guru' : 'ನುರಿತ ಗುರುಗಳು'}
                  </div>
                  <div className="px-2 py-1 md:px-6 md:py-3 rounded-full border border-gold/30 text-gold text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    {lang === 'en' ? '20+ Years Exp' : '೨೨+ ವರ್ಷಗಳ ಅನುಭವ'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}