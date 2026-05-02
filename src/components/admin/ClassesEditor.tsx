import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, User, Clock, BookOpen, Loader2, Save, Check, Plus, Trash2, Edit2, X } from "lucide-react";
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
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingTeacherIndex, setEditingTeacherIndex] = useState<number | null>(null);

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

  // --- FETCH FROM DATABASE ---
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8787/api/content?lang=${lang}`);
        const result = await res.json();
        
        // Update teachers and classes if found in DB
        if (result.teachers?.length > 0 || result.classes?.length > 0) {
           setData(prev => ({
             ...prev,
             [lang]: {
               ...prev[lang],
               teachers: result.teachers.length > 0 ? result.teachers : prev[lang].teachers,
               classes: result.classes.length > 0 ? result.classes : prev[lang].classes
             }
           }));
        }
      } catch (err) {
        console.error("Failed to load classes content:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [lang]);

  // --- SAVE TO DATABASE ---
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await fetch("http://localhost:8787/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "classes_full", // Custom identifier for complex sync
          lang: lang,
          data: data[lang]
        })
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

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

  const handleAddClass = () => {
    const newClasses = [...current.classes];
    newClasses.unshift({
      id: "c" + Date.now(),
      topic: lang === "en" ? "New Class" : "ಹೊಸ ತರಗತಿ",
      teacherId: current.teachers[0]?.id || "",
      day: lang === "en" ? "Monday" : "ಸೋಮವಾರ",
      level: lang === "en" ? "Beginner" : "ಪ್ರಾರಂಭಿಕ",
      time: "10:00 AM"
    });
    update("classes", newClasses);
  };

  const handleDeleteClass = (id: string) => {
    const newClasses = current.classes.filter(c => c.id !== id);
    update("classes", newClasses);
  };

  const handleAddTeacher = () => {
    const newTeachers = [...current.teachers];
    newTeachers.push({
      id: "t" + Date.now(),
      name: lang === "en" ? "New Guru" : "ಹೊಸ ಗುರು",
      expertise: lang === "en" ? "Expertise" : "ಪರಿಣತಿ",
      bio: lang === "en" ? "Enter biography..." : "ಜೀವನ ಚರಿತ್ರೆ...",
      image: g1
    });
    update("teachers", newTeachers);
  };

  const handleDeleteTeacher = (index: number) => {
    const newTeachers = [...current.teachers];
    const removedTeacher = newTeachers.splice(index, 1)[0];
    update("teachers", newTeachers);
    
    // Also remove any classes this teacher had
    const newClasses = current.classes.filter(c => c.teacherId !== removedTeacher.id);
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
    const dayOrder = lang === "en" 
      ? ["Tomorrow", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      : ["ನಾಳೆ", "ಸೋಮವಾರ", "ಮಂಗಳವಾರ", "ಬುಧವಾರ", "ಗುರುವಾರ", "ಶುಕ್ರವಾರ", "ಶನಿವಾರ", "ಭಾನುವಾರ"];
      
    return Array.from(set).sort((a, b) => {
      const idxA = dayOrder.indexOf(a);
      const idxB = dayOrder.indexOf(b);
      if (idxA === -1 && idxB === -1) return a.localeCompare(b);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
  }, [current.classes, lang]);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center bg-[#050505]">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20 relative z-10">
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
        {isEditing && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleAddClass}
              className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Class
            </button>
          </div>
        )}
        <div className="flex flex-wrap items-end justify-center gap-8 mb-14 pb-8 border-b border-border/40">
          <div className="text-center">
            <span className="block text-xs uppercase tracking-[0.25em] text-gold/80 mb-3">
              <EditableText value={current.filterByTeacher} onChange={(v) => update("filterByTeacher", v)} isEditing={isEditing} />
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => setTeacherFilter("all")} className={`px-4 py-1.5 text-sm rounded-sm border ${teacherFilter === "all" ? "bg-gold text-background border-gold" : "border-border/60 text-foreground/75"}`}>{current.all}</button>
              {current.teachers.map(tch => {
                // Determine if they should be deleted if they have no classes
                const hasClasses = current.classes.some(c => c.teacherId === tch.id);
                return (
                  <div key={tch.id} className="relative flex items-center">
                    <button onClick={() => setTeacherFilter(tch.id)} className={`px-4 py-1.5 text-sm rounded-sm border ${teacherFilter === tch.id ? "bg-gold text-background border-gold" : "border-border/60 text-foreground/75"}`}>
                      {tch.name.split(" ").pop()}
                    </button>
                    {isEditing && !hasClasses && (
                      <button 
                        onClick={() => {
                          const idx = current.teachers.findIndex(t => t.id === tch.id);
                          handleDeleteTeacher(idx);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600 transition-all z-10"
                        title="Teacher has no classes. Delete?"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}
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
          <AnimatePresence>
            {filteredClasses.map((c, i) => {
              const teacher = current.teachers.find(t => t.id === c.teacherId);
              const originalIndex = current.classes.findIndex(cls => cls.id === c.id);
              return (
                <motion.article layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={c.id} className="h-full group relative bg-card/40 border border-border/50 p-7 rounded-2xl transition-all hover:border-gold/40 flex flex-col">
                  {isEditing && (
                    <button
                      onClick={() => handleDeleteClass(c.id)}
                      className="absolute top-2 right-2 z-10 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-all"
                      title="Remove Class"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div className="flex items-center gap-2 text-[10px] text-gold/80 uppercase tracking-[0.2em] mb-4 mt-2">
                    {isEditing ? (
                      <>
                        <select
                          value={c.day}
                          onChange={(e) => updateClass(originalIndex, "day", e.target.value)}
                          className="bg-black/40 border border-border/50 rounded px-2 py-1 outline-none focus:border-gold"
                        >
                          {lang === "en" ? (
                            <>
                              <option value="Monday">Monday</option>
                              <option value="Tuesday">Tuesday</option>
                              <option value="Wednesday">Wednesday</option>
                              <option value="Thursday">Thursday</option>
                              <option value="Friday">Friday</option>
                              <option value="Saturday">Saturday</option>
                              <option value="Sunday">Sunday</option>
                              <option value="Tomorrow">Tomorrow</option>
                            </>
                          ) : (
                            <>
                              <option value="ಸೋಮವಾರ">ಸೋಮವಾರ</option>
                              <option value="ಮಂಗಳವಾರ">ಮಂಗಳವಾರ</option>
                              <option value="ಬುಧವಾರ">ಬುಧವಾರ</option>
                              <option value="ಗುರುವಾರ">ಗುರುವಾರ</option>
                              <option value="ಶುಕ್ರವಾರ">ಶುಕ್ರವಾರ</option>
                              <option value="ಶನಿವಾರ">ಶನಿವಾರ</option>
                              <option value="ಭಾನುವಾರ">ಭಾನುವಾರ</option>
                              <option value="ನಾಳೆ">ನಾಳೆ</option>
                            </>
                          )}
                        </select>
                        <span className="text-border">•</span>
                        <select
                          value={c.level || "None"}
                          onChange={(e) => updateClass(originalIndex, "level", e.target.value)}
                          className="bg-black/40 border border-border/50 rounded px-2 py-1 outline-none focus:border-gold"
                        >
                          {lang === "en" ? (
                            <>
                              <option value="None">None</option>
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="All Levels">All Levels</option>
                            </>
                          ) : (
                            <>
                              <option value="ಯಾವುದು ಇಲ್ಲ">ಯಾವುದು ಇಲ್ಲ</option>
                              <option value="ಪ್ರಾರಂಭಿಕ">ಪ್ರಾರಂಭಿಕ</option>
                              <option value="ಮಧ್ಯಮ">ಮಧ್ಯಮ</option>
                              <option value="ಉನ್ನತ">ಉನ್ನತ</option>
                              <option value="ಎಲ್ಲ ಹಂತ">ಎಲ್ಲ ಹಂತ</option>
                            </>
                          )}
                        </select>
                      </>
                    ) : (
                      <>
                        <span>{c.day}</span>
                        {c.level && c.level !== "None" && c.level !== "ಯಾವುದು ಇಲ್ಲ" && (
                          <>
                            <span className="text-border">•</span>
                            <span>{c.level}</span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <h3 className="font-display text-xl text-primary leading-tight mb-5">
                    <EditableText value={c.topic} onChange={(v) => updateClass(originalIndex, "topic", v)} isEditing={isEditing} tag="h3" />
                  </h3>
                  <div className="space-y-3 text-sm text-foreground/70 flex-grow">
                    <div className="flex items-center gap-3">
                      <User size={14} className="text-gold shrink-0" />
                      {isEditing ? (
                         <select 
                           value={c.teacherId}
                           onChange={(e) => updateClass(originalIndex, "teacherId", e.target.value)}
                           className="bg-black/40 border border-border/50 rounded px-2 py-1 outline-none focus:border-gold"
                         >
                           {current.teachers.map(t => (
                             <option key={t.id} value={t.id}>{t.name}</option>
                           ))}
                         </select>
                      ) : (
                         <span>{lang === "en" ? "with" : "ಜೊತೆಗೆ"} {teacher?.name}</span>
                      )}
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
          </AnimatePresence>
        </div>
      </div>

      {/* Gurus Section */}
      <section className="mt-40 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display mb-4 text-primary">
            <EditableText value={current.gurusTitle} onChange={(v) => update("gurusTitle", v)} isEditing={isEditing} tag="h2" />
          </h2>
          <p className="text-muted-foreground">
            <EditableText value={current.gurusSubtitle} onChange={(v) => update("gurusSubtitle", v)} isEditing={isEditing} />
          </p>
        </div>
        
        {isEditing && (
          <button
            onClick={handleAddTeacher}
            className="absolute right-0 top-0 flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Guru
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {current.teachers.map((teacher, i) => (
              <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={teacher.id} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-border/50 bg-card/40">
                {isEditing && (
                  <>
                    <button
                      onClick={() => setEditingTeacherIndex(i)}
                      className="absolute top-4 left-4 z-10 p-3 bg-blue-500/80 text-white rounded-full hover:bg-blue-500 transition-all"
                      title="Edit Guru"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTeacher(i)}
                      className="absolute top-4 right-4 z-10 p-3 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-all"
                      title="Delete Guru"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
                <img src={teacher.image} alt="" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-8 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1 block">
                    {teacher.expertise}
                  </span>
                  <h3 className="font-display text-2xl text-primary group-hover:text-gold transition-colors">
                    {teacher.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Editing Teacher Modal */}
      <AnimatePresence>
        {editingTeacherIndex !== null && current.teachers[editingTeacherIndex] && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingTeacherIndex(null)}
              className="absolute inset-0 bg-background/95 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
            >
              <button
                onClick={() => setEditingTeacherIndex(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-background/50 hover:bg-gold hover:text-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-2/5 aspect-[3/4] md:aspect-auto relative group">
                <img
                  src={current.teachers[editingTeacherIndex].image}
                  alt={current.teachers[editingTeacherIndex].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                  <button onClick={() => fileInputRefs.current[editingTeacherIndex]?.click()} className="flex items-center gap-2 px-6 py-3 bg-gold text-background rounded-full font-bold text-xs uppercase tracking-widest shadow-glow">
                    <Camera className="w-4 h-4" /> Replace Photo
                  </button>
                  <input type="file" ref={el => fileInputRefs.current[editingTeacherIndex] = el} className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      const newTeachers = [...current.teachers];
                      newTeachers[editingTeacherIndex] = { ...newTeachers[editingTeacherIndex], image: url };
                      update("teachers", newTeachers);
                    }
                  }} />
                </div>
              </div>

              <div className="md:w-3/5 p-8 md:p-14 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
                  <EditableText value={current.teachers[editingTeacherIndex].expertise} onChange={(v) => {
                    const newTeachers = [...current.teachers];
                    newTeachers[editingTeacherIndex] = { ...newTeachers[editingTeacherIndex], expertise: v };
                    update("teachers", newTeachers);
                  }} isEditing={true} />
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-8 leading-tight">
                  <EditableText value={current.teachers[editingTeacherIndex].name} onChange={(v) => {
                    const newTeachers = [...current.teachers];
                    newTeachers[editingTeacherIndex] = { ...newTeachers[editingTeacherIndex], name: v };
                    update("teachers", newTeachers);
                  }} isEditing={true} />
                </h2>
                <div className="h-1 w-20 bg-gold mb-8 rounded-full" />
                <div className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
                  "<EditableText tag="span" value={current.teachers[editingTeacherIndex].bio} onChange={(v) => {
                    const newTeachers = [...current.teachers];
                    newTeachers[editingTeacherIndex] = { ...newTeachers[editingTeacherIndex], bio: v };
                    update("teachers", newTeachers);
                  }} isEditing={true} />"
                </div>
                
                <div className="mt-12 flex flex-wrap gap-4">
                  <div className="px-6 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest">
                    <EditableText 
                      value={current.teachers[editingTeacherIndex].badge1 || (lang === 'en' ? 'Expert Guru' : 'ನುರಿತ ಗುರುಗಳು')}
                      onChange={(v) => {
                        const newTeachers = [...current.teachers];
                        newTeachers[editingTeacherIndex] = { ...newTeachers[editingTeacherIndex], badge1: v };
                        update("teachers", newTeachers);
                      }}
                      isEditing={true} 
                    />
                  </div>
                  <div className="px-6 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest">
                    <EditableText 
                      value={current.teachers[editingTeacherIndex].badge2 || (lang === 'en' ? '20+ Years Exp' : '೨೦+ ವರ್ಷಗಳ ಅನುಭವ')}
                      onChange={(v) => {
                        const newTeachers = [...current.teachers];
                        newTeachers[editingTeacherIndex] = { ...newTeachers[editingTeacherIndex], badge2: v };
                        update("teachers", newTeachers);
                      }}
                      isEditing={true} 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Save Button */}
      {isEditing && (
        <div className="fixed bottom-10 right-10 z-[100]">
           <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-glow ${
              saveSuccess ? "bg-green-500 text-white" : "bg-primary text-background hover:scale-105"
            }`}
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Saving..." : saveSuccess ? "Saved to D1!" : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}
