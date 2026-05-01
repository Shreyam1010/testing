import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export interface GalleryItemType {
  src: string;
  label: string;
  type: "image" | "video";
}

export const initialPerformanceItems: GalleryItemType[] = [
  { src: g2, label: "Stage Performance", type: "image" },
  { src: g4, label: "Crown Heritage", type: "image" },
  { src: g6, label: "The Warrior", type: "image" },
  { src: g1, label: "The Mask", type: "image" },
];

export const initialWorkshopItems: GalleryItemType[] = [
  { src: g3, label: "Summer Workshop", type: "image" },
  { src: g5, label: "Chande Training", type: "image" },
  { src: g4, label: "Makeup Session", type: "image" },
  { src: g2, label: "Step Basics", type: "image" },
];
