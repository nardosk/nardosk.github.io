// Centralized SEO metadata. Each route calls seo() with its canonical path so the
// emitted <head> carries a self-referential canonical URL, absolute Open Graph /
// Twitter URLs, and a social share image. Canonical points at the production
// domain (nardos.et) so GitHub Pages mirrors consolidate to one indexable origin.

export const SITE_URL = "https://nardos.et";
export const SITE_NAME = "Nardos K.";
export const OG_IMAGE = `${SITE_URL}/og.png`;

type SeoInput = {
  /** Route path, e.g. "/", "/about", "/work/nylos-erp". */
  path: string;
  title: string;
  description: string;
  /** Absolute or root-relative image URL; defaults to the brand OG card. */
  image?: string;
};

/** Build the canonical absolute URL for a route path. */
export function canonicalUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return SITE_URL + (path.startsWith("/") ? path : `/${path}`);
}

/**
 * Returns { meta, links } for a TanStack Router route `head()`. Per-route values
 * (title, description, og/twitter, canonical) override the site-wide defaults set
 * in the root route.
 */
export function seo({ path, title, description, image = OG_IMAGE }: SeoInput) {
  const url = canonicalUrl(path);
  const absoluteImage = image.startsWith("http") ? image : SITE_URL + image;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: absoluteImage },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteImage },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
