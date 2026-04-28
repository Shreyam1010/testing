import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ShieldCheck } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/classes", label: t.nav.classes },
    { to: "/schedule", label: t.nav.schedule },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
            <span className="text-background font-display font-bold text-lg">ಯ</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg text-gradient-gold tracking-wider">Kathe Gaararu</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Yakshagana Kala</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative px-4 py-2 text-sm transition-colors ${
                path === l.to ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              {l.label}
              {path === l.to && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-gold rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition-colors text-xs font-medium uppercase tracking-wider"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}
          <button
            onClick={() => setLang(lang === "en" ? "kn" : "en")}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:border-gold transition-colors text-xs font-medium uppercase tracking-wider"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
            <span className="text-border">/</span>
            <span className={lang === "kn" ? "text-primary" : "text-muted-foreground"}>ಕನ್ನಡ</span>
          </button>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-border/40 bg-background/95 overflow-hidden"
          >
            <nav className="px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm ${
                    path === l.to ? "text-primary bg-muted" : "text-foreground/80"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <button
                onClick={() => setLang(lang === "en" ? "kn" : "en")}
                className="mt-2 px-3 py-2 text-left text-sm text-muted-foreground border-t border-border/40 pt-3"
              >
                <Globe className="w-4 h-4 inline mr-2" />
                {lang === "en" ? "ಕನ್ನಡ" : "English"}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
