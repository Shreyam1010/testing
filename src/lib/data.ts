export type Teacher = {
  id: string;
  name: { en: string; kn: string };
  expertise: { en: string; kn: string };
  bio: { en: string; kn: string };
};

export const teachers: Teacher[] = [
  {
    id: "raghavendra",
    name: { en: "Guru Raghavendra Bhatta", kn: "ಗುರು ರಾಘವೇಂದ್ರ ಭಟ್ಟ" },
    expertise: { en: "Bhagavata Vesha • Abhinaya", kn: "ಭಾಗವತ ವೇಷ • ಅಭಿನಯ" },
    bio: {
      en: "Five decades on stage. Disciple of the Saligrama tradition. Trains advanced students in pundu vesha and rasa abhinaya.",
      kn: "ಐದು ದಶಕಗಳ ರಂಗಾನುಭವ. ಸಾಲಿಗ್ರಾಮ ಪರಂಪರೆಯ ಶಿಷ್ಯ. ಮುಂದುವರಿದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪುಂಡು ವೇಷ ಮತ್ತು ರಸಾಭಿನಯ ಕಲಿಸುತ್ತಾರೆ.",
    },
  },
  {
    id: "shankara",
    name: { en: "Shankara Hegde", kn: "ಶಂಕರ ಹೆಗ್ಡೆ" },
    expertise: { en: "Maddale • Chande percussion", kn: "ಮದ್ದಲೆ • ಚಂಡೆ" },
    bio: {
      en: "Master percussionist of the Tenkutittu school. Teaches taala, layakari and the art of accompanying the singer.",
      kn: "ತೆಂಕುತಿಟ್ಟು ಶಾಲೆಯ ಶ್ರೇಷ್ಠ ತಾಳವಾದಕ. ತಾಳ, ಲಯ ಮತ್ತು ಭಾಗವತರ ಸಹವಾದ್ಯ ಕಲಿಸುತ್ತಾರೆ.",
    },
  },
  {
    id: "lakshmi",
    name: { en: "Smt. Lakshmi Acharya", kn: "ಶ್ರೀಮತಿ ಲಕ್ಷ್ಮೀ ಆಚಾರ್ಯ" },
    expertise: { en: "Stree Vesha • Hasta Mudras", kn: "ಸ್ತ್ರೀ ವೇಷ • ಹಸ್ತ ಮುದ್ರೆ" },
    bio: {
      en: "Among the first women to perform stree vesha publicly. Brings grace, grammar and grit to the next generation.",
      kn: "ಸಾರ್ವಜನಿಕ ರಂಗದಲ್ಲಿ ಸ್ತ್ರೀ ವೇಷ ಪ್ರದರ್ಶಿಸಿದ ಮೊದಲ ಮಹಿಳೆಯರಲ್ಲಿ ಒಬ್ಬರು. ಮುಂದಿನ ಪೀಳಿಗೆಗೆ ಸೌಂದರ್ಯ ಮತ್ತು ಶಿಸ್ತು ತರುತ್ತಾರೆ.",
    },
  },
];

export type ClassItem = {
  id: string;
  topic: { en: string; kn: string };
  teacherId: string;
  date: string; // ISO
  dayLabel: { en: string; kn: string };
  time: string;
  level: { en: string; kn: string };
};

export const classes: ClassItem[] = [
  {
    id: "c1",
    topic: { en: "Foundations of Hasta Mudras", kn: "ಹಸ್ತ ಮುದ್ರೆಗಳ ಮೂಲಪಾಠ" },
    teacherId: "lakshmi",
    date: "2026-04-29T20:00:00",
    dayLabel: { en: "Tomorrow", kn: "ನಾಳೆ" },
    time: "8:00 PM",
    level: { en: "Beginner", kn: "ಪ್ರಾರಂಭಿಕ" },
  },
  {
    id: "c2",
    topic: { en: "Chande Taala — Adi & Eka", kn: "ಚಂಡೆ ತಾಳ — ಆದಿ ಮತ್ತು ಏಕ" },
    teacherId: "shankara",
    date: "2026-04-30T18:30:00",
    dayLabel: { en: "Thursday", kn: "ಗುರುವಾರ" },
    time: "6:30 PM",
    level: { en: "Intermediate", kn: "ಮಧ್ಯಮ" },
  },
  {
    id: "c3",
    topic: { en: "Pundu Vesha — Stage Presence", kn: "ಪುಂಡು ವೇಷ — ರಂಗ ಉಪಸ್ಥಿತಿ" },
    teacherId: "raghavendra",
    date: "2026-05-02T19:00:00",
    dayLabel: { en: "Saturday", kn: "ಶನಿವಾರ" },
    time: "7:00 PM",
    level: { en: "Advanced", kn: "ಉನ್ನತ" },
  },
  {
    id: "c4",
    topic: { en: "Stree Vesha — Grace & Glance", kn: "ಸ್ತ್ರೀ ವೇಷ — ಸೌಂದರ್ಯ ಮತ್ತು ನೋಟ" },
    teacherId: "lakshmi",
    date: "2026-05-03T17:00:00",
    dayLabel: { en: "Sunday", kn: "ಭಾನುವಾರ" },
    time: "5:00 PM",
    level: { en: "All Levels", kn: "ಎಲ್ಲ ಹಂತ" },
  },
  {
    id: "c5",
    topic: { en: "Bhagavata Padya Recitation", kn: "ಭಾಗವತ ಪದ್ಯ ಪಠಣ" },
    teacherId: "raghavendra",
    date: "2026-05-05T20:00:00",
    dayLabel: { en: "Tuesday", kn: "ಮಂಗಳವಾರ" },
    time: "8:00 PM",
    level: { en: "Intermediate", kn: "ಮಧ್ಯಮ" },
  },
  {
    id: "c6",
    topic: { en: "Maddale — Rhythmic Patterns", kn: "ಮದ್ದಲೆ — ಲಯ ವಿನ್ಯಾಸ" },
    teacherId: "shankara",
    date: "2026-05-07T18:30:00",
    dayLabel: { en: "Thursday", kn: "ಗುರುವಾರ" },
    time: "6:30 PM",
    level: { en: "Beginner", kn: "ಪ್ರಾರಂಭಿಕ" },
  },
  {
    id: "c7",
    topic: { en: "Abhinaya — Navarasa Mastery", kn: "ಅಭಿನಯ — ನವರಸ ಪಾಂಡಿತ್ಯ" },
    teacherId: "raghavendra",
    date: "2026-05-08T18:00:00",
    dayLabel: { en: "Friday", kn: "ಶುಕ್ರವಾರ" },
    time: "6:00 PM",
    level: { en: "Advanced", kn: "ಉನ್ನತ" },
  },
  {
    id: "c8",
    topic: { en: "Vannike — The Art of Makeup", kn: "ವಣ್ಣಿಗೆ — ಬಣ್ಣಗಾರಿಕೆ" },
    teacherId: "lakshmi",
    date: "2026-05-09T10:00:00",
    dayLabel: { en: "Saturday", kn: "ಶನಿವಾರ" },
    time: "10:00 AM",
    level: { en: "Beginner", kn: "ಪ್ರಾರಂಭಿಕ" },
  },
  {
    id: "c9",
    topic: { en: "Kirata Vesha — The Hunter", kn: "ಕಿರಾತ ವೇಷ — ಬೇಟೆಗಾರ" },
    teacherId: "raghavendra",
    date: "2026-05-10T16:00:00",
    dayLabel: { en: "Sunday", kn: "ಭಾನುವಾರ" },
    time: "4:00 PM",
    level: { en: "Intermediate", kn: "ಮಧ್ಯಮ" },
  },
  {
    id: "c10",
    topic: { en: "Taala Maddale — Discourse", kn: "ತಾಳ ಮದ್ದಲೆ — ಪ್ರಸಂಗ" },
    teacherId: "shankara",
    date: "2026-05-11T19:00:00",
    dayLabel: { en: "Monday", kn: "ಸೋಮವಾರ" },
    time: "7:00 PM",
    level: { en: "All Levels", kn: "ಎಲ್ಲ ಹಂತ" },
  },
  {
    id: "c11",
    topic: { en: "Laya and Taala — advanced", kn: "ಲಯ ಮತ್ತು ತಾಳ — ಉನ್ನತ" },
    teacherId: "shankara",
    date: "2026-05-12T18:30:00",
    dayLabel: { en: "Tuesday", kn: "ಮಂಗಳವಾರ" },
    time: "6:30 PM",
    level: { en: "Advanced", kn: "ಉನ್ನತ" },
  },
  {
    id: "c12",
    topic: { en: "Dance Grammar — Charis", kn: "ನೃತ್ಯ ವ್ಯಾಕರಣ — ಚಾರಿಗಳು" },
    teacherId: "lakshmi",
    date: "2026-05-13T17:30:00",
    dayLabel: { en: "Wednesday", kn: "ಬುಧವಾರ" },
    time: "5:30 PM",
    level: { en: "Intermediate", kn: "ಮಧ್ಯಮ" },
  },
];

export type WorkshopItem = {
  id: string;
  title: { en: string; kn: string };
  timestamp: { en: string; kn: string };
  image: string;
};

export const workshops: WorkshopItem[] = [
  {
    id: "w1",
    title: { en: "Summer Intensive 2025", kn: "ಬೇಸಿಗೆ ತೀವ್ರ ಶಿಬಿರ ೨೦೨೫" },
    timestamp: { en: "March 2025", kn: "ಮಾರ್ಚ್ ೨೦೨೫" },
    image: "g3", // Mapping to g3 later
  },
  {
    id: "w2",
    title: { en: "Mask Making Heritage", kn: "ಮುಖವಾಡ ತಯಾರಿಕೆ ಪರಂಪರೆ" },
    timestamp: { en: "January 2025", kn: "ಜನವರಿ ೨೦೨೫" },
    image: "g1",
  },
  {
    id: "w3",
    title: { en: "Guru-Shishya Samvada", kn: "ಗುರು-ಶಿಷ್ಯ ಸಂವಾದ" },
    timestamp: { en: "November 2024", kn: "ನವೆಂಬರ್ ೨೦೨೪" },
    image: "g5",
  },
  {
    id: "w4",
    title: { en: "Rhythmic Foundations", kn: "ಲಯಬದ್ಧ ಅಡಿಪಾಯಗಳು" },
    timestamp: { en: "September 2024", kn: "ಸೆಪ್ಟೆಂಬರ್ ೨೦೨೪" },
    image: "g6",
  },
];

export type BlogItem = {
  id: string;
  title: { en: string; kn: string };
  excerpt: { en: string; kn: string };
  category: { en: string; kn: string };
  author: { en: string; kn: string };
  date: string;
  image: string;
  slug: string;
};

export const blogs: BlogItem[] = [
  {
    id: "b1",
    title: { en: "The Geometry of the Crown", kn: "ಕಿರೀಟದ ರೇಖಾಗಣಿತ" },
    excerpt: {
      en: "Discover the mathematical precision behind the iconic Yakshagana headgear.",
      kn: "ಐಕಾನಿಕ್ ಯಕ್ಷಗಾನ ಕಿರೀಟದ ಹಿಂದಿರುವ ಗಣಿತದ ನಿಖರತೆಯನ್ನು ಅನ್ವೇಷಿಸಿ.",
    },
    category: { en: "Craftsmanship", kn: "ಕರಕುಶಲತೆ" },
    author: { en: "Guru Raghavendra", kn: "ಗುರು ರಾಘವೇಂದ್ರ" },
    date: "Apr 20, 2025",
    image: "g4",
    slug: "geometry-of-crown",
  },
  {
    id: "b2",
    title: { en: "Navarasa: The Nine Emotions", kn: "ನವರಸ: ಒಂಬತ್ತು ಭಾವನೆಗಳು" },
    excerpt: {
      en: "A deep dive into the emotive landscape of Yakshagana abhinaya.",
      kn: "ಯಕ್ಷಗಾನ ಅಭಿನಯದ ಭಾವನಾತ್ಮಕ ಲೋಕಕ್ಕೆ ಒಂದು ಆಳವಾದ ನೋಟ.",
    },
    category: { en: "Artistry", kn: "ಕಲೆಗಾರಿಕೆ" },
    author: { en: "Smt. Lakshmi", kn: "ಶ್ರೀಮತಿ ಲಕ್ಷ್ಮಿ" },
    date: "Mar 15, 2025",
    image: "g2",
    slug: "navarasa-nine-emotions",
  },
  {
    id: "b3",
    title: { en: "The Chande's Thunder", kn: "ಚಂಡೆಯ ಗುಡುಗು" },
    excerpt: {
      en: "How the high-pitched drum defines the energy of the Badagutittu style.",
      kn: "ಹೇಗೆ ಚಂಡೆಯ ಶಬ್ದವು ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಶಕ್ತಿಯನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.",
    },
    category: { en: "Music", kn: "ಸಂಗೀತ" },
    author: { en: "Shankara Hegde", kn: "ಶಂಕರ ಹೆಗಡೆ" },
    date: "Feb 10, 2025",
    image: "g5",
    slug: "chandes-thunder",
  },
  {
    id: "b4",
    title: { en: "Ritual to Theatre", kn: "ಆಚರಣೆಯಿಂದ ರಂಗಭೂಮಿಗೆ" },
    excerpt: {
      en: "Tracing the evolution of Yakshagana from temple rituals to the modern stage.",
      kn: "ದೇವಸ್ಥಾನದ ಆಚರಣೆಗಳಿಂದ ಆಧುನಿಕ ರಂಗದವರೆಗೆ ಯಕ್ಷಗಾನದ ವಿಕಸನ.",
    },
    category: { en: "History", kn: "ಇತಿಹಾಸ" },
    author: { en: "Kathe Gaararu", kn: "ಕಥೆಗಾರರು" },
    date: "Jan 05, 2025",
    image: "g1",
    slug: "ritual-to-theatre",
  },
];

export function teacherById(id: string) {
  return teachers.find((t) => t.id === id);
}
