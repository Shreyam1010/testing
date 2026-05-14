// Returns the absolute URL for an API path.
// When VITE_API_URL is set at build time (e.g. for Hostinger deploy),
// API calls are routed to the Cloudflare Worker.
// When unset (e.g. when deployed on Cloudflare itself), falls back to
// same-origin so the Worker handles both static + API.
export function apiUrl(path: string): string {
  const base = (import.meta.env.VITE_API_URL || "https://yakshagana-app.prasadcherkady.workers.dev") as string;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (base && base.length > 0) {
    return base.replace(/\/+$/, "") + normalized;
  }
  return normalized;
}
