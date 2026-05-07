import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Trash2, Save, Check, 
  Loader2, HelpCircle, MessageSquare
} from "lucide-react";
import { useDbContent } from "@/hooks/useDb";

interface FaqItem {
  id: string;
  blogId: string | null;
  question: string;
  answer: string;
  orderIndex: number;
}

interface FaqManagerProps {
  lang: "en" | "kn";
  blogId?: string | null; // NULL for home page
  title?: string;
  subtitle?: string;
}

export function FaqManager({ lang, blogId = null, title = "FAQ MANAGER", subtitle = "Manage the questions and answers shown in the floating assistant." }: FaqManagerProps) {
  const { data, loading, refresh } = useDbContent();
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  useEffect(() => {
    if (data?.faqs) {
      // Initialize with all faqs, we'll filter for display but save all
      setFaqs([...data.faqs]);
    }
  }, [data]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Re-assign order indexes based on current list position to preserve the top-first order
    const orderedFaqs = faqs.map((f, i) => ({ ...f, orderIndex: i }));

    try {
      await fetch("http://127.0.0.1:5667/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "faqs", lang, data: orderedFaqs }),
      });
      setSaveSuccess(true);
      refresh();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const addFaq = () => {
    const newFaq: FaqItem = {
      id: `faq_${Date.now()}`,
      blogId: blogId,
      question: "",
      answer: "",
      orderIndex: -1, // Use -1 to identify new items that should be at the top
    };
    // Prepend to the list
    setFaqs([newFaq, ...faqs]);
  };

  const updateFaq = (id: string, field: keyof FaqItem, value: any) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const deleteFaq = (id: string) => {
    setFaqs(faqs.filter(f => f.id !== id));
  };

  // Only display FAQs matching the current context, sort by orderIndex (newest first for -1)
  const filteredFaqs = faqs
    .filter(f => f.blogId === blogId)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  if (loading) return null;

  return (
    <div className="mt-12 pt-12 border-t border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center border border-gold/20">
            <HelpCircle className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h2 className="text-xl font-display text-primary uppercase tracking-wider">{title}</h2>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
        </div>
        <button 
          onClick={addFaq}
          className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-lg text-gold text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-background transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card/40 border border-border/50 rounded-2xl p-6 relative group"
            >
              <button 
                onClick={() => deleteFaq(faq.id)}
                className="absolute top-6 right-6 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                   <span className="text-[10px] font-bold text-gold uppercase tracking-widest bg-gold/10 px-2 py-0.5 rounded">
                     {index + 1} Question
                   </span>
                </div>
                
                <input 
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-gold/50 transition-all text-foreground"
                  placeholder="e.g. How long does a project take?"
                />

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Answer</label>
                  <textarea 
                    value={faq.answer}
                    onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                    rows={3}
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm leading-relaxed outline-none focus:border-gold/50 transition-all text-muted-foreground"
                    placeholder="Type the answer here..."
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredFaqs.length === 0 && (
          <div className="py-12 text-center bg-card/20 rounded-2xl border border-dashed border-border/30">
            <MessageSquare className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-muted-foreground text-xs italic">No questions added yet.</p>
          </div>
        )}
      </div>

      {/* Save Button for this section */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-glow ${
            saveSuccess
              ? "bg-green-500 text-white"
              : "bg-primary text-background hover:scale-105"
          }`}
        >
          {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : saveSuccess ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />}
          {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save FAQs"}
        </button>
      </div>
    </div>
  );
}
