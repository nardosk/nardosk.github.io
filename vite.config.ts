import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

// Two build targets share this config:
//   - default (workers): wraps the Cloudflare plugin and uses src/server.ts as the worker
//     entry, producing dist/server/index.js for `wrangler deploy`.
//   - BUILD_TARGET=pages: disables the Cloudflare plugin and enables TanStack Start's
//     prerender so dist/client/ contains static HTML for every reachable route. Used by
//     the GitHub Pages workflow.
const isPagesBuild = process.env.BUILD_TARGET === "pages";

export default defineConfig(async ({ command, mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), "VITE_");
  const define: Record<string, string> = {};
  for (const [key, value] of Object.entries(viteEnv)) {
    define[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const plugins = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(
      isPagesBuild
        ? {
            prerender: {
              enabled: true,
              crawlLinks: true,
              autoSubfolderIndex: true,
            },
            pages: [{ path: "/" }, { path: "/about" }, { path: "/contact" }],
          }
        : { server: { entry: "server" } },
    ),
    viteReact(),
  ];

  if (!isPagesBuild && command === "build") {
    const { cloudflare } = await import("@cloudflare/vite-plugin");
    plugins.push(cloudflare({ viteEnvironment: { name: "ssr" } }));
  }

  return {
    define,
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    server: { host: "::", port: 8080 },
    plugins,
  };
});
