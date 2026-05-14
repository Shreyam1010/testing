-- ============================================================
-- Phase 1 Migration: Push hardcoded content into D1
-- Applied: 2026-05-14
-- Safe to re-run (all inserts use INSERT OR IGNORE)
-- ============================================================

-- ---------- New tables ----------

CREATE TABLE IF NOT EXISTS highlights (
  id TEXT PRIMARY KEY,
  title_en TEXT, title_kn TEXT,
  desc_en TEXT,  desc_kn TEXT,
  icon TEXT,
  image TEXT,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS class_features (
  id TEXT PRIMARY KEY,
  title_en TEXT, title_kn TEXT,
  desc_en TEXT,  desc_kn TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS services_images (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS home_features (
  id TEXT PRIMARY KEY,
  title_en TEXT, title_kn TEXT,
  desc_en TEXT,  desc_kn TEXT,
  icon TEXT,
  image TEXT,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS schedule (
  id TEXT PRIMARY KEY,
  day_index INTEGER NOT NULL,
  class_topic_en TEXT, class_topic_kn TEXT,
  time TEXT,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS footer_links (
  id TEXT PRIMARY KEY,
  label_en TEXT, label_kn TEXT,
  href TEXT,
  group_name TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS nav_links (
  id TEXT PRIMARY KEY,
  label_en TEXT, label_kn TEXT,
  href TEXT,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS branding (
  id TEXT PRIMARY KEY,
  brand_name TEXT,
  tagline_en TEXT, tagline_kn TEXT,
  logo_url TEXT,
  copyright_text TEXT
);

-- ---------- Seed: highlights (Home page "Three Pillars") ----------

INSERT OR IGNORE INTO highlights (id, title_en, title_kn, desc_en, desc_kn, icon, order_index) VALUES
('hl_classes',      'Classes',      'ಗುರುಕುಲ',          'Authentic training in dance, music, and dialogue from veteran gurus.',          'ಅನುಭವಿ ಗುರುಗಳಿಂದ ನೃತ್ಯ, ಸಂಗೀತ ಮತ್ತು ಸಂಭಾಷಣೆಯ ತರಬೇತಿ.',          'Drama',    0),
('hl_workshops',    'Workshops',    'ಕಾರ್ಯಾಗಾರಗಳು',     'Intensive seasonal sessions for performers, students, and enthusiasts.',         'ಕಲಾವಿದರು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಆಳವಾದ ಋತುಮಾನದ ಶಿಬಿರಗಳು.',          'Sparkles', 1),
('hl_performances', 'Performances', 'ಪ್ರದರ್ಶನಗಳು',       'Year-round stage events celebrating the epics through Yakshagana.',              'ವರ್ಷವಿಡೀ ಯಕ್ಷಗಾನ ರಂಗ ಪ್ರದರ್ಶನಗಳ ಆಚರಣೆ.',                          'Music',    2);

-- ---------- Seed: class_features (Classes page bullets) ----------

INSERT OR IGNORE INTO class_features (id, title_en, title_kn, desc_en, desc_kn, icon, order_index) VALUES
('cf_1', 'Authentic Gurukula style training',                'ಅಪ್ಪಟ ಗುರುಕುಲ ಶೈಲಿಯ ತರಬೇತಿ',                    '', '', 'ಯ', 0),
('cf_2', 'Focus on both theory and practice',                'ಸೈದ್ಧಾಂತಿಕ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಕಲಿಕೆಗೆ ಒತ್ತು',     '', '', 'ಯ', 1),
('cf_3', 'Personalized attention from veteran gurus',         'ಅನುಭವಿ ಗುರುಗಳಿಂದ ವೈಯಕ್ತಿಕ ಗಮನ',               '', '', 'ಯ', 2),
('cf_4', 'Opportunities for performances',                    'ರಂಗ ಪ್ರದರ್ಶನಗಳಿಗೆ ಅವಕಾಶಗಳು',                   '', '', 'ಯ', 3),
('cf_5', 'Comprehensive curriculum for all levels',           'ಎಲ್ಲಾ ಹಂತದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಮಗ್ರ ಪಠ್ಯಕ್ರಮ',     '', '', 'ಯ', 4),
('cf_6', 'In-depth study of Bhagavata literature and music', 'ಭಾಗವತ ಸಾಹಿತ್ಯ ಮತ್ತು ಸಂಗೀತದ ಆಳವಾದ ಅಧ್ಯಯನ',    '', '', 'ಯ', 5);

-- ---------- Seed: services_images (Services page carousels) ----------

INSERT OR IGNORE INTO services_images (id, category, image, order_index) VALUES
('si_perf_1', 'performance', '/images/gallery-1.jpg', 0),
('si_perf_2', 'performance', '/images/gallery-2.jpg', 1),
('si_perf_3', 'performance', '/images/gallery-4.jpg', 2),
('si_perf_4', 'performance', '/images/gallery-5.jpg', 3),
('si_perf_5', 'performance', '/images/gallery-6.jpg', 4),
('si_work_1', 'workshop',    '/images/gallery-4.jpg', 0),
('si_work_2', 'workshop',    '/images/gallery-1.jpg', 1),
('si_work_3', 'workshop',    '/images/gallery-3.jpg', 2),
('si_work_4', 'workshop',    '/images/gallery-6.jpg', 3),
('si_work_5', 'workshop',    '/images/gallery-5.jpg', 4);

-- ---------- Seed: home_features (Home page Singing/Dancing/etc cards) ----------

INSERT OR IGNORE INTO home_features (id, title_en, title_kn, desc_en, desc_kn, icon, image, order_index) VALUES
('hf_singing',  'Singing',  'ಗಾಯನ',  'Master the authentic narrative singing tradition (Bhagavatike) of Yakshagana.',          'ಯಕ್ಷಗಾನದ ಭಾಗವತಿಕೆ ಪರಂಪರೆಯನ್ನು ಕಲಿಯಿರಿ.',                                            'Music', '', 0),
('hf_dancing',  'Dancing',  'ನೃತ್ಯ',  'Immerse yourself in the vigorous footwork and graceful choreography of Yakshagana.',     'ಯಕ್ಷಗಾನದ ಶಕ್ತಿಯುತ ಪಾದಭಂಗಿ ಮತ್ತು ನೃತ್ಯವನ್ನು ಕಲಿಯಿರಿ.',                                 'Drama', '', 1);

-- ---------- Seed: schedule (Schedule page day x class mapping) ----------

INSERT OR IGNORE INTO schedule (id, day_index, class_topic_en, class_topic_kn, time, order_index) VALUES
('sch_mon_1', 0, 'Bhagavatike',            'ಭಾಗವತಿಕೆ',           '6:00 PM', 0),
('sch_tue_1', 1, 'Chande & Maddale',       'ಚೆಂಡೆ ಮತ್ತು ಮದ್ದಳೆ',    '5:30 PM', 0),
('sch_wed_1', 2, 'Bhagavatike',            'ಭಾಗವತಿಕೆ',           '6:00 PM', 0),
('sch_thu_1', 3, 'Chande & Maddale',       'ಚೆಂಡೆ ಮತ್ತು ಮದ್ದಳೆ',    '5:30 PM', 0),
('sch_fri_1', 4, "Children's Foundation",  'ಮಕ್ಕಳ ಬುನಾದಿ',         '5:00 PM', 0),
('sch_sat_1', 5, 'Tenkutittu',             'ತೆಂಕುತಿಟ್ಟು',          '7:00 AM', 0),
('sch_sat_2', 5, 'Badagutittu',            'ಬಡಗುತಿಟ್ಟು',           '4:00 PM', 1),
('sch_sun_1', 6, 'Tenkutittu',             'ತೆಂಕುತಿಟ್ಟು',          '7:00 AM', 0),
('sch_sun_2', 6, 'Badagutittu',            'ಬಡಗುತಿಟ್ಟು',           '4:00 PM', 1),
('sch_sun_3', 6, 'Costume & Makeup',       'ವೇಷ ಮತ್ತು ಪ್ರಸಾಧನ',   '10:00 AM', 2);

-- ---------- Seed: nav_links (navbar) ----------

INSERT OR IGNORE INTO nav_links (id, label_en, label_kn, href, order_index) VALUES
('nav_home',         'Home',         'ಮುಖಪುಟ',           '/',          0),
('nav_about',        'About',        'ನಮ್ಮ ಬಗ್ಗೆ',          '/about',     1),
('nav_classes',      'Classes',      'ತರಗತಿಗಳು',          '/classes',   2),
('nav_performances', 'Performances', 'ಪ್ರದರ್ಶನಗಳು',       '/services',  3),
('nav_schedule',     'Schedule',     'ವೇಳಾಪಟ್ಟಿ',          '/schedule',  4),
('nav_gallery',      'Gallery',      'ಗ್ಯಾಲರಿ',             '/gallery',   5),
('nav_blog',         'Blog',         'ಬ್ಲಾಗ್',              '/blog',      6),
('nav_contact',      'Contact',      'ಸಂಪರ್ಕ',            '/contact',   7),
('nav_admin',        'Admin',        'ನಿರ್ವಾಹಕ',           '/admin',     8);

-- ---------- Seed: footer_links ----------

INSERT OR IGNORE INTO footer_links (id, label_en, label_kn, href, group_name, icon, order_index) VALUES
('fl_classes',  'Classes', 'ತರಗತಿಗಳು', '/classes', 'explore', '',          0),
('fl_gallery',  'Gallery', 'ಗ್ಯಾಲರಿ',     '/gallery', 'explore', '',          1),
('fl_contact',  'Contact', 'ಸಂಪರ್ಕ',    '/contact', 'explore', '',          2),
('fl_fb',       'Facebook',  'Facebook',  'https://facebook.com',  'social', 'Facebook',  0),
('fl_ig',       'Instagram', 'Instagram', 'https://instagram.com', 'social', 'Instagram', 1),
('fl_tw',       'Twitter',   'Twitter',   'https://twitter.com',   'social', 'Twitter',   2),
('fl_wa',       'WhatsApp',  'WhatsApp',  'https://wa.me/',        'social', 'MessageCircle', 3),
('fl_email',    'Email',     'Email',     'mailto:info@kathegaararu.com', 'social', 'Mail', 4);

-- ---------- Seed: branding ----------

INSERT OR IGNORE INTO branding (id, brand_name, tagline_en, tagline_kn, logo_url, copyright_text) VALUES
('main', 'Kathegaararu', 'Centre for Yakshagana Performance, Training & Research', 'ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನ, ತರಬೇತಿ ಮತ್ತು ಸಂಶೋಧನಾ ಕೇಂದ್ರ', '/images/logo-transparent.png', 'All rights reserved.');

-- ---------- Seed: gallery (the 20 R2-hosted AVIFs categorized 7/7/6) ----------

INSERT OR IGNORE INTO gallery (id, label, type, src, category) VALUES
('g_perf_1',  'Stage Warrior',         'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-1.avif',  'performance'),
('g_perf_3',  'Twin Halos',            'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-3.avif',  'performance'),
('g_perf_13', 'Classical Stage',       'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-13.avif', 'performance'),
('g_perf_15', 'Full Troupe',           'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-15.avif', 'performance'),
('g_perf_17', 'Under the Spotlight',   'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-17.avif', 'performance'),
('g_perf_19', 'Festive Lights',        'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-19.avif', 'performance'),
('g_perf_20', 'Mudra in Motion',       'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-20.avif', 'performance'),
('g_gur_11',  'Gurukul Family',        'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-11.avif', 'gurukul'),
('g_gur_2',   'The Art of Makeup',     'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-2.avif',  'gurukul'),
('g_gur_5',   'Vocal Practice',        'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-5.avif',  'gurukul'),
('g_gur_14',  'Young Performers',      'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-14.avif', 'gurukul'),
('g_gur_4',   'Costume Study',         'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-4.avif',  'gurukul'),
('g_gur_9',   'Solo Rehearsal',        'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-9.avif',  'gurukul'),
('g_gur_18',  'Scene Practice',        'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-18.avif', 'gurukul'),
('g_wks_6',   'Workshop Demonstration','image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-6.avif',  'workshop'),
('g_wks_12',  'Backstage Moments',     'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-12.avif', 'workshop'),
('g_wks_7',   'Rehearsal Pair',        'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-7.avif',  'workshop'),
('g_wks_8',   'Dialogue Rehearsal',    'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-8.avif',  'workshop'),
('g_wks_10',  'Ensemble Workshop',     'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-10.avif', 'workshop'),
('g_wks_16',  'Chande Session',        'image', 'https://pub-0425f98da8f7405c99bce2e7397bdac4.r2.dev/gallery/edited-16.avif', 'workshop');

-- ---------- Seed: site_content additions for contact details ----------
-- (Already has hero/about/services/contact keys. Adding contact details that
--  were hardcoded in contact.tsx as additional key-value pairs.)

INSERT OR IGNORE INTO site_content (id, lang, section, content_key, content_value) VALUES
('contact_en_title',          'en', 'contact', 'title',          'Visit & Connect'),
('contact_en_subtitle',       'en', 'contact', 'subtitle',       'We welcome students, scholars, and lovers of the art'),
('contact_en_address',        'en', 'contact', 'address',        'Kathe Gaararu Cultural Centre, Udupi, Karnataka, India'),
('contact_en_phone',          'en', 'contact', 'phone',          '+91 98765 43210'),
('contact_en_email',          'en', 'contact', 'email',          'info@kathegaararu.com'),
('contact_en_phone_services', 'en', 'contact', 'phone_services',     '+91 98765 43210'),
('contact_en_phone_perf',     'en', 'contact', 'phone_performances', '+91 98765 43211'),
('contact_en_phone_workshop', 'en', 'contact', 'phone_workshop',     '+91 98765 43212'),
('contact_en_phone_general',  'en', 'contact', 'phone_general',      '+91 98765 43213'),
('contact_en_form_name',      'en', 'contact', 'form_name',      'Your Name'),
('contact_en_form_email',     'en', 'contact', 'form_email',     'Email Address'),
('contact_en_form_message',   'en', 'contact', 'form_message',   'Your Message'),
('contact_en_form_submit',    'en', 'contact', 'form_submit',    'Send Message'),
('contact_en_form_success',   'en', 'contact', 'form_success',   'Thank you — we will be in touch.'),

('contact_kn_title',          'kn', 'contact', 'title',          'ಭೇಟಿ ಮತ್ತು ಸಂಪರ್ಕ'),
('contact_kn_subtitle',       'kn', 'contact', 'subtitle',       'ವಿದ್ಯಾರ್ಥಿಗಳು, ವಿದ್ವಾಂಸರು ಮತ್ತು ಕಲಾಪ್ರೇಮಿಗಳಿಗೆ ಸ್ವಾಗತ'),
('contact_kn_address',        'kn', 'contact', 'address',        'ಕಥೆ ಗಾರಾರು ಸಾಂಸ್ಕೃತಿಕ ಕೇಂದ್ರ, ಉಡುಪಿ, ಕರ್ನಾಟಕ, ಭಾರತ'),
('contact_kn_phone',          'kn', 'contact', 'phone',          '+91 98765 43210'),
('contact_kn_email',          'kn', 'contact', 'email',          'info@kathegaararu.com'),
('contact_kn_phone_services', 'kn', 'contact', 'phone_services',     '+91 98765 43210'),
('contact_kn_phone_perf',     'kn', 'contact', 'phone_performances', '+91 98765 43211'),
('contact_kn_phone_workshop', 'kn', 'contact', 'phone_workshop',     '+91 98765 43212'),
('contact_kn_phone_general',  'kn', 'contact', 'phone_general',      '+91 98765 43213'),
('contact_kn_form_name',      'kn', 'contact', 'form_name',      'ನಿಮ್ಮ ಹೆಸರು'),
('contact_kn_form_email',     'kn', 'contact', 'form_email',     'ಇಮೇಲ್ ವಿಳಾಸ'),
('contact_kn_form_message',   'kn', 'contact', 'form_message',   'ನಿಮ್ಮ ಸಂದೇಶ'),
('contact_kn_form_submit',    'kn', 'contact', 'form_submit',    'ಸಂದೇಶ ಕಳುಹಿಸಿ'),
('contact_kn_form_success',   'kn', 'contact', 'form_success',   'ಧನ್ಯವಾದ — ನಾವು ಸಂಪರ್ಕದಲ್ಲಿರುತ್ತೇವೆ.');
