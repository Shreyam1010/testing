import React, { useState, useMemo } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { ClassCard } from "@/components/ClassCard";
import { classes, teachers } from "@/lib/data";

export function ClassesSchedule() {
  const { lang } = useLang();
  const [teacherFilter, setTeacherFilter] = useState<string>("all");
  const [dayFilter, setDayFilter] = useState<string>("all");

  const days = useMemo(() => {
    const set = new Map<string, { en: string; kn: string }>();
    classes.forEach((c) => set.set(c.dayLabel.en, c.dayLabel));
    return Array.from(set.values());
  }, []);

  const filtered = classes.filter((c) => {
    if (teacherFilter !== "all" && c.teacherId !== teacherFilter) return false;
    if (dayFilter !== "all" && c.dayLabel.en !== dayFilter) return false;
    return true;
  });

  const next = filtered[0];
  const rest = filtered.slice(1);

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
            {teachers.map((tch) => (
              <FilterChip
                key={tch.id}
                active={teacherFilter === tch.id}
                onClick={() => setTeacherFilter(tch.id)}
              >
                {tch.name[lang].split(" ").slice(-1)[0]}
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
            {days.map((d) => (
              <FilterChip key={d.en} active={dayFilter === d.en} onClick={() => setDayFilter(d.en)}>
                {d[lang]}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      {next && (
        <div className="mb-12 max-w-2xl mx-auto">
          <ClassCard item={next} featured />
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((c) => (
          <ClassCard key={c.id} item={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-20">
          {lang === "en"
            ? "No classes match these filters."
            : "ಈ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ತರಗತಿಗಳು ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ."}
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
