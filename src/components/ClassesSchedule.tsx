import React, { useState, useMemo } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { ClassCard } from "@/components/ClassCard";
import { useDbContent } from "@/hooks/useDb";

export function ClassesSchedule() {
  const { lang } = useLang();
  const { data, loading } = useDbContent();
  const [teacherFilter, setTeacherFilter] = useState<string>("all");
  const [dayFilter, setDayFilter] = useState<string>("all");

  const dbClasses = data?.classes || [];
  const dbTeachers = data?.teachers || [];

  const days = useMemo(() => {
    const set = new Map<string, { en: string; kn: string }>();
    dbClasses.forEach((c: any) => set.set(c.day.en, c.day));
    return Array.from(set.values());
  }, [dbClasses]);

  const filtered = dbClasses.filter((c: any) => {
    if (teacherFilter !== "all" && c.teacherId !== teacherFilter) return false;
    if (dayFilter !== "all" && c.day.en !== dayFilter) return false;
    return true;
  });

  if (loading) return null;

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-wrap items-end justify-center gap-8 mb-14 pb-8 border-b border-border/40">
        <div>
          <label className="block text-xs uppercase tracking-[0.25em] text-gold/80 mb-3 text-center">
            {lang === "en" ? "Filter by Teacher" : "ಗುರುವಿನಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಿ"}
          </label>
          <div className="flex flex-wrap gap-2 justify-center">
            <FilterChip active={teacherFilter === "all"} onClick={() => setTeacherFilter("all")}>
              {lang === "en" ? "All" : "ಎಲ್ಲಾ"}
            </FilterChip>
            {dbTeachers.map((tch: any) => (
              <FilterChip
                key={tch.id}
                active={teacherFilter === tch.id}
                onClick={() => setTeacherFilter(tch.id)}
              >
                {tch.name?.[lang] ? tch.name[lang].split(" ").slice(-1)[0] : "Teacher"}
              </FilterChip>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.25em] text-gold/80 mb-3 text-center">
            {lang === "en" ? "Filter by Day" : "ದಿನದಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಿ"}
          </label>
          <div className="flex flex-wrap gap-2 justify-center">
            <FilterChip active={dayFilter === "all"} onClick={() => setDayFilter("all")}>
              {lang === "en" ? "All" : "ಎಲ್ಲಾ"}
            </FilterChip>
            {days.filter(d => d && d[lang]).map((d: any) => (
              <FilterChip key={d.en} active={dayFilter === d.en} onClick={() => setDayFilter(d.en)}>
                {d[lang]}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((c: any) => (
          <ClassCard key={c.id} item={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-20">
          {lang === "en"
            ? "No sessions match these filters."
            : "ಈ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ಗುರುಕುಲ ಪಾಠಗಳು ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ."}
        </p>
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
      className={`px-4 py-1.5 text-sm rounded-sm border transition-colors ${
        active
          ? "bg-gold text-background border-gold"
          : "border-border/60 text-foreground/75 hover:border-gold/60 hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}
