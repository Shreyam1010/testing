import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Loader2, Save, Check } from "lucide-react";

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
  const [sent, setSent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const defaults = {
    en: {
      title: "Visit & Connect",
      subtitle: "We welcome students, scholars, and lovers of the art",
      address: "Kathe Gaararu Cultural Centre, Udupi, Karnataka, India",
      phone: "+91 98765 43210",
      email: "info@kathegaararu.com",
      formName: "Your Name",
      formEmail: "Email Address",
      formMessage: "Your Message",
      formSubmit: "Send Message",
      formSent: "Thank you — we will be in touch.",
    },
    kn: {
      title: "ಭೇಟಿ ಮತ್ತು ಸಂಪರ್ಕ",
      subtitle: "ವಿದ್ಯಾರ್ಥಿಗಳು, ವಿದ್ವಾಂಸರು ಮತ್ತು ಕಲಾಪ್ರೇಮಿಗಳಿಗೆ ಸ್ವಾಗತ",
      address: "ಕಥೆ ಗಾರಾರು ಸಾಂಸ್ಕೃತಿಕ ಕೇಂದ್ರ, ಉಡುಪಿ, ಕರ್ನಾಟಕ, ಭಾರತ",
      phone: "+೯೧ ೯೮೭೬೫ ೪೩೨೧೦",
      email: "info@kathegaararu.com",
      formName: "ನಿಮ್ಮ ಹೆಸರು",
      formEmail: "ಇಮೇಲ್ ವಿಳಾಸ",
      formMessage: "ನಿಮ್ಮ ಸಂದೇಶ",
      formSubmit: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
      formSent: "ಧನ್ಯವಾದ — ನಾವು ಸಂಪರ್ಕದಲ್ಲಿರುತ್ತೇವೆ.",
    },
  };

  const [data, setData] = useState(defaults[lang]);

  const update = (field: string, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await fetch("http://localhost:8787/api/save", {
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

  const contactItems = [
    { Icon: MapPin, label: "Address", value: data.address, field: "address" },
    { Icon: Phone, label: "Phone", value: data.phone, field: "phone" },
    { Icon: Mail, label: "Email", value: data.email, field: "email" },
  ];

  /* ── Exact replica of contact.tsx (lines 27-109) ── */
  return (
    <section className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="ornament-divider w-24 mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl font-display mb-4">
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

      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {contactItems.map((c, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border hover:border-gold/40 transition"
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
                    value={c.value}
                    onChange={(v) => update(c.field, v)}
                    isEditing={isEditing}
                    tag="span"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="p-7 rounded-2xl bg-card border border-border space-y-4"
        >
          <input
            required
            maxLength={100}
            placeholder={data.formName}
            className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border focus:border-gold focus:outline-none transition"
          />
          <input
            required
            type="email"
            maxLength={255}
            placeholder={data.formEmail}
            className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border focus:border-gold focus:outline-none transition"
          />
          <textarea
            required
            maxLength={1000}
            rows={5}
            placeholder={data.formMessage}
            className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border focus:border-gold focus:outline-none transition resize-none"
          />
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-background font-medium hover:scale-[1.02] transition shadow-glow"
          >
            <Send className="w-4 h-4" />
            {sent ? data.formSent : data.formSubmit}
          </button>
        </motion.form>
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
