import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, User, X } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";
import { blogs } from "@/lib/data";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

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

const imgMap: Record<string, string> = { g1, g2, g3, g4, g5, g6 };

function BlogPage() {
  const { lang } = useLang();
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

  return (
    <Layout>
      <section className="container mx-auto px-6 py-20 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-display mb-4">
            {lang === "en" ? "Latest Insights" : "ಇತ್ತೀಚಿನ ಒಳನೋಟಗಳು"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {lang === "en"
              ? "Stories, tutorials, and behind-the-scenes perspectives."
              : "ಕಥೆಗಳು, ಟ್ಯುಟೋರಿಯಲ್ಗಳು ಮತ್ತು ತೆರೆಮರೆಯ ದೃಷ್ಟಿಕೋನಗಳು."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((post, index) => (
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
                  {/* Hero Image */}
                  <div className="relative h-64 sm:h-80 md:h-96 w-full shrink-0">
                    <img 
                      src={imgMap[selectedBlog.image]} 
                      alt={selectedBlog.title[lang]} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  </div>

                  {/* Article Content */}
                  <div className="px-6 py-8 sm:px-12 sm:py-12 -mt-20 relative z-10 max-w-3xl mx-auto">
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

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-primary mb-8 leading-tight">
                      {selectedBlog.title[lang]}
                    </h2>

                    <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                      <p className="text-xl text-foreground/90 font-medium mb-8 border-l-4 border-gold pl-6 py-2">
                        {selectedBlog.excerpt[lang]}
                      </p>
                      
                      <div className="space-y-6 whitespace-pre-wrap text-[17px]">
                        {selectedBlog.content?.[lang] || selectedBlog.excerpt[lang]}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </Layout>
  );
}

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
      className="group relative h-full flex flex-col bg-card/60 border border-border rounded-2xl overflow-hidden hover:border-gold/50 transition-all shadow-xl cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imgMap[post.image]}
          alt={post.title[lang]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-wider rounded-full">
            {post.category[lang]}
          </span>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4 text-[11px] text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3 text-gold" />
            <span>{post.author[lang]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-gold" />
            <span>{post.date}</span>
          </div>
        </div>

        <h3 className="font-display text-xl text-primary mb-3 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
          {post.title[lang]}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1 leading-relaxed">
          {post.excerpt[lang]}
        </p>

        <div className="flex items-center text-gold text-sm font-medium mt-auto group/btn">
          <span>{lang === "en" ? "Read Article" : "ಲೇಖನ ಓದಿ"}</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}
