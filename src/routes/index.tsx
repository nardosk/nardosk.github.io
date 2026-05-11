import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nardos K. — Selected Work" },
      {
        name: "description",
        content:
          "Selected projects by Nardos K., a software engineer based in Addis Ababa, Ethiopia.",
      },
      { property: "og:title", content: "Nardos K. — Selected Work" },
      {
        property: "og:description",
        content:
          "Selected projects by Nardos K., a software engineer based in Addis Ababa, Ethiopia.",
      },
    ],
  }),
  component: WorkPage,
});

const numberWords = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

function WorkPage() {
  const total = projects.length;

  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24">
        <p className="font-serif-italic text-xl sm:text-2xl text-muted-foreground">
          Selected work
        </p>
        <h1 className="mt-4 font-display text-[14vw] sm:text-[10vw] md:text-[8.5vw]">
          Software engineer
          <br />
          <span className="font-serif-italic font-normal tracking-normal">in Addis&nbsp;Ababa.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          I'm Nardos — a software engineer based in Addis Ababa, Ethiopia,
          with a focus on desktop and web application development.
        </p>
      </section>

      {/* Section heading */}
      <section className="border-t border-border pt-8 pb-10 sm:pt-10 sm:pb-14">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-serif-italic text-muted-foreground text-lg sm:text-xl">
            {numberWords[total - 1] ?? total} works,
            <span className="text-foreground"> hand-picked.</span>
          </p>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
            Index — {String(total).padStart(2, "0")}
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-16 sm:gap-y-24 pb-12">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            to="/work/$slug"
            params={{ slug: p.slug }}
            className={
              "group block " +
              (i % 2 === 1 ? "sm:translate-y-16 md:translate-y-24" : "")
            }
          >
            {/* Meta row above image */}
            <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.22em] text-muted-foreground pb-3 border-b border-border">
              <span className="tabular-nums">
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              {p.year ? (
                <span className="tabular-nums">{p.year}</span>
              ) : (
                <span className="font-serif-italic normal-case tracking-normal text-sm">
                  {p.category}
                </span>
              )}
            </div>

            {/* Image */}
            <div className="mt-4 relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary ring-1 ring-foreground/5">
              <img
                src={p.cover}
                alt={p.title}
                width={1024}
                height={1280}
                loading={i < 2 ? "eager" : "lazy"}
                className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.6,.2,1)] group-hover:scale-[1.04]"
              />
              {/* View pill */}
              <div className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-background px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                View
                <ArrowUpRight className="size-3" />
              </div>
            </div>

            {/* Title row */}
            <div className="mt-6 flex items-end justify-between gap-6">
              <div className="min-w-0">
                <p className="font-serif-italic text-muted-foreground text-base sm:text-lg">
                  {p.category}
                </p>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-tight">
                  <span className="inline-flex items-baseline transition-transform duration-500 group-hover:translate-x-1">
                    {p.title}
                  </span>
                </h3>
              </div>
              <ArrowUpRight className="size-5 shrink-0 mb-2 text-muted-foreground transition-all duration-500 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <div
              aria-hidden
              className="mt-4 h-px w-12 bg-foreground/30 transition-all duration-700 group-hover:w-full group-hover:bg-foreground"
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
