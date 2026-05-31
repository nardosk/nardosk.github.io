import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import faviconUrl from "@/assets/favicon.ico";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nardos K. — Software Engineer" },
      {
        name: "description",
        content:
          "Personal portfolio of Nardos K., a software engineer in Addis Ababa crafting calm, considered digital products.",
      },
      { name: "author", content: SITE_NAME },
      { name: "theme-color", content: "#1a1b1f" },
      // Site-wide Open Graph / Twitter defaults. Per-route titles, descriptions,
      // URLs and the canonical link are supplied via seo() and override these.
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Nardos K. — Software Engineer in Addis Ababa" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: faviconUrl },
      { rel: "stylesheet", href: appCss },
      // Preload the display/serif faces used above the fold (the hero H1 is the
      // LCP element) so text paints in-font without a swap flash.
      {
        rel: "preload",
        href: "/fonts/inter-tight-900-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/instrument-serif-italic-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// Default to light; only go dark when the user has explicitly chosen it.
const colorSchemeBootstrap = `(function(){try{var s=null;try{s=localStorage.getItem('theme');}catch(e){}document.documentElement.classList.toggle('dark',s==='dark');}catch(e){}})();`;

// Person + WebSite structured data — helps search engines associate the site with
// Nardos K. (knowledge panel / rich results). sameAs mirrors the footer socials.
const structuredData = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nardos K.",
    url: SITE_URL,
    image: OG_IMAGE,
    jobTitle: "Software Engineer",
    description:
      "Software engineer based in Addis Ababa, Ethiopia, focused on desktop and web application development.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    sameAs: [
      "https://www.linkedin.com/in/nardosk/",
      "https://github.com/nardosk/",
      "https://x.com/eaglopia",
      "https://t.me/eaglopia",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
]);

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: colorSchemeBootstrap }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const themeMode = useThemeMode();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main style={{ paddingTop: "var(--header-height)" }}>
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" theme={themeMode} />
    </QueryClientProvider>
  );
}
