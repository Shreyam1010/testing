import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import { ClassesSchedule } from "@/components/ClassesSchedule";
import { teachers, Teacher } from "@/lib/data";
import { useState, useRef } from "react";
import { X } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import classHero from "@/assets/testing1.png.jpeg";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Yakshagana Gurukul & Workshops — Kathe Gaararu" },
      {
        name: "description",
        content:
          "Authentic Yakshagana training in dance, music, vocals, and costume from veteran gurus.",
      },
      { property: "og:title", content: "Gurukul & Workshops" },
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
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);
  const blur = useTransform(scrollYProgress, [0, 0.4], ["0px", "8px"]);

  return (
    <Layout>
      <div ref={containerRef} className="relative min-h-screen">
        {/* Sticky Hero Image Background */}
        <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
          <motion.div 
            style={{ opacity, scale, filter: `blur(${blur})` }}
            className="relative w-full h-full"
          >
            <img 
              src={classHero} 
              alt="Classes Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </div>

        {/* Scrolling Content */}
        <div className="relative z-10">
          {/* Spacer to allow hero image visibility */}
          <div className="h-[65vh]" />

          <section className="relative bg-background/95 backdrop-blur-[32px] pt-24 pb-32 shadow-[0_-50px_150px_rgba(0,0,0,1)]">
            {/* Superior Blend Gradient */}
            <div className="absolute inset-x-0 top-0 h-64 -translate-y-full bg-gradient-to-t from-background/95 via-background/60 to-transparent pointer-events-none" />
            
            <div className="container mx-auto px-6">
              {/* Integrated Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center mb-20"
              >
                <h1 className="text-4xl md:text-5xl font-display text-primary tracking-[0.25em] uppercase leading-none mb-6">
                  {lang === "en" ? "Gurukul" : "ಗುರುಕುಲ"}
                </h1>
                <div className="h-0.5 w-16 md:w-24 bg-gold/50 mx-auto rounded-full shadow-glow" />
              </motion.div>

              {/* Classes Schedule Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-48"
              >
                <ClassesSchedule />
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
                  <h2 className="text-4xl md:text-5xl font-display mb-4 text-primary">
                    {lang === "en" ? "Our Gurus" : "ನಮ್ಮ ಗುರುಗಳು"}
                  </h2>
                  <p className="text-muted-foreground">
                    {lang === "en" ? "Masters of the craft with decades of stage experience." : "ದಶಕಗಳ ರಂಗಾನುಭವ ಹೊಂದಿರುವ ಕಲೆಯ ಧೀಮಂತರು."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {teachers.map((teacher, i) => (
                    <TeacherCard key={teacher.id} teacher={teacher} index={i} onClick={() => setSelectedTeacher(teacher)} />
                  ))}
                </div>
              </motion.section>
            </div>
          </section>
        </div>
      </div>

      {/* Lifted Modal to avoid transform clipping */}
      <AnimatePresence>
        {selectedTeacher && (
          <TeacherModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />
        )}
      </AnimatePresence>
    </Layout>
  );
}

const teacherImages: Record<string, string> = {
  raghavendra: g2,
  shankara: g3,
  lakshmi: g1,
};

function TeacherCard({ teacher, index, onClick }: { teacher: Teacher; index: number; onClick: () => void }) {
  const { lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group relative aspect-[4/5] w-full max-w-[280px] mx-auto rounded-[32px] overflow-hidden cursor-pointer border border-white/5 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500"
    >
      <img
        src={teacherImages[teacher.id]}
        alt={teacher.name[lang]}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
      
      <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col justify-end">
        <h3 className="font-sans text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
          {teacher.name[lang]}
        </h3>
      </div>
    </motion.div>
  );
}

function TeacherModal({ teacher, onClose }: { teacher: Teacher; onClose: () => void }) {
  const { lang } = useLang();
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full h-64 sm:h-72 shrink-0">
          <img
            src={teacherImages[teacher.id]}
            alt={teacher.name[lang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          
          <div className="absolute bottom-0 inset-x-0 px-8 pb-4">
            <h2 className="font-sans text-4xl font-bold text-white mb-2 leading-tight tracking-tight">
              {teacher.name[lang]}
            </h2>
            <span className="text-sm font-medium text-gold/90 uppercase tracking-widest">
              {teacher.expertise[lang]}
            </span>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-8 pt-5 overflow-y-auto">
          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 font-sans">
            {teacher.bio[lang]}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/50 text-xs font-medium uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              {lang === 'en' ? 'Master Class Guru' : 'ಮಾಸ್ಟರ್ ಕ್ಲಾಸ್ ಗುರು'}
            </div>
            <Link 
              to="/" 
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-2xl transition-colors border border-white/5 backdrop-blur-sm"
              onClick={onClose}
            >
              {lang === 'en' ? 'Join Classes' : 'ತರಗತಿಗಳಿಗೆ ಸೇರಿ'}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
