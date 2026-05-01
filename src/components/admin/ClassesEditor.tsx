import { useState, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Camera, User, Clock, BookOpen } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

interface ClassesEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

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
  tag?: "span" | "h1" | "h2" | "h3" | "p" | "div" | "li";
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

export function ClassesEditor({ isEditing, lang }: ClassesEditorProps) {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [teacherFilter, setTeacherFilter] = useState<string>("all");
  const [dayFilter, setDayFilter] = useState<string>("all");

  const [data, setData] = useState({
    en: {
      title: "Classes",
      subtitle: "Train under masters of the tradition",
      intro: "Step into the sacred circle of learning where tradition meets discipline. Our classes are designed to provide a comprehensive understanding of Yakshagana, from the foundational rhythms to the complex expressions of the epics. Beyond the physical movements, we delve into the literary and musical heritage, ensuring each student becomes a custodian of the art's soul. Join us in this journey of rhythm, expression, and divinity.",
      points: [
        "Authentic Gurukula style training",
        "Focus on both theory and practice",
        "Personalized attention from veteran gurus",
        "Opportunities for stage performances",
        "Comprehensive curriculum for all levels",
        "In-depth study of Bhagavata literature and music"
      ],
      filterByTeacher: "Filter by Teacher",
      filterByDay: "Filter by Day",
      all: "All",
      gurusTitle: "Our Gurus",
      gurusSubtitle: "Masters of the craft with decades of stage experience.",
      teachers: [
        { id: "raghavendra", name: "Guru Raghavendra Bhatta", expertise: "Bhagavata Vesha", bio: "Five decades on stage. Disciple of the Saligrama tradition.", image: g2 },
        { id: "shankara", name: "Shankara Hegde", expertise: "Maddale", bio: "Master percussionist of the Tenkutittu school.", image: g3 },
        { id: "lakshmi", name: "Smt. Lakshmi Acharya", expertise: "Stree Vesha", bio: "Among the first women to perform stree vesha publicly.", image: g1 }
      ],
      classes: [
        { id: "c1", topic: "Foundations of Hasta Mudras", teacherId: "lakshmi", day: "Tomorrow", level: "Beginner", time: "8:00 PM" },
        { id: "c2", topic: "Chande Taala — Adi & Eka", teacherId: "shankara", day: "Thursday", level: "Intermediate", time: "6:30 PM" },
        { id: "c3", topic: "Pundu Vesha — Stage Presence", teacherId: "raghavendra", day: "Saturday", level: "Advanced", time: "7:00 PM" },
        { id: "c4", topic: "Stree Vesha — Grace & Glance", teacherId: "lakshmi", day: "Sunday", level: "All Levels", time: "5:00 PM" },
        { id: "c5", topic: "Bhagavata Padya Recitation", teacherId: "raghavendra", day: "Tuesday", level: "Intermediate", time: "8:00 PM" },
        { id: "c6", topic: "Maddale — Rhythmic Patterns", teacherId: "shankara", day: "Thursday", level: "Beginner", time: "6:30 PM" },
        { id: "c7", topic: "Abhinaya — Navarasa Mastery", teacherId: "raghavendra", day: "Friday", level: "Advanced", time: "6:00 PM" },
        { id: "c8", topic: "Vannike — The Art of Makeup", teacherId: "lakshmi", day: "Saturday", level: "Beginner", time: "10:00 AM" },
        { id: "c9", topic: "Kirata Vesha — The Hunter", teacherId: "raghavendra", day: "Sunday", level: "Intermediate", time: "4:00 PM" },
        { id: "c10", topic: "Taala Maddale — Discourse", teacherId: "shankara", day: "Monday", level: "All Levels", time: "7:00 PM" },
        { id: "c11", topic: "Laya and Taala — Advanced", teacherId: "shankara", day: "Tuesday", level: "Advanced", time: "6:30 PM" },
        { id: "c12", topic: "Dance Grammar — Charis", teacherId: "lakshmi", day: "Wednesday", level: "Intermediate", time: "5:30 PM" }
      ]
    },
    kn: {
      title: "ತರಗತಿಗಳು",
      subtitle: "ಪರಂಪರೆಯ ಗುರುಗಳ ಬಳಿ ಅಭ್ಯಾಸ ಮಾಡಿ",
      intro: "ಪರಂಪರೆ ಮತ್ತು ಶಿಸ್ತು ಸಂಗಮಿಸುವ ಈ ಕಲಿಕಾ ವಲಯಕ್ಕೆ ಹೆಜ್ಜೆ ಇಡಿ. ಯಕ್ಷಗಾನದ ಮೂಲ ಲಯಗಳಿಂದ ಹಿಡಿದು ಪುರಾಣಗಳ ಸಂಕೀರ್ಣ ಅಭಿವ್ಯಕ್ತಿಗಳವರೆಗೆ ಸಮಗ್ರ ತಿಳುವಳಿಕೆಯನ್ನು ನೀಡಲು ನಮ್ಮ ತರಗತಿಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ದೈಹಿಕ ಚಲನೆಗಳ ಹೊರತಾಗಿ, ನಾವು ಸಾಹಿತ್ಯ ಮತ್ತು ಸಂಗೀತದ ಪರಂಪರೆಯನ್ನು ಆಳವಾಗಿ ಅಧ್ಯಯನ ಮಾಡುತ್ತೇವೆ, ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿಯು ಈ ಕಲೆಯ ಆತ್ಮದ ಸಂರಕ್ಷಕನಾಗುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳುತ್ತೇವೆ. ಲಯ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ದೈವಿಕತೆಯ ಈ ಪ್ರಯಾಣದಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ.",
      points: [
        "ಅಪ್ಪಟ ಗುರುಕುಲ ಶೈಲಿಯ ತರಬೇತಿ",
        "ಸೈದ್ಧಾಂತಿಕ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಕಲಿಕೆಗೆ ಒತ್ತು",
        "ಅನುಭವಿ ಗುರುಗಳಿಂದ ವೈಯಕ್ತಿಕ ಗಮನ",
        "ರಂಗ ಪ್ರದರ್ಶನಗಳಿಗೆ ಅವಕಾಶಗಳು",
        "ಎಲ್ಲಾ ಹಂತದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಮಗ್ರ ಪಠ್ಯಕ್ರಮ",
        "ಭಾಗವತ ಸಾಹಿತ್ಯ ಮತ್ತು ಸಂಗೀತದ ಆಳವಾದ ಅಧ್ಯಯನ"
      ],
      filterByTeacher: "ಗುರುವಿನಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಿ",
      filterByDay: "ದಿನದಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಿ",
      all: "ಎಲ್ಲಾ",
      gurusTitle: "ನಮ್ಮ ಗುರುಗಳು",
      gurusSubtitle: "ದಶಕಗಳ ರಂಗಾನುಭವ ಹೊಂದಿರುವ ಕಲೆಯ ಧೀಮಂತರು.",
      teachers: [
        { id: "raghavendra", name: "ಗುರು ರಾಘವೇಂದ್ರ ಭಟ್ಟ", expertise: "ಭಾಗವತ ವೇಷ", bio: "ಐದು ದಶಕಗಳ ರಂಗಾನುಭವ. ಸಾಲಿಗ್ರಾಮ ಪರಂಪರೆಯ ಶಿಷ್ಯ. ಮುಂದುವರಿದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪುಂಡು ವೇಷ ಮತ್ತು ರಸಾಭಿನಯ ಕಲಿಸುತ್ತಾರೆ.", image: g2 },
        { id: "shankara", name: "ಶಂಕರ ಹೆಗ್ಡೆ", expertise: "ಮದ್ದಲೆ", bio: "ತೆಂಕುತಿಟ್ಟು ಶಾಲೆಯ ಶ್ರೇಷ್ಠ ತಾಳವಾದಕ. ತಾಳ, ಲಯ ಮತ್ತು ಭಾಗವತರ ಸಹವಾದ್ಯ ಕಲಿಸುತ್ತಾರೆ.", image: g3 },
        { id: "lakshmi", name: "ಶ್ರೀಮತಿ ಲಕ್ಷ್ಮೀ ಆಚಾರ್ಯ", expertise: "ಸ್ತ್ರೀ ವೇಷ", bio: "ಸಾರ್ವಜನಿಕ ರಂಗದಲ್ಲಿ ಸ್ತ್ರೀ ವೇಷ ಪ್ರದರ್ಶಿಸಿದ ಮೊದಲ ಮಹಿಳೆಯರಲ್ಲಿ ಒಬ್ಬರು. ಮುಂದಿನ ಪೀಳಿಗೆಗೆ ಸೌಂದರ್ಯ ಮತ್ತು ಶಿಸ್ತು ತರುತ್ತಾರೆ.", image: g1 }
      ],
      classes: [
        { id: "c1", topic: "ಹಸ್ತ ಮುದ್ರೆಗಳ ಮೂಲಪಾಠ", teacherId: "lakshmi", day: "ನಾಳೆ", level: "ಪ್ರಾರಂಭಿಕ", time: "8:00 PM" },
        { id: "c2", topic: "ಚಂಡೆ ತಾಳ — ಆದಿ ಮತ್ತು ಏಕ", teacherId: "shankara", day: "ಗುರುವಾರ", level: "ಮಧ್ಯಮ", time: "6:30 PM" },
        { id: "c3", topic: "ಪುಂಡು ವೇಷ — ರಂಗ ಉಪಸ್ಥಿತಿ", teacherId: "raghavendra", day: "ಶನಿವಾರ", level: "ಉನ್ನತ", time: "7:00 PM" },
        { id: "c4", topic: "ಸ್ತ್ರೀ ವೇಷ — ಸೌಂದರ್ಯ ಮತ್ತು ನೋಟ", teacherId: "lakshmi", day: "ಭಾನುವಾರ", level: "ಎಲ್ಲ ಹಂತ", time: "5:00 PM" },
        { id: "c5", topic: "ಭಾಗವತ ಪದ್ಯ ಪಠಣ", teacherId: "raghavendra", day: "ಮಂಗಳವಾರ", level: "ಮಧ್ಯಮ", time: "8:00 PM" },
        { id: "c6", topic: "ಮದ್ದಲೆ — ಲಯ ವಿನ್ಯಾಸ", teacherId: "shankara", day: "ಗುರುವಾರ", level: "ಪ್ರಾರಂಭಿಕ", time: "6:30 PM" },
        { id: "c7", topic: "ಅಭಿನಯ — ನವರಸ ಪಾಂಡಿತ್ಯ", teacherId: "raghavendra", day: "ಶುಕ್ರವಾರ", level: "ಉನ್ನತ", time: "6:00 PM" },
        { id: "c8", topic: "ವಣ್ಣಿಗೆ — ಬಣ್ಣಗಾರಿಕೆ", teacherId: "lakshmi", day: "ಶನಿವಾರ", level: "ಪ್ರಾರಂಭಿಕ", time: "10:00 AM" },
        { id: "c9", topic: "ಕಿರಾತ ವೇಷ — ಬೇಟೆಗಾರ", teacherId: "raghavendra", day: "ಭಾನುವಾರ", level: "ಮಧ್ಯಮ", time: "4:00 PM" },
        { id: "c10", topic: "ತಾಳ ಮದ್ದಲೆ — ಪ್ರಸಂಗ", teacherId: "shankara", day: "ಸೋಮವಾರ", level: "ಎಲ್ಲ ಹಂತ", time: "7:00 PM" },
        { id: "c11", topic: "ಲಯ ಮತ್ತು ತಾಳ — ಉನ್ನತ", teacherId: "shankara", day: "ಮಂಗಳವಾರ", level: "ಉನ್ನತ", time: "6:30 PM" },
        { id: "c12", topic: "ನೃತ್ಯ ವ್ಯಾಕರಣ — ಚಾರಿಗಳು", teacherId: "lakshmi", day: "ಬುಧವಾರ", level: "ಮಧ್ಯಮ", time: "5:30 PM" }
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

  const updateClass = (index: number, field: string, value: string) => {
    const newClasses = [...current.classes];
    newClasses[index] = { ...newClasses[index], [field]: value };
    update("classes", newClasses);
  };

  const filteredClasses = useMemo(() => {
    return current.classes.filter(c => {
      if (teacherFilter !== "all" && c.teacherId !== teacherFilter) return false;
      if (dayFilter !== "all" && c.day !== dayFilter) return false;
      return true;
    });
  }, [current.classes, teacherFilter, dayFilter]);

  const days = useMemo(() => {
    const set = new Set(current.classes.map(c => c.day));
    return Array.from(set);
  }, [current.classes]);

  return (
    <section className="container mx-auto px-6 py-20 bg-[#050505]">
      {/* Intro Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-5xl mx-auto mb-20">
        <div className="ornament-divider w-24 mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl font-display mb-4">
          <EditableText value={current.title} onChange={(v) => update("title", v)} isEditing={isEditing} tag="h1" />
        </h1>
        <p className="text-muted-foreground mb-12">
          <EditableText value={current.subtitle} onChange={(v) => update("subtitle", v)} isEditing={isEditing} />
        </p>

        <div className="text-center bg-gold/5 border border-gold/10 p-10 md:p-14 rounded-3xl mb-16 shadow-2xl">
          <EditableText tag="p" value={current.intro} onChange={(v) => update("intro", v)} isEditing={isEditing} className="text-xl leading-relaxed text-foreground/80 mb-10 max-w-4xl mx-auto" />
          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-6 max-w-4xl mx-auto">
            {current.points.map((point, i) => (
              <li key={i} className="flex items-center gap-4 text-foreground/70 text-lg">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">ಯ</span>
                <EditableText value={point} onChange={(v) => {
                  const newPoints = [...current.points];
                  newPoints[i] = v;
                  update("points", newPoints);
                }} isEditing={isEditing} />
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Schedule Filters */}
      <div className="w-full mb-12">
        <div className="flex flex-wrap items-end justify-center gap-8 mb-14 pb-8 border-b border-border/40">
          <div className="text-center">
            <span className="block text-xs uppercase tracking-[0.25em] text-gold/80 mb-3">
              <EditableText value={current.filterByTeacher} onChange={(v) => update("filterByTeacher", v)} isEditing={isEditing} />
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => setTeacherFilter("all")} className={`px-4 py-1.5 text-sm rounded-sm border ${teacherFilter === "all" ? "bg-gold text-background border-gold" : "border-border/60 text-foreground/75"}`}>{current.all}</button>
              {current.teachers.map(tch => (
                <button key={tch.id} onClick={() => setTeacherFilter(tch.id)} className={`px-4 py-1.5 text-sm rounded-sm border ${teacherFilter === tch.id ? "bg-gold text-background border-gold" : "border-border/60 text-foreground/75"}`}>{tch.name.split(" ").pop()}</button>
              ))}
            </div>
          </div>
          <div className="text-center">
            <span className="block text-xs uppercase tracking-[0.25em] text-gold/80 mb-3">
              <EditableText value={current.filterByDay} onChange={(v) => update("filterByDay", v)} isEditing={isEditing} />
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => setDayFilter("all")} className={`px-4 py-1.5 text-sm rounded-sm border ${dayFilter === "all" ? "bg-gold text-background border-gold" : "border-border/60 text-foreground/75"}`}>{current.all}</button>
              {days.map(d => (
                <button key={d} onClick={() => setDayFilter(d)} className={`px-4 py-1.5 text-sm rounded-sm border ${dayFilter === d ? "bg-gold text-background border-gold" : "border-border/60 text-foreground/75"}`}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Cards - FULL SYNC (12 Classes) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredClasses.map((c, i) => {
            const teacher = current.teachers.find(t => t.id === c.teacherId);
            const originalIndex = current.classes.findIndex(cls => cls.id === c.id);
            return (
              <motion.article key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="h-full group relative bg-[#0a0a0a] border border-border/50 p-7 rounded-2xl transition-all hover:border-gold/40 flex flex-col">
                <div className="flex items-center gap-2 text-[10px] text-gold/80 uppercase tracking-[0.2em] mb-4">
                  <EditableText value={c.day} onChange={(v) => updateClass(originalIndex, "day", v)} isEditing={isEditing} />
                  <span className="text-border">•</span>
                  <EditableText value={c.level} onChange={(v) => updateClass(originalIndex, "level", v)} isEditing={isEditing} />
                </div>
                <h3 className="font-display text-xl text-primary leading-tight mb-5">
                  <EditableText value={c.topic} onChange={(v) => updateClass(originalIndex, "topic", v)} isEditing={isEditing} tag="h3" />
                </h3>
                <div className="space-y-3 text-sm text-foreground/70 flex-grow">
                  <div className="flex items-center gap-3">
                    <User size={14} className="text-gold shrink-0" />
                    <span>{lang === "en" ? "with" : "ಜೊತೆಗೆ"} {teacher?.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="text-gold shrink-0" />
                    <EditableText value={c.time} onChange={(v) => updateClass(originalIndex, "time", v)} isEditing={isEditing} />
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen size={14} className="text-gold shrink-0" />
                    <span>{teacher?.expertise}</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Gurus Section */}
      <section className="mt-40">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display mb-4 text-primary">
            <EditableText value={current.gurusTitle} onChange={(v) => update("gurusTitle", v)} isEditing={isEditing} tag="h2" />
          </h2>
          <p className="text-muted-foreground">
            <EditableText value={current.gurusSubtitle} onChange={(v) => update("gurusSubtitle", v)} isEditing={isEditing} />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {current.teachers.map((teacher, i) => (
            <motion.div key={teacher.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-border/50 bg-[#0a0a0a]">
              <img src={teacher.image} alt="" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-8">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1 block">
                  <EditableText value={teacher.expertise} onChange={(v) => {
                    const newTeachers = [...current.teachers];
                    newTeachers[i] = { ...newTeachers[i], expertise: v };
                    update("teachers", newTeachers);
                  }} isEditing={isEditing} />
                </span>
                <h3 className="font-display text-2xl text-primary group-hover:text-gold transition-colors">
                  <EditableText value={teacher.name} onChange={(v) => {
                    const newTeachers = [...current.teachers];
                    newTeachers[i] = { ...newTeachers[i], name: v };
                    update("teachers", newTeachers);
                  }} isEditing={isEditing} tag="h3" />
                </h3>
                {isEditing && (
                   <div className="mt-4 p-3 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
                     <EditableText tag="p" value={teacher.bio} onChange={(v) => {
                        const newTeachers = [...current.teachers];
                        newTeachers[i] = { ...newTeachers[i], bio: v };
                        update("teachers", newTeachers);
                     }} isEditing={isEditing} className="text-xs text-foreground/80 leading-relaxed italic" />
                   </div>
                )}
              </div>
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                  <button onClick={() => fileInputRefs.current[i]?.click()} className="flex items-center gap-2 px-6 py-3 bg-gold text-background rounded-full font-bold text-xs uppercase tracking-widest shadow-glow">
                    <Camera className="w-4 h-4" /> Replace Photo
                  </button>
                  <input type="file" ref={el => fileInputRefs.current[i] = el} className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      const newTeachers = [...current.teachers];
                      newTeachers[i] = { ...newTeachers[i], image: url };
                      update("teachers", newTeachers);
                    }
                  }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </section>
  );
}
