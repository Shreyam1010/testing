import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { apiUrl } from "@/lib/api";

// Module-level cache so navigation between routes (which remounts Layout/Navbar)
// doesn't refetch /api/content and cause UI to flash through a null state.
const cache: Record<string, any> = {};
const inflight: Record<string, Promise<any>> = {};

export function useDbContent() {
  const { lang } = useLang();
  const [data, setData] = useState<any>(cache[lang] ?? null);
  const [loading, setLoading] = useState(!cache[lang]);
  const [error, setError] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    delete cache[lang];
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        if (cache[lang]) {
          setData(cache[lang]);
          setLoading(false);
          return;
        }
        setLoading(true);
        if (!inflight[lang]) {
          inflight[lang] = fetch(apiUrl(`/api/content?lang=${lang}`)).then(r => {
            if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
            return r.json();
          });
        }
        const raw = await inflight[lang];
        delete inflight[lang];

        if (!isMounted) return;

        const transformed: any = {
          siteContent: [],
          siteContentMap: {},
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
          })) || [],
          faqs: raw.faqs?.map((f: any) => ({
            id: f.id,
            blogId: f.blog_id,
            question: f.question,
            answer: f.answer,
            orderIndex: f.order_index
          })) || [],
          gallery: raw.gallery?.map((g: any) => ({
            id: g.id,
            label: g.label,
            type: g.type || "image",
            src: g.src,
            category: g.category
          })) || [],
          galleryByCategory: { performance: [], gurukul: [], workshop: [] } as Record<string, any[]>,
          highlights: raw.highlights?.map((h: any) => ({
            id: h.id,
            title: { en: h.title_en, kn: h.title_kn },
            desc: { en: h.desc_en, kn: h.desc_kn },
            icon: h.icon,
            image: h.image,
            orderIndex: h.order_index
          })) || [],
          classFeatures: raw.classFeatures?.map((c: any) => ({
            id: c.id,
            title: { en: c.title_en, kn: c.title_kn },
            desc: { en: c.desc_en, kn: c.desc_kn },
            icon: c.icon,
            orderIndex: c.order_index
          })) || [],
          servicesImages: raw.servicesImages?.map((s: any) => ({
            id: s.id,
            category: s.category,
            image: s.image,
            orderIndex: s.order_index
          })) || [],
          servicesImagesByCategory: { performance: [], workshop: [] } as Record<string, string[]>,
          homeFeatures: raw.homeFeatures?.map((h: any) => ({
            id: h.id,
            title: { en: h.title_en, kn: h.title_kn },
            desc: { en: h.desc_en, kn: h.desc_kn },
            icon: h.icon,
            image: h.image,
            orderIndex: h.order_index
          })) || [],
          navLinks: raw.navLinks?.map((n: any) => ({
            id: n.id,
            label: { en: n.label_en, kn: n.label_kn },
            href: n.href,
            orderIndex: n.order_index
          })) || [],
          footerLinks: raw.footerLinks?.map((f: any) => ({
            id: f.id,
            label: { en: f.label_en, kn: f.label_kn },
            href: f.href,
            group: f.group_name,
            icon: f.icon,
            orderIndex: f.order_index
          })) || [],
          footerLinksByGroup: { explore: [], social: [] } as Record<string, any[]>,
          branding: raw.branding ? {
            brandName: raw.branding.brand_name,
            tagline: { en: raw.branding.tagline_en, kn: raw.branding.tagline_kn },
            logoUrl: raw.branding.logo_url,
            copyright: raw.branding.copyright_text
          } : null,
        };

        transformed.siteContent = raw.siteContent || [];
        raw.siteContent?.forEach((item: any) => {
          if (!transformed.siteContentMap[item.section]) transformed.siteContentMap[item.section] = {};
          transformed.siteContentMap[item.section][item.content_key] = item.content_value;
        });

        for (const g of transformed.gallery) {
          const cat = g.category || "performance";
          if (!transformed.galleryByCategory[cat]) transformed.galleryByCategory[cat] = [];
          transformed.galleryByCategory[cat].push(g);
        }

        for (const s of transformed.servicesImages) {
          const cat = s.category || "performance";
          if (!transformed.servicesImagesByCategory[cat]) transformed.servicesImagesByCategory[cat] = [];
          transformed.servicesImagesByCategory[cat].push(s.image);
        }

        for (const f of transformed.footerLinks) {
          const g = f.group || "explore";
          if (!transformed.footerLinksByGroup[g]) transformed.footerLinksByGroup[g] = [];
          transformed.footerLinksByGroup[g].push(f);
        }

        cache[lang] = transformed;
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
