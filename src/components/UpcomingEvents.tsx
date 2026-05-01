import { motion } from "framer-motion";
import { User, Clock } from "lucide-react";
import g2 from "@/assets/gallery-2.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g1 from "@/assets/gallery-1.jpg";

export function UpcomingEvents() {
  const events = [
    {
      title: "Bhagavata Padya (Vocal)",
      teacher: "Vid. Keremane Shivarama",
      time: "Saturdays, 6:00 PM",
      image: g2,
      badge: "NEXT CLASS",
      status: "booking",
    },
    {
      title: "Chande Rhythms",
      teacher: "Chittani Subrahmanya",
      time: "Sundays, 10:00 AM",
      image: g5,
      status: "booking",
    },
    {
      title: "Stree Vesha Abhinaya",
      teacher: "Hegde Parameshwar",
      time: "Wednesdays, 7:00 PM",
      image: g4,
      status: "coming_soon",
    },
    {
      title: "Rakshasa Vesha Makeup",
      teacher: "Bannada Malinga",
      time: "Fridays, 6:30 PM",
      image: g1,
      status: "coming_soon",
    },
  ];

  return (
    <section className="container mx-auto px-6 pb-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-display mb-4 text-primary">Upcoming Events</h2>
        <div className="ornament-divider w-24 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((ev, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative bg-[#0a0a0a] border border-border/50 rounded-lg overflow-hidden transition-all hover:border-gold/40 flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={ev.image}
                alt={ev.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              {ev.badge && (
                <span className="absolute top-4 right-4 bg-gold text-[#0a0a0a] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                  {ev.badge}
                </span>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-display text-xl text-primary mb-4 leading-tight">{ev.title}</h3>

              <div className="space-y-3 text-sm text-foreground/70 mb-8 flex-grow">
                <div className="flex items-center gap-3">
                  <User size={14} className="text-gold shrink-0" />
                  <span>{ev.teacher}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={14} className="text-gold shrink-0" />
                  <span>{ev.time}</span>
                </div>
              </div>

              {ev.status === "booking" ? (
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 px-4 border border-border/50 text-xs font-bold uppercase tracking-widest text-primary hover:border-gold/50 hover:bg-gold/5 transition-colors rounded-sm"
                >
                  BOOKING
                </a>
              ) : (
                <div className="block w-full text-center py-3 px-4 border border-border/30 text-xs font-bold uppercase tracking-widest text-foreground/40 bg-background/20 rounded-sm cursor-not-allowed">
                  COMING SOON
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
