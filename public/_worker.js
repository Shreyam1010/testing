export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Serve static assets
    const response = await env.ASSETS.fetch(request);
    
    // If not found, fallback to index.html (SPA routing)
    if (response.status === 404 && !url.pathname.startsWith("/api/") && !url.pathname.startsWith("/images/")) {
      return env.ASSETS.fetch(new Request(new URL("/", request.url)));
    }
    
    return response;
  }
};
