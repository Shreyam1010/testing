import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Save, Check } from "lucide-react";
import heroImg from "@/assets/hero-yakshagana.jpg";
import mandala from "@/assets/mandala.png";

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
      className={`${className} outline-none cursor-text`}
      style={{ caretColor: "var(--gold)" }}
    >
      {value}
    </Tag>
  );
}

export function HeroEditor({ isEditing, lang }: HeroEditorProps) {
  const [loading, setLoading] = useState(false);
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
  };

  const [data, setData] = useState(defaults[lang]);

  useEffect(() => {
    setData(defaults[lang]);
    // Try fetching from DB
    fetch(`http://localhost:8787/api/content?lang=${lang}`)
      .then((r) => r.json())
      .then((result) => {
        const heroData: any = {};
        result.siteContent?.forEach((item: any) => {
          if (item.section === "hero") heroData[item.content_key] = item.content_value;
        });
        if (heroData.title) {
          setData((prev) => ({
            ...prev,
            ...heroData,
          }));
        }
      })
      .catch(() => {});
  }, [lang]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await fetch("http://localhost:8787/api/save", {
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

  /* ── Exact replica of index.tsx Hero ── */
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-xs uppercase tracking-[0.25em] text-primary mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <EditableText
              value={data.tag}
              onChange={(v) => update("tag", v)}
              isEditing={isEditing}
            />
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
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

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
            <EditableText
              value={data.subtitle}
              onChange={(v) => update("subtitle", v)}
              isEditing={isEditing}
              tag="span"
            />
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-background font-medium shadow-glow hover:scale-105 transition-transform">
              <EditableText
                value={data.ctaPrimary}
                onChange={(v) => update("ctaPrimary", v)}
                isEditing={isEditing}
              />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border hover:border-gold text-foreground transition-colors">
              <EditableText
                value={data.ctaSecondary}
                onChange={(v) => update("ctaSecondary", v)}
                isEditing={isEditing}
              />
            </button>
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
  );
}
