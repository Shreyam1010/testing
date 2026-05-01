import { useState } from "react";
import { Save, Languages, User as UserIcon } from "lucide-react";

export function AboutEditor() {
  const [formData, setFormData] = useState({
    title_en: "Our Story",
    title_kn: "ನಮ್ಮ ಕಥೆ",
    bio_en: "Founded on the principles of the ancient Gurukula system, Kathe Gaararu is more than a school. It is a living sanctuary for Yakshagana.",
    bio_kn: "ಪ್ರಾಚೀನ ಗುರುಕುಲ ಪದ್ಧತಿಯ ತತ್ವಗಳ ಮೇಲೆ ಸ್ಥಾಪಿತವಾದ ಕಥೆಗಾರರು ಕೇವಲ ಶಾಲೆಯಲ್ಲ. ಇದು ಯಕ್ಷಗಾನದ ಜೀವಂತ ತಾಣ.",
  });

  return (
    <div className="max-w-5xl space-y-12 pb-20">
      <div className="flex items-center justify-between border-b border-border pb-8">
        <div>
          <h2 className="text-3xl font-display text-primary">About Us / Story</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your mission statement and brand narrative.</p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-gold text-background rounded-full font-bold shadow-glow hover:scale-105 transition-all">
          <Save className="w-5 h-5" />
          Update Story
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold uppercase">EN</span>
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/50">English Narrative</h4>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Mission Title</label>
              <input 
                type="text" 
                value={formData.title_en}
                onChange={(e) => setFormData({...formData, title_en: e.target.value})}
                className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all font-display text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Main Story Content</label>
              <textarea 
                rows={8}
                value={formData.bio_en}
                onChange={(e) => setFormData({...formData, bio_en: e.target.value})}
                className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[10px] font-bold uppercase">KN</span>
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/50">Kannada Translation</h4>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-primary transition-all">
              <Languages className="w-4 h-4" />
              Auto-Translate
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Mission Title (KN)</label>
              <input 
                type="text" 
                value={formData.title_kn}
                onChange={(e) => setFormData({...formData, title_kn: e.target.value})}
                className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all font-display text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Story Content (KN)</label>
              <textarea 
                rows={8}
                value={formData.bio_kn}
                onChange={(e) => setFormData({...formData, bio_kn: e.target.value})}
                className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
