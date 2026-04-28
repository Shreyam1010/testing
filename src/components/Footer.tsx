import { Link } from "@tanstack/react-router";
import { useLang } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative mt-32 border-t border-border/40 bg-card/30">
      <div className="ornament-divider" />
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-display text-xl text-gradient-gold mb-3">Kathe Gaararu</div>
          <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.made}</p>
        </div>
        <div className="text-sm text-muted-foreground space-y-2">
          <div className="text-foreground font-medium mb-3">{t.nav.contact}</div>
          <div>{t.contact.address}</div>
          <div>{t.contact.phone}</div>
          <div>{t.contact.email}</div>
        </div>
        <div className="text-sm">
          <div className="text-foreground font-medium mb-3">Explore</div>
          <div className="flex flex-col gap-2 text-muted-foreground">
            <Link to="/classes" className="hover:text-primary">{t.nav.classes}</Link>
            <Link to="/gallery" className="hover:text-primary">{t.nav.gallery}</Link>
            <Link to="/admin" className="hover:text-primary">{t.nav.admin}</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border/30 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kathe Gaararu · {t.footer.rights}
      </div>
    </footer>
  );
}
