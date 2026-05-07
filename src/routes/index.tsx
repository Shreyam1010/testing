import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Music, Drama } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { ClassCard } from "@/components/ClassCard";
import { classes, workshops, blogs } from "@/lib/data";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

import heroImg from "@/assets/hero-yakshagana.jpg";
import mandala from "@/assets/mandala.png";
import aboutImg from "@/assets/about-performer.jpg";
import logoImg from "@/assets/logo-transparent.png";
import sticker0 from "@/assets/stickers/sticker_0.png";
import sticker1 from "@/assets/stickers/sticker_1.png";
import sticker2 from "@/assets/stickers/sticker_2.png";
import sticker3 from "@/assets/stickers/sticker_3.png";
import sticker4 from "@/assets/stickers/sticker_4.png";

const imgMap: Record<string, string> = { g1, g2, g3, g4, g5, g6 };

export const Route = createFileRoute("/")({ component: Index });

import { useDbContent } from "@/hooks/useDb";

function OurStorySection({ aboutData, aboutImg, sticker0, mandala, bodyParagraphs, lang, t, imgMap }: any) {
  return (
    <section className="relative w-full flex flex-col items-center justify-start pt-10 pb-20 px-4 md:px-8 overflow-hidden">
      {/* Full background */}
      <div className="absolute inset-0 z-0">
        <img
          src={aboutData.image || aboutImg}
          alt="Yakshagana Performer"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-black/60 to-background" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 z-20"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-[3.5rem] text-[#ffdf73] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-wide">
            {lang === 'en' ? "Tales of tradition" : "ಸಂಪ್ರದಾಯದ ಕಥೆಗಳು"}
          </h2>
        </motion.div>
        
        {/* Top Mask Sticker */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="z-20 -mb-12 md:-mb-16 relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
        >
          <img src={sticker0} alt="Yakshagana Mask" className="w-full h-full object-contain filter brightness-110 contrast-125" />
        </motion.div>

        {/* Scroll Container */}
        <div className="relative w-full max-w-[95%] sm:max-w-md md:max-w-2xl mx-auto">
          {/* Scroll Top Roller */}
          <div className="absolute -top-3 inset-x-0 h-6 bg-gradient-to-b from-[#e6d5b3] via-[#d4c39f] to-[#bda97e] rounded-full shadow-lg border border-[#a69265] z-10" />
          <div className="absolute -top-4 -left-2 w-4 h-8 bg-gradient-to-b from-[#8c7340] to-[#594723] rounded-full shadow-lg z-20 border border-[#bda97e]/30" />
          <div className="absolute -top-4 -right-2 w-4 h-8 bg-gradient-to-b from-[#8c7340] to-[#594723] rounded-full shadow-lg z-20 border border-[#bda97e]/30" />

          {/* Scroll Paper */}
          <div className="bg-gradient-to-b from-[#fdf6e3] via-[#faeed1] to-[#e8d5a5] px-6 py-16 sm:py-20 md:px-16 md:py-24 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative border-x-2 border-[#c2aa78] overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'0.4\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')" }} />
            
            <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-15 w-16 h-32 md:w-24 md:h-48 bg-contain bg-no-repeat bg-left" style={{ backgroundImage: `url(${mandala})` }} />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-15 w-16 h-32 md:w-24 md:h-48 bg-contain bg-no-repeat bg-right scale-x-[-1]" style={{ backgroundImage: `url(${mandala})` }} />
            
            <p className="text-[#3a2e18] text-center text-xs sm:text-sm md:text-xl leading-relaxed font-medium relative z-10 px-2 md:px-4"
              dangerouslySetInnerHTML={{
                __html: (bodyParagraphs[0] || "").replace(
                  /Kathe Gaararu|ಕಥೆಗಾರರು/gi,
                  '<strong class="font-bold text-[#2a2110]">$&</strong>'
                ),
              }}
            />
          </div>

          {/* Scroll Bottom Roller */}
          <div className="absolute -bottom-3 inset-x-0 h-6 bg-gradient-to-b from-[#bda97e] via-[#d4c39f] to-[#e6d5b3] rounded-full shadow-lg border border-[#a69265] z-10" />
          <div className="absolute -bottom-4 -left-2 w-4 h-8 bg-gradient-to-b from-[#8c7340] to-[#594723] rounded-full shadow-lg z-20 border border-[#bda97e]/30" />
          <div className="absolute -bottom-4 -right-2 w-4 h-8 bg-gradient-to-b from-[#8c7340] to-[#594723] rounded-full shadow-lg z-20 border border-[#bda97e]/30" />
        </div>

        {/* Curved Timeline */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative w-full max-w-4xl mt-12 sm:mt-16 mb-8 h-24 sm:h-32 md:h-40"
        >
          {/* SVG Curve */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M 0 50 Q 25 120 50 50 T 100 50" fill="none" stroke="url(#goldGradient)" strokeWidth="0.8" className="drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.1" />
                <stop offset="15%" stopColor="#ffdf73" stopOpacity="1" />
                <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
                <stop offset="85%" stopColor="#ffdf73" stopOpacity="1" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Timeline Nodes */}
          <div className="absolute top-[50%] left-[10%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full border-[2px] sm:border-[3px] border-gold/60 p-1 bg-black/60 backdrop-blur-md hover:scale-110 transition-transform cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <img src={imgMap.g1} className="w-full h-full rounded-full object-cover filter sepia opacity-80" />
          </div>
          <div className="absolute top-[85%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border-[2px] sm:border-[3px] border-gold p-1 bg-black/80 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-110 transition-transform cursor-pointer">
            <img src={imgMap.g2} className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full border-[3px] sm:border-[4px] border-[#ffdf73] p-1 bg-black/90 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.8)] z-10 transform hover:scale-110 transition-transform cursor-pointer">
            <img src={imgMap.g4} className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="absolute top-[85%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border-[2px] sm:border-[3px] border-gold p-1 bg-black/80 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-110 transition-transform cursor-pointer">
            <img src={imgMap.g6} className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="absolute top-[50%] left-[90%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full border-[2px] sm:border-[3px] border-gold/60 p-1 bg-black/60 backdrop-blur-md hover:scale-110 transition-transform cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <img src={imgMap.g5} className="w-full h-full rounded-full object-cover filter sepia opacity-80" />
          </div>
        </motion.div>

        {/* Bottom Glass Card */}
        {bodyParagraphs.length > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full max-w-[90%] sm:max-w-md md:max-w-3xl mt-4 md:mt-12 p-5 sm:p-6 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-white/5 opacity-50" />
            <p className="text-white/95 text-center text-[10px] sm:text-xs md:text-xl leading-relaxed relative z-10 font-medium"
               dangerouslySetInnerHTML={{ __html: bodyParagraphs.slice(1).join('<br/><br/>') }}
            />
          </motion.div>
        )}

      </div>
    </section>
  );
}

function Index() {
  const { t, lang } = useLang();
  const { data, loading } = useDbContent();
  const icons = [Drama, Sparkles, Music];
  const highlightOrder = [2, 0, 1]; // 2: Performances, 0: Classes, 1: Workshops

  const heroData = data?.siteContent?.hero || t.hero;
  const aboutData = data?.siteContent?.about || t.about.homeSection;
  const dbWorkshops = data?.workshops || [];
  const dbBlogs = data?.blogs || [];
  const bodyParagraphs = aboutData.body || t.about.homeSection.body;

  const galleryItems = [
    { src: imgMap.g1, label: "The Mask" },
    { src: imgMap.g2, label: "Stage Performance" },
    { src: imgMap.g4, label: "Crown Heritage" },
    { src: imgMap.g6, label: "The Warrior" },
    { src: imgMap.g5, label: "Chande Master" },
    { src: imgMap.g3, label: "Workshop" },
  ];

  return (
    <Layout>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* HERO */}
          <section className="relative min-h-screen flex items-center overflow-hidden pb-24 md:pb-16">
            <div className="absolute inset-0 bg-hero" />
            <img
              src={mandala}
              alt=""
              aria-hidden
              className="absolute -right-40 -top-40 w-[700px] opacity-10 animate-spin-slow pointer-events-none"
            />
            <img
              src={mandala}
              alt=""
              aria-hidden
              className="absolute -left-60 -bottom-60 w-[600px] opacity-5 animate-spin-slow pointer-events-none"
              style={{ animationDirection: "reverse" }}
            />

            <div className="container mx-auto px-6 relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-12 items-center pt-10 lg:pt-0 min-h-screen lg:min-h-0">
              {/* Image - First on mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative order-1 lg:order-2 w-full max-w-[180px] sm:max-w-[240px] lg:max-w-none mx-auto mb-1 lg:mb-0 lg:-mt-4"
              >
                <div className="absolute inset-0 bg-ember rounded-full blur-3xl opacity-40 animate-float-subtle lg:animate-float-slow" />
                <motion.div className="relative aspect-square lg:aspect-auto overflow-hidden rounded-full lg:rounded-2xl border border-gold/20 shadow-glow animate-float-subtle lg:animate-float-slow">
                  <img
                    src={heroData.image || heroImg}
                    alt="Yakshagana performer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Text & Logo - Second on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center lg:text-left order-2 lg:order-1"
              >
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  src={logoImg} 
                  alt="Kathe Gaararu Logo" 
                  className="h-28 sm:h-24 md:h-48 lg:h-56 w-auto object-contain mx-auto lg:ml-0 mb-2 lg:mb-8 drop-shadow-2xl"
                />
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/5 text-[8.5px] whitespace-nowrap uppercase tracking-[0.1em] text-primary mb-2 lg:mb-8"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  {heroData.tag}
                </motion.div>

                <h1 className="font-display text-[24px] sm:text-4xl md:text-6xl lg:text-7xl leading-tight mb-2 lg:mb-6">
                  {heroData.title}
                  <br />
                  <span className="text-gradient-gold glow-text">{heroData.titleAccent}</span>
                </h1>

                <p className="text-[11px] sm:text-lg text-muted-foreground max-w-xl mx-auto lg:ml-0 leading-relaxed mb-4 lg:mb-10">
                  {heroData.subtitle}
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link
                    to="/gallery"
                    hash="performances"
                    className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gold text-background font-medium shadow-glow hover:scale-105 transition-transform text-sm sm:text-base"
                  >
                    {heroData.ctaPrimary}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/services"
                    hash="classes"
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-border hover:border-gold text-foreground transition-colors text-sm sm:text-base"
                  >
                    {heroData.ctaSecondary}
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
          </section>

          {/* OUR STORY */}
          <OurStorySection 
            aboutData={aboutData} 
            aboutImg={aboutImg} 
            sticker0={sticker0} 
            mandala={mandala} 
            bodyParagraphs={bodyParagraphs} 
            lang={lang} 
            t={t} 
            imgMap={imgMap} 
          />

          {/* HIGHLIGHTS */}
          <section className="container mx-auto px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <div className="ornament-divider w-24 mx-auto mb-6" />
              <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-4 flex items-center justify-center gap-4">
                <img src={sticker1} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                {t.highlights.title}
              </h2>
              <p className="text-muted-foreground">{t.highlights.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {highlightOrder.map((idx, i) => {
                const item = t.highlights.items[idx];
                const Icon = icons[idx];
                return (
                  <Link
                    key={i}
                    to="/services"
                    hash={idx === 2 ? "performance" : idx === 0 ? "classes" : "workshops"}
                    className="block"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      whileHover={{ y: -8 }}
                      className="group relative p-8 rounded-2xl bg-card/50 border border-border hover:border-gold/50 transition-all overflow-hidden cursor-pointer h-full"
                    >
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition" />
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mb-6 shadow-glow">
                          <Icon className="w-6 h-6 text-background" />
                        </div>
                        <h3 className="text-2xl font-display mb-3 text-primary">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* EXPANDED DETAILS */}
          <section className="container mx-auto px-6 py-12 flex flex-col gap-32">
            {/* PERFORMANCES */}
            <div id="performances-details" className="scroll-mt-32">
              <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-12 text-center text-primary flex items-center justify-center gap-4">
                <img src={sticker2} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                {t.highlights.items[2].title}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 grid-flow-dense">
                {galleryItems.map((it, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                    className={`group relative overflow-hidden rounded-2xl border border-border hover:border-gold/50 transition ${i === 0 || i === 4
                        ? "md:row-span-2 aspect-[3/4] md:aspect-auto"
                        : "aspect-square"
                      }`}
                  >
                    <img
                      src={it.src}
                      alt={it.label}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    <div className="absolute bottom-0 inset-x-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition">
                      <div className="font-display text-lg text-primary">{it.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CLASSES */}
            <div id="classes-details" className="scroll-mt-32">
              <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-12 text-center text-primary flex items-center justify-center gap-4">
                <img src={sticker3} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                {t.highlights.items[0].title}
              </h2>
              <div className="grid grid-cols-2 gap-3 md:gap-8 mb-12">
                <Link to="/classes" className="group relative rounded-2xl md:rounded-3xl overflow-hidden border border-border bg-card/40 p-4 sm:p-8 md:p-12 hover:border-gold/50 transition-all flex flex-col justify-end min-h-[250px] sm:min-h-[350px] md:min-h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10" />
                  <img src={imgMap.g4} alt="Singing Gurukul" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="relative z-20">
                    <h3 className="text-xl sm:text-3xl md:text-5xl font-display text-primary mb-2 md:mb-4">{lang === "en" ? "Singing" : "ಗಾಯನ"}</h3>
                    <p className="text-muted-foreground text-[10px] sm:text-sm md:text-lg mb-4 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">{lang === "en" ? "Master the authentic narrative singing tradition (Bhagavatike) that anchors every Yakshagana performance." : "ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನದ ಆಧಾರಸ್ತಂಭವಾದ ಕಥನ ಗಾಯನ (ಭಾಗವತಿಕೆ) ಪರಂಪರೆಯನ್ನು ಕಲಿಯಿರಿ."}</p>
                    <span className="inline-flex items-center gap-1 md:gap-2 text-gold font-bold uppercase tracking-widest text-[8px] sm:text-[10px] md:text-sm bg-black/40 px-3 py-2 md:px-6 md:py-3 rounded-full backdrop-blur-sm border border-white/10 group-hover:bg-gold group-hover:text-background transition-colors">
                      {lang === "en" ? "Learn More" : "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ"} <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
                <Link to="/classes" className="group relative rounded-2xl md:rounded-3xl overflow-hidden border border-border bg-card/40 p-4 sm:p-8 md:p-12 hover:border-gold/50 transition-all flex flex-col justify-end min-h-[250px] sm:min-h-[350px] md:min-h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10" />
                  <img src={imgMap.g1} alt="Dancing Gurukul" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="relative z-20">
                    <h3 className="text-xl sm:text-3xl md:text-5xl font-display text-primary mb-2 md:mb-4">{lang === "en" ? "Dancing" : "ನೃತ್ಯ"}</h3>
                    <p className="text-muted-foreground text-[10px] sm:text-sm md:text-lg mb-4 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">{lang === "en" ? "Immerse yourself in the vigorous footwork, intricate expressions, and graceful choreography of Yakshagana." : "ಯಕ್ಷಗಾನದ ಶಕ್ತಿಯುತ ಪಾದಭಂಗಿ, ಸಂಕೀರ್ಣ ಭಾವಾಭಿನಯ ಮತ್ತು ಸುಂದರ ನೃತ್ಯ ಸಂಯೋಜನೆಯಲ್ಲಿ ಮುಳುಗಿರಿ."}</p>
                    <span className="inline-flex items-center gap-1 md:gap-2 text-gold font-bold uppercase tracking-widest text-[8px] sm:text-[10px] md:text-sm bg-black/40 px-3 py-2 md:px-6 md:py-3 rounded-full backdrop-blur-sm border border-white/10 group-hover:bg-gold group-hover:text-background transition-colors">
                      {lang === "en" ? "Learn More" : "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ"} <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex justify-center">
                <Link
                  to="/classes"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold/10 border border-gold/30 text-primary hover:bg-gold hover:text-background transition-all font-display text-lg"
                >
                  {lang === "en" ? "Explore All Gurukul" : "ಗುರುಕುಲವನ್ನು ಅನ್ವೇಷಿಸಿ"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* WORKSHOPS */}
            <div id="workshops-details" className="scroll-mt-32">
              <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-12 text-center text-primary flex items-center justify-center gap-4">
                <img src={sticker4} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                {t.highlights.items[1].title}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {dbWorkshops.map((w: any) => {
                  const displayImage = w.image.startsWith('g') ? imgMap[w.image] : w.image;
                  return (
                    <Link
                      key={w.id}
                      to="/gallery"
                      className="group relative bg-card/60 border border-border rounded-2xl overflow-hidden transition-all hover:border-gold/50 flex flex-col"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={displayImage}
                          alt={w.title[lang]}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      </div>
                      <div className="p-4 md:p-6 flex flex-col justify-between flex-1">
                        <h3 className="font-display text-[15px] sm:text-lg md:text-xl text-primary mb-1 md:mb-2 leading-tight break-words hyphens-auto">{w.title[lang]}</h3>
                        <p className="text-[10px] sm:text-xs md:text-sm text-gold/80 font-medium mt-auto">{w.timestamp[lang]}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* BLOG PREVIEW */}
            <div id="blog-preview" className="scroll-mt-32">
              <div className="relative flex items-center justify-center mb-12">
                <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display text-center text-primary flex items-center justify-center gap-4">
                  <img src={sticker0} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  {lang === "en" ? "Latest Insights" : "ಇತ್ತೀಚಿನ ಒಳನೋಟಗಳು"}
                </h2>
                <Link
                  to="/blog"
                  className="hidden md:flex absolute right-0 items-center gap-2 text-gold hover:text-primary transition-colors text-sm font-medium uppercase tracking-widest"
                >
                  {lang === "en" ? "View All" : "ಎಲ್ಲವನ್ನೂ ನೋಡಿ"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {dbBlogs.slice(0, 4).map((post: any, index: number) => {
                  const displayImage = post.image.startsWith('g') ? imgMap[post.image] : post.image;
                  return (
                    <Link
                      key={post.id}
                      to="/blog"
                      className="group relative bg-card/40 border border-border rounded-xl md:rounded-2xl overflow-hidden hover:border-gold/50 transition-all flex flex-col"
                    >
                      <div className="relative h-24 sm:h-32 md:h-48 overflow-hidden">
                        <img
                          src={displayImage}
                          alt={post.title[lang]}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        <div className="absolute top-2 left-2 md:top-4 md:left-4">
                          <span className="px-2 py-0.5 md:px-3 md:py-1 bg-black/40 backdrop-blur-md border border-white/10 text-[7px] md:text-[9px] font-bold text-white uppercase tracking-wider rounded-full">
                            {post.category[lang]}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 md:p-6 flex flex-col flex-1">
                        <h3 className="font-display text-xs sm:text-sm md:text-lg text-primary mb-1 md:mb-3 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
                          {post.title[lang]}
                        </h3>
                        <p className="hidden md:-webkit-box text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                          {post.excerpt[lang]}
                        </p>
                        <div className="flex items-center text-gold text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-auto pt-1 md:pt-0">
                          {lang === "en" ? "Read Article" : "ಲೇಖನ ಓದಿ"}
                          <ArrowRight className="w-2 h-2 md:w-3 md:h-3 ml-1 md:ml-2 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <Link
                to="/blog"
                className="md:hidden mt-8 flex items-center justify-center gap-2 text-gold text-sm font-medium uppercase tracking-widest"
              >
                {lang === "en" ? "View All Posts" : "ಎಲ್ಲಾ ಲೇಖನಗಳನ್ನು ನೋಡಿ"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* UPCOMING EVENTS */}
          <UpcomingEvents />
        </>
      )}
    </Layout>
  );
}