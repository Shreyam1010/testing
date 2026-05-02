import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Clock, Loader2, Save, Check, Plus, Trash2, Camera } from "lucide-react";
import g2 from "@/assets/gallery-2.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g1 from "@/assets/gallery-1.jpg";

interface EventsEditorProps {
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
  tag?: "span" | "p" | "div" | "h2" | "h3";
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

export function EventsEditor({ isEditing, lang }: EventsEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);

  const [events, setEvents] = useState<any[]>([
    {
      title: { en: "Bhagavata Padya (Vocal)", kn: "ಭಾಗವತ ಪದ್ಯ (ಗಾಯನ)" },
      teacher: { en: "Vid. Keremane Shivarama", kn: "ವಿದ್ವಾನ್ ಕೆರೆಮನೆ ಶಿವರಾಮ" },
      time: { en: "Saturdays, 6:00 PM", kn: "ಶನಿವಾರ, ಸಂಜೆ ೬:೦೦" },
      image: g2,
      badge: { en: "NEXT CLASS", kn: "ಮುಂದಿನ ತರಗತಿ" },
      status: "booking",
    },
    {
      title: { en: "Chande Rhythms", kn: "ಚಂಡೆ ಲಯಗಳು" },
      teacher: { en: "Chittani Subrahmanya", kn: "ಚಿಟ್ಟಾಣಿ ಸುಬ್ರಹ್ಮಣ್ಯ" },
      time: { en: "Sundays, 10:00 AM", kn: "ಭಾನುವಾರ, ಬೆಳಗ್ಗೆ ೧೦:೦೦" },
      image: g5,
      status: "booking",
    },
    {
      title: { en: "Stree Vesha Abhinaya", kn: "ಸ್ತ್ರೀ ವೇಷ ಅಭಿನಯ" },
      teacher: { en: "Hegde Parameshwar", kn: "ಹೆಗ್ಡೆ ಪರಮೇಶ್ವರ್" },
      time: { en: "Wednesdays, 7:00 PM", kn: "ಬುಧವಾರ, ಸಂಜೆ ೭:೦೦" },
      image: g4,
      status: "coming_soon",
    },
    {
      title: { en: "Rakshasa Vesha Makeup", kn: "ರಾಕ್ಷಸ ವೇಷ ಬಣ್ಣಗಾರಿಕೆ" },
      teacher: { en: "Bannada Malinga", kn: "ಬಣ್ಣದ ಮಾಲಿಂಗ" },
      time: { en: "Fridays, 6:30 PM", kn: "ಶುಕ್ರವಾರ, ಸಂಜೆ ೬:೩೦" },
      image: g1,
      status: "coming_soon",
    },
  ]);

  useEffect(() => {
    fetch(`http://localhost:8787/api/content?lang=${lang}`)
      .then((r) => r.json())
      .then((result) => {
        const evData = result.siteContent?.find((item: any) => item.section === "events");
        if (evData && evData.content_value) {
          try {
            const parsed = JSON.parse(evData.content_value);
            if (Array.isArray(parsed)) {
              setEvents(parsed);
            }
          } catch (e) {}
        }
      })
      .catch(() => {});
  }, [lang]);

  const updateEvent = (index: number, field: string, value: string) => {
    setEvents((prev) => {
      const copy = [...prev];
      const ev = { ...copy[index] };
      if (field === "title" || field === "teacher" || field === "time" || field === "badge") {
        (ev as any)[field] = { ...(ev as any)[field], [lang]: value };
      } else {
        (ev as any)[field] = value;
      }
      copy[index] = ev;
      return copy;
    });
  };

  const handleAddEvent = () => {
    setEvents((prev) => [
      ...prev,
      {
        title: { en: "New Event", kn: "ಹೊಸ ಕಾರ್ಯಕ್ರಮ" },
        teacher: { en: "Teacher Name", kn: "ಗುರುಗಳ ಹೆಸರು" },
        time: { en: "Date & Time", kn: "ದಿನಾಂಕ ಮತ್ತು ಸಮಯ" },
        image: g2,
        badge: { en: "", kn: "" },
        status: "coming_soon",
      },
    ]);
  };

  const handleDeleteEvent = (index: number) => {
    setEvents((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleStatus = (index: number) => {
    setEvents((prev) => {
      const copy = [...prev];
      copy[index] = { 
        ...copy[index], 
        status: copy[index].status === "booking" ? "coming_soon" : "booking" 
      };
      return copy;
    });
  };

  const handleImageClick = (index: number) => {
    setEditingImageIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingImageIndex !== null) {
      const url = URL.createObjectURL(file);
      updateEvent(editingImageIndex, "image", url);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await fetch("http://localhost:8787/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "events", lang, data: events }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="container mx-auto px-6 py-24">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center mb-12 relative">
        <h2 className="text-4xl md:text-5xl font-display mb-4 text-primary">
          <EditableText
            value={lang === "en" ? "Upcoming Events" : "ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು"}
            onChange={() => {}}
            isEditing={isEditing}
            tag="span"
          />
        </h2>
        <div className="ornament-divider w-24 mx-auto" />
        
        {isEditing && (
          <button
            onClick={handleAddEvent}
            className="absolute right-0 top-0 flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {events.map((ev, i) => (
            <motion.article
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-[#0a0a0a] border border-border/50 rounded-lg overflow-hidden transition-all hover:border-gold/40 flex flex-col"
            >
              {isEditing && (
                <button
                  onClick={() => handleDeleteEvent(i)}
                  className="absolute top-2 left-2 z-10 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-all"
                  title="Remove Event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                {(ev.badge?.[lang] || isEditing) && (
                  <span className="absolute top-4 right-4 z-10 bg-gold text-[#0a0a0a] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                    <EditableText
                      value={ev.badge?.[lang] || (isEditing ? "Badge Text" : "")}
                      onChange={(v) => updateEvent(i, "badge", v)}
                      isEditing={isEditing}
                    />
                  </span>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                    <button 
                      onClick={() => handleImageClick(i)}
                      className="flex items-center gap-2 px-4 py-2 bg-gold text-background rounded-full font-bold text-[10px] uppercase tracking-widest shadow-glow hover:scale-105 transition-all"
                    >
                      <Camera className="w-3 h-3" />
                      Replace
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-display text-xl text-primary mb-4 leading-tight">
                  <EditableText
                    value={ev.title[lang]}
                    onChange={(v) => updateEvent(i, "title", v)}
                    isEditing={isEditing}
                    tag="span"
                  />
                </h3>

                <div className="space-y-3 text-sm text-foreground/70 mb-8 flex-grow">
                  <div className="flex items-center gap-3">
                    <User size={14} className="text-gold shrink-0" />
                    <EditableText
                      value={ev.teacher[lang]}
                      onChange={(v) => updateEvent(i, "teacher", v)}
                      isEditing={isEditing}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="text-gold shrink-0" />
                    <EditableText
                      value={ev.time[lang]}
                      onChange={(v) => updateEvent(i, "time", v)}
                      isEditing={isEditing}
                    />
                  </div>
                </div>

                {ev.status === "booking" ? (
                  <div 
                    onClick={() => isEditing && toggleStatus(i)}
                    className={`block w-full text-center py-3 px-4 border border-border/50 text-xs font-bold uppercase tracking-widest text-primary hover:border-gold/50 hover:bg-gold/5 transition-colors rounded-sm ${isEditing ? "cursor-pointer" : "cursor-pointer"}`}
                  >
                    {lang === "en" ? "BOOKING" : "ಬುಕಿಂಗ್"}
                  </div>
                ) : (
                  <div 
                    onClick={() => isEditing && toggleStatus(i)}
                    className={`block w-full text-center py-3 px-4 border border-border/30 text-xs font-bold uppercase tracking-widest text-foreground/40 bg-background/20 rounded-sm ${isEditing ? "cursor-pointer hover:border-gold/50 hover:text-primary transition-colors" : "cursor-not-allowed"}`}
                  >
                    {lang === "en" ? "COMING SOON" : "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ"}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
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
