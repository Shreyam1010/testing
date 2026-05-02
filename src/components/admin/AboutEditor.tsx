import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Loader2, Save, Check } from "lucide-react";
import aboutImg from "@/assets/about-performer.jpg";

interface AboutEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

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
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {value}
    </Tag>
  );
}

export function AboutEditor({ isEditing, lang }: AboutEditorProps) {
  const [currentAboutImg, setCurrentAboutImg] = useState(aboutImg);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [data, setData] = useState({
    en: {
      label: "OUR STORY",
      title: "Our Story",
      lead: "Kathe Gaararu was founded to safeguard and share the radiant heritage of Yakshagana — Karnataka's monumental folk theatre tradition.",
      body: [
        "For over four centuries, Yakshagana has united dance, music, costume, and storytelling into a single transcendent art form. Our institution carries that flame forward — training new generations, hosting public performances, and collaborating with masters of the craft.",
        "We believe culture is not a museum piece. It is living, breathing, evolving — a conversation between the ancient and the present. Through immersive learning and stagecraft, we invite every seeker to step into that conversation."
      ],
      stats: [
        { value: "400+", label: "Years of tradition" },
        { value: "12", label: "Master gurus" },
        { value: "500+", label: "Students trained" },
        { value: "120", label: "Performances yearly" }
      ]
    },
    kn: {
      label: "ನಮ್ಮ ಕಥೆ",
      title: "ನಮ್ಮ ಕಥೆ",
      lead: "ಕಥೆ ಗಾರಾರು ಯಕ್ಷಗಾನದ ತೇಜೋಮಯ ಪರಂಪರೆಯನ್ನು ಸಂರಕ್ಷಿಸಲು ಮತ್ತು ಹಂಚಿಕೊಳ್ಳಲು ಸ್ಥಾಪಿಸಲ್ಪಟ್ಟಿದೆ.",
      body: [
        "ನಾಲ್ಕು ಶತಮಾನಗಳಿಗಿಂತಲೂ ಹೆಚ್ಚು ಕಾಲದಿಂದ, ಯಕ್ಷಗಾನವು ನೃತ್ಯ, ಸಂಗೀತ, ವೇಷಭೂಷಣ ಮತ್ತು ಕಥಾನಕವನ್ನು ಒಂದು ಅದ್ಭುತ ಕಲಾರೂಪವಾಗಿ ಜೋಡಿಸಿದೆ.",
        "ಸಂಸ್ಕೃತಿ ಸಂಗ್ರಹಾಲಯದ ವಸ್ತು ಅಲ್ಲ — ಅದು ಜೀವಂತ, ಉಸಿರಾಡುತ್ತಿರುವ, ವಿಕಸಿಸುತ್ತಿರುವ ಪ್ರಾಚೀನ ಮತ್ತು ವರ್ತಮಾನದ ನಡುವಿನ ಸಂವಾದ."
      ],
      stats: [
        { value: "೪೦೦+", label: "ವರ್ಷಗಳ ಪರಂಪರೆ" },
        { value: "೧೨", label: "ಗುರುಗಳು" },
        { value: "೫೦೦+", label: "ಶಿಷ್ಯರು" },
        { value: "೧೨೦", label: "ವಾರ್ಷಿಕ ಪ್ರದರ್ಶನಗಳು" }
      ]
    }
  });

  // --- FETCH FROM DATABASE ---
  useEffect(() => {
    fetch(`http://localhost:8787/api/content?lang=${lang}`)
      .then((r) => r.json())
      .then((result) => {
        const aboutData: any = {};
        result.siteContent?.forEach((item: any) => {
          if (item.section === "about") aboutData[item.content_key] = item.content_value;
        });
        if (aboutData.label) {
          setData((prev) => ({
            ...prev,
            [lang]: {
              ...prev[lang],
              label: aboutData.label || prev[lang].label,
              title: aboutData.title || prev[lang].title,
              lead: aboutData.lead || prev[lang].lead,
            },
          }));
        }
      })
      .catch(() => {});
  }, [lang]);

  // --- SAVE TO DATABASE ---
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const current = data[lang];
      await fetch("http://localhost:8787/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "about",
          lang,
          data: {
            label: current.label,
            title: current.title,
            lead: current.lead,
          },
        }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const current = data[lang];

  const update = (field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const updateBody = (index: number, value: string) => {
    const newBody = [...current.body];
    newBody[index] = value;
    update("body", newBody);
  };

  const updateStat = (index: number, field: "value" | "label", value: string) => {
    const newStats = [...current.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    update("stats", newStats);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCurrentAboutImg(url);
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh]">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleImageChange}
      />
      
      <div className="grid lg:grid-cols-[45%_55%] w-full min-h-[90vh]">
        {/* Image - REPLICATED 1:1 */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block overflow-hidden border-r border-gold/10 group"
        >
          <img
            src={currentAboutImg}
            alt=""
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60" />
          
          {isEditing && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 bg-gold text-background rounded-full font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-all"
              >
                <Camera className="w-4 h-4" />
                Replace Image
              </button>
            </div>
          )}
        </motion.div>

        {/* Text Content - REPLICATED 1:1 */}
        <div className="flex flex-col justify-center px-8 py-20 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-4">
              <EditableText
                value={current.label}
                onChange={(v) => update("label", v)}
                isEditing={isEditing}
                className="text-xs uppercase tracking-[0.3em] text-crimson font-medium block"
              />
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-10 text-foreground">
              <EditableText
                value={current.title}
                onChange={(v) => update("title", v)}
                isEditing={isEditing}
              />
            </h1>

            <div className="space-y-6">
              {/* Lead Paragraph Styling - FIXED */}
              <div className="relative">
                <EditableText
                  tag="p"
                  value={current.lead}
                  onChange={(v) => update("lead", v)}
                  isEditing={isEditing}
                  className="text-xl md:text-2xl text-primary font-medium leading-relaxed italic border-l-4 border-gold pl-6 py-2 bg-gold/5 rounded-r-lg"
                />
              </div>

              {current.body.map((p, i) => (
                <EditableText
                  key={i}
                  tag="p"
                  value={p}
                  onChange={(v) => updateBody(i, v)}
                  isEditing={isEditing}
                  className="text-muted-foreground leading-[1.8] text-lg"
                />
              ))}
            </div>

            {/* Stats Grid - ADDED */}
            <div className="mt-16 grid grid-cols-2 gap-6">
              {current.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="p-6 rounded-2xl bg-card/40 border border-border hover:border-gold/30 transition group"
                >
                  <div className="text-3xl md:text-4xl font-display text-gradient-gold mb-1 group-hover:scale-110 transition-transform">
                    <EditableText
                      value={s.value}
                      onChange={(v) => updateStat(i, "value", v)}
                      isEditing={isEditing}
                    />
                  </div>
                  <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
                    <EditableText
                      value={s.label}
                      onChange={(v) => updateStat(i, "label", v)}
                      isEditing={isEditing}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

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
