import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { project } = loaderData;
    const desc =
      project.summary ??
      project.description ??
      `${project.title} — ${project.category}.`;
    return {
      meta: [
        { title: `${project.title} — Nardos K.` },
        { name: "description", content: desc },
        { property: "og:title", content: `${project.title} — Nardos K.` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      {/* Top: back link + index */}
      <section className="pt-10 sm:pt-16 pb-8 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          All work
        </Link>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      </section>

      {/* Title */}
      <section className="pb-10 border-b border-border">
        <p className="font-serif-italic text-xl sm:text-2xl text-muted-foreground">
          {project.category}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h1 className="mt-3 font-display text-[12vw] sm:text-[9vw] md:text-[7.5vw] leading-[0.95] tracking-tight">
          {project.title}
        </h1>
        {project.summary && (
          <p className="mt-8 max-w-2xl font-serif-italic text-2xl sm:text-3xl text-muted-foreground leading-snug">
            {project.summary}
          </p>
        )}
      </section>

      {/* Cover */}
      <section className="py-10 sm:py-14">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-secondary ring-1 ring-foreground/10">
          <img
            src={project.cover}
            alt={project.title}
            width={1600}
            height={1000}
            loading="eager"
            className="size-full object-cover"
          />
        </div>
      </section>

      {/* Body: description + highlights */}
      <section className="grid md:grid-cols-[5fr_7fr] gap-10 md:gap-20 pb-20 items-start border-t border-border pt-12">
        <div>
          <p className="font-serif-italic text-muted-foreground text-lg">Overview</p>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {project.category}
          </p>
        </div>

        <div className="space-y-12">
          {project.description && (
            <p className="text-lg sm:text-xl leading-relaxed max-w-2xl">
              {project.description}
            </p>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="border-t border-border pt-10">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-serif-italic text-muted-foreground text-lg">
                  {project.slug === "nylos-software" ? "What we do" : "Modules & features"}
                </p>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
                  {String(project.highlights.length).padStart(2, "0")}
                </p>
              </div>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl">
                {project.highlights.map((h, i) => (
                  <li key={h} className="flex items-baseline gap-4 border-b border-border/60 py-3">
                    <span className="text-xs tracking-[0.22em] text-muted-foreground tabular-nums shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl sm:text-2xl tracking-tight leading-tight">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-border py-14 flex items-end justify-between gap-6">
        <div>
          <p className="font-serif-italic text-muted-foreground">Next project</p>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group mt-2 inline-flex items-baseline gap-3 font-display text-4xl sm:text-6xl tracking-tight"
          >
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              {next.title}
            </span>
            <ArrowUpRight className="size-6 sm:size-8 self-end mb-2 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        {next.year && <p className="text-xs text-muted-foreground tabular-nums">{next.year}</p>}
      </section>
    </div>
  );
}
