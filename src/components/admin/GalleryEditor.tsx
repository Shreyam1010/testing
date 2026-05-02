import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Image as ImageIcon, Video, Camera, Upload, X, Check, Edit2 } from "lucide-react";
import { initialPerformanceItems, initialWorkshopItems, type GalleryItemType } from "@/lib/galleryData";

interface GalleryEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

export function GalleryEditor({ isEditing, lang }: GalleryEditorProps) {
  const [performances, setPerformances] = useState<GalleryItemType[]>(initialPerformanceItems);
  const [workshops, setWorkshops] = useState<GalleryItemType[]>(initialWorkshopItems);
  
  const [addingDialog, setAddingDialog] = useState<"performance" | "workshop" | null>(null);
  const [editingDialog, setEditingDialog] = useState<{ category: "performance" | "workshop", index: number, item: GalleryItemType } | null>(null);

  const handleDelete = (category: "performance" | "workshop", index: number) => {
    if (category === "performance") {
      setPerformances((prev) => prev.filter((_, i) => i !== index));
    } else {
      setWorkshops((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSaveAdd = (item: GalleryItemType) => {
    if (addingDialog === "performance") {
      setPerformances(prev => [...prev, item]);
    } else if (addingDialog === "workshop") {
      setWorkshops(prev => [...prev, item]);
    }
    setAddingDialog(null);
  };

  const handleSaveEdit = (item: GalleryItemType) => {
    if (!editingDialog) return;
    if (editingDialog.category === "performance") {
      setPerformances(prev => prev.map((p, i) => i === editingDialog.index ? item : p));
    } else {
      setWorkshops(prev => prev.map((w, i) => i === editingDialog.index ? item : w));
    }
    setEditingDialog(null);
  };

  return (
    <div className="container mx-auto px-6 py-20 relative z-10">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-display text-primary mb-2">Gallery Management</h2>
          <p className="text-muted-foreground">Curate the visual journey of the sanctuary</p>
        </div>
      </div>

      {/* PERFORMANCES */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-display text-primary border-l-4 border-gold pl-4">
            {lang === "en" ? "Performances" : "ಪ್ರದರ್ಶನಗಳು"}
          </h3>
          {isEditing && (
            <button
              onClick={() => setAddingDialog("performance")}
              className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all"
            >
              <Plus className="w-4 h-4" />
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

      {/* WORKSHOPS */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-display text-primary border-l-4 border-gold pl-4">
            {lang === "en" ? "Workshops" : "ಕಾರ್ಯಾಗಾರಗಳು"}
          </h3>
          {isEditing && (
            <button
              onClick={() => setAddingDialog("workshop")}
              className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all"
            >
              <Plus className="w-4 h-4" />
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-4">
        <div className="flex justify-between items-start w-full">
          {isEditing ? (
            <>
              <button
                onClick={onEdit}
                className="p-2.5 bg-blue-500/80 text-white rounded-full hover:bg-blue-500 hover:scale-105 transition-all shadow-lg"
                title="Edit Media"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-2.5 bg-red-500/80 text-white rounded-full hover:bg-red-500 hover:scale-105 transition-all shadow-lg"
                title="Delete Media"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
             <div />
          )}
        </div>

        <div>
          <div className="text-white font-display text-xl mb-1">{item.label}</div>
          <div className="flex items-center gap-2">
            {item.type === "video" ? (
              <span className="text-[10px] bg-blue-500/80 text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter shadow-sm">
                Video
              </span>
            ) : (
              <span className="text-[10px] bg-gold/80 text-background px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter shadow-sm">
                Photo
              </span>
            )}
          </div>
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setItem((prev) => ({ ...prev, src: url }));
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
        className="relative w-full max-w-xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl z-10 p-8 flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-display text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-background/50 hover:bg-gold hover:text-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
          {/* Media Type & Upload */}
          <div className="space-y-4">
            <label className="text-xs uppercase tracking-widest text-gold font-bold">Media Type</label>
            <div className="flex gap-4">
              <button
                onClick={() => setItem({ ...item, type: "image", src: "" })}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  item.type === "image" ? "bg-gold text-background font-bold shadow-glow" : "bg-black/30 text-muted-foreground border border-border hover:bg-black/40"
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Photo
              </button>
              <button
                onClick={() => setItem({ ...item, type: "video", src: "" })}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  item.type === "video" ? "bg-blue-500 text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-black/30 text-muted-foreground border border-border hover:bg-black/40"
                }`}
              >
                <Video className="w-4 h-4" /> Video
              </button>
            </div>

            <div 
              className="mt-4 border-2 border-dashed border-border/60 hover:border-gold/50 transition-colors rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-black/20"
              onClick={() => fileInputRef.current?.click()}
            >
              {item.src ? (
                item.type === "video" ? (
                  <video src={item.src} className="max-h-56 rounded-lg object-contain shadow-lg" muted />
                ) : (
                  <img src={item.src} className="max-h-56 rounded-lg object-contain shadow-lg" alt="Preview" />
                )
              ) : (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-gold" />
                  </div>
                  <span className="text-sm font-bold text-primary mb-1">Click to upload {item.type}</span>
                  <span className="text-xs text-muted-foreground">Select a file from your device</span>
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

          {/* Label Input */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gold font-bold">Label / Title</label>
            <input
              type="text"
              value={item.label}
              onChange={(e) => setItem({ ...item, label: e.target.value })}
              className="w-full bg-black/40 border border-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
              placeholder="e.g., The Warrior"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-border flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(item)}
            disabled={!item.src || !item.label}
            className="px-8 py-2.5 rounded-full bg-gold text-background text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:shadow-glow transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Save Item
          </button>
        </div>
      </motion.div>
    </div>
  );
}
