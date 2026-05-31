import { useSyncExternalStore } from "react";

// Tracks the active color mode by observing the `dark` class that the theme
// bootstrap / ThemeToggle set on <html>. Decoupled from any theme state, so any
// consumer (e.g. the toaster) stays in sync no matter what flips the class.
type Mode = "light" | "dark";

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Mode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// Matches the light-first default used during SSR/bootstrap.
function getServerSnapshot(): Mode {
  return "light";
}

export function useThemeMode(): Mode {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
