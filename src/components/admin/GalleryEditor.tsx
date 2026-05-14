import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Image as ImageIcon, Video, Camera, Upload, X, Check, Edit2 } from "lucide-react";
import { initialPerformanceItems, initialWorkshopItems, initialGurukulItems, type GalleryItemType } from "@/lib/galleryData";
import { uploadImage } from "@/lib/uploadImage";
import { apiUrl } from "@/lib/api";

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
        setPerformances(all.filter(g => g.category === "performance").map(g => ({ id: g.id, label: g.label, type: g.type, src: g.src, category: "performance" })));
        setGurukul(all.filter(g => g.category === "gurukul").map(g => ({ id: g.id, label: g.label, type: g.type, src: g.src, category: "gurukul" })));
        setWorkshops(all.filter(g => g.category === "workshop").map(g => ({ id: g.id, label: g.label, type: g.type, src: g.src, category: "workshop" })));
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
            {lang === "en" ? "Gurukul" : "ಗುರುಕುಲ"}
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
        <video src={item.src} className="w-full h-full object-cover" muted loop />
      ) : (
        <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
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
  const [item, setItem] = useState<GalleryItemType>(initialItem);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setItem((prev) => ({ ...prev, src: previewUrl }));
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
                onClick={() => setItem({ ...item, type: "image", src: "" })}
                className={`flex-1 py-2 md:py-3 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm transition-all ${
                  item.type === "image" ? "bg-gold text-background font-bold shadow-glow" : "bg-muted/60 text-muted-foreground border border-border hover:bg-background/60"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 md:w-4 md:h-4" /> Photo
              </button>
              <button
                onClick={() => setItem({ ...item, type: "video", src: "" })}
                className={`flex-1 py-2 md:py-3 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm transition-all ${
                  item.type === "video" ? "bg-accent text-foreground font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-muted/60 text-muted-foreground border border-border hover:bg-background/60"
                }`}
              >
                <Video className="w-3.5 h-3.5 md:w-4 md:h-4" /> Video
              </button>
            </div>

            <div 
              className="mt-3 md:mt-4 border-2 border-dashed border-border/60 hover:border-gold/50 transition-colors rounded-xl p-4 md:p-8 flex flex-col items-center justify-center cursor-pointer bg-background/40"
              onClick={() => fileInputRef.current?.click()}
            >
              {item.src ? (
                item.type === "video" ? (
                  <video src={item.src} className="max-h-40 md:max-h-56 rounded-lg object-contain shadow-lg" muted />
                ) : (
                  <img src={item.src} className="max-h-40 md:max-h-56 rounded-lg object-contain shadow-lg" alt="Preview" />
                )
              ) : (
                <div className="flex flex-col items-center py-4 md:py-6 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/10 flex items-center justify-center mb-3 md:mb-4">
                    <Upload className="w-6 h-6 md:w-8 md:h-8 text-gold" />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-primary mb-0.5 md:mb-1">Click to upload {item.type}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">Select a file from your device</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept={item.type === "video" ? "video/*" : "image/*"}
              onChange={handleFileChange}
            />
          </div>
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
            disabled={!item.src}
            className="px-6 md:px-8 py-2 md:py-2.5 rounded-full bg-gold text-background text-[10px] md:text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:shadow-glow transition-all flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 md:w-4 md:h-4" /> Save Item
          </button>
        </div>
      </motion.div>
    </div>
  );
}
