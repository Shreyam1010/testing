import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Image as ImageIcon, Video, Camera, Upload, X, Check, Edit2 } from "lucide-react";
import { initialPerformanceItems, initialWorkshopItems, initialGurukulItems, type GalleryItemType } from "@/lib/galleryData";
import { uploadImage } from "@/lib/uploadImage";
import { apiUrl } from "@/lib/api";
import { useAdminSave } from "@/hooks/useAdminSave";

interface GalleryEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

type GalleryRow = GalleryItemType & { id?: string; category?: "performance" | "gurukul" | "workshop" };

export function GalleryEditor({ isEditing, lang }: GalleryEditorProps) {
  const [performances, setPerformances] = useState<GalleryRow[]>(initialPerformanceItems);
  const [gurukul, setGurukul] = useState<GalleryRow[]>(initialGurukulItems);
  const [workshops, setWorkshops] = useState<GalleryRow[]>(initialWorkshopItems);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(apiUrl(`/api/content?lang=${lang}`))
      .then(r => r.json())
      .then((raw) => {
        const all: any[] = raw.gallery || [];
        if (!all.length) return;
        const pick = (g: any, category: "performance" | "gurukul" | "workshop") => ({
          id: g.id,
          label: g.label,
          type: g.type,
          src: g.src,
          category,
          focalX: typeof g.focal_x === "number" ? g.focal_x : 50,
          focalY: typeof g.focal_y === "number" ? g.focal_y : 50,
          thumbnail: g.thumbnail || "",
        });
        setPerformances(all.filter(g => g.category === "performance").map(g => pick(g, "performance")));
        setGurukul(all.filter(g => g.category === "gurukul").map(g => pick(g, "gurukul")));
        setWorkshops(all.filter(g => g.category === "workshop").map(g => pick(g, "workshop")));
      })
      .catch(err => console.error("[GalleryEditor] fetch failed", err));
  }, [lang]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = [
        ...performances.map(p => ({ ...p, category: "performance" })),
        ...gurukul.map(g => ({ ...g, category: "gurukul" })),
        ...workshops.map(w => ({ ...w, category: "workshop" })),
      ];
      const res = await fetch(apiUrl(`/api/save`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "gallery", data: payload, lang }),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      alert("Gallery saved.");
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  useAdminSave("gallery", handleSave);

  const [addingDialog, setAddingDialog] = useState<"performance" | "gurukul" | "workshop" | null>(null);
  const [editingDialog, setEditingDialog] = useState<{ category: "performance" | "gurukul" | "workshop", index: number, item: GalleryItemType } | null>(null);

  useEffect(() => {
    if (addingDialog || editingDialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [addingDialog, editingDialog]);

  const handleDelete = (category: "performance" | "gurukul" | "workshop", index: number) => {
    if (category === "performance") {
      setPerformances((prev) => prev.filter((_, i) => i !== index));
    } else if (category === "gurukul") {
      setGurukul((prev) => prev.filter((_, i) => i !== index));
    } else {
      setWorkshops((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSaveAdd = (item: GalleryItemType) => {
    if (addingDialog === "performance") {
      setPerformances(prev => [...prev, item]);
    } else if (addingDialog === "gurukul") {
      setGurukul(prev => [...prev, item]);
    } else if (addingDialog === "workshop") {
      setWorkshops(prev => [...prev, item]);
    }
    setAddingDialog(null);
  };

  const handleSaveEdit = (item: GalleryItemType) => {
    if (!editingDialog) return;
    if (editingDialog.category === "performance") {
      setPerformances(prev => prev.map((p, i) => i === editingDialog.index ? item : p));
    } else if (editingDialog.category === "gurukul") {
      setGurukul(prev => prev.map((g, i) => i === editingDialog.index ? item : g));
    } else {
      setWorkshops(prev => prev.map((w, i) => i === editingDialog.index ? item : w));
    }
    setEditingDialog(null);
  };

  return (
    <div className="container mx-auto px-6 pt-8 pb-12 md:py-20 relative z-10">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-xl md:text-4xl font-display text-primary mb-1 md:mb-2">Gallery Management</h2>
          <p className="text-[10px] md:text-base text-muted-foreground">Curate the visual journey of the sanctuary</p>
        </div>
        {isEditing && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-gold text-background rounded-full font-bold text-xs uppercase tracking-widest shadow-glow disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Gallery"}
          </button>
        )}
      </div>

      {/* PERFORMANCES */}
      <section className="mb-20">
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <h3 className="text-base md:text-2xl font-display text-primary border-l-4 border-gold pl-3 md:pl-4">
            {lang === "en" ? "Performances" : "ಪ್ರದರ್ಶನಗಳು"}
          </h3>
          {isEditing && (
            <button
              onClick={() => setAddingDialog("performance")}
              className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 bg-gold/10 text-gold rounded-full text-[9px] md:text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Add Item
            </button>
          )}
        </div>

        {/* MASONRY / CARD LAYOUT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 grid-flow-dense">
          {performances.map((item, i) => (
            <EditorItem
              key={i}
              item={item}
              index={i}
              isEditing={isEditing}
              onEdit={() => setEditingDialog({ category: "performance", index: i, item })}
              onDelete={() => handleDelete("performance", i)}
            />
          ))}
        </div>
      </section>

      {/* GURUKUL */}
      <section className="mb-20">
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <h3 className="text-base md:text-2xl font-display text-primary border-l-4 border-gold pl-3 md:pl-4">
            {lang === "en" ? "Classes" : "ತರಗತಿಗಳು"}
          </h3>
          {isEditing && (
            <button
              onClick={() => setAddingDialog("gurukul")}
              className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 bg-gold/10 text-gold rounded-full text-[9px] md:text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Add Item
            </button>
          )}
        </div>

        {/* MASONRY / CARD LAYOUT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 grid-flow-dense">
          {gurukul.map((item, i) => (
            <EditorItem
              key={i}
              item={item}
              index={i}
              isEditing={isEditing}
              onEdit={() => setEditingDialog({ category: "gurukul", index: i, item })}
              onDelete={() => handleDelete("gurukul", i)}
            />
          ))}
        </div>
      </section>

      {/* WORKSHOPS */}
      <section className="mb-20">
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <h3 className="text-base md:text-2xl font-display text-primary border-l-4 border-gold pl-3 md:pl-4">
            {lang === "en" ? "Workshops" : "ಕಾರ್ಯಾಗಾರಗಳು"}
          </h3>
          {isEditing && (
            <button
              onClick={() => setAddingDialog("workshop")}
              className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 bg-gold/10 text-gold rounded-full text-[9px] md:text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Add Item
            </button>
          )}
        </div>

        {/* MASONRY / CARD LAYOUT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 grid-flow-dense">
          {workshops.map((item, i) => (
            <EditorItem
              key={i}
              item={item}
              index={i}
              isEditing={isEditing}
              onEdit={() => setEditingDialog({ category: "workshop", index: i, item })}
              onDelete={() => handleDelete("workshop", i)}
            />
          ))}
        </div>
      </section>

      {/* Dialogs */}
      <AnimatePresence>
        {addingDialog && (
          <ItemDialog 
            title="Add New Media" 
            initialItem={{ label: "", type: "image", src: "" }} 
            onClose={() => setAddingDialog(null)} 
            onSave={handleSaveAdd} 
          />
        )}
        {editingDialog && (
          <ItemDialog 
            title="Edit Media" 
            initialItem={editingDialog.item} 
            onClose={() => setEditingDialog(null)} 
            onSave={handleSaveEdit} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EditorItem({
  item,
  index,
  isEditing,
  onEdit,
  onDelete,
}: {
  item: GalleryItemType;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card/30 transition-all shadow-md ${
        !isEditing && (index === 0 || index === 3) 
          ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" 
          : "aspect-square"
      }`}
    >
      {item.type === "video" ? (
        item.thumbnail ? (
          <>
            <img
              src={item.thumbnail}
              alt={item.label || "Video thumbnail"}
              className="w-full h-full object-cover"
              style={{ objectPosition: `${item.focalX ?? 50}% ${item.focalY ?? 50}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/60 backdrop-blur-sm border border-gold/60 flex items-center justify-center">
                <Video className="w-4 h-4 md:w-5 md:h-5 text-gold" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-background flex items-center justify-center">
            <Video className="w-8 h-8 text-muted-foreground" />
          </div>
        )
      ) : (
        <img
          src={item.src}
          alt={item.label}
          className="w-full h-full object-cover"
          style={{ objectPosition: `${item.focalX ?? 50}% ${item.focalY ?? 50}%` }}
        />
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 bg-background/60 backdrop-blur-[2px] transition-all flex flex-col justify-between p-3 md:p-4 ${
        isEditing ? "opacity-100 md:opacity-0 md:group-hover:opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}>
        <div className="flex justify-end w-full">
          {isEditing && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-1.5 md:p-2.5 bg-destructive/80 text-foreground rounded-full hover:bg-destructive hover:scale-105 transition-all shadow-lg z-20"
              title="Delete Media"
            >
              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          )}
        </div>

        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 bg-gold text-background rounded-full font-bold text-[9px] md:text-[10px] uppercase tracking-widest shadow-glow hover:scale-105 transition-all z-10"
            >
              <Camera className="w-3 h-3 md:w-3.5 md:h-3.5" />
              Replace
            </button>
          </div>
        )}

        <div className={isEditing ? "opacity-40" : ""}>
          {/* Label and type badges removed */}
        </div>
      </div>
    </motion.div>
  );
}

function ItemDialog({
  title,
  initialItem,
  onClose,
  onSave
}: {
  title: string;
  initialItem: GalleryItemType;
  onClose: () => void;
  onSave: (item: GalleryItemType) => void;
}) {
  const [item, setItem] = useState<GalleryItemType>({
    focalX: 50,
    focalY: 50,
    ...initialItem,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [thumbUploading, setThumbUploading] = useState(false);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setItem((prev) => ({ ...prev, src: previewUrl, focalX: 50, focalY: 50 }));
    setUploading(true);
    try {
      const url = await uploadImage(file, "gallery");
      setItem((prev) => ({ ...prev, src: url }));
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
      setItem((prev) => ({ ...prev, src: "" }));
    } finally {
      setUploading(false);
    }
  };

  const handleThumbChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setItem((prev) => ({ ...prev, thumbnail: previewUrl }));
    setThumbUploading(true);
    try {
      const url = await uploadImage(file, "gallery");
      setItem((prev) => ({ ...prev, thumbnail: url }));
    } catch (err: any) {
      alert(`Thumbnail upload failed: ${err.message}`);
      setItem((prev) => ({ ...prev, thumbnail: "" }));
    } finally {
      setThumbUploading(false);
    }
  };

  const focalX = item.focalX ?? 50;
  const focalY = item.focalY ?? 50;

  const handleFocalPick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setItem((prev) => ({
      ...prev,
      focalX: Math.max(0, Math.min(100, Math.round(x))),
      focalY: Math.max(0, Math.min(100, Math.round(y))),
    }));
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
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
        className="relative w-full max-w-xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl z-10 p-5 md:p-8 flex flex-col"
      >
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-lg md:text-3xl font-display text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 md:p-2 rounded-full bg-background/50 hover:bg-gold hover:text-background transition-colors"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 md:space-y-6">
          {/* Media Type & Upload */}
          <div className="space-y-3 md:space-y-4">
            <label className="text-[10px] md:text-xs uppercase tracking-widest text-gold font-bold">Media Type</label>
            <div className="flex gap-3 md:gap-4">
              <button
                onClick={() => setItem({ ...item, type: "image", src: "", thumbnail: "" })}
                className={`flex-1 py-2 md:py-3 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm transition-all ${
                  item.type === "image" ? "bg-gold text-background font-bold shadow-glow" : "bg-muted/60 text-muted-foreground border border-border hover:bg-background/60"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 md:w-4 md:h-4" /> Photo
              </button>
              <button
                onClick={() => setItem({ ...item, type: "video", src: "", thumbnail: "" })}
                className={`flex-1 py-2 md:py-3 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm transition-all ${
                  item.type === "video" ? "bg-accent text-foreground font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-muted/60 text-muted-foreground border border-border hover:bg-background/60"
                }`}
              >
                <Video className="w-3.5 h-3.5 md:w-4 md:h-4" /> Video
              </button>
            </div>

            {!item.src ? (
              <div
                className="mt-3 md:mt-4 border-2 border-dashed border-border/60 hover:border-gold/50 transition-colors rounded-xl p-4 md:p-8 flex flex-col items-center justify-center cursor-pointer bg-background/40"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center py-4 md:py-6 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/10 flex items-center justify-center mb-3 md:mb-4">
                    <Upload className="w-6 h-6 md:w-8 md:h-8 text-gold" />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-primary mb-0.5 md:mb-1">Click to upload {item.type}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">Select a file from your device</span>
                </div>
              </div>
            ) : item.type === "video" ? (
              <div className="mt-3 md:mt-4 border border-border/60 rounded-xl p-4 flex flex-col items-center bg-background/40">
                <video src={item.src} className="max-h-40 md:max-h-56 rounded-lg object-contain shadow-lg" muted />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 text-[10px] md:text-xs text-gold hover:underline"
                >
                  Replace video
                </button>
              </div>
            ) : (
              <div className="mt-3 md:mt-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-start">
                  {/* Focal point picker */}
                  <div className="relative w-full overflow-hidden rounded-xl border border-border/60 bg-background/40 select-none">
                    <div
                      className="relative w-full cursor-crosshair"
                      onClick={handleFocalPick}
                    >
                      <img
                        src={item.src}
                        alt="Focal point preview"
                        className="block w-full h-auto max-h-72 object-contain mx-auto pointer-events-none"
                      />
                      <div
                        className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-gold bg-gold/30 shadow-glow pointer-events-none"
                        style={{ left: `${focalX}%`, top: `${focalY}%` }}
                      >
                        <div className="absolute inset-1 rounded-full bg-gold" />
                      </div>
                    </div>
                    <p className="text-[10px] md:text-xs text-muted-foreground px-3 py-2 border-t border-border/60">
                      Click anywhere on the image to mark the part that must always stay visible inside the gallery tile.
                    </p>
                  </div>

                  {/* Square crop preview — mirrors the gallery tile */}
                  <div className="flex flex-col items-center gap-2 w-32 md:w-40 shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border border-gold/40 bg-background/40">
                      <img
                        src={item.src}
                        alt="Crop preview"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: `${focalX}% ${focalY}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Tile preview</span>
                    <span className="text-[10px] text-gold">{focalX}% / {focalY}%</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => setItem((prev) => ({ ...prev, focalX: 50, focalY: 50 }))}
                    className="text-[10px] md:text-xs px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground"
                  >
                    Reset to center
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] md:text-xs px-3 py-1.5 rounded-full bg-gold/10 hover:bg-gold/20 text-gold"
                  >
                    Replace image
                  </button>
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept={item.type === "video" ? "video/*" : "image/*"}
              onChange={handleFileChange}
            />
          </div>

          {/* Thumbnail — required for video items */}
          {item.type === "video" && (
            <div className="space-y-3 md:space-y-4 pt-2">
              <label className="text-[10px] md:text-xs uppercase tracking-widest text-gold font-bold">
                Video Thumbnail <span className="text-destructive">*</span>
              </label>
              {!item.thumbnail ? (
                <div
                  className="border-2 border-dashed border-border/60 hover:border-gold/50 transition-colors rounded-xl p-4 md:p-6 flex flex-col items-center justify-center cursor-pointer bg-background/40"
                  onClick={() => thumbInputRef.current?.click()}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold/10 flex items-center justify-center mb-2 md:mb-3">
                    <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-primary mb-0.5">Click to upload thumbnail</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">Shown on the gallery tile before play</span>
                </div>
              ) : (
                <div className="border border-border/60 rounded-xl p-4 flex flex-col items-center bg-background/40">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border border-gold/40 bg-background/40">
                    <img
                      src={item.thumbnail}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: `${focalX}% ${focalY}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => thumbInputRef.current?.click()}
                    className="mt-3 text-[10px] md:text-xs text-gold hover:underline"
                  >
                    {thumbUploading ? "Uploading…" : "Replace thumbnail"}
                  </button>
                </div>
              )}
              <input
                type="file"
                ref={thumbInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleThumbChange}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 md:mt-8 pt-4 md:pt-6 border-t border-border flex justify-end gap-3 md:gap-4">
          <button
            onClick={onClose}
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(item)}
            disabled={
              !item.src ||
              uploading ||
              thumbUploading ||
              item.src.startsWith("blob:") ||
              (item.type === "video" && (!item.thumbnail || item.thumbnail.startsWith("blob:")))
            }
            className="px-6 md:px-8 py-2 md:py-2.5 rounded-full bg-gold text-background text-[10px] md:text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:shadow-glow transition-all flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 md:w-4 md:h-4" /> {uploading || thumbUploading ? "Uploading…" : "Save Item"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
