-- Clear old hero data
DELETE FROM site_content WHERE section = 'hero';

-- English Hero — exact match to i18n.ts
INSERT INTO site_content (id, lang, section, content_key, content_value) VALUES 
('hero_en_tag', 'en', 'hero', 'tag', 'Preserving a 400-year-old legacy'),
('hero_en_title', 'en', 'hero', 'title', 'The Living Art of'),
('hero_en_titleAccent', 'en', 'hero', 'titleAccent', 'Yakshagana'),
('hero_en_subtitle', 'en', 'hero', 'subtitle', 'An immersive cultural sanctuary where traditional Kannada theatre, music, and dance breathe through every performance, class, and story.'),
('hero_en_ctaPrimary', 'en', 'hero', 'ctaPrimary', 'Explore Classes'),
('hero_en_ctaSecondary', 'en', 'hero', 'ctaSecondary', 'Watch Performances');

-- Kannada Hero — exact match to i18n.ts
INSERT INTO site_content (id, lang, section, content_key, content_value) VALUES 
('hero_kn_tag', 'kn', 'hero', 'tag', '೪೦೦ ವರ್ಷಗಳ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆ'),
('hero_kn_title', 'kn', 'hero', 'title', 'ಜೀವಂತ ಕಲೆ'),
('hero_kn_titleAccent', 'kn', 'hero', 'titleAccent', 'ಯಕ್ಷಗಾನ'),
('hero_kn_subtitle', 'kn', 'hero', 'subtitle', 'ಸಾಂಪ್ರದಾಯಿಕ ಕನ್ನಡ ರಂಗಭೂಮಿ, ಸಂಗೀತ ಮತ್ತು ನೃತ್ಯ — ಪ್ರತಿ ಪ್ರದರ್ಶನ, ತರಗತಿ ಮತ್ತು ಕಥೆಯಲ್ಲಿ ಉಸಿರಾಡುವ ಸಾಂಸ್ಕೃತಿಕ ತಾಣ.'),
('hero_kn_ctaPrimary', 'kn', 'hero', 'ctaPrimary', 'ತರಗತಿಗಳನ್ನು ನೋಡಿ'),
('hero_kn_ctaSecondary', 'kn', 'hero', 'ctaSecondary', 'ಪ್ರದರ್ಶನಗಳನ್ನು ವೀಕ್ಷಿಸಿ');

-- Clear old about data
DELETE FROM site_content WHERE section = 'about';

-- English About — exact match to i18n.ts homeSection
INSERT INTO site_content (id, lang, section, content_key, content_value) VALUES 
('about_en_label', 'en', 'about', 'label', 'OUR STORY'),
('about_en_title', 'en', 'about', 'title', 'Our Story');

-- Kannada About
INSERT INTO site_content (id, lang, section, content_key, content_value) VALUES 
('about_kn_label', 'kn', 'about', 'label', 'ನಮ್ಮ ಕಥೆ'),
('about_kn_title', 'kn', 'about', 'title', 'ನಮ್ಮ ಕಥೆ');
