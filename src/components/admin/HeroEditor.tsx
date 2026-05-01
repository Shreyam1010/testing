import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import heroImg from "@/assets/hero-yakshagana.jpg";
import mandala from "@/assets/mandala.png";

interface HeroEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

/* tiny helper — a span that looks identical whether editing or not */
function EditableText({
  value,
  onChange,
  isEditing,
  className = "",
  tag: Tag = "span",
}: {
  value: string;
  onChange: (v: string) => void;
  isEditing: boolean;
  className?: string;
  tag?: "span" | "p" | "div";
}) {
  const ref = useRef<HTMLElement>(null);

  const handleBlur = useCallback(() => {
    if (ref.current) onChange(ref.current.innerText);
  }, [onChange]);

  if (!isEditing) return <Tag className={className}>{value}</Tag>;

  return (
    <Tag
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`${className} outline-none cursor-text`}
      style={{
        caretColor: "var(--gold)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {value}
    </Tag>
  );
}

export function HeroEditor({ isEditing, lang }: HeroEditorProps) {
  const [heroImage, setHeroImage] = useState(heroImg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    en: {
      tag: "Preserving a 400-year-old legacy",
      title: "The Living Art of",
      titleAccent: "Yakshagana",
      subtitle:
        "An immersive cultural sanctuary where traditional Kannada theatre, music, and dance breathe through every performance, class, and story.",
      ctaPrimary: "Explore Classes",
      ctaSecondary: "Watch Performances",
    },
    kn: {
      tag: "೪೦೦ ವರ್ಷಗಳ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆ",
      title: "ಜೀವಂತ ಕಲೆ",
      titleAccent: "ಯಕ್ಷಗಾನ",
      subtitle:
        "ಸಾಂಪ್ರದಾಯಿಕ ಕನ್ನಡ ರಂಗಭೂಮಿ, ಸಂಗೀತ ಮತ್ತು ನೃತ್ಯ — ಪ್ರತಿ ಪ್ರದರ್ಶನ, ತರಗತಿ ಮತ್ತು ಕಥೆಯಲ್ಲಿ ಉಸಿರಾಡುವ ಸಾಂಸ್ಕೃತಿಕ ತಾಣ.",
      ctaPrimary: "ತರಗತಿಗಳನ್ನು ನೋಡಿ",
      ctaSecondary: "ಪ್ರದರ್ಶನಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    },
  });

  const current = data[lang];

  const update = (field: string) => (value: string) => {
    setData((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setHeroImage(url);
    }
  };

  return (
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
          {/* Tag badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-xs uppercase tracking-[0.25em] text-primary mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <EditableText
              value={current.tag}
              onChange={update("tag")}
              isEditing={isEditing}
            />
          </motion.div>

          {/* Heading — identical structure to index.tsx */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
            <EditableText
              value={current.title}
              onChange={update("title")}
              isEditing={isEditing}
            />
            <br />
            <EditableText
              value={current.titleAccent}
              onChange={update("titleAccent")}
              isEditing={isEditing}
              className="text-gradient-gold glow-text"
            />
          </h1>

          {/* Subtitle */}
          <EditableText
            tag="p"
            value={current.subtitle}
            onChange={update("subtitle")}
            isEditing={isEditing}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10"
          />

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <div className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-background font-medium shadow-glow">
              <EditableText
                value={current.ctaPrimary}
                onChange={update("ctaPrimary")}
                isEditing={isEditing}
              />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border hover:border-gold text-foreground transition-colors">
              <EditableText
                value={current.ctaSecondary}
                onChange={update("ctaSecondary")}
                isEditing={isEditing}
              />
            </div>
          </div>
        </motion.div>

        {/* Hero image — identical to index.tsx */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 bg-ember rounded-full blur-3xl opacity-40 animate-float-slow" />
          <div className="relative group">
            <motion.img
              src={heroImage}
              alt="Yakshagana performer in traditional crown headdress"
              width={1536}
              height={1536}
              className="relative rounded-2xl shadow-glow border border-gold/20 animate-float-slow"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all rounded-2xl cursor-pointer">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-3 bg-gold text-background rounded-full font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-all"
                >
                  <Camera className="w-4 h-4" />
                  Replace Hero Image
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
}
