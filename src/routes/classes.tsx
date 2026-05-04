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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teachers.map((teacher, i) => (
                    <TeacherCard key={teacher.id} teacher={teacher} index={i} />
                  ))}
                </div>
              </motion.section>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

const teacherImages: Record<string, string> = {
  raghavendra: g2,
  shankara: g3,
  lakshmi: g1,
};

function TeacherCard({ teacher, index }: { teacher: Teacher; index: number }) {
  const [showModal, setShowModal] = useState(false);
  const { lang } = useLang();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        onClick={() => setShowModal(true)}
        className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-border/50"
      >
        <img
          src={teacherImages[teacher.id]}
          alt={teacher.name[lang]}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="absolute bottom-0 inset-x-0 p-8">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1 block">
            {teacher.expertise[lang].split("•")[0]}
          </span>
          <h3 className="font-display text-2xl text-primary group-hover:text-gold transition-colors">
            {teacher.name[lang]}
          </h3>
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
              className="relative w-full max-w-5xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-background/50 hover:bg-gold hover:text-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-2/5 aspect-[3/4] md:aspect-auto">
                <img
                  src={teacherImages[teacher.id]}
                  alt={teacher.name[lang]}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-3/5 p-8 md:p-14 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
                  {teacher.expertise[lang]}
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-8 leading-tight">
                  {teacher.name[lang]}
                </h2>
                <div className="h-1 w-20 bg-gold mb-8 rounded-full" />
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
                  "{teacher.bio[lang]}"
                </p>
                
                <div className="mt-12 flex gap-4">
                  <div className="px-6 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest">
                    {lang === 'en' ? 'Expert Guru' : 'ನುರಿತ ಗುರುಗಳು'}
                  </div>
                  <div className="px-6 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest">
                    {lang === 'en' ? '20+ Years Exp' : '೨೦+ ವರ್ಷಗಳ ಅನುಭವ'}
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
