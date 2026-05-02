import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Save, Check, Plus, Trash2, Edit3, X, User, Calendar, Image as ImageIcon } from "lucide-react";
import { blogs, BlogItem } from "@/lib/data";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const imgMap: Record<string, string> = { g1, g2, g4, g5, g6 };

interface BlogEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

export function BlogEditor({ isEditing, lang }: BlogEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [localBlogs, setLocalBlogs] = useState<BlogItem[]>(
    blogs.map((b) => ({
      ...b,
      title: { ...b.title },
      excerpt: { ...b.excerpt },
      content: { ...(b.content || b.excerpt) }, // Fallback to excerpt if content missing
      category: { ...b.category },
      author: { ...b.author },
    }))
  );

  const [editorData, setEditorData] = useState<BlogItem | null>(null);
  const [editorIndex, setEditorIndex] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (editorData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [editorData]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await fetch("http://localhost:8787/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "blogs", lang, data: localBlogs }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddBlog = () => {
    const newBlogTemplate: BlogItem = {
      id: `new-${Date.now()}`,
      title: { en: "", kn: "" },
      excerpt: { en: "", kn: "" },
      content: { en: "", kn: "" },
      category: { en: "Updates", kn: "ನವೀಕರಣಗಳು" },
      author: { en: "Admin", kn: "ನಿರ್ವಾಹಕರು" },
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: "g1",
      slug: `new-blog-${Date.now()}`,
    };
    setEditorData(newBlogTemplate);
    setEditorIndex(-1);
  };

  return (
    <section className="container mx-auto px-6 py-24 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <h2 className="text-4xl md:text-5xl font-display text-primary">
          {lang === "en" ? "Latest Insights" : "ಇತ್ತೀಚಿನ ಒಳನೋಟಗಳು"}
        </h2>
        {isEditing && (
          <button
            onClick={handleAddBlog}
            className="flex items-center gap-2 px-6 py-3 bg-gold/10 text-gold border border-gold/30 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-background transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Blog
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {localBlogs.map((post, i) => (
          <div
            key={post.id}
            className="group relative bg-card/40 border border-border rounded-2xl overflow-hidden hover:border-gold/50 transition-all flex flex-col"
          >
            {isEditing && (
              <>
                <button 
                  onClick={() => { setEditorData({...post}); setEditorIndex(i); }}
                  className="absolute top-4 left-4 z-10 w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setLocalBlogs(localBlogs.filter((_, idx) => idx !== i))}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </>
            )}
            
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image.startsWith('blob:') ? post.image : imgMap[post.image] || post.image}
                alt={post.title[lang]}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              {!isEditing && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white uppercase tracking-wider rounded-full">
                    {post.category[lang]}
                  </span>
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-display text-lg text-primary mb-3 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
                {post.title[lang] || "Untitled Blog"}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                {post.excerpt[lang] || "No summary provided."}
              </p>
              <div className="flex items-center text-gold text-[10px] font-bold uppercase tracking-widest mt-auto">
                {lang === "en" ? "Read Article" : "ಲೇಖನ ಓದಿ"}
                <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editorData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setEditorData(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto custom-scrollbar flex-1 relative">
                {/* Image Section */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full shrink-0 group">
                  <img 
                    src={editorData.image.startsWith('blob:') ? editorData.image : imgMap[editorData.image] || editorData.image} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <label className="cursor-pointer bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full backdrop-blur-md text-white font-bold flex items-center gap-2 transition">
                      <ImageIcon className="w-5 h-5" />
                      Change Cover Image
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={e => {
                          if (e.target.files?.[0]) {
                            setEditorData({ ...editorData, image: URL.createObjectURL(e.target.files[0]) });
                          }
                        }} 
                      />
                    </label>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-6 py-8 sm:px-12 sm:py-12 -mt-20 relative z-10 max-w-3xl mx-auto bg-card rounded-t-3xl border border-border shadow-2xl">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <input 
                      value={editorData.category[lang]} 
                      onChange={e => setEditorData({...editorData, category: {...editorData.category, [lang]: e.target.value}})}
                      className="px-4 py-2 bg-background border border-border rounded-full text-xs font-bold text-gold outline-none focus:border-gold/50"
                      placeholder="Category (e.g. History)"
                    />
                    <div className="flex items-center gap-2 text-muted-foreground bg-background border border-border px-4 py-2 rounded-full">
                      <User className="w-4 h-4 text-gold" />
                      <input 
                        value={editorData.author[lang]} 
                        onChange={e => setEditorData({...editorData, author: {...editorData.author, [lang]: e.target.value}})}
                        className="bg-transparent outline-none text-xs font-bold"
                        placeholder="Author Name"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground bg-background border border-border px-4 py-2 rounded-full">
                      <Calendar className="w-4 h-4 text-gold" />
                      <input 
                        value={editorData.date} 
                        onChange={e => setEditorData({...editorData, date: e.target.value})}
                        className="bg-transparent outline-none text-xs font-bold w-24"
                        placeholder="Date"
                      />
                    </div>
                  </div>

                  <textarea 
                    value={editorData.title[lang]}
                    onChange={e => setEditorData({...editorData, title: {...editorData.title, [lang]: e.target.value}})}
                    className="w-full text-3xl sm:text-4xl md:text-5xl font-display text-primary mb-8 bg-transparent outline-none resize-none overflow-hidden"
                    placeholder="Blog Title..."
                    rows={2}
                  />

                  <div className="space-y-8">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Excerpt (Summary)</label>
                      <textarea 
                        value={editorData.excerpt[lang]}
                        onChange={e => setEditorData({...editorData, excerpt: {...editorData.excerpt, [lang]: e.target.value}})}
                        className="w-full p-4 bg-background border border-border rounded-xl text-foreground/90 font-medium outline-none focus:border-gold/50 min-h-[100px] resize-y"
                        placeholder="Brief summary shown on the card..."
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Full Content</label>
                      <textarea 
                        value={editorData.content?.[lang] || ''}
                        onChange={e => setEditorData({...editorData, content: {...editorData.content, [lang]: e.target.value}})}
                        className="w-full p-4 bg-background border border-border rounded-xl text-muted-foreground outline-none focus:border-gold/50 min-h-[300px] resize-y"
                        placeholder="Write the full article content here..."
                      />
                    </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                    <button
                      onClick={() => {
                        if (editorIndex === -1) {
                          setLocalBlogs([editorData, ...localBlogs]);
                        } else {
                          const newBlogs = [...localBlogs];
                          newBlogs[editorIndex!] = editorData;
                          setLocalBlogs(newBlogs);
                        }
                        setEditorData(null);
                      }}
                      className="px-8 py-3 bg-gold text-background font-bold rounded-lg hover:scale-105 transition-transform uppercase tracking-widest text-xs"
                    >
                      Done Editing
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Save button — only visible in edit mode */}
      {isEditing && (
        <div className="fixed bottom-8 right-8 z-[90]">
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
