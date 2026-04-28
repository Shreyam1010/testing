import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Kathe Gaararu — Visit & Connect" },
      { name: "description", content: "Get in touch with Kathe Gaararu — visit our cultural centre in Udupi, Karnataka." },
      { property: "og:title", content: "Contact Us" },
      { property: "og:description", content: "Reach out to enroll, visit, or collaborate." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  return (
    <Layout>
      <section className="container mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-16">
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-display mb-4">{t.contact.title}</h1>
          <p className="text-muted-foreground">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {[
              { Icon: MapPin, label: "Address", value: t.contact.address },
              { Icon: Phone, label: "Phone", value: t.contact.phone },
              { Icon: Mail, label: "Email", value: t.contact.email },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border hover:border-gold/40 transition">
                <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                  <c.Icon className="w-5 h-5 text-background" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{c.label}</div>
                  <div className="text-foreground">{c.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="p-7 rounded-2xl bg-card border border-border space-y-4"
          >
            <input
              required maxLength={100}
              placeholder={t.contact.form.name}
              className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border focus:border-gold focus:outline-none transition"
            />
            <input
              required type="email" maxLength={255}
              placeholder={t.contact.form.email}
              className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border focus:border-gold focus:outline-none transition"
            />
            <textarea
              required maxLength={1000} rows={5}
              placeholder={t.contact.form.message}
              className="w-full px-4 py-3 rounded-lg bg-background/60 border border-border focus:border-gold focus:outline-none transition resize-none"
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-background font-medium hover:scale-[1.02] transition shadow-glow"
            >
              <Send className="w-4 h-4" />
              {sent ? t.contact.form.sent : t.contact.form.submit}
            </button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
}
