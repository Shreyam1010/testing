import { useState } from "react";
import { Save, Languages, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export function HeroEditor() {
  const [formData, setFormData] = useState({
    title_en: "The Living Art of Yakshagana",
    title_kn: "ಯಕ್ಷಗಾನದ ಜೀವಂತ ಕಲೆ",
    subtitle_en: "An immersive cultural sanctuary where traditional theatre, music, and dance unite.",
    subtitle_kn: "ಸಾಂಪ್ರದಾಯಿಕ ರಂಗಭೂಮಿ, ಸಂಗೀತ ಮತ್ತು ನೃತ್ಯ ಒಂದಾಗುವ ತಾಣ.",
  });

  return (
    <div className="max-w-5xl space-y-12 pb-20">
      <div className="flex items-center justify-between border-b border-border pb-8">
        <div>
          <h2 className="text-3xl font-display text-primary">Hero Section</h2>
          <p className="text-sm text-muted-foreground mt-1">First impressions matter. Edit your landing experience here.</p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-gold text-background rounded-full font-bold shadow-glow hover:scale-105 transition-all">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* ENGLISH CONTENT */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold uppercase">EN</span>
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/50">English Version</h4>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Main Heading</label>
              <input 
                type="text" 
                value={formData.title_en}
                onChange={(e) => setFormData({...formData, title_en: e.target.value})}
                className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all font-display text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Sub-headline</label>
              <textarea 
                rows={4}
                value={formData.subtitle_en}
                onChange={(e) => setFormData({...formData, subtitle_en: e.target.value})}
                className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* KANNADA CONTENT */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[10px] font-bold uppercase">KN</span>
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/50">Kannada Version</h4>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-primary transition-all">
              <Languages className="w-4 h-4" />
              Auto-Translate
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Main Heading (KN)</label>
              <input 
                type="text" 
                value={formData.title_kn}
                onChange={(e) => setFormData({...formData, title_kn: e.target.value})}
                className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all font-display text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Sub-headline (KN)</label>
              <textarea 
                rows={4}
                value={formData.subtitle_kn}
                onChange={(e) => setFormData({...formData, subtitle_kn: e.target.value})}
                className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MEDIA MANAGER */}
      <div className="bg-card/30 border border-border rounded-3xl p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
            <ImageIcon className="text-gold w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-display text-primary">Background Media</h4>
            <p className="text-sm text-muted-foreground">Manage your high-resolution hero imagery.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-border group">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-6 py-2 bg-gold text-background rounded-full font-bold text-xs uppercase tracking-widest shadow-glow">Change Image</button>
            </div>
            <div className="w-full h-full bg-gold/5 flex items-center justify-center text-gold/30 italic text-sm">Hero Image Preview</div>
          </div>
          <div className="space-y-4 flex flex-col justify-center">
            <div className="p-4 bg-background/50 border border-border rounded-xl">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Recommended Specs</p>
              <p className="text-sm text-foreground/80">1920x1080px • Aspect Ratio 16:9 • Under 2MB</p>
            </div>
            <button className="w-full py-4 border border-border rounded-xl text-sm font-bold text-foreground/60 hover:bg-white/5 transition-all">
              Upload New Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
