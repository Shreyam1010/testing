import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, BookOpen, ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { teacherById } from "@/lib/data";
import { useDbContent } from "@/hooks/useDb";

export function ClassCard({
  item,
  featured = false,
  isExpanded = false,
  onToggle,
  teacher: passedTeacher,
  index,
}: {
  item: any;
  featured?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  teacher?: any;
  index: number;
}) {
  const { lang } = useLang();
  const { data } = useDbContent();
  
  const teacher = passedTeacher || data?.teachers?.find((t: any) => t.id === item.teacherId) || teacherById(item.teacherId);
  
  if (!teacher) return null;

  const dayRaw = item.day?.[lang] || item.dayLabel?.[lang];
  const day = (lang === "en" && dayRaw) ? dayRaw.slice(0, 3) : dayRaw;
  const level = item.level?.[lang];
  const topic = item.topic?.[lang];
  
  const isRightSide = index % 2 !== 0;
  const order = (isRightSide && isExpanded) ? index * 2 - 3 : index * 2;

  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      onClick={() => {
        if (window.innerWidth < 768 && onToggle) onToggle();
      }}
      className={`relative bg-card/60 border ${featured ? "border-gold/60 shadow-glow" : "border-white/10"} p-4 md:p-8 rounded-2xl md:rounded-[2rem] transition-all duration-300 hover:border-gold/30 hover:bg-card/80 flex flex-col cursor-pointer md:cursor-default h-fit ${isExpanded ? "col-span-2 md:col-span-1" : "col-span-1"}`}
      style={{ order }}
    >
      {featured && (
        <span className="absolute -top-3 left-8 px-3 py-1 bg-gold text-background text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-sans rounded-sm font-bold shadow-glow">
          {lang === "en" ? "NEXT CLASS" : "ಮುಂದಿನ ತರಗತಿ"}
        </span>
      )}

      {/* Header Info */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-gold font-bold uppercase tracking-[0.2em]">
          <span>{day}</span>
          <span className={`${isExpanded ? "inline" : "hidden md:inline"} text-white/10`}>•</span>
          <span className={isExpanded ? "inline" : "hidden md:inline"}>{level}</span>
        </div>
        {/* Mobile-only Chevron */}
        <div className="md:hidden">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-gold/40"
          >
            <ChevronDown size={14} />
          </motion.div>
        </div>
      </div>

      <h3 className="font-display text-sm md:text-2xl text-primary leading-tight mb-2 md:mb-6">{topic}</h3>

      {/* Details - Desktop always visible, Mobile expands */}
      <div className="hidden md:block space-y-4 text-sm text-foreground/80">
        <DetailRow icon={<User size={14} />} label={lang === "en" ? "with" : "ಜೊತೆಗೆ"} value={teacher.name[lang]} />
        <DetailRow icon={<Clock size={14} />} value={item.time} />
        <DetailRow icon={<BookOpen size={14} />} value={teacher.expertise[lang]} />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pt-4 border-t border-white/5 space-y-4 text-sm text-foreground/80"
          >
            <DetailRow icon={<User size={14} />} label={lang === "en" ? "with" : "ಜೊತೆಗೆ"} value={teacher.name[lang]} />
            <DetailRow icon={<Clock size={14} />} value={item.time} />
            <DetailRow icon={<BookOpen size={14} />} value={teacher.expertise[lang]} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label?: string; value: string }) {
  return (
    <div className="flex items-start gap-3 group/row">
      <div className="mt-1 text-gold transition-transform group-hover/row:scale-110">
        {icon}
      </div>
      <span className="leading-tight">
        {label && <span className="opacity-50 mr-1">{label}</span>}
        {value}
      </span>
    </div>
  );
}
