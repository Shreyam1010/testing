import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { ClassCard } from "@/components/ClassCard";
import { useDbContent } from "@/hooks/useDb";
import { Filter, Calendar, User as UserIcon, ChevronDown } from "lucide-react";

export function ClassesSchedule({ onFilterToggle }: { onFilterToggle?: (isOpen: boolean) => void }) {
  const { lang } = useLang();
  const { data, loading } = useDbContent();
  const [teacherFilter, setTeacherFilter] = useState<string>("all");
  const [dayFilter, setDayFilter] = useState<string>("all");
  const [isTeacherFilterOpen, setIsTeacherFilterOpen] = useState(false);
  const [isDayFilterOpen, setIsDayFilterOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  React.useEffect(() => {
    onFilterToggle?.(isTeacherFilterOpen || isDayFilterOpen);
  }, [isTeacherFilterOpen, isDayFilterOpen, onFilterToggle]);

  const dbClasses = data?.classes || [];
  const dbTeachers = data?.teachers || [];

  const days = useMemo(() => {
    const DAY_ORDER = [
      "all days",
      "tomorrow",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];

    const set = new Map<string, { en: string; kn: string }>();
    dbClasses.forEach((c: any) => set.set(c.day.en, c.day));

    const uniqueDays = Array.from(set.values());

    uniqueDays.sort((a, b) => {
      const indexA = DAY_ORDER.indexOf(a.en.toLowerCase());
      const indexB = DAY_ORDER.indexOf(b.en.toLowerCase());

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.en.localeCompare(b.en);
    });

    return uniqueDays;
  }, [dbClasses]);

  const filtered = dbClasses.filter((c: any) => {
    if (teacherFilter !== "all" && c.teacherId !== teacherFilter) return false;
    if (dayFilter !== "all" && c.day.en !== dayFilter) return false;
    return true;
  });

  if (loading) return null;

  return (
    <div className={`w-full transition-all duration-500 ${isTeacherFilterOpen || isDayFilterOpen ? "md:mt-0" : ""}`}>
      {/* Filters */}
      <div className={`mb-4 md:mb-14 pb-0 md:pb-10 border-b border-white/5 transition-all duration-500 ${isTeacherFilterOpen || isDayFilterOpen ? "mb-6 pb-4" : ""}`}>
        <div className="flex flex-col md:flex-row items-start justify-center gap-3 md:gap-20">

          {/* Mobile Buttons Container */}
          <div className="flex md:hidden w-full gap-3 mb-4">
            {/* Gurus Toggle */}
            <button
              onClick={() => setIsTeacherFilterOpen(!isTeacherFilterOpen)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 rounded-xl border transition-all duration-300 ${isTeacherFilterOpen ? "border-gold/50 bg-gold/5 text-gold" : "border-white/10 text-gold/60"}`}
            >
              <Filter size={14} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                {lang === "en" ? "Gurus" : "ಗುರುಗಳು"}
              </span>
            </button>

            {/* Days Toggle */}
            <button
              onClick={() => setIsDayFilterOpen(!isDayFilterOpen)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 rounded-xl border transition-all duration-300 ${isDayFilterOpen ? "border-gold/50 bg-gold/5 text-gold" : "border-white/10 text-gold/60"}`}
            >
              <Calendar size={14} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                {lang === "en" ? "Days" : "ದಿನಗಳು"}
              </span>
            </button>
          </div>

          {/* Teacher Filter (Desktop Label + Both Expanded Chips) */}
          <div className="w-full md:w-auto">
            <div className="hidden md:flex items-center justify-center gap-2 mb-4 text-gold/60 text-[10px] uppercase tracking-[0.3em] font-bold">
              <UserIcon size={12} />
              <span>{lang === "en" ? "Gurus" : "ಗುರುಗಳು"}</span>
            </div>

            <AnimatePresence>
              {(isTeacherFilterOpen || window.innerWidth >= 768) && (
                <motion.div
                  initial={window.innerWidth < 768 ? { height: 0, opacity: 0 } : false}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-2 md:mb-0 mt-2 px-1"
                >
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <div className="w-[calc((100%-1rem)/3)] md:w-auto">
                      <FilterChip active={teacherFilter === "all"} onClick={() => setTeacherFilter("all")}>
                        {lang === "en" ? "All" : "ಎಲ್ಲಾ"}
                      </FilterChip>
                    </div>
                    {dbTeachers.map((tch: any) => (
                      <div key={tch.id} className="w-[calc((100%-1rem)/3)] md:w-auto">
                        <FilterChip
                          active={teacherFilter === tch.id}
                          onClick={() => setTeacherFilter(tch.id)}
                        >
                          {tch.name?.[lang] ? tch.name[lang].split(" ").slice(-1)[0] : "Teacher"}
                        </FilterChip>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Day Filter (Desktop Label + Both Expanded Chips) */}
          <div className="w-full md:w-auto">
            <div className="hidden md:flex items-center justify-center gap-2 mb-4 text-gold/60 text-[10px] uppercase tracking-[0.3em] font-bold">
              <Calendar size={12} />
              <span>{lang === "en" ? "Days" : "ದಿನಗಳು"}</span>
            </div>

            <AnimatePresence>
              {(isDayFilterOpen || window.innerWidth >= 768) && (
                <motion.div
                  initial={window.innerWidth < 768 ? { height: 0, opacity: 0 } : false}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-2 px-1"
                >
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <div className="w-[calc((100%-1rem)/3)] md:w-auto">
                      <FilterChip active={dayFilter === "all"} onClick={() => setDayFilter("all")}>
                        {lang === "en" ? "All" : "ಎಲ್ಲಾ"}
                      </FilterChip>
                    </div>
                    {days.filter(d => d && d[lang]).map((d: any) => (
                      <div key={d.en} className="w-[calc((100%-1rem)/3)] md:w-auto">
                        <FilterChip active={dayFilter === d.en} onClick={() => setDayFilter(d.en)}>
                          {d[lang]}
                        </FilterChip>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {filtered.map((c: any, index: number) => (
          <ClassCard
            key={c.id}
            item={c}
            index={index}
            isExpanded={expandedId === c.id}
            onToggle={() => setExpandedId(prev => prev === c.id ? null : c.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-32 space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Filter className="w-6 h-6 text-gold/30" />
          </div>
          <p className="text-muted-foreground text-lg italic">
            {lang === "en"
              ? "No sessions match these filters."
              : "ಈ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ಗುರುಕುಲ ಪಾಠಗಳು ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ."}
          </p>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full md:w-auto px-3 py-1.5 md:px-5 md:py-2 text-[9px] md:text-xs uppercase tracking-widest font-bold rounded-full border transition-all duration-300 ${active
        ? "bg-gold text-background border-gold shadow-glow scale-105"
        : "border-white/10 text-muted-foreground hover:border-gold/50 hover:text-gold bg-white/5"
        }`}
    >
      {children}
    </button>
  );
}
