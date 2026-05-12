// import React, { useState } from "react";
// import { createFileRoute, Link } from "@tanstack/react-router";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight, Sparkles, Music, Drama } from "lucide-react";
// import { Layout } from "@/components/Layout";
// import { useLang } from "@/contexts/LanguageContext";
// import { UpcomingEvents } from "@/components/UpcomingEvents";
// import { ClassCard } from "@/components/ClassCard";
// import { classes, workshops, blogs } from "@/lib/data";
// import g1 from "@/assets/gallery-1.jpg";
// import g2 from "@/assets/gallery-2.jpg";
// import g3 from "@/assets/gallery-3.jpg";
// import g4 from "@/assets/gallery-4.jpg";
// import g5 from "@/assets/gallery-5.jpg";
// import g6 from "@/assets/gallery-6.jpg";

// import heroImg from "@/assets/hero-yakshagana.jpg";
// import mandala from "@/assets/mandala.png";
// import aboutImg from "@/assets/about-performer.jpg";
// import logoImg from "@/assets/logo-transparent.png";
// import sticker0 from "@/assets/stickers/sticker_0.png";
// import sticker1 from "@/assets/stickers/sticker_1.png";
// import sticker2 from "@/assets/stickers/sticker_2.png";
// import sticker3 from "@/assets/stickers/sticker_3.png";
// import sticker4 from "@/assets/stickers/sticker_4.png";

// const imgMap: Record<string, string> = { g1, g2, g3, g4, g5, g6 };

// export const Route = createFileRoute("/")({ component: Index });

// import { useDbContent } from "@/hooks/useDb";
// import { FaqAssistant } from "@/components/FaqAssistant";

// function OurStorySection({ aboutData, aboutImg, sticker1, lang, t }: any) {
//   const [activeTab, setActiveTab] = useState(0);
  
//   const tabs = [
//     { 
//       id: 0, 
//       label: lang === "en" ? "Mission" : "ಧ್ಯೇಯ", 
//       content: aboutData.content1 || (lang === "en" ? "Kathe Gaararu was founded to safeguard and share the radiant heritage of Yakshagana — Karnataka's monumental folk theatre tradition." : "ಯಕ್ಷಗಾನದ ಭವ್ಯ ಪರಂಪರೆಯನ್ನು ರಕ್ಷಿಸಲು ಮತ್ತು ಹಂಚಿಕೊಳ್ಳಲು ಕಥೆಗಾರರು ಸಂಸ್ಥೆಯನ್ನು ಸ್ಥಾಪಿಸಲಾಯಿತು."),
//       isQuote: true 
//     },
//     { 
//       id: 1, 
//       label: lang === "en" ? "Legacy" : "ಪರಂಪರೆ", 
//       content: aboutData.content2 || (lang === "en" ? "For over four centuries, Yakshagana has united dance, music, costume, and storytelling into a single transcendent art form. Our institution carries that flame forward — training new generations, hosting public performances, and collaborating with masters of the craft." : "ನಾಲ್ಕು ಶತಮಾನಗಳಿಂದ, ಯಕ್ಷಗಾನವು ನೃತ್ಯ, ಸಂಗೀತ, ವೇಷಭೂಷಣ ಮತ್ತು ಕಥೆ ಹೇಳುವಿಕೆಯನ್ನು ಒಂದು ಮಹಾನ್ ಕಲೆಯಾಗಿ ಒಂದುಗೂಡಿಸಿದೆ. ನಮ್ಮ ಸಂಸ್ಥೆಯು ಆ ಜ್ವಾಲೆಯನ್ನು ಮುಂದಕ್ಕೆ ಕೊಂಡೊಯ್ಯುತ್ತಿದೆ.")
//     },
//     { 
//       id: 2, 
//       label: lang === "en" ? "Philosophy" : "ತತ್ವ", 
//       content: aboutData.content3 || (lang === "en" ? "We believe culture is not a museum piece. It is living, breathing, evolving — a conversation between the ancient and the present. Through immersive learning and stagecraft, we invite every seeker to step into that conversation." : "ಸಂಸ್ಕೃತಿಯು ಕೇವಲ ವಸ್ತುಸಂಗ್ರಹಾಲಯದ ವಸ್ತುವಲ್ಲ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ. ಇದು ಜೀವಂತವಾಗಿರುವ, ಉಸಿರಾಡುವ ಮತ್ತು ವಿಕಸನಗೊಳ್ಳುವ ಪ್ರಕ್ರಿಯೆಯಾಗಿದೆ.")
//     }
//   ];

//   return (
//     <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[80vh] flex items-stretch border-y border-gold/10 -mt-12 md:mt-0 bg-background">
//       <div className="grid lg:grid-cols-[45%_55%] w-full">
//         <motion.div
//           initial={window.innerWidth < 1024 ? { opacity: 0, y: 20 } : { opacity: 0, x: -40 }}
//           whileInView={window.innerWidth < 1024 ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//           className="relative lg:block flex justify-center pt-8 lg:pt-0 overflow-hidden lg:border-r lg:border-gold/10 lg:h-auto"
//         >
//           <div className="relative h-full w-full flex justify-center lg:block">
//             <img
//               src={aboutData.image || aboutImg}
//               alt="Yakshagana performer"
//               className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-full lg:h-full object-cover object-top rounded-full lg:rounded-none border border-gold/20 lg:border-none lg:shadow-none"
//             />

//           </div>
//         </motion.div>

//         {/* Text Content */}
//         <div className="flex flex-col justify-center px-6 py-12 lg:py-20 md:px-16 lg:px-24 text-center lg:text-left">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="text-gold font-display tracking-[0.3em] uppercase text-[10px] md:text-sm mb-2 block">Our Story</span>
//             <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-6 md:mb-10 text-primary flex items-center justify-center lg:justify-start gap-3">
//               <img src={sticker1} alt="" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
//               {lang === "en" ? "ABOUT US" : "ನಮ್ಮ ಬಗ್ಗೆ"}
//             </h2>
            
//             {/* MOBILE TABS - INNOVATIVE COMPACT VIEW */}
//             <div className="lg:hidden mb-8 flex justify-center gap-2 p-1 bg-gold/5 rounded-full border border-gold/10">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex-1 py-2 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
//                     activeTab === tab.id 
//                       ? "bg-gold text-background shadow-glow" 
//                       : "text-muted-foreground hover:text-gold"
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//             {/* CONTENT AREA */}
//             <div className="relative min-h-[160px] md:min-h-0">
//               <AnimatePresence mode="wait">
//                 {/* Mobile View with Tabs */}
//                 <motion.div
//                   key={activeTab}
//                   initial={{ opacity: 0, x: 10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -10 }}
//                   transition={{ duration: 0.3 }}
//                   className="lg:hidden"
//                 >
//                   <p className={`${tabs[activeTab].isQuote ? "text-gold text-sm md:text-lg leading-relaxed font-light" : "text-sm text-foreground/80 leading-relaxed font-light"}`}>
//                     {tabs[activeTab].content}
//                   </p>
//                 </motion.div>

//                 {/* Desktop View (Standard Scroll) */}
//                 <div className="hidden lg:flex flex-col space-y-8 text-lg text-foreground/80 leading-relaxed font-light">
//                   <p className="text-gold text-lg leading-relaxed font-light">
//                     {tabs[0].content}
//                   </p>
//                   <p>{tabs[1].content}</p>
//                   <p>{tabs[2].content}</p>
//                 </div>
//               </AnimatePresence>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Index() {
//   const { t, lang } = useLang();
//   const { data, loading } = useDbContent();
//   const icons = [Drama, Sparkles, Music];
//   const highlightOrder = [2, 0, 1]; // 2: Performances, 0: Classes, 1: Workshops

//   const heroData = data?.siteContent?.hero || t.hero;
//   const aboutData = data?.siteContent?.about || t.about;
//   const dbWorkshops = data?.workshops || [];
//   const dbBlogs = data?.blogs || [];
//   const bodyParagraphs = aboutData.body || t.about.homeSection.body;

//   const galleryItems = [
//     { src: imgMap.g1, label: "The Mask" },
//     { src: imgMap.g2, label: "Stage Performance" },
//     { src: imgMap.g4, label: "Crown Heritage" },
//     { src: imgMap.g6, label: "The Warrior" },
//     { src: imgMap.g5, label: "Chande Master" },
//     { src: imgMap.g3, label: "Workshop" },
//   ];

//   return (
//     <Layout>
//       {loading ? (
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
//         </div>
//       ) : (
//         <>
//           {/* HERO */}
//           <section className="relative min-h-screen flex items-center overflow-hidden pb-0 md:pb-16">
//             <div className="absolute inset-0 bg-hero" />
//             <img
//               src={mandala}
//               alt=""
//               aria-hidden
//               className="absolute -right-40 -top-40 w-[700px] opacity-10 animate-spin-slow pointer-events-none"
//             />
//             <img
//               src={mandala}
//               alt=""
//               aria-hidden
//               className="absolute -left-60 -bottom-60 w-[600px] opacity-5 animate-spin-slow pointer-events-none"
//               style={{ animationDirection: "reverse" }}
//             />

//             <div className="container mx-auto px-6 relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-12 items-center pt-10 lg:pt-0 min-h-screen lg:min-h-0">
//               {/* Image - First on mobile */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
//                 className="relative order-1 lg:order-2 w-full max-w-[180px] sm:max-w-[240px] lg:max-w-none mx-auto mb-1 lg:mb-0 lg:-mt-4"
//               >
//                 <div className="absolute inset-0 bg-ember rounded-full blur-3xl opacity-40 animate-float-subtle lg:animate-float-slow" />
//                 <motion.div className="relative aspect-square lg:aspect-auto overflow-hidden rounded-full lg:rounded-2xl border border-gold/20 shadow-glow animate-float-subtle lg:animate-float-slow">
//                   <img
//                     src={heroData.image || heroImg}
//                     alt="Yakshagana performer"
//                     className="w-full h-full object-cover"
//                   />
//                 </motion.div>
//               </motion.div>

//               {/* Text & Logo - Second on mobile */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//                 className="text-center lg:text-left order-2 lg:order-1"
//               >
//                 <motion.img 
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.1, duration: 0.8 }}
//                   src={logoImg} 
//                   alt="Kathe Gaararu Logo" 
//                   className="h-28 sm:h-24 md:h-48 lg:h-56 w-auto object-contain mx-auto lg:ml-0 mb-2 lg:mb-8 drop-shadow-2xl"
//                 />
                
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/5 text-[8.5px] whitespace-nowrap uppercase tracking-[0.1em] text-primary mb-2 lg:mb-8"
//                 >
//                   <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
//                   {heroData.tag}
//                 </motion.div>

//                 <h1 className="font-display text-[24px] sm:text-4xl md:text-6xl lg:text-7xl leading-tight mb-2 lg:mb-6">
//                   {heroData.title}
//                   <br />
//                   <span className="text-gradient-gold glow-text">{heroData.titleAccent}</span>
//                 </h1>

//                 <p className="text-[11px] sm:text-lg text-muted-foreground max-w-xl mx-auto lg:ml-0 leading-relaxed mb-4 lg:mb-10">
//                   {heroData.subtitle}
//                 </p>

//                 <div className="flex flex-wrap justify-center lg:justify-start gap-4">
//                   <Link
//                     to="/gallery"
//                     hash="performances"
//                     className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gold text-background font-medium shadow-glow hover:scale-105 transition-transform text-sm sm:text-base"
//                   >
//                     {heroData.ctaPrimary}
//                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </Link>
//                   <Link
//                     to="/services"
//                     hash="classes"
//                     className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-border hover:border-gold text-foreground transition-colors text-sm sm:text-base"
//                   >
//                     {heroData.ctaSecondary}
//                   </Link>
//                 </div>
//               </motion.div>
//             </div>

//             <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
//           </section>

//           {/* OUR STORY */}
//           <OurStorySection 
//             aboutData={aboutData} 
//             aboutImg={aboutImg} 
//             sticker1={sticker1} 
//             lang={lang} 
//             t={t}
//           />

//           {/* HIGHLIGHTS */}
//           <section className="container mx-auto px-6 pt-20 pb-4 md:pb-20 relative overflow-hidden">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="text-center max-w-2xl mx-auto mb-16"
//             >
//               <div className="ornament-divider w-24 mx-auto mb-6" />
//               <h2 className="text-[22px] xs:text-26px sm:text-3xl md:text-5xl font-display mb-4 flex items-center justify-center gap-3 md:gap-4 leading-tight">
//                 <img src={sticker1} alt="" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
//                 {t.highlights.title}
//               </h2>
//               <p className="text-muted-foreground text-sm md:text-base">{t.highlights.subtitle}</p>
//             </motion.div>

//             <div className="relative group/slider">
//               <div 
//                 id="highlights-slider"
//                 onScroll={(e) => {
//                   const target = e.currentTarget;
//                   const indicator = document.getElementById('scroll-indicator');
//                   if (indicator) {
//                     const isAtEnd = target.scrollLeft + target.clientWidth >= target.scrollWidth - 20;
//                     indicator.style.opacity = isAtEnd ? '0' : '1';
//                     indicator.style.visibility = isAtEnd ? 'hidden' : 'visible';
//                   }
//                 }}
//                 className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide px-2 md:px-0 -mx-2 md:mx-0 scroll-smooth"
//               >
//                 {highlightOrder.map((idx, i) => {
//                   const item = t.highlights.items[idx];
//                   const Icon = icons[idx];
//                   return (
//                     <Link
//                       key={i}
//                       to="/services"
//                       hash={idx === 2 ? "performance" : idx === 0 ? "classes" : "workshops"}
//                       className="block min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center"
//                     >
//                       <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.6, delay: i * 0.15 }}
//                         whileHover={{ y: -8 }}
//                         className="group relative p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-card/80 to-card/30 border border-gold/10 hover:border-gold/40 transition-all overflow-hidden cursor-pointer h-full flex flex-col justify-between"
//                       >
//                         <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all duration-700" />
                        
//                         <div className="relative">
//                           <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-gold to-crimson flex items-center justify-center mb-6 shadow-glow transform transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
//                             <Icon className="w-6 h-6 text-background" />
//                           </div>
//                           <h3 className="text-xl md:text-2xl font-display mb-3 text-primary group-hover:text-gold transition-colors">{item.title}</h3>
//                           <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">{item.desc}</p>
//                         </div>

//                         <div className="mt-8 flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest opacity-0 md:opacity-100 group-hover:opacity-100 transition-opacity">
//                           {lang === "en" ? "Discover" : "ಅನ್ವೇಷಿಸಿ"}
//                           <ArrowRight className="w-3 h-3 transform transition-transform group-hover:translate-x-1" />
//                         </div>
//                       </motion.div>
//                     </Link>
//                   );
//                 })}
//               </div>

//               {/* Scroll Indicator - Mobile Only */}
//               <button 
//                 id="scroll-indicator"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   const slider = document.getElementById('highlights-slider');
//                   if (slider) {
//                     const cardWidth = slider.querySelector('a')?.clientWidth || 300;
//                     slider.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
//                   }
//                 }}
//                 className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gold/30 backdrop-blur-xl border border-gold/50 rounded-full flex items-center justify-center text-gold animate-bounce-horizontal cursor-pointer shadow-glow active:scale-95 transition-all duration-300"
//               >
//                 <ArrowRight className="w-6 h-6" />
//               </button>
//             </div>
//           </section>

//           {/* EXPANDED DETAILS */}
//           <section className="container mx-auto px-6 pt-4 pb-12 md:py-12 flex flex-col gap-16 md:gap-32">
//             {/* PERFORMANCES */}
//             <div id="performances-details" className="scroll-mt-32">
//               <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-12 text-center text-primary flex items-center justify-center gap-4">
//                 <img src={sticker2} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
//                 {t.highlights.items[2].title}
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-6">
//                 {galleryItems.map((it, i) => (
//                   <Link
//                     key={i}
//                     to="/gallery"
//                     hash="performances"
//                     className={`block aspect-square ${
//                       (i === 0 || i === 4) ? "md:row-span-2 md:aspect-auto" : ""
//                     }`}
//                   >
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       whileInView={{ opacity: 1, scale: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
//                       className="w-full h-full group relative overflow-hidden rounded-2xl border border-border hover:border-gold/50 transition cursor-pointer"
//                     >
//                       <img
//                         src={it.src}
//                         alt={it.label}
//                         loading="lazy"
//                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
//                       <div className="absolute bottom-0 inset-x-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition">
//                         <div className="font-display text-lg text-primary">{it.label}</div>
//                       </div>
//                     </motion.div>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* CLASSES */}
//             <div id="classes-details" className="scroll-mt-32">
//               <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-12 text-center text-primary flex items-center justify-center gap-4">
//                 <img src={sticker3} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
//                 {t.highlights.items[0].title}
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
//                 <Link to="/classes" className="group relative rounded-2xl md:rounded-3xl overflow-hidden border border-border bg-card/40 p-4 sm:p-8 md:pt-12 md:px-12 md:pb-6 hover:border-gold/50 transition-all flex flex-col justify-end min-h-[220px] sm:min-h-[250px] md:min-h-[450px]">
//                   <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10" />
//                   <img src={imgMap.g4} alt="Singing Classes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//                   <div className="relative z-20">
//                     <h3 className="text-xl sm:text-3xl md:text-5xl font-display text-primary mb-1 md:mb-4">{lang === "en" ? "Singing" : "ಗಾಯನ"}</h3>
//                     <p className="text-muted-foreground text-[10px] sm:text-base md:text-lg mb-2 md:mb-4 leading-tight sm:leading-relaxed line-clamp-2 md:line-clamp-none">{lang === "en" ? "Master the authentic narrative singing tradition (Bhagavatike) of Yakshagana." : "ಯಕ್ಷಗಾನದ ಭಾಗವತಿಕೆ ಪರಂಪರೆಯನ್ನು ಕಲಿಯಿರಿ."}</p>
//                   </div>
//                 </Link>
//                 <Link to="/classes" className="group relative rounded-2xl md:rounded-3xl overflow-hidden border border-border bg-card/40 p-4 sm:p-8 md:pt-12 md:px-12 md:pb-6 hover:border-gold/50 transition-all flex flex-col justify-end min-h-[220px] sm:min-h-[250px] md:min-h-[450px]">
//                   <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10" />
//                   <img src={imgMap.g1} alt="Dancing Classes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//                   <div className="relative z-20">
//                     <h3 className="text-xl sm:text-3xl md:text-5xl font-display text-primary mb-1 md:mb-4">{lang === "en" ? "Dancing" : "ನೃತ್ಯ"}</h3>
//                     <p className="text-muted-foreground text-[10px] sm:text-base md:text-lg mb-2 md:mb-4 leading-tight sm:leading-relaxed line-clamp-2 md:line-clamp-none">{lang === "en" ? "Immerse yourself in the vigorous footwork and graceful choreography of Yakshagana." : "ಯಕ್ಷಗಾನದ ಶಕ್ತಿಯುತ ಪಾದಭಂಗಿ ಮತ್ತು ನೃತ್ಯವನ್ನು ಕಲಿಯಿರಿ."}</p>
//                   </div>
//                 </Link>
//               </div>
//               <div className="flex justify-center">
//                 <Link
//                   to="/classes"
//                   className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 border border-gold/30 text-primary hover:bg-gold hover:text-background transition-all font-display text-sm md:text-lg"
//                 >
//                   {lang === "en" ? "Explore All Classes" : "ಎಲ್ಲಾ ತರಗತಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ"}
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </div>
//             </div>

//             {/* WORKSHOPS */}
//             <div id="workshops-details" className="scroll-mt-32">
//               <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-12 text-center text-primary flex items-center justify-center gap-4">
//                 <img src={sticker4} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
//                 {t.highlights.items[1].title}
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
//                 {dbWorkshops.map((w: any) => {
//                   const displayImage = w.image.startsWith('g') ? imgMap[w.image] : w.image;
//                   return (
//                     <Link
//                       key={w.id}
//                       to="/gallery"
//                       className="group relative bg-card/60 border border-border rounded-2xl overflow-hidden transition-all hover:border-gold/50 flex flex-col"
//                     >
//                       <div className="relative aspect-square overflow-hidden">
//                         <img
//                           src={displayImage}
//                           alt={w.title[lang]}
//                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
//                       </div>
//                       <div className="p-4 md:p-6 flex flex-col justify-between flex-1">
//                         <h3 className="font-display text-[15px] sm:text-lg md:text-xl text-primary mb-1 md:mb-2 leading-tight break-words hyphens-auto">{w.title[lang]}</h3>
//                         <p className="text-[10px] sm:text-xs md:text-sm text-gold/80 font-medium mt-auto">{w.timestamp[lang]}</p>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* BLOG PREVIEW */}
//             <div id="blog-preview" className="scroll-mt-32">
//               <div className="relative flex items-center justify-center mb-12">
//                 <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display text-center text-primary flex items-center justify-center gap-4">
//                   <img src={sticker0} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
//                   {lang === "en" ? "Latest Insights" : "ಇತ್ತೀಚಿನ ಒಳನೋಟಗಳು"}
//                 </h2>
//                 <Link
//                   to="/blog"
//                   className="hidden md:flex absolute right-0 items-center gap-2 text-gold hover:text-primary transition-colors text-sm font-medium uppercase tracking-widest"
//                 >
//                   {lang === "en" ? "View All" : "ಎಲ್ಲವನ್ನೂ ನೋಡಿ"}
//                   <ArrowRight className="w-4 h-4" />
//                 </Link>
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
//                 {dbBlogs.slice(0, 4).map((post: any, index: number) => {
//                   const displayImage = post.image.startsWith('g') ? imgMap[post.image] : post.image;
//                   return (
//                     <Link
//                       key={post.id}
//                       to="/blog"
//                       className="group relative bg-card/40 border border-border rounded-xl md:rounded-2xl overflow-hidden hover:border-gold/50 transition-all flex flex-col"
//                     >
//                       <div className="relative h-24 sm:h-32 md:h-48 overflow-hidden">
//                         <img
//                           src={displayImage}
//                           alt={post.title[lang]}
//                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
//                         <div className="absolute top-2 left-2 md:top-4 md:left-4">
//                           <span className="px-2 py-0.5 md:px-3 md:py-1 bg-black/40 backdrop-blur-md border border-white/10 text-[7px] md:text-[9px] font-bold text-white uppercase tracking-wider rounded-full">
//                             {post.category[lang]}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="p-3 md:p-6 flex flex-col flex-1">
//                         <h3 className="font-display text-xs sm:text-sm md:text-lg text-primary mb-1 md:mb-3 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
//                           {post.title[lang]}
//                         </h3>
//                         <p className="hidden md:-webkit-box text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
//                           {post.excerpt[lang]}
//                         </p>
//                         <div className="flex items-center text-gold text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-auto pt-1 md:pt-0">
//                           {lang === "en" ? "Read Article" : "ಲೇಖನ ಓದಿ"}
//                           <ArrowRight className="w-2 h-2 md:w-3 md:h-3 ml-1 md:ml-2 transition-transform group-hover:translate-x-1" />
//                         </div>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>

//               <Link
//                 to="/blog"
//                 className="md:hidden mt-8 flex items-center justify-center gap-2 text-gold text-sm font-medium uppercase tracking-widest"
//               >
//                 {lang === "en" ? "View All Posts" : "ಎಲ್ಲಾ ಲೇಖನಗಳನ್ನು ನೋಡಿ"}
//                 <ArrowRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </section>

//           {/* UPCOMING EVENTS */}
//           <UpcomingEvents />
//           <FaqAssistant />
//         </>
//       )}
//     </Layout>
//   );
// }


import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
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
import { FaqAssistant } from "@/components/FaqAssistant";

function OurStorySection({ aboutData, aboutImg, sticker1, lang, t }: any) {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { 
      id: 0, 
      label: lang === "en" ? "Mission" : "ಧ್ಯೇಯ", 
      content: aboutData.content1 || (lang === "en" ? "Kathe Gaararu was founded to safeguard and share the radiant heritage of Yakshagana — Karnataka's monumental folk theatre tradition." : "ಯಕ್ಷಗಾನದ ಭವ್ಯ ಪರಂಪರೆಯನ್ನು ರಕ್ಷಿಸಲು ಮತ್ತು ಹಂಚಿಕೊಳ್ಳಲು ಕಥೆಗಾರರು ಸಂಸ್ಥೆಯನ್ನು ಸ್ಥಾಪಿಸಲಾಯಿತು."),
      isQuote: true 
    },
    { 
      id: 1, 
      label: lang === "en" ? "Legacy" : "ಪರಂಪರೆ", 
      content: aboutData.content2 || (lang === "en" ? "For over four centuries, Yakshagana has united dance, music, costume, and storytelling into a single transcendent art form. Our institution carries that flame forward — training new generations, hosting public performances, and collaborating with masters of the craft." : "ನಾಲ್ಕು ಶತಮಾನಗಳಿಂದ, ಯಕ್ಷಗಾನವು ನೃತ್ಯ, ಸಂಗೀತ, ವೇಷಭೂಷಣ ಮತ್ತು ಕಥೆ ಹೇಳುವಿಕೆಯನ್ನು ಒಂದು ಮಹಾನ್ ಕಲೆಯಾಗಿ ಒಂದುಗೂಡಿಸಿದೆ. ನಮ್ಮ ಸಂಸ್ಥೆಯು ಆ ಜ್ವಾಲೆಯನ್ನು ಮುಂದಕ್ಕೆ ಕೊಂಡೊಯ್ಯುತ್ತಿದೆ.")
    },
    { 
      id: 2, 
      label: lang === "en" ? "Philosophy" : "ತತ್ವ", 
      content: aboutData.content3 || (lang === "en" ? "We believe culture is not a museum piece. It is living, breathing, evolving — a conversation between the ancient and the present. Through immersive learning and stagecraft, we invite every seeker to step into that conversation." : "ಸಂಸ್ಕೃತಿಯು ಕೇವಲ ವಸ್ತುಸಂಗ್ರಹಾಲಯದ ವಸ್ತುವಲ್ಲ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ. ಇದು ಜೀವಂತವಾಗಿರುವ, ಉಸಿರಾಡುವ ಮತ್ತು ವಿಕಸನಗೊಳ್ಳುವ ಪ್ರಕ್ರಿಯೆಯಾಗಿದೆ.")
    }
  ];

  return (
    <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[80vh] flex items-stretch border-y border-gold/10 mt-0 md:mt-0 bg-background">
      <div className="grid lg:grid-cols-[45%_55%] w-full">
        <motion.div
          initial={window.innerWidth < 1024 ? { opacity: 0, y: 20 } : { opacity: 0, x: -40 }}
          whileInView={window.innerWidth < 1024 ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:block flex justify-center pt-8 lg:pt-0 overflow-hidden lg:border-r lg:border-gold/10 lg:h-auto"
        >
          <div className="relative h-full w-full flex justify-center lg:block">
            <img
              src={aboutData.image || aboutImg}
              alt="Yakshagana performer"
              className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-full lg:h-full object-cover object-top rounded-full lg:rounded-none border border-gold/20 lg:border-none lg:shadow-none"
            />

          </div>
        </motion.div>

        {/* Text Content */}
        <div className="flex flex-col justify-center px-6 py-12 lg:py-20 md:px-16 lg:px-24 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold font-display tracking-[0.3em] uppercase text-[10px] md:text-sm mb-2 block">Our Story</span>
            <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-6 md:mb-10 text-primary flex items-center justify-center lg:justify-start gap-3">
              <img src={sticker1} alt="" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
              {lang === "en" ? "ABOUT US" : "ನಮ್ಮ ಬಗ್ಗೆ"}
            </h2>
            
            {/* MOBILE TABS - INNOVATIVE COMPACT VIEW */}
            <div className="lg:hidden mb-8 flex justify-center gap-2 p-1 bg-gold/5 rounded-full border border-gold/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab.id 
                      ? "bg-gold text-background shadow-glow" 
                      : "text-muted-foreground hover:text-gold"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* CONTENT AREA */}
            <div className="relative min-h-[160px] md:min-h-0">
              <AnimatePresence mode="wait">
                {/* Mobile View with Tabs */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden"
                >
                  <p className={`${tabs[activeTab].isQuote ? "text-gold text-sm md:text-lg leading-relaxed font-light" : "text-sm text-foreground/80 leading-relaxed font-light"}`}>
                    {tabs[activeTab].content}
                  </p>
                </motion.div>

                {/* Desktop View (Standard Scroll) */}
                <div className="hidden lg:flex flex-col space-y-8 text-lg text-foreground/80 leading-relaxed font-light">
                  <p className="text-gold text-lg leading-relaxed font-light">
                    {tabs[0].content}
                  </p>
                  <p>{tabs[1].content}</p>
                  <p>{tabs[2].content}</p>
                </div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
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
  const aboutData = data?.siteContent?.about || t.about;
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
          <section className="relative min-h-screen flex items-center overflow-hidden pb-16 md:pb-16">
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
            sticker1={sticker1} 
            lang={lang} 
            t={t}
          />

          {/* HIGHLIGHTS */}
          <section className="container mx-auto px-6 pt-20 pb-4 md:pb-20 relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <div className="ornament-divider w-24 mx-auto mb-6" />
              <h2 className="text-[22px] xs:text-26px sm:text-3xl md:text-5xl font-display mb-4 flex items-center justify-center gap-3 md:gap-4 leading-tight">
                <img src={sticker1} alt="" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
                {t.highlights.title}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">{t.highlights.subtitle}</p>
            </motion.div>

            <div className="relative group/slider">
              <div 
                id="highlights-slider"
                onScroll={(e) => {
                  const target = e.currentTarget;
                  const indicator = document.getElementById('scroll-indicator');
                  if (indicator) {
                    const isAtEnd = target.scrollLeft + target.clientWidth >= target.scrollWidth - 20;
                    indicator.style.opacity = isAtEnd ? '0' : '1';
                    indicator.style.visibility = isAtEnd ? 'hidden' : 'visible';
                  }
                }}
                className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide px-2 md:px-0 -mx-2 md:mx-0 scroll-smooth"
              >
                {highlightOrder.map((idx, i) => {
                  const item = t.highlights.items[idx];
                  const Icon = icons[idx];
                  return (
                    <Link
                      key={i}
                      to="/services"
                      hash={idx === 2 ? "performance" : idx === 0 ? "classes" : "workshops"}
                      className="block min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        whileHover={{ y: -8 }}
                        className="group relative p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-card/80 to-card/30 border border-gold/10 hover:border-gold/40 transition-all overflow-hidden cursor-pointer h-full flex flex-col justify-between"
                      >
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all duration-700" />
                        
                        <div className="relative">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-gold to-crimson flex items-center justify-center mb-6 shadow-glow transform transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
                            <Icon className="w-6 h-6 text-background" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-display mb-3 text-primary group-hover:text-gold transition-colors">{item.title}</h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">{item.desc}</p>
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest opacity-0 md:opacity-100 group-hover:opacity-100 transition-opacity">
                          {lang === "en" ? "Discover" : "ಅನ್ವೇಷಿಸಿ"}
                          <ArrowRight className="w-3 h-3 transform transition-transform group-hover:translate-x-1" />
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* Scroll Indicator - Mobile Only */}
              <button 
                id="scroll-indicator"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const slider = document.getElementById('highlights-slider');
                  if (slider) {
                    const cardWidth = slider.querySelector('a')?.clientWidth || 300;
                    slider.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
                  }
                }}
                className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gold/30 backdrop-blur-xl border border-gold/50 rounded-full flex items-center justify-center text-gold animate-bounce-horizontal cursor-pointer shadow-glow active:scale-95 transition-all duration-300"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </section>

          {/* EXPANDED DETAILS */}
          <section className="container mx-auto px-6 pt-4 pb-12 md:py-12 flex flex-col gap-16 md:gap-32">
            {/* PERFORMANCES */}
            <div id="performances-details" className="scroll-mt-32">
              <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-12 text-center text-primary flex items-center justify-center gap-4">
                <img src={sticker2} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                {t.highlights.items[2].title}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-6">
                {galleryItems.map((it, i) => (
                  <Link
                    key={i}
                    to="/gallery"
                    hash="performances"
                    className={`block aspect-square ${
                      (i === 0 || i === 4) ? "md:row-span-2 md:aspect-auto" : ""
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                      className="w-full h-full group relative overflow-hidden rounded-2xl border border-border hover:border-gold/50 transition cursor-pointer"
                    >
                      <img
                        src={it.src}
                        alt={it.label}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Title overlay removed per user request */}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CLASSES */}
            <div id="classes-details" className="scroll-mt-32">
              <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-12 text-center text-primary flex items-center justify-center gap-4">
                <img src={sticker3} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                {t.highlights.items[0].title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
                <Link to="/classes" className="group relative rounded-2xl md:rounded-3xl overflow-hidden border border-border bg-card/40 p-4 sm:p-8 md:pt-12 md:px-12 md:pb-6 hover:border-gold/50 transition-all flex flex-col justify-end min-h-[220px] sm:min-h-[250px] md:min-h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10" />
                  <img src={imgMap.g4} alt="Singing Classes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="relative z-20">
                    <h3 className="text-xl sm:text-3xl md:text-5xl font-display text-primary mb-1 md:mb-4">{lang === "en" ? "Singing" : "ಗಾಯನ"}</h3>
                    <p className="text-muted-foreground text-[10px] sm:text-base md:text-lg mb-2 md:mb-4 leading-tight sm:leading-relaxed line-clamp-2 md:line-clamp-none">{lang === "en" ? "Master the authentic narrative singing tradition (Bhagavatike) of Yakshagana." : "ಯಕ್ಷಗಾನದ ಭಾಗವತಿಕೆ ಪರಂಪರೆಯನ್ನು ಕಲಿಯಿರಿ."}</p>
                  </div>
                </Link>
                <Link to="/classes" className="group relative rounded-2xl md:rounded-3xl overflow-hidden border border-border bg-card/40 p-4 sm:p-8 md:pt-12 md:px-12 md:pb-6 hover:border-gold/50 transition-all flex flex-col justify-end min-h-[220px] sm:min-h-[250px] md:min-h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10" />
                  <img src={imgMap.g1} alt="Dancing Classes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="relative z-20">
                    <h3 className="text-xl sm:text-3xl md:text-5xl font-display text-primary mb-1 md:mb-4">{lang === "en" ? "Dancing" : "ನೃತ್ಯ"}</h3>
                    <p className="text-muted-foreground text-[10px] sm:text-base md:text-lg mb-2 md:mb-4 leading-tight sm:leading-relaxed line-clamp-2 md:line-clamp-none">{lang === "en" ? "Immerse yourself in the vigorous footwork and graceful choreography of Yakshagana." : "ಯಕ್ಷಗಾನದ ಶಕ್ತಿಯುತ ಪಾದಭಂಗಿ ಮತ್ತು ನೃತ್ಯವನ್ನು ಕಲಿಯಿರಿ."}</p>
                  </div>
                </Link>
              </div>
              <div className="flex justify-center">
                <Link
                  to="/classes"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 border border-gold/30 text-primary hover:bg-gold hover:text-background transition-all font-display text-sm md:text-lg"
                >
                  {lang === "en" ? "Explore All Classes" : "ಎಲ್ಲಾ ತರಗತಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
          <FaqAssistant />
        </>
      )}
    </Layout>
  );
}