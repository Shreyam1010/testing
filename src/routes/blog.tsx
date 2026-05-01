import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
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
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

function BlogCard({ post, index }: { post: any; index: number }) {
  const { lang } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative h-full flex flex-col bg-card/60 border border-border rounded-2xl overflow-hidden hover:border-gold/50 transition-all shadow-xl"
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
