import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import { useDbContent } from "@/hooks/useDb";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Kathe Gaararu — Visit & Connect" },
      {
        name: "description",
        content: "Get in touch with Kathe Gaararu — visit our cultural centre in Udupi, Karnataka.",
      },
      { property: "og:title", content: "Contact Us" },
      { property: "og:description", content: "Reach out to enroll, visit, or collaborate." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useLang();
  const { data } = useDbContent();
  const [sent, setSent] = useState(false);

  const contactMap = data?.siteContentMap?.contact || {};
  const cTitle = contactMap.title || t.contact.title;
  const cSubtitle = contactMap.subtitle || t.contact.subtitle;
  const cAddress = contactMap.address || t.contact.address;
  const cEmail = contactMap.email || t.contact.email;
  const cPhoneClasses = "+91 96209 87378";
  const cPhonePerf = "+91 97415 08468";
  const cPhoneWorkshop = "+91 97415 08468";
  const cPhoneGeneral = "+91 96111 34810";
  const cPhonePrimary = cPhoneGeneral;

  return (
    <Layout>
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display mb-4">{cTitle}</h1>
          <p className="text-muted-foreground">{cSubtitle}</p>
        </motion.div>

        {/* Mobile View */}
        <div className="block md:hidden max-w-sm mx-auto space-y-12">
          {/* Grid of Circular Icons */}
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 justify-items-center">
            {/* 1. Classes */}
            <a href="https://wa.me/919620987378" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-gold shadow-glow">
                <WhatsappIcon className="w-6 h-6 text-black" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold transition-colors">Classes</span>
            </a>

            {/* 2. Performances */}
            <a href="https://wa.me/919741508468" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-gold shadow-glow">
                <WhatsappIcon className="w-6 h-6 text-black" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold transition-colors">Performances</span>
            </a>

            {/* 3. Workshop */}
            <a href="https://wa.me/919741508468" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-gold shadow-glow">
                <WhatsappIcon className="w-6 h-6 text-black" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold transition-colors">Workshop</span>
            </a>

            {/* 4. General */}
            <a href="tel:9611134810" className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-gold shadow-glow">
                <Phone className="w-6 h-6 text-background" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold transition-colors">General</span>
            </a>

            {/* 5. Email */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-[oklch(0.2_0.05_20)] shadow-glow">
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Email</span>
            </div>

            {/* 6. Address */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-[oklch(0.2_0.05_20)] shadow-glow">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Address</span>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="bg-card/50 border border-border p-6 rounded-3xl space-y-4 text-center">
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Call Us</span>
              <div className="text-gold text-xl font-display mt-1">{cPhonePrimary}</div>
            </div>
            <button className="w-full py-3 bg-gold text-background rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-glow">
              <Mail className="w-4 h-4" /> Contact Us
            </button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block max-w-6xl mx-auto">
          {/* Grid for 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {/* Phone 1: Classes */}
            <a href="https://wa.me/919620987378" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px] group">
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <WhatsappIcon className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  WhatsApp (For Classes)
                </div>
                <div className="text-foreground transition-colors group-hover:text-gold">{cPhoneClasses}</div>
              </div>
            </a>

            {/* Phone 2: Performances */}
            <a href="https://wa.me/919741508468" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px] group">
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <WhatsappIcon className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  WhatsApp (For Performances)
                </div>
                <div className="text-foreground transition-colors group-hover:text-gold">{cPhonePerf}</div>
              </div>
            </a>

            {/* Phone 3: Workshop */}
            <a href="https://wa.me/919741508468" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px] group">
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <WhatsappIcon className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  WhatsApp (For Workshop)
                </div>
                <div className="text-foreground transition-colors group-hover:text-gold">{cPhoneWorkshop}</div>
              </div>
            </a>

            {/* Phone 4: General */}
            <a href="tel:9611134810" className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px] group">
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <Phone className="w-5 h-5 text-background" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Phone (General)
                </div>
                <div className="text-foreground transition-colors group-hover:text-gold">{cPhoneGeneral}</div>
              </div>
            </a>

            {/* Mail */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px]">
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <Mail className="w-5 h-5 text-background" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Email
                </div>
                <div className="text-foreground">{cEmail}</div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px]">
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <MapPin className="w-5 h-5 text-background" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Address
                </div>
                <div className="text-foreground">{cAddress}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
