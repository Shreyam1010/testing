-- Seeding General FAQs
INSERT OR REPLACE INTO faqs (id, lang, blog_id, question, answer, order_index) VALUES 
('faq_gen_1', 'en', NULL, 'What is Kathe Gaararu?', 'Kathe Gaararu is a cultural sanctuary dedicated to the preservation, teaching, and performance of Yakshagana, the traditional folk theatre of Karnataka.', 0),
('faq_gen_2', 'en', NULL, 'Are there classes for beginners?', 'Absolutely. We offer foundational courses for all age groups, focusing on the basics of footwork, rhythm, and storytelling.', 1),
('faq_gen_3', 'en', NULL, 'Can I watch performances online?', 'We regularly stream selected performances on our social media channels. Check our Insights section for upcoming schedules.', 2);

-- Seeding Blog b1 FAQs: The Geometry of the Crown
INSERT OR REPLACE INTO faqs (id, lang, blog_id, question, answer, order_index) VALUES 
('faq_b1_1', 'en', 'b1', 'How heavy are the Yakshagana crowns (Kirita)?', 'Depending on the character, a crown can weigh anywhere from 2kg to 5kg. Artists undergo neck strengthening exercises to wear them comfortably.', 0),
('faq_b1_2', 'en', 'b1', 'What are the crowns made of?', 'Traditional crowns are carved from the wood of the "Haale" tree, which is incredibly lightweight. They are then decorated with gold foil, glass, and mirrors.', 1);

-- Seeding Blog b2 FAQs: Navarasa
INSERT OR REPLACE INTO faqs (id, lang, blog_id, question, answer, order_index) VALUES 
('faq_b2_1', 'en', 'b2', 'What are the nine emotions in Yakshagana?', 'The Navarasas are Shringara (Love), Hasya (Laughter), Karuna (Compassion), Raudra (Anger), Veera (Courage), Bhayanaka (Fear), Bibhatsa (Disgust), Adbhuta (Wonder), and Shanta (Peace).', 0),
('faq_b2_2', 'en', 'b2', 'Does makeup change with the Rasa?', 'While the base makeup stays, the artist uses subtle facial muscle movements and eye techniques (Netra Abhinaya) to shift between these emotions.', 1);

-- Seeding Blog b3 FAQs: The Chande
INSERT OR REPLACE INTO faqs (id, lang, blog_id, question, answer, order_index) VALUES 
('faq_b3_1', 'en', 'b3', 'Is the Chande played throughout the performance?', 'The Chande is used primarily for "Veera" (Heroic) and "Raudra" (Fierce) scenes to create a high-energy atmosphere.', 0),
('faq_b3_2', 'en', 'b3', 'What is the drum skin made from?', 'Traditionally, cowhide is used for its durability and sharp, resonant sound required for the Chande.', 1);

-- Seeding Blog b4 FAQs: Ritual to Theatre
INSERT OR REPLACE INTO faqs (id, lang, blog_id, question, answer, order_index) VALUES 
('faq_b4_1', 'en', 'b4', 'Does every performance start with a ritual?', 'Yes, even modern stage performances begin with "Chowki Pooje," a ritualistic worship of Ganesha in the green room.', 0),
('faq_b4_2', 'en', 'b4', 'How long does a traditional performance last?', 'Traditional "Bayalata" performances usually run all night, starting at dusk and ending at dawn.', 1);
