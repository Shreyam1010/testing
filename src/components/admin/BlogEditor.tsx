import { useState } from "react";
import { Save, Languages, Plus, Trash2, Calendar, User } from "lucide-react";
import { blogs } from "@/lib/data";

export function BlogEditor() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="max-w-6xl space-y-12 pb-20">
      <div className="flex items-center justify-between border-b border-border pb-8">
        <div>
          <h2 className="text-3xl font-display text-primary">Insights & Stories</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your blog posts and cultural articles.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-3 px-8 py-4 bg-gold text-background rounded-full font-bold shadow-glow hover:scale-105 transition-all"
        >
          {isAdding ? "Cancel Editing" : <><Plus className="w-5 h-5" /> New Article</>}
        </button>
      </div>

      {isAdding ? (
        <ArticleForm onSave={() => setIsAdding(false)} />
      ) : (
        <div className="grid gap-6">
          {blogs.map((post) => (
            <div key={post.id} className="group flex items-center justify-between p-6 bg-card/40 border border-border rounded-3xl hover:border-gold/30 transition-all shadow-xl">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 rounded-2xl bg-muted overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-gold/40 text-xs font-bold uppercase">Image</div>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold rounded-full uppercase tracking-widest">{post.category.en}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                  </div>
                  <h3 className="text-xl font-display text-primary">{post.title.en}</h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <User className="w-3.5 h-3.5 text-gold" /> {post.author.en}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="px-6 py-2.5 rounded-xl border border-border hover:border-gold/50 text-gold text-xs font-bold transition-all">Edit Post</button>
                <button className="p-2.5 rounded-xl border border-border hover:border-red-500/50 text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ArticleForm({ onSave }: { onSave: () => void }) {
  return (
    <div className="grid lg:grid-cols-2 gap-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest">English</span>
          <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-widest">Article Body</h3>
        </div>
        
        <div className="space-y-6">
          <input className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all font-display text-lg" placeholder="Article Title..." />
          <textarea rows={12} className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all resize-none leading-relaxed" placeholder="Write your story here..." />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-[10px] font-bold uppercase tracking-widest">Kannada</span>
            <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-widest">Translation</h3>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-primary transition-all">
            <Languages className="w-4 h-4" />
            Auto-Translate
          </button>
        </div>
        
        <div className="space-y-6">
          <input className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all font-display text-lg" placeholder="ಶೀರ್ಷಿಕೆ ಬರೆಯಿರಿ..." />
          <textarea rows={12} className="w-full bg-card/50 border border-border rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all resize-none leading-relaxed" placeholder="ಕಥೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..." />
        </div>
      </div>

      <div className="lg:col-span-2 pt-12 border-t border-border flex justify-end gap-6">
        <button onClick={onSave} className="px-8 py-4 border border-border rounded-full font-bold text-muted-foreground hover:bg-white/5 transition-all">Discard Draft</button>
        <button onClick={onSave} className="flex items-center gap-3 px-12 py-4 bg-gold text-background rounded-full font-bold shadow-glow hover:scale-105 transition-all">
          <Save className="w-5 h-5" />
          Publish Story
        </button>
      </div>
    </div>
  );
}
