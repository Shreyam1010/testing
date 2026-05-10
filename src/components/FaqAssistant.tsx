import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useDbContent } from "@/hooks/useDb";
import { useLang } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoImg from "@/assets/logo-transparent.png";

interface FaqAssistantProps {
  blogId?: string | null;
}

export function FaqAssistant({ blogId = null }: FaqAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading } = useDbContent();
  const { lang } = useLang();

  // Filter FAQs based on context (home or specific blog)
  const filteredFaqs = data?.faqs?.filter((f: any) => 
    blogId ? f.blogId === blogId : !f.blogId
  ) || [];

  const t = {
    en: {
      title: "Kathe Gaararu Assistant",
      subtitle: "Frequently Asked Questions",
      empty: "No FAQs available for this section.",
    },
    kn: {
      title: "ಕಥೆಗಾರರು ಸಹಾಯಕ",
      subtitle: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
      empty: "ಈ ವಿಭಾಗಕ್ಕೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು ಲಭ್ಯವಿಲ್ಲ.",
    }
  };

  const labels = t[lang as keyof typeof t] || t.en;

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop Blur Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/40 backdrop-blur-sm z-[190]"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-[200]">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 sm:w-14 sm:h-14 bg-gold rounded-full shadow-glow flex items-center justify-center text-background transition-colors hover:bg-gold-soft z-[201] relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:w-[380px] max-h-[70vh] bg-card/95 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col z-[200]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-br from-crimson/10 to-card border-b border-white/5 relative shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-xl flex items-center justify-center border border-gold/20">
                  <img src={logoImg} alt="Logo" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg text-gold leading-tight">{labels.title}</h3>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    {labels.subtitle}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-muted-foreground hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-3">
                  {filteredFaqs.map((faq: any, i: number) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={`item-${i}`}
                      className="border border-white/5 bg-white/5 rounded-xl px-4 overflow-hidden hover:bg-white/[0.08] transition-colors"
                    >
                      <AccordionTrigger className="text-left text-sm sm:text-base font-medium py-4 hover:no-underline text-foreground/90 group leading-snug">
                        <span className="flex-1 pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12 text-muted-foreground text-sm italic">
                  {labels.empty}
                </div>
              )}
            </div>

            {/* Bottom Chevron Decoration */}
            <div className="flex justify-center py-2 bg-card/50 border-t border-white/5">
              <ChevronDown className="text-gold/30 animate-bounce" size={20} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
