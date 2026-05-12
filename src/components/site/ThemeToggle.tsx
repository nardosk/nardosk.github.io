import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Mode = "light" | "dark";
const STORAGE_KEY = "theme";

function resolveInitialMode(): Mode {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(mode: Mode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(resolveInitialMode());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    setMode(next);
    applyTheme(next);
  };

  const label = mode === "dark" ? "Switch to light theme" : "Switch to dark theme";
  const Icon = mode === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center size-9 rounded-full hover:bg-foreground/5 transition-colors"
    >
      {mounted ? (
        <Icon className="size-4" />
      ) : (
        <span className="size-4" aria-hidden />
      )}
    </button>
  );
}
