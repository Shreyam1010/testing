import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";

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
  tag?: "span" | "h1" | "p" | "div";
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

export function ContactEditor({ isEditing, lang }: ContactEditorProps) {
  const [data, setData] = useState({
    en: {
      title: "Contact Us",
      subtitle: "Reach out to enroll, visit, or collaborate.",
      address: "Kathe Gaararu Cultural Centre, Udupi, Karnataka, India",
      phone: "+91 98765 43210",
      email: "info@kathegaararu.com",
      form: {
        name: "Full Name",
        email: "Email Address",
        message: "Your Message",
        submit: "Send Message"
      }
    },
    kn: {
      title: "ಸಂಪರ್ಕಿಸಿ",
      subtitle: "ದಾಖಲಾತಿ, ಭೇಟಿ ಅಥವಾ ಸಹಯೋಗಕ್ಕಾಗಿ ಸಂಪರ್ಕಿಸಿ.",
      address: "ಕಥೆಗಾರರು ಸಾಂಸ್ಕೃತಿಕ ಕೇಂದ್ರ, ಉಡುಪಿ, ಕರ್ನಾಟಕ, ಭಾರತ",
      phone: "+೯೧ ೯೮೭೬೫ ೪೩೨೧೦",
      email: "info@kathegaararu.com",
      form: {
        name: "ಪೂರ್ಣ ಹೆಸರು",
        email: "ಇಮೇಲ್ ವಿಳಾಸ",
        message: "ನಿಮ್ಮ ಸಂದೇಶ",
        submit: "ಸಂದೇಶ ಕಳುಹಿಸಿ"
      }
    }
  });

  const current = data[lang];

  const update = (field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const updateForm = (field: string, value: string) => {
    update("form", { ...current.form, [field]: value });
  };

  return (
    <section className="container mx-auto px-6 py-20 bg-[#050505] min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="ornament-divider w-24 mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl font-display mb-4">
          <EditableText
            value={current.title}
            onChange={(v) => update("title", v)}
            isEditing={isEditing}
            tag="h1"
          />
        </h1>
        <p className="text-muted-foreground">
          <EditableText
            value={current.subtitle}
            onChange={(v) => update("subtitle", v)}
            isEditing={isEditing}
          />
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {[
            { Icon: MapPin, label: "Address", field: "address" as const },
            { Icon: Phone, label: "Phone", field: "phone" as const },
            { Icon: Mail, label: "Email", field: "email" as const },
          ].map((c, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl bg-[#0a0a0a] border border-border hover:border-gold/40 transition"
            >
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <c.Icon className="w-5 h-5 text-background" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {c.label}
                </div>
                <div className="text-foreground">
                  <EditableText
                    value={current[c.field]}
                    onChange={(v) => update(c.field, v)}
                    isEditing={isEditing}
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-7 rounded-2xl bg-[#0a0a0a] border border-border space-y-4"
        >
          <div className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border text-muted-foreground">
            <EditableText
              value={current.form.name}
              onChange={(v) => updateForm("name", v)}
              isEditing={isEditing}
            />
          </div>
          <div className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border text-muted-foreground">
            <EditableText
              value={current.form.email}
              onChange={(v) => updateForm("email", v)}
              isEditing={isEditing}
            />
          </div>
          <div className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border text-muted-foreground min-h-[120px]">
            <EditableText
              value={current.form.message}
              onChange={(v) => updateForm("message", v)}
              isEditing={isEditing}
              tag="p"
            />
          </div>
          <button
            disabled
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-background font-medium shadow-glow opacity-90"
          >
            <Send className="w-4 h-4" />
            <EditableText
              value={current.form.submit}
              onChange={(v) => updateForm("submit", v)}
              isEditing={isEditing}
            />
          </button>
          {isEditing && (
             <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest mt-2">Form placeholders are editable</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
