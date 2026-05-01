import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Image as ImageIcon, Video, Camera, Upload, X, Check } from "lucide-react";
import { initialPerformanceItems, initialWorkshopItems, type GalleryItemType } from "@/lib/galleryData";

interface GalleryEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

export function GalleryEditor({ isEditing, lang }: GalleryEditorProps) {
  const [performances, setPerformances] = useState<GalleryItemType[]>(initialPerformanceItems);
  const [workshops, setWorkshops] = useState<GalleryItemType[]>(initialWorkshopItems);
  const [isAdding, setIsAdding] = useState<"performance" | "workshop" | null>(null);

  const [newItem, setNewItem] = useState<{
    label: string;
    type: "image" | "video";
    src: string;
  }>({
    label: "",
    type: "image",
    src: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (category: "performance" | "workshop", index: number) => {
    if (category === "performance") {
      setPerformances((prev) => prev.filter((_, i) => i !== index));
    } else {
      setWorkshops((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleAddItem = () => {
    if (!newItem.label || !newItem.src) return;

    if (isAdding === "performance") {
      setPerformances((prev) => [...prev, { ...newItem }]);
    } else {
      setWorkshops((prev) => [...prev, { ...newItem }]);
    }

    setNewItem({ label: "", type: "image", src: "" });
    setIsAdding(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewItem((prev) => ({ ...prev, src: url }));
    }
  };

  const updateLabel = (category: "performance" | "workshop", index: number, newLabel: string) => {
    if (category === "performance") {
      setPerformances((prev) =>
        prev.map((item, i) => (i === index ? { ...item, label: newLabel } : item))
      );
    } else {
      setWorkshops((prev) =>
        prev.map((item, i) => (i === index ? { ...item, label: newLabel } : item))
      );
    }
  };

  return (
    <div className="container mx-auto px-6 py-20">
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
              onClick={() => setIsAdding("performance")}
              className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 grid-flow-dense">
          {performances.map((item, i) => (
            <EditorItem
              key={i}
              item={item}
              index={i}
              isEditing={isEditing}
              onDelete={() => handleDelete("performance", i)}
              onLabelChange={(val) => updateLabel("performance", i, val)}
            />
          ))}
          <AnimatePresence>
            {isAdding === "performance" && (
              <NewItemForm
                newItem={newItem}
                setNewItem={setNewItem}
                onCancel={() => setIsAdding(null)}
                onSave={handleAddItem}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
              />
            )}
          </AnimatePresence>
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
              onClick={() => setIsAdding("workshop")}
              className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 grid-flow-dense">
          {workshops.map((item, i) => (
            <EditorItem
              key={i}
              item={item}
              index={i}
              isEditing={isEditing}
              onDelete={() => handleDelete("workshop", i)}
              onLabelChange={(val) => updateLabel("workshop", i, val)}
            />
          ))}

          <AnimatePresence>
            {isAdding === "workshop" && (
              <NewItemForm
                newItem={newItem}
                setNewItem={setNewItem}
                onCancel={() => setIsAdding(null)}
                onSave={handleAddItem}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function EditorItem({
  item,
  index,
  isEditing,
  onDelete,
  onLabelChange,
}: {
  item: GalleryItemType;
  index: number;
  isEditing: boolean;
  onDelete: () => void;
  onLabelChange: (val: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card/30 transition-all ${
        index === 0 || index === 3 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
      }`}
    >
      {item.type === "video" ? (
        <video src={item.src} className="w-full h-full object-cover" muted loop />
      ) : (
        <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-4">
        <div className="flex justify-end">
          {isEditing && (
            <button
              onClick={onDelete}
              className="p-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div>
          {isEditing ? (
            <input
              type="text"
              value={item.label}
              onChange={(e) => onLabelChange(e.target.value)}
              className="w-full bg-black/60 border border-gold/30 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-gold"
              placeholder="Enter label..."
            />
          ) : (
            <div className="text-white font-display">{item.label}</div>
          )}
          <div className="mt-2 flex items-center gap-2">
            {item.type === "video" ? (
              <span className="text-[10px] bg-blue-500/80 text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">
                Video
              </span>
            ) : (
              <span className="text-[10px] bg-gold/80 text-background px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">
                Photo
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NewItemForm({
  newItem,
  setNewItem,
  onCancel,
  onSave,
  fileInputRef,
  handleFileChange,
}: {
  newItem: any;
  setNewItem: any;
  onCancel: () => void;
  onSave: () => void;
  fileInputRef: any;
  handleFileChange: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="aspect-square rounded-2xl border-2 border-dashed border-gold/30 bg-gold/5 flex flex-col items-center justify-center p-6 text-center"
    >
      {!newItem.src ? (
        <>
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
            <Upload className="text-gold w-6 h-6" />
          </div>
          <p className="text-sm font-medium mb-4">Upload Media</p>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setNewItem({ ...newItem, type: "image" })}
              className={`p-2 rounded-lg transition-all ${
                newItem.type === "image" ? "bg-gold text-background" : "bg-white/5 text-muted-foreground"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setNewItem({ ...newItem, type: "video" })}
              className={`p-2 rounded-lg transition-all ${
                newItem.type === "video" ? "bg-blue-500 text-white" : "bg-white/5 text-muted-foreground"
              }`}
            >
              <Video className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[10px] uppercase tracking-widest font-bold text-gold hover:underline"
          >
            Select {newItem.type}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={newItem.type === "video" ? "video/*" : "image/*"}
            onChange={handleFileChange}
          />
        </>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="relative flex-1 rounded-lg overflow-hidden mb-4 border border-border bg-black/20">
            {newItem.type === "video" ? (
              <video src={newItem.src} className="w-full h-full object-cover" muted />
            ) : (
              <img src={newItem.src} className="w-full h-full object-cover" alt="" />
            )}
            <button
              onClick={() => setNewItem({ ...newItem, src: "" })}
              className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <input
            autoFocus
            type="text"
            value={newItem.label}
            onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs outline-none focus:border-gold mb-3"
            placeholder="Item Label..."
          />
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="flex-1 py-2 rounded-lg bg-white/5 text-[10px] uppercase font-bold tracking-widest hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={!newItem.label || !newItem.src}
              className="flex-1 py-2 rounded-lg bg-gold text-background text-[10px] uppercase font-bold tracking-widest disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
