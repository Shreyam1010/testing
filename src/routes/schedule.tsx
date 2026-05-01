import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Weekly Class Schedule — Kathe Gaararu" },
      {
        name: "description",
        content: "View the weekly Yakshagana class and workshop schedule with timings and gurus.",
      },
      { property: "og:title", content: "Weekly Schedule" },
      { property: "og:description", content: "Plan your week with our master gurus." },
    ],
  }),
  component: Schedule,
});

// Schedule grid: which class indexes meet on each day
const dayClassMap: Record<number, Array<{ idx: number; slot: string }>> = {
  0: [{ idx: 0, slot: "6:00 PM" }],
  1: [{ idx: 1, slot: "5:30 PM" }],
  2: [{ idx: 0, slot: "6:00 PM" }],
  3: [{ idx: 1, slot: "5:30 PM" }],
  4: [{ idx: 5, slot: "5:00 PM" }],
  5: [
    { idx: 2, slot: "7:00 AM" },
    { idx: 3, slot: "4:00 PM" },
  ],
  6: [
    { idx: 2, slot: "7:00 AM" },
    { idx: 3, slot: "4:00 PM" },
    { idx: 4, slot: "10:00 AM" },
  ],
};

function Schedule() {
  const { t } = useLang();

  return (
    <Layout>
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="ornament-divider w-24 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-display mb-4">{t.schedule.title}</h1>
          <p className="text-muted-foreground">{t.schedule.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-4">
          {t.schedule.days.map((day, dIdx) => (
            <motion.div
              key={dIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: dIdx * 0.05 }}
              className="rounded-xl bg-card/50 border border-border overflow-hidden"
            >
              <div className="bg-ember p-3 text-center text-sm font-medium uppercase tracking-wider">
                {day}
              </div>
              <div className="p-3 space-y-2 min-h-[180px]">
                {dayClassMap[dIdx]?.length ? (
                  dayClassMap[dIdx].map((c, i) => {
                    const cls = t.classes.items[c.idx];
                    return (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-background/40 border-l-2 border-gold"
                      >
                        <div className="text-xs text-primary font-medium">{c.slot}</div>
                        <div className="text-sm font-medium mt-1">{cls.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{cls.teacher}</div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-xs text-muted-foreground/60 text-center pt-8">—</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
