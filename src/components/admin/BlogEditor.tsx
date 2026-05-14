import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Save, Check, Plus, Trash2, Edit3, X, User, Calendar, Image as ImageIcon, Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote, Link2, Undo, Redo } from "lucide-react";
import { FaqManager } from "./FaqManager";
import { blogs, BlogItem } from "@/lib/data";
import { useDbContent } from "@/hooks/useDb";
import { uploadImage } from "@/lib/uploadImage";
import { apiUrl } from "@/lib/api";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const imgMap: Record<string, string> = { g1, g2, g4, g5, g6 };

function RichEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const exec = (cmd: string, val: string = "") => {
    document.execCommand(cmd, false, val);
  };

  return (
    <div className="w-full border border-border rounded-xl overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/30">
        <ToolbarButton icon={Bold} onClick={() => exec("bold")} title="Bold" />
        <ToolbarButton icon={Italic} onClick={() => exec("italic")} title="Italic" />
        <div className="w-[1px] h-4 bg-border mx-1" />
        <ToolbarButton icon={Heading1} onClick={() => exec("formatBlock", "H1")} title="H1" />
        <ToolbarButton icon={Heading2} onClick={() => exec("formatBlock", "H2")} title="H2" />
        <div className="w-[1px] h-4 bg-border mx-1" />
        <ToolbarButton icon={List} onClick={() => exec("insertUnorderedList")} title="Bullet List" />
        <ToolbarButton icon={ListOrdered} onClick={() => exec("insertOrderedList")} title="Numbered List" />
        <div className="w-[1px] h-4 bg-border mx-1" />
        <ToolbarButton icon={Quote} onClick={() => exec("formatBlock", "BLOCKQUOTE")} title="Quote" />
        <div className="w-[1px] h-4 bg-border mx-1" />
        <ToolbarButton 
          icon={Link2} 
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) exec("createLink", url);
          }} 
          title="Link" 
        />
        <div className="w-[1px] h-4 bg-border mx-1" />
        <ToolbarButton icon={Undo} onClick={() => exec("undo")} title="Undo" />
        <ToolbarButton icon={Redo} onClick={() => exec("redo")} title="Redo" />
      </div>

      {/* Editable Area */}
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange(e.currentTarget.innerHTML)}
        className="p-4 h-[400px] overflow-y-auto overscroll-auto outline-none prose prose-invert prose-gold max-w-none text-muted-foreground [&>h1]:text-2xl [&>h1]:font-display [&>h1]:text-primary [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-display [&>h2]:text-primary [&>h2]:mb-3 [&>blockquote]:border-l-2 [&>blockquote]:border-gold [&>blockquote]:pl-4 [&>blockquote]:italic [&>ul]:list-disc [&>ul]:ml-5 [&>ol]:list-decimal [&>ol]:ml-5"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}

function ToolbarButton({ icon: Icon, onClick, title }: { icon: any; onClick: () => void; title: string }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent losing focus from editor
        onClick();
      }}
      title={title}
      className="p-1.5 hover:bg-gold/10 hover:text-gold rounded transition-colors text-muted-foreground"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

interface BlogEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

export function BlogEditor({ isEditing, lang }: BlogEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { data: dbData, loading: dbLoading } = useDbContent();
  const [localBlogs, setLocalBlogs] = useState<BlogItem[]>([]);

  useEffect(() => {
    if (dbData?.blogs) {
      setLocalBlogs(dbData.blogs);
    } else {
      setLocalBlogs(
        blogs.map((b) => ({
          ...b,
          title: { ...b.title },
          excerpt: { ...b.excerpt },
          content: { ...(b.content || b.excerpt) },
          category: { ...b.category },
          author: { ...b.author },
        }))
      );
    }
  }, [dbData]);

  const [editorData, setEditorData] = useState<BlogItem | null>(null);
  const [editorIndex, setEditorIndex] = useState<number | null>(null);

  // Handle natural scroll chaining when modal is open
  useEffect(() => {
    if (editorData) {
      document.body.style.overflow = "auto"; // Keep body scrollable for natural chaining
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [editorData]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await fetch(apiUrl("/api/save"), {
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
    <section className="container mx-auto px-6 pt-8 pb-12 md:py-24 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display text-primary">
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

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {localBlogs.map((post, i) => (
          <div
            key={post.id}
            onClick={() => !isEditing && setEditorData({...post})}
            className={`group relative bg-card/40 border border-border rounded-2xl overflow-hidden hover:border-gold/50 transition-all flex flex-col ${!isEditing ? "cursor-pointer" : ""}`}
          >
             {isEditing && (
               <>
                 <button 
                   onClick={() => { setEditorData({...post}); setEditorIndex(i); }}
                   className="absolute top-2 left-2 z-10 w-7 h-7 md:w-10 md:h-10 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center text-foreground shadow-lg transition-transform hover:scale-110"
                 >
                   <Edit3 className="w-3.5 h-3.5 md:w-5 md:h-5" />
                 </button>
                 <button 
                   onClick={() => setLocalBlogs(localBlogs.filter((_, idx) => idx !== i))}
                   className="absolute top-2 right-2 z-10 w-7 h-7 md:w-10 md:h-10 bg-destructive hover:bg-destructive/90 rounded-full flex items-center justify-center text-foreground shadow-lg transition-transform hover:scale-110"
                 >
                   <Trash2 className="w-3.5 h-3.5 md:w-5 md:h-5" />
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
              <div className="absolute top-2 md:top-4 left-2 md:left-4">
                <span className="px-2 md:px-3 py-0.5 md:py-1 bg-background/60 backdrop-blur-md border border-border text-[7px] md:text-[9px] font-bold text-foreground uppercase tracking-wider rounded-full">
                  {post.category[lang]}
                </span>
              </div>
            </div>
            <div className="p-3 md:p-6 flex flex-col flex-1">
              <h3 className="font-display text-[10px] md:text-lg text-primary mb-1 md:mb-3 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
                {post.title[lang] || "Untitled Blog"}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1 hidden md:block">
                {post.excerpt[lang] || "No summary provided."}
              </p>
              <div className="flex items-center text-gold text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-auto">
                {lang === "en" ? "Read Article" : "ಲೇಖನ ಓದಿ"}
                <ArrowRight className="w-2 h-2 md:w-3 md:h-3 ml-1 md:ml-2 transition-transform group-hover:translate-x-1" />
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
              className="w-full max-w-4xl h-full max-h-[100dvh] sm:max-h-[90vh] bg-card sm:border border-border rounded-none sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setEditorData(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-background/70 hover:bg-background/85 backdrop-blur-md rounded-full flex items-center justify-center text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto overscroll-auto custom-scrollbar flex-1 relative">
                  {!isEditing ? (
                    <>
                      {/* Hero Image Section - Fixed overlay for mobile */}
                      <div className="relative h-[50vh] sm:h-80 md:h-96 w-full shrink-0">
                        <img 
                          src={editorData.image.startsWith('blob:') ? editorData.image : imgMap[editorData.image] || editorData.image} 
                          alt={editorData.title[lang]} 
                          className="w-full h-full object-cover"
                        />
                        {/* Mobile Overlay - Text over image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent flex flex-col justify-end p-6 sm:hidden">
                          <div className="space-y-3">
                            <span className="inline-block px-2.5 py-1 bg-gold text-background text-[9px] font-bold uppercase tracking-widest rounded-sm">
                              {editorData.category[lang]}
                            </span>
                            <h1 className="text-2xl font-display text-foreground leading-tight">
                              {editorData.title[lang]}
                            </h1>
                            <div className="flex items-center gap-4 text-foreground/70 text-[9px] font-bold uppercase tracking-widest">
                              <div className="flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-gold" />
                                {editorData.author[lang]}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-gold" />
                                {editorData.date}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Desktop Gradient (Matches user side) */}
                        <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      </div>

                      {/* Article Content - Clean flow below image for mobile */}
                      <div className="px-6 py-8 sm:px-12 sm:py-12 sm:-mt-20 relative z-10 max-w-3xl mx-auto w-full">
                        {/* Desktop-only Metadata & Title */}
                        <div className="hidden sm:block">
                          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            <span className="px-3 py-1 bg-gold/10 text-gold border border-gold/20 rounded-full">
                              {editorData.category[lang]}
                            </span>
                            <div className="flex items-center gap-2">
                              <User className="w-3.5 h-3.5 text-gold" />
                              <span>{editorData.author[lang]}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-gold" />
                              <span>{editorData.date}</span>
                            </div>
                          </div>

                          <h2 className="text-[26px] md:text-5xl font-display text-primary mb-8 leading-tight">
                            {editorData.title[lang]}
                          </h2>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                          <p className="text-base sm:text-xl text-foreground/90 font-medium mb-8 border-l-4 border-gold pl-6 py-2 bg-gold/5">
                            {editorData.excerpt[lang]}
                          </p>
                          
                          <div 
                            className="text-[15px] sm:text-[17px] prose prose-invert prose-gold max-w-none [&>h1]:text-2xl sm:[&>h1]:text-3xl [&>h1]:font-display [&>h1]:text-primary [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-display [&>h2]:text-primary [&>h2]:mt-6 [&>h2]:mb-3 [&>blockquote]:border-l-4 [&>blockquote]:border-gold [&>blockquote]:pl-6 [&>blockquote]:italic [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6 [&>p]:mb-4 [&>p]:leading-relaxed [&>a]:text-gold [&>a]:underline hover:[&>a]:text-gold/80"
                            dangerouslySetInnerHTML={{ __html: editorData.content?.[lang] || editorData.excerpt?.[lang] || "No content available." }}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col">
                      {/* Editor Cover Image */}
                      <div className="relative aspect-video md:h-96 w-full shrink-0 group">
                        <img 
                          src={editorData.image.startsWith('blob:') ? editorData.image : imgMap[editorData.image] || editorData.image} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-background/70 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                          <label className="cursor-pointer bg-muted/60 hover:bg-muted/80 px-6 py-3 rounded-full backdrop-blur-md text-foreground font-bold flex items-center gap-2 transition">
                            <ImageIcon className="w-5 h-5" />
                            Change Cover Image
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={async e => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setEditorData({ ...editorData, image: URL.createObjectURL(file) });
                                try {
                                  const url = await uploadImage(file, "blog");
                                  setEditorData((prev: any) => ({ ...prev, image: url }));
                                } catch (err: any) {
                                  alert(`Upload failed: ${err.message}`);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Editor Form */}
                      <div className="max-w-3xl mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 space-y-8 sm:space-y-12">
                        <div className="space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex flex-col gap-2">
                              <label className="sm:hidden text-[10px] uppercase tracking-widest text-gold font-bold">Category</label>
                              <input 
                                value={editorData.category[lang]} 
                                onChange={e => setEditorData({...editorData, category: {...editorData.category, [lang]: e.target.value}})}
                                className="px-4 py-3 bg-background/50 border border-border rounded-xl sm:rounded-full text-xs font-bold text-gold outline-none focus:border-gold/50"
                                placeholder="Category"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="sm:hidden text-[10px] uppercase tracking-widest text-gold font-bold">Author</label>
                              <div className="flex items-center gap-2 text-muted-foreground bg-background/50 border border-border px-4 py-3 rounded-xl sm:rounded-full">
                                <User className="w-4 h-4 text-gold" />
                                <input 
                                  value={editorData.author[lang]} 
                                  onChange={e => setEditorData({...editorData, author: {...editorData.author, [lang]: e.target.value}})}
                                  className="bg-transparent outline-none text-xs font-bold w-full"
                                  placeholder="Author Name"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="sm:hidden text-[10px] uppercase tracking-widest text-gold font-bold">Publish Date</label>
                              <div className="flex items-center gap-2 text-muted-foreground bg-background/50 border border-border px-4 py-3 rounded-xl sm:rounded-full">
                                <Calendar className="w-4 h-4 text-gold" />
                                <input 
                                  value={editorData.date} 
                                  onChange={e => setEditorData({...editorData, date: e.target.value})}
                                  className="bg-transparent outline-none text-xs font-bold w-full sm:w-24"
                                  placeholder="Date"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t border-border sm:border-none sm:pt-0">
                            <label className="sm:hidden text-[10px] uppercase tracking-widest text-gold font-bold mb-3 block">Article Title</label>
                            <textarea 
                              value={editorData.title[lang]}
                              onChange={e => setEditorData({...editorData, title: {...editorData.title, [lang]: e.target.value}})}
                              className="w-full text-2xl sm:text-3xl md:text-5xl font-display text-primary bg-transparent outline-none resize-none overflow-hidden"
                              placeholder="Blog Title..."
                              rows={2}
                            />
                          </div>
                        </div>

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
                            <RichEditor 
                              value={editorData.content?.[lang] || ''}
                              onChange={v => setEditorData({...editorData, content: {...editorData.content, [lang]: v}})}
                            />
                          </div>

                          <FaqManager 
                            lang={lang} 
                            blogId={editorData.id} 
                            title="Article-Specific FAQs"
                            subtitle="Manage questions specifically for this blog post."
                            isEditing={isEditing}
                          />

                          <div className="mt-12 pb-12 flex justify-end">
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
                    </div>
                  )}
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
                ? "bg-primary text-foreground"
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
