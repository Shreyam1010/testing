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
  const [sent, setSent] = useState(false);

  return (
    <Layout>
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display mb-4">{t.contact.title}</h1>
          <p className="text-muted-foreground">{t.contact.subtitle}</p>
        </motion.div>

        {/* Mobile View */}
        <div className="block md:hidden max-w-sm mx-auto space-y-12">
          {/* Grid of Circular Icons */}
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 justify-items-center">
            {/* 1. Services */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-[oklch(0.2_0.05_20)] shadow-glow">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Services</span>
            </div>

            {/* 2. Performances */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-[oklch(0.2_0.05_20)] shadow-glow">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Performances</span>
            </div>

            {/* 3. Workshop */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-[oklch(0.2_0.05_20)] shadow-glow">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Workshop</span>
            </div>

            {/* 4. General */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-[oklch(0.2_0.05_20)] shadow-glow">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">General</span>
            </div>

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
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Call / WhatsApp</span>
              <div className="text-gold text-xl font-display mt-1">+91 98765 43210</div>
            </div>
            <button className="w-full py-3 bg-gold text-background rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-glow">
              <Mail className="w-4 h-4" /> Message Us
            </button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block max-w-6xl mx-auto">
          {/* Grid for 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {/* Phone 1: Services */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px]">
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <Phone className="w-5 h-5 text-background" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Phone (For Services)
                </div>
                <div className="text-foreground">+91 98765 43210</div>
              </div>
            </div>

            {/* Phone 2: Performances */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px]">
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <Phone className="w-5 h-5 text-background" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Phone (For Performances)
                </div>
                <div className="text-foreground">+91 98765 43211</div>
              </div>
            </div>

            {/* Phone 3: Workshop */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px]">
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <Phone className="w-5 h-5 text-background" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Phone (For Workshop)
                </div>
                <div className="text-foreground">+91 98765 43212</div>
              </div>
            </div>

            {/* Phone 4: General */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px]">
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <Phone className="w-5 h-5 text-background" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Phone (General)
                </div>
                <div className="text-foreground">+91 98765 43213</div>
              </div>
            </div>

            {/* Mail */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-gold/40 transition w-full max-w-[360px]">
              <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-glow">
                <Mail className="w-5 h-5 text-background" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Email
                </div>
                <div className="text-foreground">{t.contact.email}</div>
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
                <div className="text-foreground">{t.contact.address}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
