import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { LanguageProvider } from "@/contexts/LanguageContext";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl font-display">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-gold text-background px-5 py-2.5 text-sm font-medium hover:opacity-90">
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kathe Gaararu — The Living Art of Yakshagana" },
      { name: "description", content: "A cultural sanctuary preserving and teaching Yakshagana — Karnataka's monumental folk theatre tradition through classes, workshops, and performances." },
      { property: "og:title", content: "Kathe Gaararu — The Living Art of Yakshagana" },
      { property: "og:description", content: "A cultural sanctuary preserving and teaching Yakshagana — Karnataka's monumental folk theatre tradition through classes, workshops, and performances." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kathe Gaararu — The Living Art of Yakshagana" },
      { name: "twitter:description", content: "A cultural sanctuary preserving and teaching Yakshagana — Karnataka's monumental folk theatre tradition through classes, workshops, and performances." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ce16f602-4450-4d37-be9d-c01105a2145e/id-preview-77273e1c--7b944e69-d876-4941-9ae7-6f6484d9030d.lovable.app-1777563634369.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ce16f602-4450-4d37-be9d-c01105a2145e/id-preview-77273e1c--7b944e69-d876-4941-9ae7-6f6484d9030d.lovable.app-1777563634369.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@300;400;500;600&family=Noto+Sans+Kannada:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}
