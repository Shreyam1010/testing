import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, User, X } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import { blogs } from "@/lib/data";
import { useDbContent } from "@/hooks/useDb";
import { FaqAssistant } from "@/components/FaqAssistant";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Kathe Gaararu Yakshagana" },
      {
        name: "description",
        content: "Insights, stories, and behind-the-scenes perspectives from the world of Yakshagana.",
      },
    ],
  }),
  component: BlogPage,
});

const imgMap: Record<string, string> = {
  g1: "/images/gallery-1.jpg",
  g2: "/images/gallery-2.jpg",
  g3: "/images/gallery-3.jpg",
  g4: "/images/gallery-4.jpg",
  g5: "/images/gallery-5.jpg",
  g6: "/images/gallery-6.jpg",
};



function BlogPage() {
  const { lang } = useLang();
  const { data, loading } = useDbContent();
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedBlog]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  const dbBlogs = data?.blogs || [];

  return (
    <Layout>
      <section className="container mx-auto px-6 pt-4 pb-20 sm:py-20 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-16"
        >
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display mb-4">
            {lang === "en" ? "Latest Insights" : "ಇತ್ತೀಚಿನ ಒಳನೋಟಗಳು"}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-lg">
            {lang === "en"
              ? "Stories, tutorials, and behind-the-scenes perspectives."
              : "ಕಥೆಗಳು, ಟ್ಯುಟೋರಿಯಲ್ಗಳು ಮತ್ತು ತೆರೆಮರೆಯ ದೃಷ್ಟಿಕೋನಗಳು."}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {dbBlogs.map((post: any, index: number) => (
            <BlogCard key={post.id} post={post} index={index} onClick={() => setSelectedBlog(post)} />
          ))}
        </div>

        <AnimatePresence>
          {selectedBlog && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content Container (Scrollable) */}
                <div className="overflow-y-auto custom-scrollbar flex-1 relative">
                  {/* Hero Image Section - Fixed overlay for mobile */}
                  <div className="relative h-[50vh] sm:h-80 md:h-96 w-full shrink-0">
                    <img 
                      src={postImage(selectedBlog)} 
                      alt={selectedBlog.title[lang]} 
                      className="w-full h-full object-cover"
                    />
                    {/* Mobile Overlay - Text over image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent flex flex-col justify-end p-6 sm:hidden">
                      <div className="space-y-3">
                        <span className="inline-block px-2.5 py-1 bg-gold text-background text-[9px] font-bold uppercase tracking-widest rounded-sm">
                          {selectedBlog.category[lang]}
                        </span>
                        <h1 className="text-2xl font-display text-white leading-tight">
                          {selectedBlog.title[lang]}
                        </h1>
                        <div className="flex items-center gap-4 text-white/70 text-[9px] font-bold uppercase tracking-widest">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-gold" />
                            {selectedBlog.author[lang]}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gold" />
                            {selectedBlog.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Desktop Gradient (Matches original) */}
                    <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  </div>

                  {/* Article Content - Clean flow below image for mobile */}
                  <div className="px-6 py-8 sm:px-12 sm:py-12 sm:-mt-20 relative z-10 max-w-3xl mx-auto">
                    {/* Desktop-only Metadata & Title */}
                    <div className="hidden sm:block">
                      <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <span className="px-3 py-1 bg-gold/10 text-gold border border-gold/20 rounded-full">
                          {selectedBlog.category[lang]}
                        </span>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gold" />
                          <span>{selectedBlog.author[lang]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gold" />
                          <span>{selectedBlog.date}</span>
                        </div>
                      </div>

                      <h2 className="text-3xl sm:text-[26px] md:text-5xl font-display text-primary mb-8 leading-tight">
                        {selectedBlog.title[lang]}
                      </h2>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                      <p className="text-base sm:text-xl text-foreground/90 font-medium mb-8 border-l-4 border-gold pl-6 py-2 bg-gold/5">
                        {selectedBlog.excerpt[lang]}
                      </p>
                      
                      <div 
                        className="text-[15px] sm:text-[17px] prose prose-invert prose-gold max-w-none [&>h1]:text-2xl sm:[&>h1]:text-3xl [&>h1]:font-display [&>h1]:text-primary [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-display [&>h2]:text-primary [&>h2]:mt-6 [&>h2]:mb-3 [&>blockquote]:border-l-4 [&>blockquote]:border-gold [&>blockquote]:pl-6 [&>blockquote]:italic [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6 [&>p]:mb-4 [&>p]:leading-relaxed [&>a]:text-gold [&>a]:underline hover:[&>a]:text-gold/80"
                        dangerouslySetInnerHTML={{ __html: selectedBlog.content?.[lang] || selectedBlog.excerpt?.[lang] || "No content available." }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <FaqAssistant blogId={selectedBlog?.id} />
      </section>
    </Layout>
  );
}

const postImage = (post: any) => {
  if (!post || !post.image) return "/images/gallery-3.jpg"; // Default to gallery-3 if missing
  return post.image.startsWith('g') ? imgMap[post.image] : post.image;
};

function BlogCard({ post, index, onClick }: { post: any; index: number; onClick: () => void }) {
  const { lang } = useLang();
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative h-full flex flex-col bg-card/60 border border-border rounded-xl sm:rounded-2xl overflow-hidden hover:border-gold/50 transition-all shadow-xl cursor-pointer"
    >
      <div className="relative h-32 sm:h-48 overflow-hidden">
        <img
          src={postImage(post)}
          alt={post.title[lang]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
          <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-black/50 backdrop-blur-md border border-white/20 text-[8px] sm:text-[10px] font-bold text-white uppercase tracking-wider rounded-full">
            {post.category?.[lang] || "General"}
          </span>
        </div>
      </div>

      <div className="flex-1 p-3 sm:p-6 flex flex-col">
        <div className="flex items-center justify-between mb-2 sm:mb-4 text-[9px] sm:text-[11px] text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold" />
            <span className="truncate max-w-[80px] sm:max-w-none">{post.author?.[lang] || "Author"}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold" />
            <span>{post.date?.split(',')[0] || "Recent"}</span>
          </div>
        </div>

        <h3 className="font-display text-sm sm:text-xl text-primary mb-2 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
          {post.title[lang]}
        </h3>

        <p className="hidden sm:block text-sm text-muted-foreground line-clamp-3 mb-6 flex-1 leading-relaxed">
          {post.excerpt[lang]}
        </p>

        <div className="flex items-center text-gold text-[10px] sm:text-sm font-medium mt-auto group/btn">
          <span>{lang === "en" ? "Read" : "ಓದಿ"}</span>
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 transition-transform group-hover/btn:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}
