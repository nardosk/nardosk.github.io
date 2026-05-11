// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Two build targets share this config:
//   - default (workers): wraps the Cloudflare plugin and uses src/server.ts as the worker
//     entry, producing dist/server/index.js for `wrangler deploy`.
//   - BUILD_TARGET=pages: disables the Cloudflare plugin and enables TanStack Start's
//     prerender so dist/client/ contains static HTML for every reachable route. Used by
//     the GitHub Pages workflow.
const isPagesBuild = process.env.BUILD_TARGET === "pages";

export default defineConfig({
  cloudflare: isPagesBuild ? false : undefined,
  tanstackStart: isPagesBuild
    ? {
        prerender: {
          enabled: true,
          crawlLinks: true,
          autoSubfolderIndex: true,
        },
        pages: [
          { path: "/" },
          { path: "/about" },
          { path: "/contact" },
        ],
      }
    : {
        server: { entry: "server" },
      },
});
