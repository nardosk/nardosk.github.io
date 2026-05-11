import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Mode = "system" | "light" | "dark";
const order: Mode[] = ["system", "light", "dark"];
const STORAGE_KEY = "theme";

function readStored(): Mode {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {}
  return "system";
}

function applyTheme(mode: Mode) {
  const isDark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(readStored());
    setMounted(true);

    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (readStored() === "system") applyTheme("system");
    };
    m.addEventListener?.("change", onSystemChange);
    return () => m.removeEventListener?.("change", onSystemChange);
  }, []);

  const cycle = () => {
    const next = order[(order.indexOf(mode) + 1) % order.length];
    try {
      if (next === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    setMode(next);
    applyTheme(next);
  };

  const label =
    mode === "system"
      ? "Theme: system"
      : mode === "dark"
        ? "Theme: dark"
        : "Theme: light";
  const Icon = mode === "system" ? Monitor : mode === "dark" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={cycle}
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
