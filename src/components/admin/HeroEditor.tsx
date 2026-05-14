import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Save, Check, Upload, X, Crop, Plus, Trash2, Calendar } from "lucide-react";
import Cropper from "react-easy-crop";
import heroImgDefault from "@/assets/hero-yakshagana.jpg";
import mandala from "@/assets/mandala.png";
import logoImg from "@/assets/logo-transparent.png";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import sticker0 from "@/assets/stickers/Asset 1.png";
import sticker1 from "@/assets/stickers/Asset 2.png";
import sticker2 from "@/assets/stickers/Asset 3.png";
import { FaqManager } from "./FaqManager";
import { CustomCalendarPicker } from "./CalendarPicker";
import { uploadImage } from "@/lib/uploadImage";
import { apiUrl } from "@/lib/api";
import { useAdminSave } from "@/hooks/useAdminSave";

const stickerIcons = [sticker2, sticker1, sticker0]; // Classes, Workshops, Performances (matches user-side index.tsx)
const imgMap: Record<string, string> = { g1, g2, g3, g4, g5, g6 };
const resolveImage = (raw: string | undefined | null, fallback: string) => {
  if (!raw) return fallback;
  if (raw.startsWith("g") && imgMap[raw]) return imgMap[raw];
  return raw;
};

// Date-picker helpers for the workshop timestamp field. The DB stores a
// localized display string like "11 November 2024" / "೧೧ ನವೆಂಬರ್ ೨೦೨೪", so
// we convert between that and a canonical YYYY-MM-DD value that the shared
// CustomCalendarPicker emits.
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const KN_MONTHS = ["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"];
const KN_DIGITS = ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"];
const toKnDigits = (s: string) => s.replace(/[0-9]/g, (d) => KN_DIGITS[+d]);
const fromKnDigits = (s: string) => s.replace(/[೦-೯]/g, (d) => String(KN_DIGITS.indexOf(d)));

/** Parse a stored timestamp string like "11 November 2024" or "ಮಾರ್ಚ್ ೨೦೨೫" -> "2024-11-11" / "2025-03-01" */
function timestampToDateValue(display: string | undefined): string {
  if (!display) return "";
  const text = fromKnDigits(display).trim();
  // Match "D Month YYYY" or just "Month YYYY" (legacy data without day).
  const fullMatch = text.match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/);
  const monthOnlyMatch = text.match(/^(\S+)\s+(\d{4})$/);
  let day = 1, monthRaw = "", year = "";
  if (fullMatch) {
    day = parseInt(fullMatch[1], 10);
    monthRaw = fullMatch[2];
    year = fullMatch[3];
  } else if (monthOnlyMatch) {
    monthRaw = monthOnlyMatch[1];
    year = monthOnlyMatch[2];
  } else {
    return "";
  }
  let idx = EN_MONTHS.findIndex((m) => m.toLowerCase() === monthRaw.toLowerCase());
  if (idx < 0) idx = KN_MONTHS.findIndex((m) => m === monthRaw);
  if (idx < 0) return "";
  return `${year}-${String(idx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Format a "YYYY-MM-DD" picker value into the display string for the given language ("11 November 2024" / "೧೧ ನವೆಂಬರ್ ೨೦೨೪"). */
function dateValueToTimestamp(value: string, lang: "en" | "kn"): string {
  if (!value) return "";
  const [yearStr, monthStr, dayStr] = value.split("-");
  const idx = Math.max(0, Math.min(11, parseInt(monthStr, 10) - 1));
  const dayNum = parseInt(dayStr, 10) || 1;
  if (lang === "kn") return `${toKnDigits(String(dayNum))} ${KN_MONTHS[idx]} ${toKnDigits(yearStr)}`;
  return `${dayNum} ${EN_MONTHS[idx]} ${yearStr}`;
}

async function getCroppedBlob(imageSrc: string, pixelCrop: any): Promise<Blob | null> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), "image/jpeg", 0.9));
}

interface HeroEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

/* Invisible editable wrapper — preserves original CSS */
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
  tag?: "span" | "p" | "div" | "h1";
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
      className={`${className} outline-none cursor-text hover:bg-muted/40 rounded px-1 transition-colors`}
      style={{ caretColor: "var(--gold)" }}
    >
      {value}
    </Tag>
  );
}

export function HeroEditor({ isEditing, lang }: HeroEditorProps) {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Default text from i18n
  const defaults = {
    en: {
      tag: "Preserving a 400-year-old legacy",
      title: "The Living Art of",
      titleAccent: "Yakshagana",
      subtitle:
        "An immersive cultural sanctuary where traditional Kannada theatre, music, and dance breathe through every performance, class, and story.",
      ctaPrimary: "Watch Performances",
      ctaSecondary: "Explore Classes",
      image: ""
    },
    kn: {
      tag: "೪೦೦ ವರ್ಷಗಳ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆ",
      title: "ಜೀವಂತ ಕಲೆ",
      titleAccent: "ಯಕ್ಷಗಾನ",
      subtitle:
        "ಸಾಂಪ್ರದಾಯಿಕ ಕನ್ನಡ ರಂಗಭೂಮಿ, ಸಂಗೀತ ಮತ್ತು ನೃತ್ಯ — ಪ್ರತಿ ಪ್ರದರ್ಶನ, ತರಗತಿ ಮತ್ತು ಕಥೆಯಲ್ಲಿ ಉಸಿರಾಡುವ ಸಾಂಸ್ಕೃತಿಕ ತಾಣ.",
      ctaPrimary: "ಪ್ರದರ್ಶನಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
      ctaSecondary: "ಗುರುಕುಲವನ್ನು ಅನ್ವೇಷಿಸಿ",
      image: ""
    },
  };

  const [data, setData] = useState(defaults[lang]);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  // Which slot is being cropped: "hero" (default), or { kind: "home_feature" | "workshop", idx: number }.
  // Determines the aspect ratio of the crop and where the result is written.
  type CropTarget =
    | { kind: "hero" }
    | { kind: "home_feature"; idx: number }
    | { kind: "workshop"; idx: number };
  const [cropTarget, setCropTarget] = useState<CropTarget>({ kind: "hero" });

  // Highlights section ("Where Tradition Awakens"): 3 cards (Classes, Workshops, Performances)
  // Site content keys: highlights.title, highlights.subtitle. Each card is a row in `highlights` table.
  const highlightDefaults: any[] = [
    { id: "hl_classes",      title: { en: "Classes",      kn: "ಗುರುಕುಲ" },           desc: { en: "Authentic training in dance, music, and dialogue from veteran gurus.", kn: "ಅನುಭವಿ ಗುರುಗಳಿಂದ ನೃತ್ಯ, ಸಂಗೀತ ಮತ್ತು ಸಂಭಾಷಣೆಯ ತರಬೇತಿ." },           image: "", orderIndex: 0 },
    { id: "hl_workshops",    title: { en: "Workshops",    kn: "ಕಾರ್ಯಾಗಾರಗಳು" },        desc: { en: "Intensive seasonal sessions for performers, students, and enthusiasts.", kn: "ಕಲಾವಿದರು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಆಳವಾದ ಋತುಮಾನದ ಶಿಬಿರಗಳು." }, image: "", orderIndex: 1 },
    { id: "hl_performances", title: { en: "Performances", kn: "ಪ್ರದರ್ಶನಗಳು" },       desc: { en: "Year-round stage events celebrating the epics through Yakshagana.", kn: "ವರ್ಷವಿಡೀ ಯಕ್ಷಗಾನ ರಂಗ ಪ್ರದರ್ಶನಗಳ ಆಚರಣೆ." },                       image: "", orderIndex: 2 },
  ];
  const [highlightsTitle, setHighlightsTitle] = useState({
    title: lang === "en" ? "Where Tradition Awakens" : "ಪರಂಪರೆ ಎಚ್ಚರಗೊಳ್ಳುವಲ್ಲಿ",
    subtitle: lang === "en" ? "Three pillars of our cultural mission" : "ನಮ್ಮ ಸಾಂಸ್ಕೃತಿಕ ಧ್ಯೇಯದ ಮೂರು ಸ್ತಂಭಗಳು",
  });
  const [highlights, setHighlights] = useState<any[]>(highlightDefaults);

  // Home features (Classes singing/dancing cards under highlights)
  const homeFeatureDefaults: any[] = [
    { id: "hf_singing", title: { en: "Singing", kn: "ಗಾಯನ" }, desc: { en: "Master the authentic narrative singing tradition (Bhagavatike) of Yakshagana.", kn: "ಯಕ್ಷಗಾನದ ಭಾಗವತಿಕೆ ಪರಂಪರೆಯನ್ನು ಕಲಿಯಿರಿ." }, image: "", orderIndex: 0 },
    { id: "hf_dancing", title: { en: "Dancing", kn: "ನೃತ್ಯ" }, desc: { en: "Immerse yourself in the vigorous footwork and graceful choreography of Yakshagana.", kn: "ಯಕ್ಷಗಾನದ ಶಕ್ತಿಯುತ ಪಾದಭಂಗಿ ಮತ್ತು ನೃತ್ಯವನ್ನು ಕಲಿಯಿರಿ." }, image: "", orderIndex: 1 },
  ];
  const [homeFeatures, setHomeFeatures] = useState<any[]>(homeFeatureDefaults);

  // Which workshop row has its date picker open (-1 = none).
  const [openDatePicker, setOpenDatePicker] = useState<number | null>(null);
  // Bounding rect of the trigger button at the moment the picker opened, used
  // to portal the calendar over the workshop card (which has overflow:hidden).
  const [datePickerAnchor, setDatePickerAnchor] = useState<DOMRect | null>(null);

  // Workshops grid (4 cards)
  const workshopDefaults: any[] = [
    { id: "w1", title: { en: "Summer Intensive 2025", kn: "ಬೇಸಿಗೆ ತೀವ್ರ ಶಿಬಿರ ೨೦೨೫" }, timestamp: { en: "March 2025",    kn: "ಮಾರ್ಚ್ ೨೦೨೫" },    image: "" },
    { id: "w2", title: { en: "Mask Making Heritage",  kn: "ಮುಖವಾಡ ತಯಾರಿಕೆ ಪರಂಪರೆ" },  timestamp: { en: "January 2025",  kn: "ಜನವರಿ ೨೦೨೫" },     image: "" },
    { id: "w3", title: { en: "Guru-Shishya Samvada",  kn: "ಗುರು-ಶಿಷ್ಯ ಸಂವಾದ" },          timestamp: { en: "November 2024", kn: "ನವೆಂಬರ್ ೨೦೨೪" },   image: "" },
    { id: "w4", title: { en: "Rhythmic Foundations",  kn: "ಲಯಬದ್ಧ ಅಡಿಪಾಯಗಳು" },        timestamp: { en: "September 2024",kn: "ಸೆಪ್ಟೆಂಬರ್ ೨೦೨೪" },image: "" },
  ];
  const [workshops, setWorkshops] = useState<any[]>(workshopDefaults);
  // User-side home Workshops section pulls its tile images from the gallery's
  // workshop category. Mirror that here so the admin preview matches.
  const [galleryWorkshopImages, setGalleryWorkshopImages] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl(`/api/content?lang=${lang}`))
      .then((r) => r.json())
      .then((result) => {
        const heroData: any = {};
        const highlightsMeta: any = {};
        result.siteContent?.forEach((item: any) => {
          if (item.section === "hero") heroData[item.content_key] = item.content_value;
          if (item.section === "highlights") highlightsMeta[item.content_key] = item.content_value;
        });

        setData({
          ...defaults[lang],
          ...heroData
        });

        if (highlightsMeta.title || highlightsMeta.subtitle) {
          setHighlightsTitle({
            title: highlightsMeta.title || (lang === "en" ? "Where Tradition Awakens" : "ಪರಂಪರೆ ಎಚ್ಚರಗೊಳ್ಳುವಲ್ಲಿ"),
            subtitle: highlightsMeta.subtitle || (lang === "en" ? "Three pillars of our cultural mission" : "ನಮ್ಮ ಸಾಂಸ್ಕೃತಿಕ ಧ್ಯೇಯದ ಮೂರು ಸ್ತಂಭಗಳು"),
          });
        }

        // /api/content returns RAW table rows (title_en, title_kn, etc.) — not
        // the transformed { title: { en, kn } } shape. Normalize here so the
        // editor always works with the merged-language object form. Fall back
        // to the defaults map when a row is missing fields (e.g. the user-side
        // defaults for an unseeded DB).
        const findDefault = (arr: any[], id: string) => arr.find((d) => d.id === id);

        if (Array.isArray(result.highlights) && result.highlights.length) {
          setHighlights(
            result.highlights.map((h: any) => {
              const def = findDefault(highlightDefaults, h.id) || { title: { en: "", kn: "" }, desc: { en: "", kn: "" } };
              return {
                id: h.id,
                title: {
                  en: h.title_en || h.title?.en || def.title.en || "",
                  kn: h.title_kn || h.title?.kn || def.title.kn || "",
                },
                desc: {
                  en: h.desc_en || h.desc?.en || def.desc.en || "",
                  kn: h.desc_kn || h.desc?.kn || def.desc.kn || "",
                },
                image: h.image || "",
                orderIndex: h.order_index ?? h.orderIndex ?? def.orderIndex ?? 0,
              };
            })
          );
        }

        if (Array.isArray(result.homeFeatures) && result.homeFeatures.length) {
          setHomeFeatures(
            result.homeFeatures.map((h: any) => {
              const def = findDefault(homeFeatureDefaults, h.id) || { title: { en: "", kn: "" }, desc: { en: "", kn: "" } };
              return {
                id: h.id,
                title: {
                  en: h.title_en || h.title?.en || def.title.en || "",
                  kn: h.title_kn || h.title?.kn || def.title.kn || "",
                },
                desc: {
                  en: h.desc_en || h.desc?.en || def.desc.en || "",
                  kn: h.desc_kn || h.desc?.kn || def.desc.kn || "",
                },
                image: h.image || "",
                orderIndex: h.order_index ?? h.orderIndex ?? def.orderIndex ?? 0,
              };
            })
          );
        }

        const workshopGalleryImgs = (result.gallery || [])
          .filter((g: any) => g.category === "workshop")
          .map((g: any) => g.src as string);
        setGalleryWorkshopImages(workshopGalleryImgs);

        if (Array.isArray(result.workshops) && result.workshops.length) {
          setWorkshops(
            result.workshops.map((w: any) => {
              const def = findDefault(workshopDefaults, w.id) || { title: { en: "", kn: "" }, timestamp: { en: "", kn: "" } };
              return {
                id: w.id,
                title: {
                  en: w.title_en || w.title?.en || def.title.en || "",
                  kn: w.title_kn || w.title?.kn || def.title.kn || "",
                },
                timestamp: {
                  en: w.timestamp_en || w.timestamp?.en || def.timestamp.en || "",
                  kn: w.timestamp_kn || w.timestamp?.kn || def.timestamp.kn || "",
                },
                image: w.image || "",
              };
            })
          );
        }

        setLoading(false);
      })
      .catch(() => {
        setData(defaults[lang]);
        setLoading(false);
      });
  }, [lang]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const post = (section: string, payload: any) =>
        fetch(apiUrl("/api/save"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section, lang, data: payload }),
        });

      await Promise.all([
        post("hero", data),
        post("highlights_meta", highlightsTitle),
        post(
          "highlights",
          highlights.map((h) => ({
            id: h.id,
            title: { [lang]: h.title?.[lang] || "" },
            desc: { [lang]: h.desc?.[lang] || "" },
            image: h.image || "",
            order_index: h.orderIndex ?? 0,
          }))
        ),
        post(
          "home_features",
          homeFeatures.map((h) => ({
            id: h.id,
            title: { [lang]: h.title?.[lang] || "" },
            desc: { [lang]: h.desc?.[lang] || "" },
            image: h.image || "",
            order_index: h.orderIndex ?? 0,
          }))
        ),
        // Workshops: save current-language title (per-language editable) plus
        // BOTH languages of the timestamp, since the month picker mutates both
        // together. The worker only writes the current-language column, so we
        // fire two saves (en + kn) to persist both timestamp variants.
        ...(
          ["en", "kn"] as const
        ).map((tsLang) =>
          fetch(apiUrl("/api/save"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              section: "workshops",
              lang: tsLang,
              data: workshops.map((w) => ({
                id: w.id,
                // Only send the title for the active editing language to avoid
                // overwriting the other language's translated title with a copy.
                title: { [tsLang]: tsLang === lang ? (w.title?.[lang] || "") : (w.title?.[tsLang] || "") },
                timestamp: { [tsLang]: w.timestamp?.[tsLang] || "" },
                image: w.image || "",
              })),
            }),
          })
        ),
      ]);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  useAdminSave("hero", handleSave);

  const update = (field: string, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const updateHighlight = (idx: number, field: "title" | "desc", value: string) =>
    setHighlights((prev) => prev.map((h, i) => i === idx ? { ...h, [field]: { ...h[field], [lang]: value } } : h));

  const updateHomeFeature = (idx: number, field: "title" | "desc", value: string) =>
    setHomeFeatures((prev) => prev.map((h, i) => i === idx ? { ...h, [field]: { ...h[field], [lang]: value } } : h));

  const updateHomeFeatureImage = (idx: number, image: string) =>
    setHomeFeatures((prev) => prev.map((h, i) => i === idx ? { ...h, image } : h));

  const updateWorkshop = (idx: number, field: "title" | "timestamp", value: string) =>
    setWorkshops((prev) => prev.map((w, i) => i === idx ? { ...w, [field]: { ...w[field], [lang]: value } } : w));

  // Set BOTH languages from a YYYY-MM-DD picker value, so picking a date in
  // either language updates the matching display string in the other one.
  const updateWorkshopDate = (idx: number, dateValue: string) =>
    setWorkshops((prev) => prev.map((w, i) => i === idx ? {
      ...w,
      timestamp: {
        en: dateValueToTimestamp(dateValue, "en"),
        kn: dateValueToTimestamp(dateValue, "kn"),
      },
    } : w));

  const updateWorkshopImage = (idx: number, image: string) =>
    setWorkshops((prev) => prev.map((w, i) => i === idx ? { ...w, image } : w));

  const addWorkshop = () =>
    setWorkshops((prev) => [
      ...prev,
      { id: `w_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, title: { en: "", kn: "" }, timestamp: { en: "", kn: "" }, image: "" },
    ]);

  const removeWorkshop = (idx: number) =>
    setWorkshops((prev) => prev.filter((_, i) => i !== idx));

  const onUploadHomeFeatureImage = (idx: number, file: File) =>
    loadIntoCropper(file, { kind: "home_feature", idx });

  const onUploadWorkshopImage = (idx: number, file: File) =>
    loadIntoCropper(file, { kind: "workshop", idx });

  const onCropComplete = useCallback((_croppedArea: any, pixels: any) => {
    setCroppedAreaPixels(pixels);
  }, []);

  // Aspect ratio per crop target — hero is a wide banner, home feature cards
  // are roughly 4:3 in the public page, workshop tiles are square.
  const cropAspect =
    cropTarget.kind === "hero" ? 16 / 9 :
    cropTarget.kind === "home_feature" ? 4 / 3 :
    /* workshop */ 1;

  const cropTitle =
    cropTarget.kind === "hero" ? "Crop Hero Image" :
    cropTarget.kind === "home_feature" ? "Crop Class Card Image" :
    "Crop Workshop Image";

  const handleApplyCrop = async () => {
    if (tempImage && croppedAreaPixels) {
      const blob = await getCroppedBlob(tempImage, croppedAreaPixels);
      if (!blob) { setTempImage(null); return; }
      try {
        const folder =
          cropTarget.kind === "hero" ? "hero" :
          cropTarget.kind === "home_feature" ? "home_features" :
          "workshops";
        const file = new File([blob], `${folder}-${Date.now()}.jpg`, { type: "image/jpeg" });
        const url = await uploadImage(file, folder);
        if (cropTarget.kind === "hero") update("image", url);
        else if (cropTarget.kind === "home_feature") updateHomeFeatureImage(cropTarget.idx, url);
        else updateWorkshopImage(cropTarget.idx, url);
      } catch (err: any) {
        alert(`Upload failed: ${err.message}`);
      } finally {
        setTempImage(null);
        // Reset target back to hero so a stray escape doesn't write to the wrong slot.
        setCropTarget({ kind: "hero" });
      }
    }
  };

  // Reset zoom/crop state every time a new image is loaded so each crop
  // starts fresh regardless of which slot we're editing.
  const loadIntoCropper = (file: File, target: CropTarget) => {
    setCropTarget(target);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    const reader = new FileReader();
    reader.addEventListener("load", () => setTempImage(reader.result as string));
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (file: File) => loadIntoCropper(file, { kind: "hero" });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  /* ── Balanced Hero UI with Subtle Floating ── */
  return (
    <>
    <section className="relative min-h-[70vh] md:min-h-screen flex items-center overflow-hidden md:pb-16">
      <div className="absolute inset-0 bg-hero" />
      <img
        src={mandala}
        alt=""
        aria-hidden
        className="absolute -right-40 -top-40 w-[700px] opacity-10 animate-spin-slow pointer-events-none"
      />
      <img
        src={mandala}
        alt=""
        aria-hidden
        className="absolute -left-60 -bottom-60 w-[600px] opacity-5 animate-spin-slow pointer-events-none"
        style={{ animationDirection: "reverse" }}
      />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-12 items-center pt-9 lg:pt-0 min-h-0">
        {/* Image - Subtle Floating for Mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 lg:order-2 w-full max-w-[180px] sm:max-w-[240px] lg:max-w-none mx-auto mb-1 lg:mb-0 lg:-mt-4"
        >
          <div className="absolute inset-0 bg-ember rounded-full blur-3xl opacity-40 animate-float-subtle lg:animate-float-slow" />
          <motion.div className="relative aspect-square lg:aspect-auto overflow-hidden rounded-full lg:rounded-2xl border border-gold/20 shadow-glow animate-float-subtle lg:animate-float-slow group">
            <img
              src={data.image || heroImgDefault}
              alt="Yakshagana performer"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <label className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="w-5 h-5 text-gold mb-1" />
                <span className="text-foreground font-bold uppercase tracking-widest text-[7px]">Change Photo</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
                  }}
                />
              </label>
            )}
          </motion.div>
        </motion.div>

        {/* Text & Logo - Balanced Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          {/* Logo - Balanced height */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            src={logoImg} 
            alt="Kathe Gaararu Logo" 
            className="h-28 sm:h-24 md:h-48 lg:h-56 w-auto object-contain mx-auto lg:ml-0 mb-2 lg:mb-8 drop-shadow-2xl"
          />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/5 text-[8.5px] whitespace-nowrap uppercase tracking-[0.1em] text-primary mb-2 lg:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <EditableText
              value={data.tag}
              onChange={(v) => update("tag", v)}
              isEditing={isEditing}
            />
          </motion.div>

          <h1 className="font-display text-[24px] sm:text-4xl md:text-6xl lg:text-7xl leading-tight mb-2 lg:mb-6">
            <EditableText
              value={data.title}
              onChange={(v) => update("title", v)}
              isEditing={isEditing}
            />
            <br />
            <span className="text-gradient-gold glow-text">
              <EditableText
                value={data.titleAccent}
                onChange={(v) => update("titleAccent", v)}
                isEditing={isEditing}
              />
            </span>
          </h1>

          <p className="text-[11px] sm:text-lg text-muted-foreground max-w-xl mx-auto lg:ml-0 leading-relaxed mb-4 lg:mb-10">
            <EditableText
              value={data.subtitle}
              onChange={(v) => update("subtitle", v)}
              isEditing={isEditing}
              tag="span"
            />
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <div className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gold text-background font-medium shadow-glow hover:scale-105 transition-transform text-sm sm:text-base">
              <EditableText
                value={data.ctaPrimary}
                onChange={(v) => update("ctaPrimary", v)}
                isEditing={isEditing}
              />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-border hover:border-gold text-foreground transition-colors text-sm sm:text-base">
              <EditableText
                value={data.ctaSecondary}
                onChange={(v) => update("ctaSecondary", v)}
                isEditing={isEditing}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />

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
    </section>

    {/* HIGHLIGHTS — "Where Tradition Awakens" */}
    <section className="container mx-auto px-6 pt-10 pb-4 md:pb-20 relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-[22px] xs:text-26px sm:text-3xl md:text-5xl font-display mb-4 flex items-center justify-center gap-3 md:gap-4 leading-tight">
          <EditableText
            value={highlightsTitle.title}
            onChange={(v) => setHighlightsTitle((p) => ({ ...p, title: v }))}
            isEditing={isEditing}
          />
        </h2>
        <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" style={{ boxShadow: "0 0 15px oklch(0.82 0.17 85)" }} />
        <p className="text-muted-foreground text-sm md:text-base">
          <EditableText
            value={highlightsTitle.subtitle}
            onChange={(v) => setHighlightsTitle((p) => ({ ...p, subtitle: v }))}
            isEditing={isEditing}
          />
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {highlights.map((h, i) => {
          const sticker = stickerIcons[i % stickerIcons.length];
          return (
            <div
              key={h.id}
              className="group relative p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-card/80 to-card/30 border border-gold/10 hover:border-gold/40 transition-all overflow-hidden h-full flex flex-col justify-between"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all duration-700" />
              <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-gold to-crimson flex items-center justify-center mb-6 shadow-glow p-2.5">
                  <img src={sticker} alt="" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl md:text-2xl font-display mb-3 text-primary group-hover:text-gold transition-colors">
                  <EditableText
                    value={h.title?.[lang] || ""}
                    onChange={(v) => updateHighlight(i, "title", v)}
                    isEditing={isEditing}
                  />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  <EditableText
                    value={h.desc?.[lang] || ""}
                    onChange={(v) => updateHighlight(i, "desc", v)}
                    isEditing={isEditing}
                  />
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest opacity-0 md:opacity-100 transition-opacity">
                {lang === "en" ? "Discover" : "ಅನ್ವೇಷಿಸಿ"}
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>
    </section>

    {/* CLASSES — Singing + Dancing cards (home_features) */}
    <section className="container mx-auto px-6 pt-4 pb-12 md:py-12">
      <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-12 text-center text-primary flex items-center justify-center gap-4">
        {highlights[0]?.title?.[lang] || (lang === "en" ? "Classes" : "ಗುರುಕುಲ")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
        {homeFeatures.map((f, i) => {
          const fallback = i === 0 ? g4 : g1;
          const displayImage = resolveImage(f.image, fallback);
          return (
            <div
              key={f.id}
              className="group relative rounded-2xl md:rounded-3xl overflow-hidden border border-border bg-card/40 p-4 sm:p-8 md:pt-12 md:px-12 md:pb-6 hover:border-gold/50 transition-all flex flex-col justify-end min-h-[220px] sm:min-h-[250px] md:min-h-[450px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10" />
              <img
                src={displayImage}
                alt={`${f.title?.[lang] || "Feature"} card`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {isEditing && (
                <label className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-2 rounded-full bg-background/80 backdrop-blur-md border border-gold/30 cursor-pointer hover:bg-gold/20 transition">
                  <Upload className="w-3.5 h-3.5 text-gold" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-foreground">Change</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => { if (e.target.files?.[0]) onUploadHomeFeatureImage(i, e.target.files[0]); }}
                  />
                </label>
              )}
              <div className="relative z-20">
                <h3 className="text-xl sm:text-3xl md:text-5xl font-display text-primary mb-1 md:mb-4">
                  <EditableText
                    value={f.title?.[lang] || ""}
                    onChange={(v) => updateHomeFeature(i, "title", v)}
                    isEditing={isEditing}
                  />
                </h3>
                <p className="text-muted-foreground text-[10px] sm:text-base md:text-lg mb-2 md:mb-4 leading-tight sm:leading-relaxed">
                  <EditableText
                    value={f.desc?.[lang] || ""}
                    onChange={(v) => updateHomeFeature(i, "desc", v)}
                    isEditing={isEditing}
                  />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>

    {/* WORKSHOPS grid */}
    <section className="container mx-auto px-6 pt-4 pb-12 md:pb-24">
      <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display mb-12 text-center text-primary flex items-center justify-center gap-4">
        {highlights[1]?.title?.[lang] || (lang === "en" ? "Workshops" : "ಕಾರ್ಯಾಗಾರಗಳು")}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {workshops.map((w, i) => {
          // Image priority (must match the user-side Workshops grid in
          // src/routes/index.tsx): admin-uploaded workshop image wins when it's
          // a real URL; otherwise fall back to the gallery's workshop tile at
          // the same index, then to a local placeholder. Legacy seed values
          // like "g1"/"g3" are treated as "no real image".
          const hasRealImage = w.image && !w.image.startsWith("g");
          const galleryImg = galleryWorkshopImages.length
            ? galleryWorkshopImages[i % galleryWorkshopImages.length]
            : undefined;
          const displayImage = hasRealImage ? w.image : (galleryImg || resolveImage(w.image, g1));
          return (
          <div
            key={w.id}
            className="group relative bg-card/60 border border-border rounded-2xl overflow-hidden transition-all hover:border-gold/50 flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={displayImage}
                alt={w.title?.[lang] || "Workshop"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              {isEditing && (
                <>
                  <label className="absolute top-2 left-2 z-30 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-gold/30 cursor-pointer hover:bg-gold/20 transition">
                    <Upload className="w-3 h-3 text-gold" />
                    <span className="text-[8px] uppercase tracking-widest font-bold text-foreground">Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => { if (e.target.files?.[0]) onUploadWorkshopImage(i, e.target.files[0]); }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeWorkshop(i)}
                    className="absolute top-2 right-2 z-30 w-7 h-7 rounded-full bg-destructive/80 hover:bg-destructive text-destructive-foreground flex items-center justify-center"
                    title="Remove workshop"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
            <div className="p-4 md:p-6 flex flex-col justify-between flex-1">
              <h3 className="font-display text-[15px] sm:text-lg md:text-xl text-primary mb-1 md:mb-2 leading-tight break-words hyphens-auto">
                <EditableText
                  value={w.title?.[lang] || ""}
                  onChange={(v) => updateWorkshop(i, "title", v)}
                  isEditing={isEditing}
                />
              </h3>
              <div className="text-[10px] sm:text-xs md:text-sm text-gold/80 font-medium mt-auto relative">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (openDatePicker === i) {
                          setOpenDatePicker(null);
                          setDatePickerAnchor(null);
                        } else {
                          setDatePickerAnchor(e.currentTarget.getBoundingClientRect());
                          setOpenDatePicker(i);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 bg-background/60 border border-gold/30 rounded-md px-2 py-1 text-[11px] text-foreground hover:border-gold/70 transition-colors"
                    >
                      <Calendar size={12} className="text-gold shrink-0" />
                      <span>{w.timestamp?.[lang] || (lang === "en" ? "Select Date" : "ದಿನಾಂಕ ಆಯ್ಕೆ")}</span>
                    </button>
                    {openDatePicker === i && (
                      <CustomCalendarPicker
                        value={timestampToDateValue(w.timestamp?.[lang] || w.timestamp?.en)}
                        onChange={(v) => updateWorkshopDate(i, v)}
                        onClose={() => { setOpenDatePicker(null); setDatePickerAnchor(null); }}
                        anchorRect={datePickerAnchor}
                      />
                    )}
                  </>
                ) : (
                  <span>{w.timestamp?.[lang] || ""}</span>
                )}
              </div>
            </div>
          </div>
          );
        })}
        {isEditing && (
          <button
            type="button"
            onClick={addWorkshop}
            className="aspect-square min-h-[180px] border-2 border-dashed border-gold/30 rounded-2xl flex flex-col items-center justify-center gap-2 text-gold/70 hover:text-gold hover:border-gold/60 transition-colors"
          >
            <Plus className="w-7 h-7" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Add Workshop</span>
          </button>
        )}
      </div>
    </section>

    <div className="container mx-auto px-6 pb-12 md:pb-24 relative z-10">
      <FaqManager lang={lang} blogId={null} title="General FAQ Manager" isEditing={isEditing} />
    </div>

    {/* Crop Modal */}
    <AnimatePresence>
      {tempImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-background/95 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-2xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-display text-primary flex items-center gap-2">
                <Crop className="w-5 h-5 text-gold" />
                {cropTitle}
              </h3>
              <button onClick={() => setTempImage(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative h-[300px] sm:h-[400px] bg-background">
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={cropAspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Zoom</span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setTempImage(null)}
                  className="px-6 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyCrop}
                  className="px-8 py-2 rounded-xl bg-gold text-background hover:scale-105 transition-transform text-xs font-bold uppercase tracking-widest shadow-glow"
                >
                  Apply Crop
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
