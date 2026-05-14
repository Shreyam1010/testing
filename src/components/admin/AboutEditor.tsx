import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Loader2, Save, Check, Crop, X } from "lucide-react";
import aboutImg from "@/assets/about-performer.jpg";
import { uploadImage } from "@/lib/uploadImage";
import { apiUrl } from "@/lib/api";
import { useAdminSave } from "@/hooks/useAdminSave";
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
  const [focalX, setFocalX] = useState(50);
  const [focalY, setFocalY] = useState(50);
  const [focalOpen, setFocalOpen] = useState(false);

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
    fetch(apiUrl(`/api/content?lang=${lang}`))
      .then((r) => r.json())
      .then((result) => {
        const aboutData: any = {};
        result.siteContent?.forEach((item: any) => {
          if (item.section === "about") aboutData[item.content_key] = item.content_value;
        });
        if (aboutData.image) setCurrentAboutImg(aboutData.image);
        const parsedFx = Number(aboutData.image_focal_x);
        const parsedFy = Number(aboutData.image_focal_y);
        if (Number.isFinite(parsedFx)) setFocalX(Math.max(0, Math.min(100, parsedFx)));
        if (Number.isFinite(parsedFy)) setFocalY(Math.max(0, Math.min(100, parsedFy)));
        setData((prev) => ({
          ...prev,
          [lang]: {
            ...prev[lang],
            label: aboutData.label || prev[lang].label,
            title: aboutData.title || prev[lang].title,
            lead: aboutData.lead || prev[lang].lead,
            ...(aboutData.image ? { image: aboutData.image } : {}),
          } as any,
        }));
      })
      .catch(() => {});
  }, [lang]);

  // --- SAVE TO DATABASE ---
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const current = data[lang] as any;
      const payload: Record<string, string> = {
        label: current.label,
        title: current.title,
        lead: current.lead,
        image_focal_x: String(focalX),
        image_focal_y: String(focalY),
      };
      if (current.image) payload.image = current.image;
      await fetch(apiUrl("/api/save"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "about", lang, data: payload }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  useAdminSave("about", handleSave);

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCurrentAboutImg(URL.createObjectURL(file));
    setFocalX(50);
    setFocalY(50);
    try {
      const url = await uploadImage(file, "about");
      setCurrentAboutImg(url);
      update("image", url);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    }
  };

  const pickFocal = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setFocalX(Math.max(0, Math.min(100, Math.round(x))));
    setFocalY(Math.max(0, Math.min(100, Math.round(y))));
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
      
      <div className="flex flex-col lg:grid lg:grid-cols-[45%_55%] w-full min-h-[90vh]">
        {/* Image - Replicated Mobile Circular vs Desktop Grid */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:block flex justify-center pt-16 lg:pt-0 group overflow-hidden lg:h-auto"
        >
          <div className="relative h-full w-full flex justify-center items-center lg:block">
            <img
              src={currentAboutImg}
              alt=""
              className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-full lg:h-full object-cover rounded-full lg:rounded-none border border-gold/20 lg:border-none shadow-glow lg:shadow-none"
              style={{ objectPosition: `${focalX}% ${focalY}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30 lg:to-background/60 rounded-full lg:rounded-none pointer-events-none" />

            {isEditing && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all rounded-full lg:rounded-none">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-1 p-4 bg-gold text-background rounded-full font-bold text-[8px] uppercase tracking-widest shadow-glow hover:scale-105 transition-all"
                >
                  <Camera className="w-4 h-4" />
                  Replace
                </button>
                <button
                  onClick={() => setFocalOpen(true)}
                  className="flex flex-col items-center gap-1 p-4 bg-background/70 text-foreground border border-gold/40 rounded-full font-bold text-[8px] uppercase tracking-widest hover:bg-background/90 transition-all"
                >
                  <Crop className="w-4 h-4" />
                  Crop
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Text Content - Responsive alignment */}
        <div className="flex flex-col justify-center px-8 py-12 lg:py-20 md:px-16 lg:px-24 text-center lg:text-left">
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
            
            <h1 className="font-display text-[26px] sm:text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 lg:mb-10 text-foreground flex items-center justify-center lg:justify-start gap-4">
             
              <EditableText
                value={current.title}
                onChange={(v) => update("title", v)}
                isEditing={isEditing}
              />
            </h1>

            <div className="space-y-6">
              <div className="relative">
                <EditableText
                  tag="p"
                  value={current.lead}
                  onChange={(v) => update("lead", v)}
                  isEditing={isEditing}
                  className="text-lg md:text-2xl text-primary font-medium leading-relaxed italic border-l-4 border-gold pl-6 py-2 bg-gold/5 rounded-r-lg"
                />
              </div>

              {current.body.map((p, i) => (
                <EditableText
                  key={i}
                  tag="p"
                  value={p}
                  onChange={(v) => updateBody(i, v)}
                  isEditing={isEditing}
                  className="text-muted-foreground leading-[1.8] text-base md:text-lg"
                />
              ))}
            </div>

            {/* Stats Grid */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6">
              {current.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="p-4 sm:p-6 rounded-2xl bg-card/40 border border-border hover:border-gold/30 transition group"
                >
                  <div className="text-2xl sm:text-4xl font-display text-gradient-gold mb-1 group-hover:scale-110 transition-transform">
                    <EditableText
                      value={s.value}
                      onChange={(v) => updateStat(i, "value", v)}
                      isEditing={isEditing}
                    />
                  </div>
                  <div className="text-[8px] sm:text-xs text-muted-foreground uppercase tracking-widest">
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
                ? "bg-primary text-foreground"
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

      {focalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          <div
            onClick={() => setFocalOpen(false)}
            className="absolute inset-0 bg-background/95 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl z-10 p-5 md:p-8 flex flex-col">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-2xl font-display text-primary">Crop position</h2>
              <button
                onClick={() => setFocalOpen(false)}
                className="p-1.5 md:p-2 rounded-full bg-background/50 hover:bg-gold hover:text-background transition-colors"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
              {/* Click-to-set focal point */}
              <div className="relative w-full overflow-hidden rounded-xl border border-border/60 bg-background/40 select-none">
                <div className="relative w-full cursor-crosshair" onClick={pickFocal}>
                  <img
                    src={currentAboutImg}
                    alt="Focal point preview"
                    className="block w-full h-auto max-h-[60vh] object-contain mx-auto pointer-events-none"
                  />
                  <div
                    className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-gold bg-gold/30 shadow-glow pointer-events-none"
                    style={{ left: `${focalX}%`, top: `${focalY}%` }}
                  >
                    <div className="absolute inset-1 rounded-full bg-gold" />
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-muted-foreground px-3 py-2 border-t border-border/60">
                  Click on the part of the image that must always stay visible.
                </p>
              </div>

              {/* Live preview at the same aspect ratio the user side uses */}
              <div className="flex flex-col items-center gap-2 w-44 shrink-0">
                <div className="w-44 h-64 rounded-xl overflow-hidden border border-gold/40 bg-background/40">
                  <img
                    src={currentAboutImg}
                    alt="Crop preview"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: `${focalX}% ${focalY}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">User-side preview</span>
                <span className="text-[10px] text-gold">{focalX}% / {focalY}%</span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 items-center justify-between">
              <button
                type="button"
                onClick={() => { setFocalX(50); setFocalY(50); }}
                className="text-[10px] md:text-xs px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground"
              >
                Reset to center
              </button>
              <button
                type="button"
                onClick={() => setFocalOpen(false)}
                className="text-[10px] md:text-xs px-4 py-2 rounded-full bg-gold text-background font-bold uppercase tracking-widest hover:scale-105 transition-all"
              >
                Done
              </button>
            </div>

            <p className="mt-4 text-[10px] text-muted-foreground">
              Remember to click <span className="text-gold font-bold">Save Changes</span> to publish the new crop.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
