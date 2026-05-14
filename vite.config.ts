// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Deploy target: Hostinger (static hosting) for the frontend, Cloudflare Worker
// (yakshagana-app.prasadcherkady.workers.dev) for the API/D1/R2. The Hostinger
// build is the default so a plain `npm run build` on Hostinger Just Works; set
// DEPLOY_TARGET=cloudflare to build for a Cloudflare Workers deploy instead.
const isCloudflareBuild = process.env.DEPLOY_TARGET === "cloudflare";

export default defineConfig({
  cloudflare: isCloudflareBuild ? undefined : false,
  tanstackStart: isCloudflareBuild
    ? undefined
    : {
        spa: {
          enabled: true,
          prerender: {
            enabled: true,
            outputPath: "/index.html",
          },
        },
      },
  vite: {
    server: {
      allowedHosts: ['.trycloudflare.com'],
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5667',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('@radix-ui')) return 'vendor-radix';
            if (id.includes('recharts') || id.includes('d3-')) return 'vendor-charts';
            if (id.includes('react-day-picker') || id.includes('date-fns')) return 'vendor-date';
            if (id.includes('embla-carousel')) return 'vendor-carousel';
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) return 'vendor-forms';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('@tanstack/')
            ) return 'vendor-react';
          },
        },
      },
    },
  }
});
