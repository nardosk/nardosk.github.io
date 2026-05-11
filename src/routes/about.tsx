import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nardos K." },
      {
        name: "description",
        content:
          "Nardos K., a software engineer based in Addis Ababa, Ethiopia, focused on desktop and web application development.",
      },
      { property: "og:title", content: "About — Nardos K." },
      {
        property: "og:description",
        content:
          "Addis Ababa-based software engineer with a focus on desktop and web application development.",
      },
    ],
  }),
  component: AboutPage,
});

const experience = [
  {
    year: "2020 — 2023",
    role: "Senior Software Engineer",
    where: "NYLOS Software",
  },
  {
    year: "2016 — 2019",
    role: "Senior Software Developer",
    where: "CNET Software Technologies PLC",
  },
];

const education = [
  {
    year: "2020 — 2021",
    role: "MERN Stack Web Development",
    where: "Evangadi Networks",
  },
  {
    year: "2011 — 2016",
    role: "BSc, Electrical & Computer Engineering",
    where: "Addis Ababa University Institute of Technology (AAiT)",
  },
];

const stats = [
  { value: "7+", label: "Years of experience" },
  { value: "500+", label: "Clients served" },
  { value: "30+", label: "Projects shipped" },
];

const interests = ["Finance", "AI", "Art", "Code"];

function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      <section className="pt-12 sm:pt-20 pb-12">
        <p className="font-serif-italic text-xl sm:text-2xl text-muted-foreground">
          About
        </p>
        <h1 className="mt-4 font-display text-[14vw] sm:text-[10vw] md:text-[8.5vw]">
          Software engineer
          <br />
          <span className="font-serif-italic font-normal tracking-normal">in Addis&nbsp;Ababa.</span>
        </h1>
      </section>

      <section className="grid md:grid-cols-[5fr_7fr] gap-10 md:gap-20 pb-24 items-start">
        {/* Portrait column */}
        <figure className="relative md:sticky md:top-28">
          <div className="relative overflow-hidden rounded-md bg-secondary ring-1 ring-foreground/10">
            <img
              src={portrait}
              alt="Portrait of Nardos K."
              width={1024}
              height={1024}
              className="w-full aspect-square object-cover"
            />
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4">
            <span className="font-serif-italic text-muted-foreground text-sm">
              Nardos K. — Addis Ababa.
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Portrait
            </span>
          </figcaption>
        </figure>

        {/* Text column */}
        <div>
          <p className="font-serif-italic text-muted-foreground text-lg">
            Profile
          </p>

          <p className="mt-6 font-display text-3xl sm:text-4xl leading-[1.05] tracking-tight">
            I design and build software with a quiet attention to detail —
            <span className="font-serif-italic font-normal tracking-normal text-muted-foreground"> calm, considered, and made to last.</span>
          </p>

          <div className="mt-10 space-y-6 text-lg leading-relaxed max-w-2xl text-muted-foreground">
            <p>
              I'm Nardos — a software engineer based in Addis Ababa, Ethiopia,
              with a focus on desktop and web application development.
            </p>
            <p>
              Over the past seven years I've shipped products across enterprise
              software and the web, working with teams in Ethiopia and abroad.
              I care about typography, performance, and details that feel
              considered rather than performed.
            </p>
          </div>

          {/* Interests */}
          <div className="mt-12 border-t border-border pt-8">
            <p className="font-serif-italic text-muted-foreground text-sm">
              Interests
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 max-w-md">
              {interests.map((label, i) => (
                <li key={label} className="flex items-baseline gap-3">
                  <span className="text-xs tracking-[0.22em] text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl sm:text-3xl">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border py-16">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((s) => (
            <li key={s.label}>
              <p className="font-display text-5xl sm:text-6xl">{s.value}</p>
              <p className="mt-2 font-serif-italic text-muted-foreground">{s.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="border-t border-border py-16">
        <p className="font-serif-italic text-muted-foreground text-lg mb-10">Experience</p>
        <ul className="divide-y divide-border">
          {experience.map((t) => (
            <li key={t.year} className="py-6 grid grid-cols-12 gap-4 items-baseline">
              <span className="col-span-12 sm:col-span-3 text-sm text-muted-foreground">{t.year}</span>
              <span className="col-span-12 sm:col-span-4 font-display text-2xl sm:text-3xl">{t.role}</span>
              <span className="col-span-12 sm:col-span-5 text-muted-foreground">{t.where}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Education */}
      <section className="border-t border-border py-16">
        <p className="font-serif-italic text-muted-foreground text-lg mb-10">Education</p>
        <ul className="divide-y divide-border">
          {education.map((t) => (
            <li key={t.year} className="py-6 grid grid-cols-12 gap-4 items-baseline">
              <span className="col-span-12 sm:col-span-3 text-sm text-muted-foreground">{t.year}</span>
              <span className="col-span-12 sm:col-span-4 font-display text-2xl sm:text-3xl">{t.role}</span>
              <span className="col-span-12 sm:col-span-5 text-muted-foreground">{t.where}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
