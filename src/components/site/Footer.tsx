import { Link } from "@tanstack/react-router";
import { Linkedin, Send, Github, ArrowUpRight } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 py-16 sm:py-20">
        <p className="font-serif-italic text-2xl sm:text-3xl text-muted-foreground">
          Let's make something
        </p>
        <h2 className="font-display text-[14vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] mt-2">
          worth&nbsp;sharing.
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact
            <ArrowUpRight className="size-4" />
          </Link>
          <a
            href="https://www.linkedin.com/in/nardosk/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium hover:bg-foreground/5 transition-colors"
          >
            <Linkedin className="size-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/nardosk/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium hover:bg-foreground/5 transition-colors"
          >
            <Github className="size-4" />
            GitHub
          </a>
          <a
            href="https://x.com/eaglopia"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium hover:bg-foreground/5 transition-colors"
          >
            <XIcon className="size-3.5" />
            X
          </a>
          <a
            href="https://t.me/eaglopia"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium hover:bg-foreground/5 transition-colors"
          >
            <Send className="size-4" />
            Telegram
          </a>
        </div>

        <div className="mt-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} Nardos K. — Software Engineer.</p>
          <p className="font-serif-italic text-sm">Addis Ababa, Ethiopia</p>
        </div>
      </div>
    </footer>
  );
}