import data from "./projects.json";

export type Project = {
  slug: string;
  title: string;
  category: string;
  cover: string;
  year?: string;
  summary?: string;
  description?: string;
  highlights?: string[];
  href?: string;
};

type RawProject = {
  slug: string;
  title: string;
  category: string;
  image: string;
  year?: string;
  summary?: string;
  description?: string;
  highlights?: string[];
  href?: string;
};

const coverModules = import.meta.glob("../assets/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const coverByFilename: Record<string, string> = Object.fromEntries(
  Object.entries(coverModules).map(([path, url]) => [
    path.split("/").pop() as string,
    url,
  ]),
);

export const projects: Project[] = (data as RawProject[]).map(({ image, ...rest }) => {
  const cover = coverByFilename[image];
  if (!cover) {
    throw new Error(`projects.json: missing asset "${image}" for slug "${rest.slug}"`);
  }
  return { ...rest, cover };
});

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
