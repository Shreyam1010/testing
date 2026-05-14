import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Loader2, Save, Check } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { useAdminSave } from "@/hooks/useAdminSave";

interface ContactEditorProps {
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

export function ContactEditor({ isEditing, lang }: ContactEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const defaults = {
    en: {
      title: "Visit & Connect",
      subtitle: "We welcome students, scholars, and lovers of the art",
      address: "Kathe Gaararu Cultural Centre, Udupi, Karnataka, India",
      phone_services: "+91 98765 43210",
      phone_performances: "+91 98765 43211",
      phone_workshop: "+91 98765 43212",
      phone_general: "+91 98765 43213",
      email: "info@kathegaararu.com",
    },
    kn: {
      title: "ಭೇಟಿ ಮತ್ತು ಸಂಪರ್ಕ",
      subtitle: "ವಿದ್ಯಾರ್ಥಿಗಳು, ವಿದ್ವಾಂಸರು ಮತ್ತು ಕಲಾಪ್ರೇಮಿಗಳಿಗೆ ಸ್ವಾಗತ",
      address: "ಕಥೆ ಗಾರಾರು ಸಾಂಸ್ಕೃತಿಕ ಕೇಂದ್ರ, ಉಡುಪಿ, ಕರ್ನಾಟಕ, ಭಾರತ",
      phone_services: "+91 98765 43210",
      phone_performances: "+91 98765 43211",
      phone_workshop: "+91 98765 43212",
      phone_general: "+91 98765 43213",
      email: "info@kathegaararu.com",
    },
  };

  const [data, setData] = useState<Record<string, string>>(defaults[lang]);

  useEffect(() => {
    fetch(apiUrl(`/api/content?lang=${lang}`))
      .then((r) => r.json())
      .then((raw) => {
        const map: Record<string, string> = {};
        (raw.siteContent || []).forEach((row: any) => {
          if (row.section === "contact") map[row.content_key] = row.content_value;
        });
        setData({ ...defaults[lang], ...map });
      })
      .catch((err) => console.error("[ContactEditor] fetch failed", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const update = (field: string, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await fetch(apiUrl("/api/save"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "contact", lang, data }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  useAdminSave("contact", handleSave);

  const desktopItems = [
    { label: "Phone (For Services)", value: data.phone_services, field: "phone_services", icon: Phone },
    { label: "Phone (For Performances)", value: data.phone_performances, field: "phone_performances", icon: Phone },
    { label: "Phone (For Workshop)", value: data.phone_workshop, field: "phone_workshop", icon: Phone },
    { label: "Phone (General)", value: data.phone_general, field: "phone_general", icon: Phone },
    { label: "Email", value: data.email, field: "email", icon: Mail },
    { label: "Address", value: data.address, field: "address", icon: MapPin },
  ];

  const mobileItems = [
    { label: "Services", field: "phone_services", icon: Phone },
    { label: "Performances", field: "phone_performances", icon: Phone },
    { label: "Workshop", field: "phone_workshop", icon: Phone },
    { label: "General", field: "phone_general", icon: Phone },
    { label: "Email", field: "email", icon: Mail },
    { label: "Address", field: "address", icon: MapPin },
  ];

  return (
    <section className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="ornament-divider w-24 mx-auto mb-6" />
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-display mb-4">
          <EditableText
            value={data.title}
            onChange={(v) => update("title", v)}
            isEditing={isEditing}
            tag="span"
          />
        </h1>
        <p className="text-muted-foreground">
          <EditableText
            value={data.subtitle}
            onChange={(v) => update("subtitle", v)}
            isEditing={isEditing}
            tag="span"
          />
        </p>
      </motion.div>

      {/* Mobile View */}
      <div className="block md:hidden max-w-sm mx-auto space-y-12">
        <div className="grid grid-cols-3 gap-y-8 gap-x-4 justify-items-center">
          {mobileItems.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-[oklch(0.2_0.05_20)] shadow-glow">
                <item.icon className="w-6 h-6 text-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{item.label}</span>
              {isEditing && (
                <div className="text-[8px] text-gold/50 truncate max-w-[80px]">
                   <EditableText
                    value={(data as any)[item.field]}
                    onChange={(v) => update(item.field, v)}
                    isEditing={isEditing}
                    tag="span"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-card/50 border border-border p-6 rounded-3xl space-y-4 text-center">
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Main Contact</span>
            <div className="text-gold text-xl font-display mt-1">
              <EditableText
                value={data.phone_general}
                onChange={(v) => update("phone_general", v)}
                isEditing={isEditing}
                tag="span"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {desktopItems.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px]"
            >
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <item.icon className="w-5 h-5 text-background" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {item.label}
                </div>
                <div className="text-foreground">
                  <EditableText
                    value={item.value}
                    onChange={(v) => update(item.field, v)}
                    isEditing={isEditing}
                    tag="span"
                  />
                </div>
              </div>
            </div>
          ))}
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
                : "bg-gold text-background hover:scale-105"
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
