import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Music, Drama } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import { ClassesSchedule } from "@/components/ClassesSchedule";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import heroImg from "@/assets/hero-yakshagana.jpg";
import mandala from "@/assets/mandala.png";
import aboutImg from "@/assets/about-performer.jpg";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const { t } = useLang();
  const icons = [Drama, Sparkles, Music];
  const highlightOrder = [2, 0, 1]; // 2: Performances, 0: Classes, 1: Workshops

  const [activeDetails] = useState(true);

  const handleHighlightClick = (idx: number) => {
    const targetId =
      idx === 2 ? "performances-details" : idx === 0 ? "classes-details" : "workshops-details";
    const element = document.getElementById(targetId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const galleryItems = [
    { src: g1, label: "The Mask" },
    { src: g2, label: "Stage Performance" },
    { src: g4, label: "Crown Heritage" },
    { src: g6, label: "The Warrior" },
    { src: g5, label: "Chande Master" },
    { src: g3, label: "Workshop" },
  ];

  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
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

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-xs uppercase tracking-[0.25em] text-primary mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {t.hero.tag}
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
              {t.hero.title}
              <br />
              <span className="text-gradient-gold glow-text">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/classes"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-background font-medium shadow-glow hover:scale-105 transition-transform"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border hover:border-gold text-foreground transition-colors"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-ember rounded-full blur-3xl opacity-40 animate-float-slow" />
            <motion.img
              src={heroImg}
              alt="Yakshagana performer in traditional crown headdress"
              width={1536}
              height={1536}
              className="relative rounded-2xl shadow-glow border border-gold/20 animate-float-slow"
            />
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* OUR STORY */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-[45%_55%] min-h-[600px]">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <img
              src={aboutImg}
              alt="Yakshagana performer with elaborate traditional face paint and golden crown"
              loading="lazy"
              width={768}
              height={1024}
              className="w-full h-full object-cover object-top min-h-[400px] lg:min-h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30 lg:to-background/60" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center px-8 py-16 md:px-16 lg:px-20"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-crimson font-medium mb-4">
              {t.about.homeSection.label}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] mb-8 text-foreground">
              {t.about.homeSection.title}
            </h2>
            {t.about.homeSection.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-[1.8] mb-6 text-base md:text-lg"
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(
                    /Kathegaararu|ಕಥೆಗಾರರು/g,
                    '<strong class="text-foreground font-semibold">$&</strong>',
                  ),
                }}
              />
            ))}
          </motion.div>
        </div>
        {/* Subtle gold line separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>

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
          <h2 className="text-4xl md:text-5xl font-display mb-4">{t.highlights.title}</h2>
          <p className="text-muted-foreground">{t.highlights.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlightOrder.map((idx, i) => {
            const item = t.highlights.items[idx];
            const Icon = icons[idx];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                onClick={() => handleHighlightClick(idx)}
                className="group relative p-8 rounded-2xl bg-card/50 border border-border hover:border-gold/50 transition-all overflow-hidden cursor-pointer"
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
            );
          })}
        </div>
      </section>

      {/* EXPANDED DETAILS */}
      {activeDetails && (
        <section className="container mx-auto px-6 py-12 flex flex-col gap-32">
          {/* PERFORMANCES */}
          <div id="performances-details" className="scroll-mt-32">
            <h2 className="text-4xl md:text-5xl font-display mb-12 text-center text-primary">
              {t.highlights.items[2].title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 grid-flow-dense">
              {galleryItems.map((it, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className={`group relative overflow-hidden rounded-2xl border border-border hover:border-gold/50 transition ${
                    i === 0 || i === 4
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
            <h2 className="text-4xl md:text-5xl font-display mb-12 text-center text-primary">
              {t.highlights.items[0].title}
            </h2>
            <ClassesSchedule />
          </div>

          {/* WORKSHOPS */}
          <div id="workshops-details" className="scroll-mt-32">
            <h2 className="text-4xl md:text-5xl font-display mb-12 text-center text-primary">
              {t.highlights.items[1].title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.classes.items.map((c, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative p-7 rounded-2xl bg-card border border-border hover:border-gold/50 hover:shadow-glow transition-all"
                >
                  <div className="absolute top-0 left-7 w-12 h-1 bg-gold rounded-b-full" />
                  <h3 className="font-display text-2xl text-primary mb-4">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{c.desc}</p>
                  <div className="space-y-2.5 text-sm border-t border-border/50 pt-5">
                    <div className="flex items-center gap-2.5 text-foreground/80">
                      <span className="w-4 h-4 text-gold flex items-center justify-center">👤</span>{" "}
                      {c.teacher}
                    </div>
                    <div className="flex items-center gap-2.5 text-foreground/80">
                      <span className="w-4 h-4 text-gold flex items-center justify-center">🕒</span>{" "}
                      {c.time}
                    </div>
                    <div className="flex items-center gap-2.5 text-foreground/80">
                      <span className="w-4 h-4 text-gold flex items-center justify-center">📅</span>{" "}
                      {c.duration}
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex w-full items-center justify-center px-4 py-2.5 rounded-full border border-gold/40 text-primary text-sm hover:bg-gold hover:text-background transition-colors"
                  >
                    {t.classes.enroll}
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* UPCOMING EVENTS */}
      <UpcomingEvents />
    </Layout>
  );
}
