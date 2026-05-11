import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, ArrowUpRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendContactMessage } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nardos K." },
      {
        name: "description",
        content: "Get in touch with Nardos K. for projects, roles, or a quiet hello.",
      },
      { property: "og:title", content: "Contact — Nardos K." },
      {
        property: "og:description",
        content: "Drop a message. I usually reply within a day or two.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "At least 10 characters").max(2000),
});
type FormValues = z.infer<typeof schema>;

const socials = [
  { label: "LinkedIn", handle: "@nardosk", href: "https://www.linkedin.com/in/nardosk/" },
  { label: "GitHub", handle: "@nardosk", href: "https://github.com/nardosk/" },
  { label: "Telegram", handle: "@eaglopia", href: "https://t.me/eaglopia" },
  { label: "Instagram", handle: "@eaglopia", href: "https://www.instagram.com/eaglopia/" },
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Kasanchis%2C+Addis+Ababa%2C+Ethiopia";

function ContactPage() {
  const sendFn = useServerFn(sendContactMessage);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const result = await sendFn({ data: values });
      if (result.success) {
        toast.success("Message sent. Talk soon.");
        reset();
      } else {
        toast.error(result.error ?? "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-12">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-serif-italic text-xl sm:text-2xl text-muted-foreground">
            Contact
          </p>
          <p className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15 motion-safe:animate-pulse"
            />
            Open to new work
          </p>
        </div>
        <h1 className="mt-4 font-display text-[14vw] sm:text-[10vw] md:text-[8.5vw]">
          Say
          <span className="font-serif-italic font-normal tracking-normal"> hello,</span>
          <br />
          properly.
        </h1>
        <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Tell me about your project, a role you're hiring for, or just say hi.
          I usually reply within a day or two.
        </p>
      </section>

      {/* Two columns */}
      <section className="grid md:grid-cols-[5fr_6fr] gap-12 md:gap-20 pb-24 border-t border-border pt-12">
        {/* Left: info */}
        <aside className="space-y-12">
          {/* Primary email */}
          <div>
            <p className="font-serif-italic text-muted-foreground text-lg">
              Write to me
            </p>
            <a
              href="mailto:contact@nardos.et"
              className="group mt-3 inline-flex items-baseline gap-3"
              aria-label="Email contact@nardos.et"
            >
              <span className="font-display text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-tight break-all">
                contact@nardos.et
              </span>
              <ArrowUpRight className="size-5 shrink-0 self-end mb-2 text-muted-foreground transition-all duration-500 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <div
              aria-hidden
              className="mt-4 h-px w-16 bg-foreground/30"
            />
          </div>

          {/* Phone + location */}
          <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-5 text-base items-baseline">
            <dt className="font-serif-italic text-muted-foreground">Call</dt>
            <dd>
              <a
                href="tel:+251912340157"
                className="tabular-nums hover:text-foreground transition-colors"
              >
                +251 912 34 0157
              </a>
            </dd>
            <dt className="font-serif-italic text-muted-foreground">Based in</dt>
            <dd>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Kasanchis, Addis Ababa in Google Maps"
                className="group inline-flex items-baseline gap-1.5 hover:text-foreground transition-colors"
              >
                Kasanchis, Addis Ababa
                <ArrowUpRight className="size-3.5 self-end mb-1 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </dd>
          </dl>

          {/* Socials */}
          <div className="border-t border-border pt-10">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-serif-italic text-muted-foreground text-lg">
                Find me on
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
                {String(socials.length).padStart(2, "0")} channels
              </p>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-foreground"
                  >
                    <span className="font-display text-2xl sm:text-3xl tracking-tight leading-none">
                      {s.label}
                    </span>
                    <span className="flex items-baseline gap-3">
                      <span className="font-serif-italic text-muted-foreground">
                        {s.handle}
                      </span>
                      <ArrowUpRight className="size-4 self-end mb-1 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right: form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:border-l md:border-border md:pl-12"
          noValidate
        >
          <div className="flex items-baseline justify-between gap-4 mb-10">
            <p className="font-serif-italic text-muted-foreground text-lg">
              Or send a note
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Form
            </p>
          </div>

          <div className="space-y-8">

          <Field label="Name" htmlFor="name" error={errors.name?.message}>
            <Input
              id="name"
              placeholder="Your name"
              autoComplete="name"
              className="border-0 border-b border-foreground/15 rounded-none bg-transparent px-0 h-14 text-xl placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
              {...register("name")}
            />
          </Field>

          <Field label="Email" htmlFor="email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              placeholder="you@domain.com"
              autoComplete="email"
              className="border-0 border-b border-foreground/15 rounded-none bg-transparent px-0 h-14 text-xl placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
              {...register("email")}
            />
          </Field>

          <Field label="Message" htmlFor="message" error={errors.message?.message}>
            <Textarea
              id="message"
              rows={5}
              placeholder="Tell me a bit about your project…"
              className="border-0 border-b border-foreground/15 rounded-none bg-transparent px-0 text-xl placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none"
              {...register("message")}
            />
          </Field>

          </div>

          <div className="mt-12 flex items-center justify-between gap-4">
            <p className="font-serif-italic text-sm text-muted-foreground">
              I'll reply within a day or two.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-6 pr-2 py-2 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {isSubmitting ? "Sending" : "Send"}
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-background/15 transition-transform duration-300 group-hover:rotate-45">
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ArrowUpRight className="size-4" />
                )}
              </span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label
        htmlFor={htmlFor}
        className="block mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground"
      >
        {label}
      </Label>
      {children}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
