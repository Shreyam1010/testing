export interface GalleryItemType {
  src: string;
  label: string;
  type: "image" | "video";
  focalX?: number;
  focalY?: number;
}

const R2 = "https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery";

export const initialPerformanceItems: GalleryItemType[] = [
  { src: `${R2}/edited-1.avif`, label: "Stage Warrior", type: "image" },
  { src: `${R2}/edited-3.avif`, label: "Twin Halos", type: "image" },
  { src: `${R2}/edited-13.avif`, label: "Classical Stage", type: "image" },
  { src: `${R2}/edited-15.avif`, label: "Full Troupe", type: "image" },
  { src: `${R2}/edited-17.avif`, label: "Under the Spotlight", type: "image" },
  { src: `${R2}/edited-19.avif`, label: "Festive Lights", type: "image" },
  { src: `${R2}/edited-20.avif`, label: "Mudra in Motion", type: "image" },
];

export const initialGurukulItems: GalleryItemType[] = [
  { src: `${R2}/edited-11.avif`, label: "Gurukul Family", type: "image" },
  { src: `${R2}/edited-2.avif`, label: "The Art of Makeup", type: "image" },
  { src: `${R2}/edited-5.avif`, label: "Vocal Practice", type: "image" },
  { src: `${R2}/edited-14.avif`, label: "Young Performers", type: "image" },
  { src: `${R2}/edited-4.avif`, label: "Costume Study", type: "image" },
  { src: `${R2}/edited-9.avif`, label: "Solo Rehearsal", type: "image" },
  { src: `${R2}/edited-18.avif`, label: "Scene Practice", type: "image" },
];

export const initialWorkshopItems: GalleryItemType[] = [
  { src: `${R2}/edited-6.avif`, label: "Workshop Demonstration", type: "image" },
  { src: `${R2}/edited-12.avif`, label: "Backstage Moments", type: "image" },
  { src: `${R2}/edited-7.avif`, label: "Rehearsal Pair", type: "image" },
  { src: `${R2}/edited-8.avif`, label: "Dialogue Rehearsal", type: "image" },
  { src: `${R2}/edited-10.avif`, label: "Ensemble Workshop", type: "image" },
  { src: `${R2}/edited-16.avif`, label: "Chande Session", type: "image" },
];
