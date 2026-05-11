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
    const desc = project.description ?? `${project.title} — ${project.category}.`;
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
      <section className="pt-12 sm:pt-20 pb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          All work
        </Link>

        <p className="mt-10 font-serif-italic text-xl sm:text-2xl text-muted-foreground">
          {project.category}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h1 className="mt-3 font-display text-[14vw] sm:text-[10vw] md:text-[8.5vw]">
          {project.title}
        </h1>
        {project.description && (
          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        )}
      </section>

      <section className="pb-16">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-secondary">
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

      <section className="border-t border-border py-16 flex items-end justify-between gap-6">
        <div>
          <p className="font-serif-italic text-muted-foreground">Next project</p>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="mt-2 inline-flex items-baseline gap-3 font-display text-4xl sm:text-6xl hover:opacity-80 transition-opacity"
          >
            {next.title}
            <ArrowUpRight className="size-6 sm:size-8" />
          </Link>
        </div>
        {next.year && <p className="text-xs text-muted-foreground">{next.year}</p>}
      </section>
    </div>
  );
}
