import { Link } from "@tanstack/react-router";
import { Clock, User, BookOpen } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { teacherById, type ClassItem } from "@/lib/data";

export function ClassCard({
  item,
  featured = false,
  href,
}: {
  item: ClassItem;
  featured?: boolean;
  href?: string;
}) {
  const { lang } = useLang();
  const teacher = teacherById(item.teacherId);
  if (!teacher) return null;

  const content = (
    <article
      className={`h-full group relative bg-card/60 border ${featured ? "border-gold/60 shadow-glow" : "border-border"} p-7 rounded-2xl transition-all hover:border-gold/70 hover:bg-card flex flex-col`}
    >
      {featured && (
        <span className="absolute -top-3 left-7 px-3 py-1 bg-gold text-background text-[10px] uppercase tracking-[0.25em] font-sans rounded-sm font-medium">
          {lang === "en" ? "NEXT CLASS" : "ಮುಂದಿನ ತರಗತಿ"}
        </span>
      )}
      <div className="flex items-center gap-2 text-xs text-gold/80 uppercase tracking-[0.2em] mb-4">
        <span>{item.dayLabel[lang]}</span>
        <span className="text-border">•</span>
        <span>{item.level[lang]}</span>
      </div>

      <h3 className="font-display text-xl text-primary leading-tight mb-5">{item.topic[lang]}</h3>

      <div className="space-y-2.5 text-sm text-foreground/80 flex-grow">
        <div className="flex items-center gap-3">
          <User size={14} className="text-gold shrink-0" />
          <span>
            {lang === "en" ? "with" : "ಜೊತೆಗೆ"} {teacher.name[lang]}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={14} className="text-gold shrink-0" />
          <span>{item.time}</span>
        </div>
        <div className="flex items-center gap-3">
          <BookOpen size={14} className="text-gold shrink-0" />
          <span>{teacher.expertise[lang]}</span>
        </div>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link to={href as any} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
