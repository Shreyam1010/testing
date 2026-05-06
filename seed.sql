-- ============================================================
-- Kathe Gaararu — Full Seed Data (All Dummy Content)
-- ============================================================

-- CLEAR ALL TABLES
DELETE FROM site_content;
DELETE FROM classes;
DELETE FROM teachers;
DELETE FROM events;
DELETE FROM blogs;
DELETE FROM workshops;

-- ======================== HERO ========================
INSERT INTO site_content (id, lang, section, content_key, content_value) VALUES
('hero_en_tag', 'en', 'hero', 'tag', 'Preserving a 400-year-old legacy'),
('hero_en_title', 'en', 'hero', 'title', 'The Living Art of'),
('hero_en_titleAccent', 'en', 'hero', 'titleAccent', 'Yakshagana'),
('hero_en_subtitle', 'en', 'hero', 'subtitle', 'An immersive cultural sanctuary where traditional Kannada theatre, music, and dance breathe through every performance, class, and story.'),
('hero_en_ctaPrimary', 'en', 'hero', 'ctaPrimary', 'Watch Performances'),
('hero_en_ctaSecondary', 'en', 'hero', 'ctaSecondary', 'Explore Classes'),
('hero_kn_tag', 'kn', 'hero', 'tag', '೪೦೦ ವರ್ಷಗಳ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆ'),
('hero_kn_title', 'kn', 'hero', 'title', 'ಜೀವಂತ ಕಲೆ'),
('hero_kn_titleAccent', 'kn', 'hero', 'titleAccent', 'ಯಕ್ಷಗಾನ'),
('hero_kn_subtitle', 'kn', 'hero', 'subtitle', 'ಸಾಂಪ್ರದಾಯಿಕ ಕನ್ನಡ ರಂಗಭೂಮಿ, ಸಂಗೀತ ಮತ್ತು ನೃತ್ಯ — ಪ್ರತಿ ಪ್ರದರ್ಶನ, ತರಗತಿ ಮತ್ತು ಕಥೆಯಲ್ಲಿ ಉಸಿರಾಡುವ ಸಾಂಸ್ಕೃತಿಕ ತಾಣ.'),
('hero_kn_ctaPrimary', 'kn', 'hero', 'ctaPrimary', 'ತರಗತಿಗಳನ್ನು ನೋಡಿ'),
('hero_kn_ctaSecondary', 'kn', 'hero', 'ctaSecondary', 'ಪ್ರದರ್ಶನಗಳನ್ನು ವೀಕ್ಷಿಸಿ'),
('hero_en_image', 'en', 'hero', 'image', '/images/hero-yakshagana.jpg'),
('hero_kn_image', 'kn', 'hero', 'image', '/images/hero-yakshagana.jpg');

-- ======================== ABOUT ========================
INSERT INTO site_content (id, lang, section, content_key, content_value) VALUES
('about_en_label', 'en', 'about', 'label', 'OUR STORY'),
('about_en_title', 'en', 'about', 'title', 'Our Story'),
('about_kn_label', 'kn', 'about', 'label', 'ನಮ್ಮ ಕಥೆ'),
('about_kn_title', 'kn', 'about', 'title', 'ನಮ್ಮ ಕಥೆ'),
('classes_en_image', 'en', 'classes', 'image', '/images/testing1.png.jpeg'),
('classes_kn_image', 'kn', 'classes', 'image', '/images/testing1.png.jpeg'),
('classes_en_title', 'en', 'classes', 'title', 'Gurukul'),
('classes_kn_title', 'kn', 'classes', 'title', 'ಗುರುಕುಲ');

-- ======================== TEACHERS ========================
INSERT INTO teachers (id, name_en, name_kn, expertise_en, expertise_kn, bio_en, bio_kn, image_url) VALUES
('raghavendra', 'Guru Raghavendra Bhatta', 'ಗುರು ರಾಘವೇಂದ್ರ ಭಟ್ಟ', 'Bhagavata Vesha • Abhinaya', 'ಭಾಗವತ ವೇಷ • ಅಭಿನಯ', 'Five decades on stage. Disciple of the Saligrama tradition. Trains advanced students in pundu vesha and rasa abhinaya.', 'ಐದು ದಶಕಗಳ ರಂಗಾನುಭವ. ಸಾಲಿಗ್ರಾಮ ಪರಂಪರೆಯ ಶಿಷ್ಯ. ಮುಂದುವರಿದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪುಂಡು ವೇಷ ಮತ್ತು ರಸಾಭಿನಯ ಕಲಿಸುತ್ತಾರೆ.', '/images/gallery-2.jpg'),
('shankara', 'Shankara Hegde', 'ಶಂಕರ ಹೆಗ್ಡೆ', 'Maddale • Chande percussion', 'ಮದ್ದಲೆ • ಚಂಡೆ', 'Master percussionist of the Tenkutittu school. Teaches taala, layakari and the art of accompanying the singer.', 'ತೆಂಕುತಿಟ್ಟು ಶಾಲೆಯ ಶ್ರೇಷ್ಠ ತಾಳವಾದಕ. ತಾಳ, ಲಯ ಮತ್ತು ಭಾಗವತರ ಸಹವಾದ್ಯ ಕಲಿಸುತ್ತಾರೆ.', '/images/gallery-3.jpg'),
('lakshmi', 'Smt. Lakshmi Acharya', 'ಶ್ರೀಮತಿ ಲಕ್ಷ್ಮೀ ಆಚಾರ್ಯ', 'Stree Vesha • Hasta Mudras', 'ಸ್ತ್ರೀ ವೇಷ • ಹಸ್ತ ಮುದ್ರೆ', 'Among the first women to perform stree vesha publicly. Brings grace, grammar and grit to the next generation.', 'ಸಾರ್ವಜನಿಕ ರಂಗದಲ್ಲಿ ಸ್ತ್ರೀ ವೇಷ ಪ್ರದರ್ಶಿಸಿದ ಮೊದಲ ಮಹಿಳೆಯರಲ್ಲಿ ಒಬ್ಬರು. ಮುಂದಿನ ಪೀಳಿಗೆಗೆ ಸೌಂದರ್ಯ ಮತ್ತು ಶಿಸ್ತು ತರುತ್ತಾರೆ.', '/images/gallery-1.jpg');

-- ======================== CLASSES (12) ========================
INSERT INTO classes (id, topic_en, topic_kn, teacher_id, day_en, day_kn, time, level_en, level_kn, date) VALUES
('c1', 'Foundations of Hasta Mudras', 'ಹಸ್ತ ಮುದ್ರೆಗಳ ಮೂಲಪಾಠ', 'lakshmi', 'Tomorrow', 'ನಾಳೆ', '8:00 PM', 'Beginner', 'ಪ್ರಾರಂಭಿಕ', '2026-04-29T20:00:00'),
('c2', 'Chande Taala — Adi & Eka', 'ಚಂಡೆ ತಾಳ — ಆದಿ ಮತ್ತು ಏಕ', 'shankara', 'Thursday', 'ಗುರುವಾರ', '6:30 PM', 'Intermediate', 'ಮಧ್ಯಮ', '2026-04-30T18:30:00'),
('c3', 'Pundu Vesha — Stage Presence', 'ಪುಂಡು ವೇಷ — ರಂಗ ಉಪಸ್ಥಿತಿ', 'raghavendra', 'Saturday', 'ಶನಿವಾರ', '7:00 PM', 'Advanced', 'ಉನ್ನತ', '2026-05-02T19:00:00'),
('c4', 'Stree Vesha — Grace & Glance', 'ಸ್ತ್ರೀ ವೇಷ — ಸೌಂದರ್ಯ ಮತ್ತು ನೋಟ', 'lakshmi', 'Sunday', 'ಭಾನುವಾರ', '5:00 PM', 'All Levels', 'ಎಲ್ಲ ಹಂತ', '2026-05-03T17:00:00'),
('c5', 'Bhagavata Padya Recitation', 'ಭಾಗವತ ಪದ್ಯ ಪಠಣ', 'raghavendra', 'Tuesday', 'ಮಂಗಳವಾರ', '8:00 PM', 'Intermediate', 'ಮಧ್ಯಮ', '2026-05-05T20:00:00'),
('c6', 'Maddale — Rhythmic Patterns', 'ಮದ್ದಲೆ — ಲಯ ವಿನ್ಯಾಸ', 'shankara', 'Thursday', 'ಗುರುವಾರ', '6:30 PM', 'Beginner', 'ಪ್ರಾರಂಭಿಕ', '2026-05-07T18:30:00'),
('c7', 'Abhinaya — Navarasa Mastery', 'ಅಭಿನಯ — ನವರಸ ಪಾಂಡಿತ್ಯ', 'raghavendra', 'Friday', 'ಶುಕ್ರವಾರ', '6:00 PM', 'Advanced', 'ಉನ್ನತ', '2026-05-08T18:00:00'),
('c8', 'Vannike — The Art of Makeup', 'ವಣ್ಣಿಗೆ — ಬಣ್ಣಗಾರಿಕೆ', 'lakshmi', 'Saturday', 'ಶನಿವಾರ', '10:00 AM', 'Beginner', 'ಪ್ರಾರಂಭಿಕ', '2026-05-09T10:00:00'),
('c9', 'Kirata Vesha — The Hunter', 'ಕಿರಾತ ವೇಷ — ಬೇಟೆಗಾರ', 'raghavendra', 'Sunday', 'ಭಾನುವಾರ', '4:00 PM', 'Intermediate', 'ಮಧ್ಯಮ', '2026-05-10T16:00:00'),
('c10', 'Taala Maddale — Discourse', 'ತಾಳ ಮದ್ದಲೆ — ಪ್ರಸಂಗ', 'shankara', 'Monday', 'ಸೋಮವಾರ', '7:00 PM', 'All Levels', 'ಎಲ್ಲ ಹಂತ', '2026-05-11T19:00:00'),
('c11', 'Laya and Taala — advanced', 'ಲಯ ಮತ್ತು ತಾಳ — ಉನ್ನತ', 'shankara', 'Tuesday', 'ಮಂಗಳವಾರ', '6:30 PM', 'Advanced', 'ಉನ್ನತ', '2026-05-12T18:30:00'),
('c12', 'Dance Grammar — Charis', 'ನೃತ್ಯ ವ್ಯಾಕರಣ — ಚಾರಿಗಳು', 'lakshmi', 'Wednesday', 'ಬುಧವಾರ', '5:30 PM', 'Intermediate', 'ಮಧ್ಯಮ', '2026-05-13T17:30:00');

-- ======================== EVENTS (4) ========================
INSERT INTO events (id, title_en, title_kn, teacher_en, teacher_kn, time_en, time_kn, badge_en, badge_kn, status, image_url) VALUES
('ev1', 'Bhagavata Padya (Vocal)', 'ಭಾಗವತ ಪದ್ಯ (ಗಾಯನ)', 'Vid. Keremane Shivarama', 'ವಿದ್ವಾನ್ ಕೆರೆಮನೆ ಶಿವರಾಮ', 'Saturdays, 6:00 PM', 'ಶನಿವಾರ, ಸಂಜೆ ೬:೦೦', 'NEXT CLASS', 'ಮುಂದಿನ ತರಗತಿ', 'booking', '/images/gallery-2.jpg'),
('ev2', 'Chande Rhythms', 'ಚಂಡೆ ಲಯಗಳು', 'Chittani Subrahmanya', 'ಚಿಟ್ಟಾಣಿ ಸುಬ್ರಹ್ಮಣ್ಯ', 'Sundays, 10:00 AM', 'ಭಾನುವಾರ, ಬೆಳಗ್ಗೆ ೧೦:೦೦', '', '', 'booking', '/images/gallery-5.jpg'),
('ev3', 'Stree Vesha Abhinaya', 'ಸ್ತ್ರೀ ವೇಷ ಅಭಿನಯ', 'Hegde Parameshwar', 'ಹೆಗ್ಡೆ ಪರಮೇಶ್ವರ್', 'Wednesdays, 7:00 PM', 'ಬುಧವಾರ, ಸಂಜೆ ೭:೦೦', '', '', 'coming_soon', '/images/gallery-4.jpg'),
('ev4', 'Rakshasa Vesha Makeup', 'ರಾಕ್ಷಸ ವೇಷ ಬಣ್ಣಗಾರಿಕೆ', 'Bannada Malinga', 'ಬಣ್ಣದ ಮಾಲಿಂಗ', 'Fridays, 6:30 PM', 'ಶುಕ್ರವಾರ, ಸಂಜೆ ೬:೩೦', '', '', 'coming_soon', '/images/gallery-1.jpg');

-- ======================== BLOGS (4) ========================
INSERT INTO blogs (id, title_en, title_kn, excerpt_en, excerpt_kn, content_en, content_kn, category_en, category_kn, author_en, author_kn, date, image, slug) VALUES
('b1', 'The Geometry of the Crown', 'ಕಿರೀಟದ ರೇಖಾಗಣಿತ', 'Discover the mathematical precision behind the iconic Yakshagana headgear.', 'ಐಕಾನಿಕ್ ಯಕ್ಷಗಾನ ಕಿರೀಟದ ಹಿಂದಿರುವ ಗಣಿತದ ನಿಖರತೆಯನ್ನು ಅನ್ವೇಷಿಸಿ.', 'Yakshagana headgear, known as Kedige Mundasu, is a marvel of traditional design. It is crafted with meticulous mathematical precision, ensuring both balance for the performer and a striking visual impact.', 'ಯಕ್ಷಗಾನದ ಕಿರೀಟ ಅಥವಾ ಕೇದಿಗೆ ಮುಂಡಾಸು ಸಾಂಪ್ರದಾಯಿಕ ವಿನ್ಯಾಸದ ಒಂದು ಅದ್ಭುತ. ಇದನ್ನು ನಿಖರವಾದ ಗಣಿತದ ಅಳತೆಯೊಂದಿಗೆ ರಚಿಸಲಾಗಿದೆ.', 'Craftsmanship', 'ಕರಕುಶಲತೆ', 'Guru Raghavendra', 'ಗುರು ರಾಘವೇಂದ್ರ', 'Apr 20, 2025', 'g4', 'geometry-of-crown'),
('b2', 'Navarasa: The Nine Emotions', 'ನವರಸ: ಒಂಬತ್ತು ಭಾವನೆಗಳು', 'A deep dive into the emotive landscape of Yakshagana abhinaya.', 'ಯಕ್ಷಗಾನ ಅಭಿನಯದ ಭಾವನಾತ್ಮಕ ಲೋಕಕ್ಕೆ ಒಂದು ಆಳವಾದ ನೋಟ.', 'Abhinaya in Yakshagana is fundamentally rooted in the concept of Navarasa — the nine primary emotions.', 'ಯಕ್ಷಗಾನದಲ್ಲಿ ಅಭಿನಯವು ಮೂಲತಃ ನವರಸಗಳ ಪರಿಕಲ್ಪನೆಯಲ್ಲಿ ಬೇರೂರಿದೆ.', 'Artistry', 'ಕಲೆಗಾರಿಕೆ', 'Smt. Lakshmi', 'ಶ್ರೀಮತಿ ಲಕ್ಷ್ಮಿ', 'Mar 15, 2025', 'g2', 'navarasa-nine-emotions'),
('b3', 'The Chande''s Thunder', 'ಚಂಡೆಯ ಗುಡುಗು', 'How the high-pitched drum defines the energy of the Badagutittu style.', 'ಹೇಗೆ ಚಂಡೆಯ ಶಬ್ದವು ಬಡಗುತಿಟ್ಟು ಶೈಲಿಯ ಶಕ್ತಿಯನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.', 'The Chande is not merely an accompanying instrument; it is the heartbeat of the Badagutittu Yakshagana style.', 'ಚಂಡೆಯು ಕೇವಲ ಒಂದು ಸಹವಾದ್ಯವಲ್ಲ; ಇದು ಬಡಗುತಿಟ್ಟು ಯಕ್ಷಗಾನ ಶೈಲಿಯ ಹೃದಯ ಬಡಿತ.', 'Music', 'ಸಂಗೀತ', 'Shankara Hegde', 'ಶಂಕರ ಹೆಗಡೆ', 'Feb 10, 2025', 'g5', 'chandes-thunder'),
('b4', 'Ritual to Theatre', 'ಆಚರಣೆಯಿಂದ ರಂಗಭೂಮಿಗೆ', 'Tracing the evolution of Yakshagana from temple rituals to the modern stage.', 'ದೇವಸ್ಥಾನದ ಆಚರಣೆಗಳಿಂದ ಆಧುನಿಕ ರಂಗದವರೆಗೆ ಯಕ್ಷಗಾನದ ವಿಕಸನ.', 'Yakshagana traces its origins to the Bhakti movement and coastal temple rituals.', 'ಯಕ್ಷಗಾನವು ಭಕ್ತಿ ಚಳುವಳಿ ಮತ್ತು ಕರಾವಳಿಯ ದೇವಾಲಯದ ಆಚರಣೆಗಳಲ್ಲಿ ತನ್ನ ಮೂಲವನ್ನು ಹೊಂದಿದೆ.', 'History', 'ಇತಿಹಾಸ', 'Kathe Gaararu', 'ಕಥೆಗಾರರು', 'Jan 05, 2025', 'g1', 'ritual-to-theatre');

-- ======================== WORKSHOPS (4) ========================
INSERT INTO workshops (id, title_en, title_kn, timestamp_en, timestamp_kn, image) VALUES
('w1', 'Summer Intensive 2025', 'ಬೇಸಿಗೆ ತೀವ್ರ ಶಿಬಿರ ೨೦೨೫', 'March 2025', 'ಮಾರ್ಚ್ ೨೦೨೫', 'g3'),
('w2', 'Mask Making Heritage', 'ಮುಖವಾಡ ತಯಾರಿಕೆ ಪರಂಪರೆ', 'January 2025', 'ಜನವರಿ ೨೦೨೫', 'g1'),
('w3', 'Guru-Shishya Samvada', 'ಗುರು-ಶಿಷ್ಯ ಸಂವಾದ', 'November 2024', 'ನವೆಂಬರ್ ೨೦೨೪', 'g5'),
('w4', 'Rhythmic Foundations', 'ಲಯಬದ್ಧ ಅಡಿಪಾಯಗಳು', 'September 2024', 'ಸೆಪ್ಟೆಂಬರ್ ೨೦೨೪', 'g6');
