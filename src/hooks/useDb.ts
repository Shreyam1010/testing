import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";

export function useDbContent() {
  const { lang } = useLang();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey(prev => prev + 1);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`http://127.0.0.1:5667/api/content?lang=${lang}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const raw = await res.json();
        
        if (!isMounted) return;

        // Transform data to match frontend expectations
        const transformed: any = {
          siteContent: [], // Keep as array for raw access if needed
          siteContentMap: {}, // Helper map
          teachers: raw.teachers?.map((t: any) => ({
            id: t.id,
            name: { en: t.name_en, kn: t.name_kn },
            expertise: { en: t.expertise_en, kn: t.expertise_kn },
            bio: { en: t.bio_en, kn: t.bio_kn },
            image: t.image_url
          })) || [],
          classes: raw.classes?.map((c: any) => ({
            id: c.id,
            topic: { en: c.topic_en, kn: c.topic_kn },
            teacherId: c.teacher_id,
            day: { en: c.day_en, kn: c.day_kn },
            time: c.time,
            level: { en: c.level_en, kn: c.level_kn }
          })) || [],
          events: raw.events?.map((e: any) => ({
            id: e.id,
            title: { en: e.title_en, kn: e.title_kn },
            teacher: { en: e.teacher_en, kn: e.teacher_kn },
            time: { en: e.time_en, kn: e.time_kn },
            badge: { en: e.badge_en, kn: e.badge_kn },
            status: e.status,
            image: e.image_url,
            date: e.date
          })) || [],
          blogs: raw.blogs?.map((b: any) => ({
            id: b.id,
            title: { en: b.title_en, kn: b.title_kn },
            excerpt: { en: b.excerpt_en, kn: b.excerpt_kn },
            content: { en: b.content_en, kn: b.content_kn },
            category: { en: b.category_en, kn: b.category_kn },
            author: { en: b.author_en, kn: b.author_kn },
            date: b.date,
            image: b.image,
            slug: b.slug
          })) || [],
          workshops: raw.workshops?.map((w: any) => ({
            id: w.id,
            title: { en: w.title_en, kn: w.title_kn },
            timestamp: { en: w.timestamp_en, kn: w.timestamp_kn },
            image: w.image
          })) || [],
          socialLinks: raw.socialLinks?.map((s: any) => ({
            id: s.id,
            title: { en: s.title_en, kn: s.title_kn },
            description: { en: s.description_en, kn: s.description_kn },
            link: s.link,
            image: s.image,
            orderIndex: s.order_index
          })) || []
        };

        // Site content transformation
        transformed.siteContent = raw.siteContent || [];
        raw.siteContent?.forEach((item: any) => {
          if (!transformed.siteContentMap[item.section]) transformed.siteContentMap[item.section] = {};
          transformed.siteContentMap[item.section][item.content_key] = item.content_value;
        });

        setData(transformed);
      } catch (err) {
        console.error("[useDbContent] Fetch failed:", err);
        setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => { isMounted = false; };
  }, [lang, refreshKey]);

  return { data, loading, error, refresh };
}

