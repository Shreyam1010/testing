import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Clock, Loader2, Save, Check, Plus, Trash2, Camera, Calendar, ChevronUp, ChevronDown, Edit2, X } from "lucide-react";
import { uploadImage } from "@/lib/uploadImage";
import { apiUrl } from "@/lib/api";
import g2 from "@/assets/gallery-2.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g1 from "@/assets/gallery-1.jpg";

interface EventsEditorProps {
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
  tag?: "span" | "p" | "div" | "h2" | "h3";
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
      style={{ caretColor: "var(--gold)" }}
    >
      {value}
    </Tag>
  );
}

function useOnClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

function ScrollPicker({
  items,
  value,
  onChange,
  visibleCount = 3,
  className = "",
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
  visibleCount?: number;
  className?: string;
}) {
  const [startIndex, setStartIndex] = useState(() => {
    const idx = items.indexOf(value);
    return idx !== -1 ? Math.max(0, idx - Math.floor(visibleCount / 2)) : 0;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setStartIndex(prev => Math.min(items.length - visibleCount, prev + 1));
      } else {
        setStartIndex(prev => Math.max(0, prev - 1));
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [items, visibleCount]);

  const visibleItems = items.slice(startIndex, startIndex + visibleCount);

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col items-center bg-[#1a1a1a]/80 backdrop-blur-md border border-gold/20 rounded-xl overflow-hidden ${className}`}
    >
      <button
        onClick={(e) => { e.stopPropagation(); setStartIndex(prev => Math.max(0, prev - 1)); }}
        className="w-full py-1 flex justify-center hover:bg-gold/10 text-gold/50 hover:text-gold transition-colors"
      >
        <ChevronUp size={14} />
      </button>
      <div className="flex flex-col w-full">
        {visibleItems.map((item) => (
          <button
            key={item}
            onClick={(e) => { e.stopPropagation(); onChange(item); }}
            className={`py-2 px-4 text-sm text-center transition-all ${
              item === value 
                ? "text-gold font-bold scale-110" 
                : "text-foreground/40 hover:text-primary hover:bg-muted/40"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); setStartIndex(prev => Math.min(items.length - visibleCount, prev + 1)); }}
        className="w-full py-1 flex justify-center hover:bg-gold/10 text-gold/50 hover:text-gold transition-colors"
      >
        <ChevronDown size={14} />
      </button>
    </div>
  );
}

function TimeScrollPicker({
  value,
  onChange,
  onClose,
}: {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef, onClose);

  // Parse current value "HH:MM AM/PM" - handle potential prefixes like "Saturdays, "
  const parseTime = (val: string) => {
    const timeMatch = val.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
    if (timeMatch) {
      return { h: timeMatch[1], m: timeMatch[2], p: timeMatch[3].toUpperCase() };
    }
    return { h: "06", m: "00", p: "PM" };
  };

  const initial = useMemo(() => parseTime(value), [value]);
  const [hour, setHour] = useState(initial.h);
  const [minute, setMinute] = useState(initial.m);
  const [ampm, setAmpm] = useState(initial.p);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const periods = ["AM", "PM"];

  const handleUpdate = (h: string, m: string, p: string) => {
    onChange(`${h}:${m} ${p}`);
  };

  return (
    <div ref={containerRef} className="absolute bottom-full left-0 mb-4 z-[100] flex gap-2 p-3 bg-[#121212] border border-gold/30 rounded-2xl shadow-2xl items-center">
      <ScrollPicker 
        items={hours} 
        value={hour} 
        onChange={(v) => { setHour(v); handleUpdate(v, minute, ampm); }}
        visibleCount={3}
        className="w-16"
      />
      <span className="text-gold font-bold animate-pulse">:</span>
      <ScrollPicker 
        items={minutes} 
        value={minute} 
        onChange={(v) => { setMinute(v); handleUpdate(hour, v, ampm); }}
        visibleCount={3}
        className="w-16"
      />
      <ScrollPicker 
        items={periods} 
        value={ampm} 
        onChange={(v) => { setAmpm(v); handleUpdate(hour, minute, v); }}
        visibleCount={3}
        className="w-16"
      />
      <button 
        onClick={onClose}
        className="ml-2 p-2 bg-gold text-background rounded-full hover:scale-110 transition-all"
      >
        <Check size={16} />
      </button>
    </div>
  );
}

function CustomCalendarPicker({
  value,
  onChange,
  onClose,
}: {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef, onClose);

  const [currentDate, setCurrentDate] = useState(() => value ? new Date(value) : new Date());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const years = useMemo(() => {
    const list = [];
    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 5; y <= currentYear + 10; y++) list.push(y.toString());
    return list;
  }, []);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const offset = newDate.getTimezoneOffset();
    const adjustedDate = new Date(newDate.getTime() - (offset * 60 * 1000));
    onChange(adjustedDate.toISOString().split('T')[0]);
    onClose();
  };

  return (
    <div ref={containerRef} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-4 bg-[#121212] border border-gold/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[110] min-w-[280px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button 
            onClick={() => { setShowMonthPicker(!showMonthPicker); setShowYearPicker(false); }}
            className="text-lg font-display text-primary hover:text-gold transition-colors"
          >
            {months[currentDate.getMonth()]}
          </button>
          <button 
            onClick={() => { setShowYearPicker(!showYearPicker); setShowMonthPicker(false); }}
            className="text-lg font-display text-primary hover:text-gold transition-colors"
          >
            {currentDate.getFullYear()}
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="p-1 hover:text-gold"><ChevronUp size={16} /></button>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="p-1 hover:text-gold"><ChevronDown size={16} /></button>
        </div>
      </div>

      {showYearPicker && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[120]">
          <ScrollPicker 
            items={years} 
            value={currentDate.getFullYear().toString()} 
            onChange={(y) => { setCurrentDate(new Date(parseInt(y), currentDate.getMonth(), 1)); setShowYearPicker(false); }}
            visibleCount={3}
          />
        </div>
      )}

      {showMonthPicker && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[120]">
          <ScrollPicker 
            items={months} 
            value={months[currentDate.getMonth()]} 
            onChange={(m) => { setCurrentDate(new Date(currentDate.getFullYear(), months.indexOf(m), 1)); setShowMonthPicker(false); }}
            visibleCount={3}
          />
        </div>
      )}

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <div key={d} className="text-[10px] font-bold text-gold/50 uppercase">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isSelected = value === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`w-8 h-8 rounded-full text-xs transition-all flex items-center justify-center ${
                isSelected ? "bg-gold text-background font-bold shadow-glow" : "hover:bg-muted/60 text-foreground"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function EventsEditor({ isEditing, lang }: EventsEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
  const [editingDialogIndex, setEditingDialogIndex] = useState<number | null>(null);

  useEffect(() => {
    if (editingDialogIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editingDialogIndex]);

  const [events, setEvents] = useState<any[]>([
    {
      title: { en: "Bhagavata Padya (Vocal)", kn: "ಭಾಗವತ ಪದ್ಯ (ಗಾಯನ)" },
      teacher: { en: "Vid. Keremane Shivarama", kn: "ವಿದ್ವಾನ್ ಕೆರೆಮನೆ ಶಿವರಾಮ" },
      time: { en: "Saturdays, 6:00 PM", kn: "ಶನಿವಾರ, ಸಂಜೆ ೬:೦೦" },
      image: g2,
      badge: { en: "NEXT CLASS", kn: "ಮುಂದಿನ ತರಗತಿ" },
      status: "booking",
    },
    {
      title: { en: "Chande Rhythms", kn: "ಚಂಡೆ ಲಯಗಳು" },
      teacher: { en: "Chittani Subrahmanya", kn: "ಚಿಟ್ಟಾಣಿ ಸುಬ್ರಹ್ಮಣ್ಯ" },
      time: { en: "Sundays, 10:00 AM", kn: "ಭಾನುವಾರ, ಬೆಳಗ್ಗೆ ೧೦:೦೦" },
      image: g5,
      status: "booking",
    },
    {
      title: { en: "Stree Vesha Abhinaya", kn: "ಸ್ತ್ರೀ ವೇಷ ಅಭಿನಯ" },
      teacher: { en: "Hegde Parameshwar", kn: "ಹೆಗ್ಡೆ ಪರಮೇಶ್ವರ್" },
      time: { en: "Wednesdays, 7:00 PM", kn: "ಬುಧವಾರ, ಸಂಜೆ ೭:೦೦" },
      image: g4,
      status: "coming_soon",
    },
    {
      title: { en: "Rakshasa Vesha Makeup", kn: "ರಾಕ್ಷಸ ವೇಷ ಬಣ್ಣಗಾರಿಕೆ" },
      teacher: { en: "Bannada Malinga", kn: "ಬಣ್ಣದ ಮಾಲಿಂಗ" },
      time: { en: "Fridays, 6:30 PM", kn: "ಶುಕ್ರವಾರ, ಸಂಜೆ ೬:೩೦" },
      image: g1,
      status: "coming_soon",
    },
  ]);

  useEffect(() => {
    fetch(apiUrl(`/api/content?lang=${lang}`))
      .then((r) => r.json())
      .then((result) => {
        const evData = result.siteContent?.find((item: any) => item.section === "events");
        if (evData && evData.content_value) {
          try {
            const parsed = JSON.parse(evData.content_value);
            if (Array.isArray(parsed)) {
              setEvents(parsed);
            }
          } catch (e) {}
        }
      })
      .catch(() => {});
  }, [lang]);

  const [showTimePicker, setShowTimePicker] = useState<number | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<number | null>(null);

  const updateEvent = (index: number, field: string, value: string) => {
    setEvents((prev) => {
      const copy = [...prev];
      const ev = { ...copy[index] };
      if (field === "title" || field === "teacher" || field === "time" || field === "badge") {
        (ev as any)[field] = { ...(ev as any)[field], [lang]: value };
      } else {
        (ev as any)[field] = value;
      }
      copy[index] = ev;
      return copy;
    });
  };

  const handleAddEvent = () => {
    setEvents((prev) => [
      {
        title: { en: "New Event", kn: "ಹೊಸ ಕಾರ್ಯಕ್ರಮ" },
        teacher: { en: "Teacher Name", kn: "ಗುರುಗಳ ಹೆಸರು" },
        time: { en: "Date & Time", kn: "ದಿನಾಂಕ ಮತ್ತು ಸಮಯ" },
        image: g2,
        badge: { en: "", kn: "" },
        status: "coming_soon",
      },
      ...prev,
    ]);
  };

  const handleDeleteEvent = (index: number) => {
    setEvents((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleStatus = (index: number) => {
    setEvents((prev) => {
      const copy = [...prev];
      copy[index] = { 
        ...copy[index], 
        status: copy[index].status === "booking" ? "coming_soon" : "booking" 
      };
      return copy;
    });
  };

  const handleImageClick = (index: number) => {
    setEditingImageIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || editingImageIndex === null) return;
    const idx = editingImageIndex;
    updateEvent(idx, "image", URL.createObjectURL(file));
    try {
      const url = await uploadImage(file, "events");
      updateEvent(idx, "image", url);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await fetch(apiUrl("/api/save"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "events", lang, data: events }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="container mx-auto px-6 pt-8 pb-12 md:py-24">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 md:mb-12 relative">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-2 md:mb-4 text-primary">
            <EditableText
              value={lang === "en" ? "Upcoming Events" : "ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು"}
              onChange={() => {}}
              isEditing={isEditing}
              tag="span"
              className="hidden md:inline"
            />
            <span className="md:hidden">{lang === "en" ? "Upcoming Events" : "ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು"}</span>
          </h2>
          <div className="ornament-divider w-24 md:mx-0 mx-auto" />
        </div>
        
        {isEditing && (
          <button
            onClick={handleAddEvent}
            className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 bg-gold/10 text-gold rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all shrink-0"
          >
            <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Add Event
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <AnimatePresence>
          {events.map((ev, i) => (
            <motion.article
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-[#0a0a0a] border border-border/50 rounded-lg transition-all hover:border-gold/40 flex flex-col"
            >
              {isEditing && (
                <button
                  onClick={() => handleDeleteEvent(i)}
                  className="absolute top-2 left-2 z-20 p-2 bg-destructive/80 text-foreground rounded-full hover:bg-destructive transition-all"
                  title="Remove Event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                {(ev.badge?.[lang] || isEditing) && (
                  <span className="absolute top-4 right-4 z-20 bg-gold text-[#0a0a0a] text-[8px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm hidden md:block">
                    <EditableText
                      value={ev.badge?.[lang] || (isEditing ? "Badge Text" : "")}
                      onChange={(v) => updateEvent(i, "badge", v)}
                      isEditing={isEditing}
                      className="hidden md:inline"
                    />
                    <span className="md:hidden">{ev.badge?.[lang] || (isEditing ? "Badge Text" : "")}</span>
                  </span>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-10">
                    <div className="absolute top-2 right-2 z-20 flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingDialogIndex(i); }}
                        className="p-2 bg-accent/80 text-foreground rounded-full hover:bg-accent transition-all md:hidden"
                        title="Edit Event"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Desktop-only replace button */}
                    <div className="hidden md:flex items-center justify-center w-full h-full">
                      <button 
                        onClick={() => handleImageClick(i)}
                        className="flex items-center gap-2 px-4 py-2 bg-gold text-background rounded-full font-bold text-[10px] uppercase tracking-widest shadow-glow hover:scale-105 transition-all"
                      >
                        <Camera className="w-3 h-3" />
                        Replace
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 md:p-6 flex flex-col flex-grow">
                <h3 className="font-display text-sm md:text-xl text-primary mb-2 md:mb-4 leading-tight">
                  <EditableText
                    value={ev.title[lang]}
                    onChange={(v) => updateEvent(i, "title", v)}
                    isEditing={isEditing}
                    tag="span"
                    className="hidden md:inline"
                  />
                  <span className="md:hidden">{ev.title[lang]}</span>
                </h3>

                <div className="space-y-1 md:space-y-3 text-[10px] md:text-sm text-foreground/70 mb-4 md:mb-8 flex-grow">
                  <div className="flex items-center gap-2 md:gap-3">
                    <User size={12} className="text-gold shrink-0 md:w-3.5 md:h-3.5" />
                    <EditableText
                      value={ev.teacher[lang]}
                      onChange={(v) => updateEvent(i, "teacher", v)}
                      isEditing={isEditing}
                      className="hidden md:inline"
                    />
                    <span className="md:hidden">{ev.teacher[lang]}</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 relative">
                    <Calendar size={12} className="text-gold shrink-0 md:w-3.5 md:h-3.5" />
                    {isEditing ? (
                      <div className="relative flex-grow">
                        <button
                          onClick={() => setShowDatePicker(showDatePicker === i ? null : i)}
                          className="text-left w-full text-[9px] md:text-xs text-primary hover:text-gold transition-colors hidden md:block"
                        >
                          {ev.date || "Select Date"}
                        </button>
                        <span className="md:hidden text-[9px] text-primary">{ev.date || "TBD"}</span>
                        {showDatePicker === i && (
                          <CustomCalendarPicker
                            value={ev.date || ""}
                            onChange={(v) => updateEvent(i, "date", v)}
                            onClose={() => setShowDatePicker(null)}
                          />
                        )}
                      </div>
                    ) : (
                      <span>{ev.date || (lang === "en" ? "TBD" : "ಶೀಘ್ರದಲ್ಲೇ")}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 relative">
                    <Clock size={12} className="text-gold shrink-0 md:w-3.5 md:h-3.5" />
                    {isEditing ? (
                      <div className="relative flex-grow">
                        <button
                          onClick={() => setShowTimePicker(showTimePicker === i ? null : i)}
                          className="text-left w-full text-[9px] md:text-xs text-primary hover:text-gold transition-colors hidden md:block"
                        >
                          {ev.time?.[lang] || "Select Time"}
                        </button>
                        <span className="md:hidden text-[9px] text-primary">{ev.time?.[lang] || "TBD"}</span>
                        {showTimePicker === i && (
                          <TimeScrollPicker
                            value={ev.time?.[lang] || "6:00 PM"}
                            onChange={(v) => updateEvent(i, "time", v)}
                            onClose={() => setShowTimePicker(null)}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="flex-grow">
                        <EditableText
                          value={ev.time[lang]}
                          onChange={(v) => updateEvent(i, "time", v)}
                          isEditing={isEditing}
                          className="hidden md:inline"
                        />
                        <span className="md:hidden">{ev.time[lang]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {ev.status === "booking" ? (
                  <div 
                    onClick={() => isEditing && !window.matchMedia("(max-width: 768px)").matches && toggleStatus(i)}
                    className={`block w-full text-center py-2 md:py-3 px-4 border border-border/50 text-[9px] md:text-xs font-bold uppercase tracking-widest text-primary hover:border-gold/50 hover:bg-gold/5 transition-colors rounded-sm ${isEditing ? "md:cursor-pointer" : "cursor-pointer"}`}
                  >
                    {lang === "en" ? "BOOKING" : "ಬುಕಿಂಗ್"}
                  </div>
                ) : (
                  <div 
                    onClick={() => isEditing && !window.matchMedia("(max-width: 768px)").matches && toggleStatus(i)}
                    className={`block w-full text-center py-2 md:py-3 px-4 border border-border/30 text-[9px] md:text-xs font-bold uppercase tracking-widest text-foreground/40 bg-background/20 rounded-sm ${isEditing ? "md:cursor-pointer md:hover:border-gold/50 md:hover:text-primary transition-colors" : "cursor-not-allowed"}`}
                  >
                    {lang === "en" ? "COMING SOON" : "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ"}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Save button — only visible in edit mode */}
      {isEditing && (
        <div className="fixed bottom-8 right-8 z-[100]">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-glow ${
              saveSuccess
                ? "bg-primary text-foreground"
                : "bg-primary text-background hover:scale-105"
            }`}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saveSuccess ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : saveSuccess ? "Saved to D1!" : "Save Changes"}
          </button>
        </div>
      )}

      <AnimatePresence>
        {editingDialogIndex !== null && (
          <EventDialog
            event={events[editingDialogIndex]}
            lang={lang}
            onClose={() => setEditingDialogIndex(null)}
            onSave={(updated) => {
              setEvents(prev => prev.map((ev, i) => i === editingDialogIndex ? updated : ev));
              setEditingDialogIndex(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function EventDialog({
  event,
  lang,
  onClose,
  onSave
}: {
  event: any;
  lang: "en" | "kn";
  onClose: () => void;
  onSave: (updated: any) => void;
}) {
  const [data, setData] = useState(event);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/95 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl z-10 p-4 flex flex-col max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-display text-primary">Edit Event Details</h2>
          <button onClick={onClose} className="p-1 rounded-full bg-background/50 text-foreground">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 pb-3">
          {/* Image */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-widest text-gold font-bold">Event Image</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-video rounded-xl overflow-hidden border border-border/50 bg-background/40 group cursor-pointer"
            >
              <img src={data.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <Camera className="text-foreground w-5 h-5" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setData({ ...data, image: URL.createObjectURL(file) });
                try {
                  const url = await uploadImage(file, "events");
                  setData((prev: any) => ({ ...prev, image: url }));
                } catch (err: any) {
                  alert(`Upload failed: ${err.message}`);
                }
              }}
            />
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-widest text-gold font-bold">Title ({lang.toUpperCase()})</label>
            <input
              className="w-full bg-background/60 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground outline-none focus:border-gold"
              value={data.title[lang]}
              onChange={(e) => setData({...data, title: {...data.title, [lang]: e.target.value}})}
            />
          </div>

          {/* Teacher */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-widest text-gold font-bold">Teacher ({lang.toUpperCase()})</label>
            <input
              className="w-full bg-background/60 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground outline-none focus:border-gold"
              value={data.teacher[lang]}
              onChange={(e) => setData({...data, teacher: {...data.teacher, [lang]: e.target.value}})}
            />
          </div>

          {/* Schedule Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Date Picker */}
            <div className="space-y-1.5 relative">
              <label className="text-[9px] uppercase tracking-widest text-gold font-bold">Date</label>
              <button
                onClick={() => { setShowDatePicker(!showDatePicker); setShowTimePicker(false); }}
                className="w-full bg-background/60 border border-border rounded-xl px-4 py-2.5 text-xs text-primary flex items-center gap-2 hover:border-gold transition-colors"
              >
                <Calendar size={12} className="text-gold" />
                {data.date || "Select Date"}
              </button>
              {showDatePicker && (
                <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[210]">
                  <CustomCalendarPicker
                    value={data.date || ""}
                    onChange={(v) => setData({...data, date: v})}
                    onClose={() => setShowDatePicker(false)}
                  />
                </div>
              )}
            </div>

            {/* Time Picker */}
            <div className="space-y-1.5 relative">
              <label className="text-[9px] uppercase tracking-widest text-gold font-bold">Time</label>
              <button
                onClick={() => { setShowTimePicker(!showTimePicker); setShowDatePicker(false); }}
                className="w-full bg-background/60 border border-border rounded-xl px-4 py-2.5 text-xs text-primary flex items-center gap-2 hover:border-gold transition-colors"
              >
                <Clock size={12} className="text-gold" />
                {data.time[lang] || "Select Time"}
              </button>
              {showTimePicker && (
                <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[210] flex justify-center">
                  <TimeScrollPicker
                    value={data.time[lang] || "06:00 PM"}
                    onChange={(v) => setData({...data, time: {...data.time, [lang]: v}})}
                    onClose={() => setShowTimePicker(false)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Badge */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-widest text-gold font-bold">Badge ({lang.toUpperCase()})</label>
            <input
              className="w-full bg-background/60 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground outline-none focus:border-gold"
              value={data.badge?.[lang] || ""}
              onChange={(e) => setData({...data, badge: {...(data.badge || {}), [lang]: e.target.value}})}
            />
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-widest text-gold font-bold">Status</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setData({...data, status: 'booking'})}
                className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all ${data.status === 'booking' ? 'bg-gold text-background' : 'bg-muted/60 text-muted-foreground border border-border'}`}
              >
                BOOKING
              </button>
              <button 
                onClick={() => setData({...data, status: 'coming_soon'})}
                className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all ${data.status === 'coming_soon' ? 'bg-gold text-background' : 'bg-muted/60 text-muted-foreground border border-border'}`}
              >
                COMING SOON
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-border flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Cancel
          </button>
          <button 
            onClick={() => onSave(data)}
            className="px-6 py-2 rounded-full bg-gold text-background text-[10px] font-bold uppercase tracking-widest shadow-glow"
          >
            Update Event
          </button>
        </div>
      </motion.div>
    </div>
  );
}
