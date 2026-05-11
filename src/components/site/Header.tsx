import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const links = [
  { to: "/", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/70 backdrop-blur-md backdrop-saturate-150 border-b border-border/60">
      <div
        className="mx-auto max-w-[1400px] px-6 sm:px-10 flex items-center justify-between"
        style={{ height: "var(--header-height)" }}
      >
        {/* Wordmark */}
        <Link
          to="/"
          className="text-sm font-medium uppercase tracking-[0.32em] transition-opacity hover:opacity-70"
          aria-label="Nardos — Home"
        >
          NARDOS
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center">
          <ul className="flex items-center">
            {links.map((l) => {
              const active = isActive(l.to);
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={cn(
                      "group relative inline-flex items-center px-4 py-2 text-xs uppercase tracking-[0.22em] transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "mr-2 inline-block size-1 rounded-full bg-foreground transition-all duration-300",
                        active
                          ? "opacity-100 scale-100"
                          : "opacity-0 -translate-x-1 scale-50 group-hover:opacity-50 group-hover:translate-x-0",
                      )}
                    />
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span
            aria-hidden
            className="mx-3 h-4 w-px bg-border"
          />
          <ThemeToggle />
        </nav>

        {/* Mobile cluster */}
        <div className="sm:hidden flex items-center gap-1 -mr-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center size-10"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-nav"
          className="sm:hidden border-t border-border/60 bg-background/95 backdrop-blur-md"
        >
          <nav className="mx-auto max-w-[1400px] px-6 py-8">
            <ul className="divide-y divide-border">
              {links.map((l, i) => {
                const active = isActive(l.to);
                return (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-baseline justify-between py-5 font-display text-3xl tracking-tight",
                        active ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-xs tracking-[0.22em] text-muted-foreground tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {l.label}
                      </span>
                      {active && (
                        <span className="font-serif-italic text-sm text-muted-foreground">
                          current
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
