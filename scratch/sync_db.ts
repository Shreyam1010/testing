import fs from 'fs';
import { translations } from './src/lib/i18n.ts';

const sections = ['hero', 'about', 'nav', 'highlights', 'classes', 'services', 'schedule', 'gallery', 'contact', 'footer'];

async function pushContent() {
  for (const lang of ['en', 'kn']) {
    const t = translations[lang];
    
    // Push Hero
    await pushSection('hero', lang, t.hero);
    // Push About (Home section)
    await pushSection('about', lang, t.about.homeSection);
    // Push Nav
    await pushSection('nav', lang, t.nav);
    // Push Highlights
    await pushSection('highlights', lang, t.highlights);
  }
}

async function pushSection(section, lang, data) {
  for (const [key, value] of Object.entries(data)) {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    const cmd = `npx wrangler d1 execute kathe-gaararu-db --command "INSERT OR REPLACE INTO site_content (id, lang, section, content_key, content_value) VALUES ('${section}_${lang}_${key}', '${lang}', '${section}', '${key}', '${val.replace(/'/g, "''")}');" --local`;
    console.log(`Pushing ${section}.${key} [${lang}]...`);
    // Note: In a real script we'd exec this, but here I'll just generate the SQL file.
  }
}

// Actually, I'll just generate a seed.sql for the changes.
