import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { User, Clock, Camera } from "lucide-react";
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
  tag?: "span" | "h3" | "p" | "div";
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

export function EventsEditor({ isEditing, lang }: EventsEditorProps) {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [data, setData] = useState({
    en: {
      title: "Upcoming Events",
      events: [
        {
          title: "Bhagavata Padya (Vocal)",
          teacher: "Vid. Keremane Shivarama",
          time: "Saturdays, 6:00 PM",
          image: g2,
          badge: "NEXT CLASS",
          status: "booking",
          buttonText: "BOOKING"
        },
        {
          title: "Chande Rhythms",
          teacher: "Chittani Subrahmanya",
          time: "Sundays, 10:00 AM",
          image: g5,
          status: "booking",
          buttonText: "BOOKING"
        },
        {
          title: "Stree Vesha Abhinaya",
          teacher: "Hegde Parameshwar",
          time: "Wednesdays, 7:00 PM",
          image: g4,
          status: "coming_soon",
          buttonText: "COMING SOON"
        },
        {
          title: "Rakshasa Vesha Makeup",
          teacher: "Bannada Malinga",
          time: "Fridays, 6:30 PM",
          image: g1,
          status: "coming_soon",
          buttonText: "COMING SOON"
        }
      ]
    },
    kn: {
      title: "ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು",
      events: [
        {
          title: "ಭಾಗವತ ಪದ್ಯ (ಗಾಯನ)",
          teacher: "ವಿದ್ವಾನ್ ಕೆರೆಮನೆ ಶಿವರಾಮ",
          time: "ಶನಿವಾರ, ಸಂಜೆ ೬:೦೦",
          image: g2,
          badge: "ಮುಂದಿನ ತರಗತಿ",
          status: "booking",
          buttonText: "ಬುಕಿಂಗ್"
        },
        {
          title: "ಚಂಡೆ ಲಯಗಳು",
          teacher: "ಚಿಟ್ಟಾಣಿ ಸುಬ್ರಹ್ಮಣ್ಯ",
          time: "ಭಾನುವಾರ, ಬೆಳಗ್ಗೆ ೧೦:೦೦",
          image: g5,
          status: "booking",
          buttonText: "ಬುಕಿಂಗ್"
        },
        {
          title: "ಸ್ತ್ರೀ ವೇಷ ಅಭಿನಯ",
          teacher: "ಹೆಗ್ಡೆ ಪರಮೇಶ್ವರ್",
          time: "ಬುಧವಾರ, ಸಂಜೆ ೭:೦೦",
          image: g4,
          status: "coming_soon",
          buttonText: "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ"
        },
        {
          title: "ರಾಕ್ಷಸ ವೇಷ ಬಣ್ಣಗಾರಿಕೆ",
          teacher: "ಬಣ್ಣದ ಮಾಲಿಂಗ",
          time: "ಶುಕ್ರವಾರ, ಸಂಜೆ ೬:೩೦",
          image: g1,
          status: "coming_soon",
          buttonText: "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ"
        }
      ]
    }
  });

  const current = data[lang];

  const update = (field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const updateEvent = (index: number, field: string, value: string) => {
    const newEvents = [...current.events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    update("events", newEvents);
  };

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newEvents = [...current.events];
      newEvents[index] = { ...newEvents[index], image: url };
      update("events", newEvents);
    }
  };

  return (
    <section className="container mx-auto px-6 py-24 bg-[#050505]">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-display mb-4 text-primary">
          <EditableText
            value={current.title}
            onChange={(v) => update("title", v)}
            isEditing={isEditing}
          />
        </h2>
        <div className="ornament-divider w-24 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {current.events.map((ev, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative bg-[#0a0a0a] border border-border/50 rounded-lg overflow-hidden transition-all hover:border-gold/40 flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={ev.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              
              {ev.badge && (
                <span className="absolute top-4 right-4 bg-gold text-[#0a0a0a] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                  <EditableText
                    value={ev.badge}
                    onChange={(v) => updateEvent(i, "badge", v)}
                    isEditing={isEditing}
                  />
                </span>
              )}

              {isEditing && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                  <button 
                    onClick={() => fileInputRefs.current[i]?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-gold text-background rounded-full font-bold text-[10px] uppercase tracking-widest shadow-glow"
                  >
                    <Camera className="w-3 h-3" />
                    Replace Image
                  </button>
                  <input 
                    type="file" 
                    ref={el => fileInputRefs.current[i] = el}
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleImageChange(i, e)}
                  />
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-display text-xl text-primary mb-4 leading-tight">
                <EditableText
                  value={ev.title}
                  onChange={(v) => updateEvent(i, "title", v)}
                  isEditing={isEditing}
                  tag="h3"
                />
              </h3>

              <div className="space-y-3 text-sm text-foreground/70 mb-8 flex-grow">
                <div className="flex items-center gap-3">
                  <User size={14} className="text-gold shrink-0" />
                  <EditableText
                    value={ev.teacher}
                    onChange={(v) => updateEvent(i, "teacher", v)}
                    isEditing={isEditing}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={14} className="text-gold shrink-0" />
                  <EditableText
                    value={ev.time}
                    onChange={(v) => updateEvent(i, "time", v)}
                    isEditing={isEditing}
                  />
                </div>
              </div>

              <div className={`block w-full text-center py-3 px-4 border text-xs font-bold uppercase tracking-widest rounded-sm ${
                ev.status === "booking" 
                ? "border-border/50 text-primary hover:border-gold/50 hover:bg-gold/5" 
                : "border-border/30 text-foreground/40 bg-background/20"
              }`}>
                <EditableText
                  value={ev.buttonText}
                  onChange={(v) => updateEvent(i, "buttonText", v)}
                  isEditing={isEditing}
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
