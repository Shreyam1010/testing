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
];

export function teacherById(id: string) {
  return teachers.find((t) => t.id === id);
}
