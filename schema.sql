-- 1. Site Content (Hero, About, etc.)
CREATE TABLE IF NOT EXISTS site_content (
    id TEXT PRIMARY KEY,
    lang TEXT, -- 'en' or 'kn'
    section TEXT, -- 'hero', 'about', 'contact'
    content_key TEXT,
    content_value TEXT
);

-- 2. Events Section
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    lang TEXT,
    title TEXT,
    date TEXT,
    location TEXT,
    type TEXT,
    badge TEXT,
    status TEXT, -- 'upcoming', 'ongoing', 'completed'
    image_url TEXT
);

-- 3. Teachers / Gurus
CREATE TABLE IF NOT EXISTS teachers (
    id TEXT PRIMARY KEY,
    lang TEXT,
    name TEXT,
    expertise TEXT,
    bio TEXT,
    image_url TEXT
);

-- 4. Classes Schedule
CREATE TABLE IF NOT EXISTS classes (
    id TEXT PRIMARY KEY,
    lang TEXT,
    topic TEXT,
    teacher_id TEXT,
    day TEXT,
    level TEXT,
    time TEXT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

-- 5. Blogs / Insights
CREATE TABLE IF NOT EXISTS blogs (
    id TEXT PRIMARY KEY,
    lang TEXT,
    title TEXT,
    excerpt TEXT,
    category TEXT,
    author TEXT,
    date TEXT,
    image_url TEXT
);
