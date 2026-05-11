import { Link } from "@tanstack/react-router";
import { Linkedin, Send, Github, ArrowUpRight } from "lucide-react";

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