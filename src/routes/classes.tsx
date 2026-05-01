import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import { ClassesSchedule } from "@/components/ClassesSchedule";

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
  const { t, lang } = useLang();
  return (
    <Layout>
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-display mb-4">
            {lang === "en" ? "Classes" : "ತರಗತಿಗಳು"}
          </h1>
          <p className="text-muted-foreground mb-12">{t.classes.subtitle}</p>

          <div className="text-center bg-gold/5 border border-gold/10 p-10 md:p-14 rounded-3xl mb-16 shadow-2xl">
            <p className="text-xl leading-relaxed text-foreground/80 mb-10 max-w-4xl mx-auto">
              {lang === "en"
                ? "Step into the sacred circle of learning where tradition meets discipline. Our classes are designed to provide a comprehensive understanding of Yakshagana, from the foundational rhythms to the complex expressions of the epics. Beyond the physical movements, we delve into the literary and musical heritage, ensuring each student becomes a custodian of the art's soul. Join us in this journey of rhythm, expression, and divinity."
                : "ಪರಂಪರೆ ಮತ್ತು ಶಿಸ್ತು ಸಂಗಮಿಸುವ ಈ ಕಲಿಕಾ ವಲಯಕ್ಕೆ ಹೆಜ್ಜೆ ಇಡಿ. ಯಕ್ಷಗಾನದ ಮೂಲ ಲಯಗಳಿಂದ ಹಿಡಿದು ಪುರಾಣಗಳ ಸಂಕೀರ್ಣ ಅಭಿವ್ಯಕ್ತಿಗಳವರೆಗೆ ಸಮಗ್ರ ತಿಳುವಳಿಕೆಯನ್ನು ನೀಡಲು ನಮ್ಮ ತರಗತಿಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ದೈಹಿಕ ಚಲನೆಗಳ ಹೊರತಾಗಿ, ನಾವು ಸಾಹಿತ್ಯ ಮತ್ತು ಸಂಗೀತದ ಪರಂಪರೆಯನ್ನು ಆಳವಾಗಿ ಅಧ್ಯಯನ ಮಾಡುತ್ತೇವೆ, ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿಯು ಈ ಕಲೆಯ ಆತ್ಮದ ಸಂರಕ್ಷಕನಾಗುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳುತ್ತೇವೆ. ಲಯ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ದೈವಿಕತೆಯ ಈ ಪ್ರಯಾಣದಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ."}
            </p>
            <ul className="grid md:grid-cols-2 gap-x-10 gap-y-6 max-w-4xl mx-auto">
              {[
                lang === "en"
                  ? "Authentic Gurukula style training"
                  : "ಅಪ್ಪಟ ಗುರುಕುಲ ಶೈಲಿಯ ತರಬೇತಿ",
                lang === "en"
                  ? "Focus on both theory and practice"
                  : "ಸೈದ್ಧಾಂತಿಕ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಕಲಿಕೆಗೆ ಒತ್ತು",
                lang === "en"
                  ? "Personalized attention from veteran gurus"
                  : "ಅನುಭವಿ ಗುರುಗಳಿಂದ ವೈಯಕ್ತಿಕ ಗಮನ",
                lang === "en"
                  ? "Opportunities for stage performances"
                  : "ರಂಗ ಪ್ರದರ್ಶನಗಳಿಗೆ ಅವಕಾಶಗಳು",
                lang === "en"
                  ? "Comprehensive curriculum for all levels"
                  : "ಎಲ್ಲಾ ಹಂತದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಮಗ್ರ ಪಠ್ಯಕ್ರಮ",
                lang === "en"
                  ? "In-depth study of Bhagavata literature and music"
                  : "ಭಾಗವತ ಸಾಹಿತ್ಯ ಮತ್ತು ಸಂಗೀತದ ಆಳವಾದ ಅಧ್ಯಯನ",
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-4 text-foreground/70 text-lg">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">
                    ಯ
                  </span>
                  <span className="text-left">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <ClassesSchedule />

        {/* TEACHERS / GURUS SECTION */}
        <section className="mt-40">
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
        </section>
      </section>
    </Layout>
  );
}

import { teachers, Teacher } from "@/lib/data";
import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

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
