import { Link } from "@tanstack/react-router";
import { useLang } from "@/contexts/LanguageContext";
import { Facebook, Instagram, Twitter, Mail, MessageCircle } from "lucide-react";


export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative border-t border-white/10 bg-background/60 backdrop-blur-2xl">
      <div className="ornament-divider" />
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="font-display text-xl text-gradient-gold mb-3">KatheGaararu</div>
          <p className="font-display text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t.footer.made }} />
        </div>
        <div className="flex flex-col items-center md:items-start text-sm text-muted-foreground space-y-2">
          <div className="text-foreground font-medium mb-3">{t.nav.contact}</div>
          <div>{t.contact.address}</div>
          <div>{t.contact.phone}</div>
          <div>{t.contact.email}</div>
        </div>
        <div className="flex flex-col items-center md:items-start text-sm">
          <div className="text-foreground font-medium mb-3 uppercase tracking-widest text-xs opacity-70">Explore</div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-32 items-center md:items-start">
            <div className="flex flex-col gap-2 text-muted-foreground items-center md:items-start">
              <Link to="/classes" className="hover:text-primary transition-colors">
                {t.nav.classes}
              </Link>
              <Link to="/gallery" className="hover:text-primary transition-colors">
                {t.nav.gallery}
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                {t.nav.contact}
              </Link>
            </div>
            <div className="flex gap-7 text-muted-foreground pt-1 justify-center md:justify-start">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all hover:scale-110 active:scale-95" aria-label="Facebook">
                <Facebook size={22} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all hover:scale-110 active:scale-95" aria-label="Instagram">
                <Instagram size={22} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all hover:scale-110 active:scale-95" aria-label="Twitter">
                <Twitter size={22} />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all hover:scale-110 active:scale-95" aria-label="WhatsApp">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08c0 5.45-4.41 9.88-9.85 9.88-1.72 0-3.33-.44-4.7-1.22L2 22l2.31-5.27c-.88-1.42-1.39-3.1-1.39-4.9C3.02 6.43 7.56 2 12.85 2c5.44 0 9.15 4.53 9.15 9.08z" />
                  <path d="M17.5 14c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.2-.2.3-.6.7-.8.9-.1.1-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6s.3-.3.4-.5c.1-.1.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.5-1.2-.7-1.7-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.9 2.4 1 2.6c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.6.6.2 1.1.2 1.6.1.5-.1 1.6-.7 1.8-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
                </svg>
              </a>
              <a href={`mailto:${t.contact.email}`} className="hover:text-primary transition-all hover:scale-110 active:scale-95" aria-label="Email">
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/30 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kathe Gaararu · {t.footer.rights}
      </div>
    </footer>
  );
}
