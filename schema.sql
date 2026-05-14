-- ============================================================
-- Kathe Gaararu — Cloudflare D1 Schema (Full Migration)
-- ============================================================

-- 1. Site Content (Hero, About, Contact — key/value pairs per lang)
CREATE TABLE IF NOT EXISTS site_content (
    id TEXT PRIMARY KEY,
    lang TEXT NOT NULL,        -- 'en' or 'kn'
    section TEXT NOT NULL,     -- 'hero', 'about', 'contact'
    content_key TEXT NOT NULL,
    content_value TEXT
);

-- 2. Teachers / Gurus
CREATE TABLE IF NOT EXISTS teachers (
    id TEXT PRIMARY KEY,
    name_en TEXT,
    name_kn TEXT,
    expertise_en TEXT,
    expertise_kn TEXT,
    bio_en TEXT,
    bio_kn TEXT,
    image_url TEXT
);

-- 3. Classes Schedule
CREATE TABLE IF NOT EXISTS classes (
    id TEXT PRIMARY KEY,
    topic_en TEXT,
    topic_kn TEXT,
    teacher_id TEXT,
    day_en TEXT,
    day_kn TEXT,
    time TEXT,
    level_en TEXT,
    level_kn TEXT,
    date TEXT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

-- 4. Events
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title_en TEXT,
    title_kn TEXT,
    teacher_en TEXT,
    teacher_kn TEXT,
    time_en TEXT,
    time_kn TEXT,
    badge_en TEXT,
    badge_kn TEXT,
    status TEXT DEFAULT 'coming_soon',  -- 'booking' or 'coming_soon'
    image_url TEXT,
    date TEXT
);

-- 5. Blogs / Insights
CREATE TABLE IF NOT EXISTS blogs (
    id TEXT PRIMARY KEY,
    title_en TEXT,
    title_kn TEXT,
    excerpt_en TEXT,
    excerpt_kn TEXT,
    content_en TEXT,
    content_kn TEXT,
    category_en TEXT,
    category_kn TEXT,
    author_en TEXT,
    author_kn TEXT,
    date TEXT,
    image TEXT,
    slug TEXT
);

-- 6. Workshops
CREATE TABLE IF NOT EXISTS workshops (
    id TEXT PRIMARY KEY,
    title_en TEXT,
    title_kn TEXT,
    timestamp_en TEXT,
    timestamp_kn TEXT,
    image TEXT
);

-- 7. Gallery Items
CREATE TABLE IF NOT EXISTS gallery (
    id TEXT PRIMARY KEY,
    label TEXT,
    type TEXT DEFAULT 'image',  -- 'image' or 'video'
    src TEXT,
    category TEXT DEFAULT 'performance',  -- 'performance', 'gurukul' or 'workshop'
    focal_x INTEGER DEFAULT 50,  -- 0-100, horizontal focal point for object-position
    focal_y INTEGER DEFAULT 50   -- 0-100, vertical focal point for object-position
);

-- 8. Social Links
CREATE TABLE IF NOT EXISTS social_links (
    id TEXT PRIMARY KEY,
    title_en TEXT,
    title_kn TEXT,
    description_en TEXT,
    description_kn TEXT,
    link TEXT,
    image TEXT,
    order_index INTEGER DEFAULT 0
);

-- 9. FAQs (Home and Blog-specific)
CREATE TABLE IF NOT EXISTS faqs (
    id TEXT PRIMARY KEY,
    lang TEXT NOT NULL,        -- 'en' or 'kn'
    blog_id TEXT,              -- NULL for home page, non-null for blog-specific
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    FOREIGN KEY (blog_id) REFERENCES blogs(id)
);

-- 10. Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
