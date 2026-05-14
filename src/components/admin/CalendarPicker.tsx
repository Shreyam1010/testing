import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

export function useOnClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
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

export function ScrollPicker({
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

export function CustomCalendarPicker({
  value,
  onChange,
  onClose,
  position = "bottom",
  anchorRect,
}: {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
  position?: "top" | "bottom";
  /**
   * When provided, the picker is portaled to document.body and positioned at
   * fixed coordinates relative to this rect — escapes any parent overflow:hidden
   * or transformed ancestors. When omitted, falls back to the original
   * absolute-positioned behavior used by EventsEditor.
   */
  anchorRect?: DOMRect | null;
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

  const positionClass = position === "top"
    ? "top-full mt-4"
    : "bottom-full mb-4";

  // Compute fixed-position coords when portaled. Pop above the trigger if
  // there's not enough space below; otherwise pop below.
  const portalStyle: React.CSSProperties | null = (() => {
    if (!anchorRect || typeof window === "undefined") return null;
    const PICKER_HEIGHT = 360;
    const PICKER_WIDTH = 300;
    const margin = 8;
    const spaceBelow = window.innerHeight - anchorRect.bottom;
    const placeAbove = spaceBelow < PICKER_HEIGHT + margin;
    const top = placeAbove
      ? Math.max(margin, anchorRect.top - PICKER_HEIGHT - margin)
      : anchorRect.bottom + margin;
    // Center horizontally on the trigger, but clamp inside the viewport.
    const desiredLeft = anchorRect.left + anchorRect.width / 2 - PICKER_WIDTH / 2;
    const left = Math.max(margin, Math.min(window.innerWidth - PICKER_WIDTH - margin, desiredLeft));
    return { position: "fixed", top, left, zIndex: 9999 };
  })();

  const inner = (
    <div
      ref={containerRef}
      style={portalStyle ?? undefined}
      className={
        portalStyle
          ? "p-4 bg-[#121212] border border-gold/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[280px]"
          : `absolute ${positionClass} left-1/2 -translate-x-1/2 p-4 bg-[#121212] border border-gold/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[110] min-w-[280px]`
      }
    >
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

  if (portalStyle && typeof document !== "undefined") {
    return createPortal(inner, document.body);
  }
  return inner;
}
