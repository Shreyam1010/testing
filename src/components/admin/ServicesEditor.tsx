import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Plus, Trash2, Save, Check, Loader2, 
  Image as ImageIcon, Link as LinkIcon, Edit3, Type, AlignLeft, Star, ArrowRight, X, Upload, Crop
} from "lucide-react";
import Cropper from "react-easy-crop";
import { useDbContent } from "@/hooks/useDb";
import { apiUrl } from "@/lib/api";
import sticker0 from "@/assets/stickers/Asset 1.png";
import sticker5 from "@/assets/stickers/Asset 5.png";

interface ServicesEditorProps {
  isEditing: boolean;
  lang: "en" | "kn";
}

async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

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

  return canvas.toDataURL("image/jpeg", 0.9);
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
      className={`${className} outline-none cursor-text hover:bg-muted/40 rounded px-1 transition-colors`}
      style={{
        caretColor: "var(--gold)",
      }}
    >
      {value}
    </Tag>
  );
}

export function ServicesEditor({ isEditing, lang }: ServicesEditorProps) {
  const { data: dbData, refresh } = useDbContent();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [pageContent, setPageContent] = useState({
    title: "Our Services",
    subtitle: "Discover what we offer",
    perf_title: "Performances",
    perf_desc: "Experience the awe-inspiring magic of Yakshagana with our year-round stage events. We celebrate ancient epics through powerful storytelling, bringing the rich, vibrant heritage of coastal Karnataka directly to your venue. Every performance is a complete cultural immersion featuring authentic, elaborately crafted costumes, mesmerizing live traditional music, and seasoned veteran artists who breathe life into mythological legends.",
    perf_btn: "Host the Show",
    perf_imgs: JSON.stringify(["/images/gallery-1.jpg", "/images/gallery-2.jpg", "/images/gallery-4.jpg", "/images/gallery-6.jpg", "/images/gallery-5.jpg", "/images/gallery-3.jpg"]),
    class_title: "Classes",
    class_desc: "Step into the sacred circle of learning with our authentic training programs. We offer comprehensive, gurukula-style instruction in traditional dance, intricate footwork, classical music (Bhagavatike), and powerful dialogue delivery, guided by highly experienced veteran gurus.",
    class_btn: "Book Demo",
    class_imgs: JSON.stringify(["/images/gallery-3.jpg", "/images/gallery-5.jpg", "/images/gallery-6.jpg", "/images/gallery-1.jpg", "/images/gallery-2.jpg"]),
    work_title: "Workshops",
    work_desc: "Dive deep into the world of Yakshagana with our intensive, seasonal workshops designed for performers, dedicated students, and passionate enthusiasts. Join our weekend crash courses or immersive week-long retreats to learn the subtle, complex nuances of traditional face-painting.",
    work_btn: "Book the Show",
    work_imgs: JSON.stringify(["/images/gallery-4.jpg", "/images/gallery-1.jpg", "/images/gallery-3.jpg", "/images/gallery-6.jpg", "/images/gallery-5.jpg"]),
    social_title: "Follow our journey on social media",
    social_subtitle: "",
  });

  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [editingLink, setEditingLink] = useState<any>(null);

  // Cropping state
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApplyCrop = async () => {
    if (tempImage && croppedAreaPixels) {
      const cropped = await getCroppedImg(tempImage, croppedAreaPixels);
      setEditingLink((prev: any) => ({ ...prev, image: cropped }));
      setTempImage(null);
    }
  };

  useEffect(() => {
    if (dbData) {
      const servicesContent = dbData.siteContent.filter((c: any) => c.section === "services");
      const contentMap: any = {};
      servicesContent.forEach((c: any) => {
        contentMap[c.content_key] = c.content_value;
      });

      if (Object.keys(contentMap).length > 0) {
        setPageContent(prev => ({
          ...prev,
          ...contentMap
        }));
      }

      setSocialLinks(dbData.socialLinks || []);
      setLoading(false);
    }
  }, [dbData, lang]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (editingLink) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [editingLink]);

  const handleUpdateImage = (secId: string, index: number, file: File) => {
    const key = `${secId}_imgs`;
    const imgs = JSON.parse((pageContent as any)[key]);
    const blobUrl = URL.createObjectURL(file);
    imgs[index] = blobUrl;
    setPageContent({ ...pageContent, [key]: JSON.stringify(imgs) });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await fetch(apiUrl("/api/save"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "services",
          lang: lang,
          data: pageContent
        })
      });

      await fetch(apiUrl("/api/save"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "social_links",
          lang: lang,
          data: socialLinks
        })
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      refresh();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const sections = [
    { id: "perf", label: "Performances", imgs: JSON.parse(pageContent.perf_imgs) },
    { id: "work", label: "Workshops", imgs: JSON.parse(pageContent.work_imgs) }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <section className="container mx-auto px-6 pt-10 pb-16 relative z-10">
        <div className="flex flex-col gap-16">
          {sections.map((sec) => (
            <div key={sec.id} className="flex flex-col gap-12">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-display text-primary mb-4 flex items-center justify-center gap-4">
                  <EditableText 
                    value={(pageContent as any)[`${sec.id}_title`]} 
                    onChange={(v) => setPageContent({ ...pageContent, [`${sec.id}_title`]: v })} 
                    isEditing={isEditing} 
                    tag="span" 
                  />
                </h2>
                <EditableText 
                  value={(pageContent as any)[`${sec.id}_desc`]} 
                  onChange={(v) => setPageContent({ ...pageContent, [`${sec.id}_desc`]: v })} 
                  isEditing={isEditing} 
                  tag="p" 
                  className="text-sm md:text-base text-muted-foreground leading-relaxed"
                />
              </div>

              <div className="w-full overflow-hidden pb-4">
                <div className="flex flex-nowrap gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
                  {sec.imgs.map((img: string, idx: number) => (
                    <div key={idx} className="group shrink-0 w-[calc((100%-1rem)/2.5)] sm:w-[calc((100%-2rem)/3.5)] lg:w-[calc((100%-6rem)/4.5)] relative aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-xl">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                      {isEditing && (
                        <label className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-foreground font-bold text-[10px] uppercase tracking-widest cursor-pointer">
                          <Upload className="w-4 h-4 text-gold" /> Replace Photo
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleUpdateImage(sec.id, idx, e.target.files[0]);
                            }}
                          />
                        </label>
                      )}
                      {idx === 4 && !isEditing && (
                        <div className="absolute inset-0 bg-background/70 flex flex-col justify-center pl-[25%]">
                          <ArrowRight className="w-8 h-8 text-foreground" />
                          <span className="text-xs font-bold uppercase tracking-widest text-foreground mt-2">More</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2 px-6 py-3 bg-gold text-background rounded-full font-bold uppercase tracking-widest text-xs shadow-glow">
                  <Star className="w-4 h-4" />
                  <EditableText 
                    value={(pageContent as any)[`${sec.id}_btn`]} 
                    onChange={(v) => setPageContent({ ...pageContent, [`${sec.id}_btn`]: v })} 
                    isEditing={isEditing} 
                    tag="span" 
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Socials Section */}
          <div className="pt-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-[26px] sm:text-3xl md:text-5xl font-display text-primary mb-6 flex items-center justify-center gap-4 whitespace-nowrap">
                <img src={sticker0} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                {lang === "en" ? "Follow our journey on social media" : "ಸಾಮಾಜಿಕ ಜಾಲತಾಣಗಳಲ್ಲಿ ನಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಅನುಸರಿಸಿ"}
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => (
                <div 
                  key={social.id}
                  className="relative rounded-2xl overflow-hidden border border-border group aspect-[4/5] flex flex-col justify-end p-4 w-[calc((100%-1rem)/2)] sm:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-9rem)/7)]"
                >
                  <img src={social.image} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                  <div className="relative z-10 min-h-[40px] flex flex-col justify-end">
                    {social.title[lang] && (
                      <h3 className="text-sm font-display text-primary mb-1 line-clamp-1">{social.title[lang]}</h3>
                    )}
                    {social.description[lang] && (
                      <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">{social.description[lang]}</p>
                    )}
                  </div>
                  
                  {isEditing && (
                    <>
                      <button 
                        onClick={() => setEditingLink({ ...social })}
                        className="absolute top-2 left-2 p-1.5 bg-background/75 rounded-lg text-gold hover:bg-gold hover:text-background transition-all"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => setSocialLinks(prev => prev.filter(s => s.id !== social.id))}
                        className="absolute top-2 right-2 p-1.5 bg-background/75 rounded-lg text-destructive hover:bg-destructive hover:text-foreground transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              ))}
              
              {isEditing && socialLinks.length < 21 && (
                <button 
                  onClick={() => {
                    const newLink = {
                      id: "social_" + Date.now(),
                      title: { en: "", kn: "" },
                      description: { en: "", kn: "" },
                      link: "https://",
                      image: "/images/gallery-1.jpg",
                    };
                    setEditingLink(newLink);
                  }}
                  className="aspect-[4/5] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-gold/30 hover:text-gold transition-all w-[calc((100%-1rem)/2)] sm:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-9rem)/7)]"
                >
                  <Plus className="w-6 h-6" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Add Card</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingLink && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-background/85 backdrop-blur-sm overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setEditingLink(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border p-8 rounded-3xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-xl font-display text-primary uppercase tracking-wider">Edit Social Card</h3>
                <button onClick={() => setEditingLink(null)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image Upload Style */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">Card Image</label>
                  <div className="relative h-40 rounded-2xl overflow-hidden border border-border group">
                    <img src={editingLink.image} className="w-full h-full object-cover" alt="" />
                    <label className="absolute inset-0 bg-background/75 flex flex-col items-center justify-center gap-2 text-foreground font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="w-5 h-5 text-gold" /> Change Image
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setTempImage(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">Heading ({lang.toUpperCase()})</label>
                  <div className="relative group">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                    <input 
                      value={editingLink.title[lang]}
                      onChange={(e) => setEditingLink({ ...editingLink, title: { ...editingLink.title, [lang]: e.target.value } })}
                      className="w-full bg-background/60 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-gold/50 transition-all font-display text-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">Description ({lang.toUpperCase()})</label>
                  <div className="relative group">
                    <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                    <textarea 
                      value={editingLink.description[lang]}
                      onChange={(e) => setEditingLink({ ...editingLink, description: { ...editingLink.description, [lang]: e.target.value } })}
                      rows={3}
                      className="w-full bg-background/60 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-gold/50 transition-all resize-none text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">Link URL</label>
                  <div className="relative group">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                    <input 
                      value={editingLink.link}
                      onChange={(e) => setEditingLink({ ...editingLink, link: e.target.value })}
                      className="w-full bg-background/60 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-gold/50 transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => {
                    const exists = socialLinks.find(s => s.id === editingLink.id);
                    if (exists) {
                      setSocialLinks(socialLinks.map(s => s.id === editingLink.id ? editingLink : s));
                    } else {
                      setSocialLinks([...socialLinks, editingLink]);
                    }
                    setEditingLink(null);
                  }}
                  className="flex-1 bg-gold text-background py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-glow hover:scale-[1.02] transition-all"
                >
                  Confirm Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cropping Modal */}
      <AnimatePresence>
        {tempImage && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-background/95 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-card border border-border rounded-3xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-xl font-display text-primary flex items-center gap-2">
                  <Crop className="w-5 h-5 text-gold" />
                  Crop Card Image
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
                  aspect={4 / 5}
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

      {/* Floating Save Button */}
      {isEditing && (
        <div className="fixed bottom-10 right-10 z-[100]">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-glow ${
              saveSuccess ? "bg-primary text-foreground" : "bg-gold text-background hover:scale-105"
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
