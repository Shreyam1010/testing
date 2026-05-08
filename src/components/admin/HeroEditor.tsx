import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Save, Check, Upload } from "lucide-react";
import heroImgDefault from "@/assets/hero-yakshagana.jpg";
import mandala from "@/assets/mandala.png";
import logoImg from "@/assets/logo-transparent.png";
import { FaqManager } from "./FaqManager";

interface HeroEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

/* Invisible editable wrapper — preserves original CSS */
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
  tag?: "span" | "p" | "div" | "h1";
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
      className={`${className} outline-none cursor-text hover:bg-white/5 rounded px-1 transition-colors`}
      style={{ caretColor: "var(--gold)" }}
    >
      {value}
    </Tag>
  );
}

export function HeroEditor({ isEditing, lang }: HeroEditorProps) {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Default text from i18n
  const defaults = {
    en: {
      tag: "Preserving a 400-year-old legacy",
      title: "The Living Art of",
      titleAccent: "Yakshagana",
      subtitle:
        "An immersive cultural sanctuary where traditional Kannada theatre, music, and dance breathe through every performance, class, and story.",
      ctaPrimary: "Watch Performances",
      ctaSecondary: "Explore Classes",
      image: ""
    },
    kn: {
      tag: "೪೦೦ ವರ್ಷಗಳ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆ",
      title: "ಜೀವಂತ ಕಲೆ",
      titleAccent: "ಯಕ್ಷಗಾನ",
      subtitle:
        "ಸಾಂಪ್ರದಾಯಿಕ ಕನ್ನಡ ರಂಗಭೂಮಿ, ಸಂಗೀತ ಮತ್ತು ನೃತ್ಯ — ಪ್ರತಿ ಪ್ರದರ್ಶನ, ತರಗತಿ ಮತ್ತು ಕಥೆಯಲ್ಲಿ ಉಸಿರಾಡುವ ಸಾಂಸ್ಕೃತಿಕ ತಾಣ.",
      ctaPrimary: "ಪ್ರದರ್ಶನಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
      ctaSecondary: "ಗುರುಕುಲವನ್ನು ಅನ್ವೇಷಿಸಿ",
      image: ""
    },
  };

  const [data, setData] = useState(defaults[lang]);

  useEffect(() => {
    setLoading(true);
    // Try fetching from DB
    fetch(`http://127.0.0.1:5667/api/content?lang=${lang}`)
      .then((r) => r.json())
      .then((result) => {
        const heroData: any = {};
        result.siteContent?.forEach((item: any) => {
          if (item.section === "hero") heroData[item.content_key] = item.content_value;
        });
        
        setData({
          ...defaults[lang],
          ...heroData
        });
        setLoading(false);
      })
      .catch(() => {
        setData(defaults[lang]);
        setLoading(false);
      });
  }, [lang]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await fetch("http://127.0.0.1:5667/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "hero", lang, data }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const update = (field: string, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    update("image", url);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  /* ── Balanced Hero UI with Subtle Floating ── */
  return (
    <>
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
        {/* Image - Subtle Floating for Mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 lg:order-2 w-full max-w-[180px] sm:max-w-[240px] lg:max-w-none mx-auto mb-1 lg:mb-0 lg:-mt-4"
        >
          <div className="absolute inset-0 bg-ember rounded-full blur-3xl opacity-40 animate-float-subtle lg:animate-float-slow" />
          <motion.div className="relative aspect-square lg:aspect-auto overflow-hidden rounded-full lg:rounded-2xl border border-gold/20 shadow-glow animate-float-subtle lg:animate-float-slow group">
            <img
              src={data.image || heroImgDefault}
              alt="Yakshagana performer"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <label className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="w-5 h-5 text-gold mb-1" />
                <span className="text-white font-bold uppercase tracking-widest text-[7px]">Change Photo</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
                  }}
                />
              </label>
            )}
          </motion.div>
        </motion.div>

        {/* Text & Logo - Balanced Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          {/* Logo - Balanced height */}
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
            <EditableText
              value={data.tag}
              onChange={(v) => update("tag", v)}
              isEditing={isEditing}
            />
          </motion.div>

          <h1 className="font-display text-[24px] sm:text-4xl md:text-6xl lg:text-7xl leading-tight mb-2 lg:mb-6">
            <EditableText
              value={data.title}
              onChange={(v) => update("title", v)}
              isEditing={isEditing}
            />
            <br />
            <span className="text-gradient-gold glow-text">
              <EditableText
                value={data.titleAccent}
                onChange={(v) => update("titleAccent", v)}
                isEditing={isEditing}
              />
            </span>
          </h1>

          <p className="text-[11px] sm:text-lg text-muted-foreground max-w-xl mx-auto lg:ml-0 leading-relaxed mb-4 lg:mb-10">
            <EditableText
              value={data.subtitle}
              onChange={(v) => update("subtitle", v)}
              isEditing={isEditing}
              tag="span"
            />
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <div className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gold text-background font-medium shadow-glow hover:scale-105 transition-transform text-sm sm:text-base">
              <EditableText
                value={data.ctaPrimary}
                onChange={(v) => update("ctaPrimary", v)}
                isEditing={isEditing}
              />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-border hover:border-gold text-foreground transition-colors text-sm sm:text-base">
              <EditableText
                value={data.ctaSecondary}
                onChange={(v) => update("ctaSecondary", v)}
                isEditing={isEditing}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />

      {/* Save button — only visible in edit mode */}
      {isEditing && (
        <div className="fixed bottom-8 right-8 z-[100]">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-glow ${
              saveSuccess
                ? "bg-green-500 text-white"
                : "bg-primary text-background hover:scale-105"
            }`}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saveSuccess ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : saveSuccess ? "Saved to D1!" : "Save Changes"}
          </button>
        </div>
      )}
    </section>

    <div className="container mx-auto px-6 pb-24 relative z-10">
      <FaqManager lang={lang} blogId={null} title="General FAQ Manager" />
    </div>
    </>
  );
}
