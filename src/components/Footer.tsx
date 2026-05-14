import { Link } from "@tanstack/react-router";
import { useLang } from "@/contexts/LanguageContext";
import { useDbContent } from "@/hooks/useDb";
import { Facebook, Instagram, Twitter, Mail, MessageCircle } from "lucide-react";

const socialIconMap: Record<string, any> = {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MessageCircle,
};

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08c0 5.45-4.41 9.88-9.85 9.88-1.72 0-3.33-.44-4.7-1.22L2 22l2.31-5.27c-.88-1.42-1.39-3.1-1.39-4.9C3.02 6.43 7.56 2 12.85 2c5.44 0 9.15 4.53 9.15 9.08z" />
    <path d="M17.5 14c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.2-.2.3-.6.7-.8.9-.1.1-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6s.3-.3.4-.5c.1-.1.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.5-1.2-.7-1.7-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 2s.9 2.4 1 2.6c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.6.6.2 1.1.2 1.6.1.5-.1 1.6-.7 1.8-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
  </svg>
);

export function Footer() {
  const { t, lang } = useLang();
  const { data } = useDbContent();

  const brand = data?.branding;
  const brandName = brand?.brandName || "KatheGaararu";

  const contactMap = data?.siteContentMap?.contact || {};
  const cAddress = contactMap.address || t.contact.address;
  const cPhone = "+91 96111 34810";
  const cEmail = contactMap.email || t.contact.email;
  const contactLabel = data?.navLinks?.find((n: any) => n.href === "/contact")?.label?.[lang] || t.nav.contact;

  const exploreLinks: Array<{ href: string; label: string }> = data?.footerLinksByGroup?.explore?.length
    ? data.footerLinksByGroup.explore.map((f: any) => ({ href: f.href, label: f.label?.[lang] || f.label?.en }))
    : [
        { href: "/classes", label: t.nav.classes },
        { href: "/gallery", label: t.nav.gallery },
        { href: "/contact", label: t.nav.contact },
        { href: "/admin", label: t.nav.admin },
      ];

  const socialLinks: Array<{ href: string; icon: string; label: string }> = data?.footerLinksByGroup?.social?.length
    ? data.footerLinksByGroup.social.map((f: any) => ({ href: f.href, icon: f.icon, label: f.label?.[lang] || f.label?.en }))
    : [
        { href: "https://facebook.com",  icon: "Facebook",       label: "Facebook" },
        { href: "https://instagram.com", icon: "Instagram",      label: "Instagram" },
        { href: "https://twitter.com",   icon: "Twitter",        label: "Twitter" },
        { href: "https://wa.me/919611134810", icon: "MessageCircle",  label: "WhatsApp" },
        { href: `mailto:${cEmail}`,      icon: "Mail",           label: "Email" },
      ];

  return (
    <footer className="relative border-t border-border bg-background/60 backdrop-blur-2xl">
      <div className="ornament-divider" />
      <div className="container mx-auto px-8 py-16 grid md:grid-cols-3 gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="font-display text-2xl text-gradient-gold">{brandName}</div>
          <p className="font-display text-xs text-muted-foreground leading-relaxed uppercase tracking-[0.2em] opacity-70 max-w-[240px]" dangerouslySetInnerHTML={{ __html: t.footer.made }} />
        </div>

        <div className="flex flex-col items-center md:items-start text-sm text-muted-foreground space-y-3">
          <div className="text-foreground font-semibold uppercase tracking-widest text-xs opacity-50 mb-2">{contactLabel}</div>
          <div className="hover:text-primary transition-colors cursor-default">{cAddress}</div>
          <div className="hover:text-primary transition-colors cursor-default">{cPhone}</div>
          <div className="hover:text-primary transition-colors cursor-default">{cEmail}</div>
        </div>

        <div className="flex flex-col items-center md:items-start text-sm">
          <div className="text-foreground font-semibold uppercase tracking-widest text-xs opacity-50 mb-5">Explore</div>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center lg:items-start w-full">
            <div className="flex flex-col gap-3 text-muted-foreground items-center md:items-start whitespace-nowrap">
              {exploreLinks.map((l) => (
                <Link key={l.href} to={l.href} className="hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-6 text-muted-foreground items-center justify-center md:justify-start">
              {socialLinks.map((s) => {
                const Icon = socialIconMap[s.icon];
                const isWhatsApp = s.icon === "MessageCircle" || /wa\.me|whatsapp/i.test(s.href);
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="hover:text-primary transition-all hover:scale-110 active:scale-95"
                    aria-label={s.label}
                  >
                    {isWhatsApp ? <WhatsAppIcon /> : Icon ? <Icon size={20} /> : null}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/30 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {brandName} · {brand?.copyright || t.footer.rights}
      </div>
    </footer>
  );
}
