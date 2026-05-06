export interface GalleryItemType {
  src: string;
  label: string;
  type: "image" | "video";
}

export const initialPerformanceItems: GalleryItemType[] = [
  { src: "/images/gallery-2.jpg", label: "Stage Performance", type: "image" },
  { src: "/images/gallery-4.jpg", label: "Crown Heritage", type: "image" },
  { src: "/images/gallery-6.jpg", label: "The Warrior", type: "image" },
  { src: "/images/gallery-1.jpg", label: "The Mask", type: "image" },
];

export const initialWorkshopItems: GalleryItemType[] = [
  { src: "/images/gallery-3.jpg", label: "Summer Workshop", type: "image" },
  { src: "/images/gallery-5.jpg", label: "Chande Training", type: "image" },
  { src: "/images/gallery-4.jpg", label: "Makeup Session", type: "image" },
  { src: "/images/gallery-2.jpg", label: "Step Basics", type: "image" },
];

export const initialGurukulItems: GalleryItemType[] = [
  { src: "/images/gallery-1.jpg", label: "Mudra Practice", type: "image" },
  { src: "/images/gallery-3.jpg", label: "Vocal Training", type: "image" },
  { src: "/images/gallery-5.jpg", label: "Rhythm Class", type: "image" },
  { src: "/images/gallery-6.jpg", label: "Traditional Dance", type: "image" },
];
