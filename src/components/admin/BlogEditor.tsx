import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Camera } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

interface BlogEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

const imgMap: Record<string, string> = { g1, g2, g3, g4, g5, g6 };

function EditableText({
  value,
  onChange,
  isEditing,
  className = "",
  tag: Tag = "span",
}: {
  value: string;
  onChange: (v: string) => void;
  isEditing: boolean;
  className?: string;
  tag?: "span" | "h1" | "h3" | "p" | "div";
}) {
  const ref = useRef<HTMLElement>(null);

  const handleBlur = useCallback(() => {
    if (ref.current) onChange(ref.current.innerText);
  }, [onChange]);

  if (!isEditing) return <Tag className={className}>{value}</Tag>;

  return (
    <Tag
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`${className} outline-none cursor-text`}
      style={{
        caretColor: "var(--gold)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {value}
    </Tag>
  );
}

export function BlogEditor({ isEditing, lang }: BlogEditorProps) {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [data, setData] = useState({
    en: {
      title: "Latest Insights",
      subtitle: "Stories, tutorials, and behind-the-scenes perspectives.",
      readMore: "Read Article",
      blogs: [
        {
          id: "b1",
          title: "The Geometry of the Crown",
          excerpt: "Discover the mathematical precision behind the iconic Yakshagana headgear.",
          category: "Craftsmanship",
          author: "Guru Raghavendra",
          date: "Apr 20, 2025",
          image: "g4"
        },
        {
          id: "b2",
          title: "Navarasa: The Nine Emotions",
          excerpt: "A deep dive into the emotive landscape of Yakshagana abhinaya.",
          category: "Artistry",
          author: "Smt. Lakshmi",
          date: "Mar 15, 2025",
          image: "g2"
        },
        {
          id: "b3",
          title: "The Chande's Thunder",
          excerpt: "How the high-pitched drum defines the energy of the Badagutittu style.",
          category: "Music",
          author: "Shankara Hegde",
          date: "Feb 10, 2025",
          image: "g5"
        },
        {
          id: "b4",
          title: "Ritual to Theatre",
          excerpt: "Tracing the evolution of Yakshagana from temple rituals to the modern stage.",
          category: "History",
          author: "Kathe Gaararu",
          date: "Jan 05, 2025",
          image: "g1"
        }
      ]
    },
    kn: {
      title: "ಇತ್ತೀಚಿನ ಒಳನೋಟಗಳು",
      subtitle: "ಕಥೆಗಳು, ಟ್ಯುಟೋರಿಯಲ್ಗಳು ಮತ್ತು ತೆರೆಮರೆಯ ದೃಷ್ಟಿಕೋನಗಳು.",
      readMore: "ಲೇಖನ ಓದಿ",
      blogs: [
        {
          id: "b1",
          title: "ಕಿರೀಟದ ರೇಖಾಗಣಿತ",
          excerpt: "ಐಕಾನಿಕ್ ಯಕ್ಷಗಾನ ಕಿರೀಟದ ಹಿಂದಿರುವ ಗಣಿತದ ನಿಖರತೆಯನ್ನು ಅನ್ವೇಷಿಸಿ.",
          category: "ಕರಕುಶಲತೆ",
          author: "ಗುರು ರಾಘವೇಂದ್ರ",
          date: "Apr 20, 2025",
          image: "g4"
        },
        {
          id: "b2",
          title: "ನವರಸ: ಒಂಬತ್ತು ಭಾವನೆಗಳು",
          excerpt: "ಯಕ್ಷಗಾನ ಅಭಿನಯದ ಭಾವನಾತ್ಮಕ ಲೋಕಕ್ಕೆ ಒಂದು ಆಳವಾದ ನೋಟ.",
          category: "ಕಲೆಗಾರಿಕೆ",
          author: "ಶ್ರೀಮತಿ ಲಕ್ಷ್ಮಿ",
          date: "Mar 15, 2025",
          image: "g2"
        },
        {
          id: "b3",
          title: "ಚಂಡೆಯ ಗುಡುಗು",
          excerpt: "ಹೇಗೆ ಚಂಡೆಯ ಶಬ್ದವು ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಶಕ್ತಿಯನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.",
          category: "ಸಂಗೀತ",
          author: "ಶಂಕರ ಹೆಗಡೆ",
          date: "Feb 10, 2025",
          image: "g5"
        },
        {
          id: "b4",
          title: "ಆಚರಣೆಯಿಂದ ರಂಗಭೂಮಿಗೆ",
          excerpt: "ದೇವಸ್ಥಾನದ ಆಚರಣೆಗಳಿಂದ ಆಧುನಿಕ ರಂಗದವರೆಗೆ ಯಕ್ಷಗಾನದ ವಿಕಸನ.",
          category: "ಇತಿಹಾಸ",
          author: "ಕಥೆಗಾರರು",
          date: "Jan 05, 2025",
          image: "g1"
        }
      ]
    }
  });

  const current = data[lang];

  const update = (field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const updateBlog = (index: number, field: string, value: string) => {
    const newBlogs = [...current.blogs];
    newBlogs[index] = { ...newBlogs[index], [field]: value };
    update("blogs", newBlogs);
  };

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newBlogs = [...current.blogs];
      // We'll store the blob URL as the image path temporarily
      newBlogs[index] = { ...newBlogs[index], image: url };
      update("blogs", newBlogs);
    }
  };

  return (
    <section className="container mx-auto px-6 py-20 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="ornament-divider w-24 mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl font-display mb-4">
          <EditableText
            value={current.title}
            onChange={(v) => update("title", v)}
            isEditing={isEditing}
            tag="h1"
          />
        </h1>
        <p className="text-muted-foreground text-lg">
          <EditableText
            value={current.subtitle}
            onChange={(v) => update("subtitle", v)}
            isEditing={isEditing}
          />
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {current.blogs.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative h-full flex flex-col bg-[#0a0a0a] border border-border rounded-2xl overflow-hidden hover:border-gold/50 transition-all shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={imgMap[post.image] || post.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-wider rounded-full">
                  <EditableText
                    value={post.category}
                    onChange={(v) => updateBlog(i, "category", v)}
                    isEditing={isEditing}
                  />
                </span>
              </div>

              {isEditing && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                  <button 
                    onClick={() => fileInputRefs.current[i]?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-gold text-background rounded-full font-bold text-[10px] uppercase tracking-widest shadow-glow"
                  >
                    <Camera className="w-3 h-3" />
                    Replace
                  </button>
                  <input 
                    type="file" 
                    ref={el => fileInputRefs.current[i] = el}
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleImageChange(i, e)}
                  />
                </div>
              )}
            </div>

            <div className="flex-1 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4 text-[11px] text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3 text-gold" />
                  <EditableText
                    value={post.author}
                    onChange={(v) => updateBlog(i, "author", v)}
                    isEditing={isEditing}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-gold" />
                  <EditableText
                    value={post.date}
                    onChange={(v) => updateBlog(i, "date", v)}
                    isEditing={isEditing}
                  />
                </div>
              </div>

              <h3 className="font-display text-xl text-primary mb-3 leading-tight group-hover:text-gold transition-colors">
                <EditableText
                  value={post.title}
                  onChange={(v) => updateBlog(i, "title", v)}
                  isEditing={isEditing}
                  tag="h3"
                />
              </h3>

              <div className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                <EditableText
                  tag="p"
                  value={post.excerpt}
                  onChange={(v) => updateBlog(i, "excerpt", v)}
                  isEditing={isEditing}
                />
              </div>

              <div className="flex items-center text-gold text-sm font-medium mt-auto">
                <EditableText
                  value={current.readMore}
                  onChange={(v) => update("readMore", v)}
                  isEditing={isEditing}
                />
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
