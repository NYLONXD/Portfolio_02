import { useSyncExternalStore } from "react";

// Keep in sync with the list in index.html's inline script and the blocks in global.css.
export const themes = ["green", "amber", "cyan", "white", "red", "paper"] as const;
export type Theme = (typeof themes)[number];

export const themeInfo: Record<Theme, string> = {
  green: "P1 green phosphor",
  amber: "P3 amber phosphor",
  cyan: "Cyan phosphor",
  white: "P4 white phosphor",
  red: "Red night-mode screen",
  paper: "Green-bar printout paper",
};

/** Each theme's own color (a CSS background), for pickers that show every option at once. */
export const themeSwatch: Record<Theme, string> = {
  green: "#52ff8f",
  amber: "#ffb23f",
  cyan: "#4de8ff",
  white: "#e8ebf0",
  red: "#ff5e4d",
  paper: "repeating-linear-gradient(#f3f5ee 0 3px, #bcdcb7 3px 6px)",
};

type Prefs = { theme: Theme; crt: boolean };

const DEFAULTS: Prefs = { theme: "green", crt: true };
const listeners = new Set<() => void>();

const isTheme = (v: unknown): v is Theme =>
  typeof v === "string" && (themes as readonly string[]).includes(v);

/** Read what the inline <head> script already applied, so first paint and state agree. */
function readFromDom(): Prefs {
  const root = document.documentElement;
  const theme = root.dataset.theme;
  return { theme: isTheme(theme) ? theme : "green", crt: root.dataset.crt !== "off" };
}

// Hydration renders with DEFAULTS (getServerSnapshot), then React re-renders with this.
let current: Prefs = typeof document === "undefined" ? DEFAULTS : readFromDom();

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage: the choice just won't persist.
  }
}

function update(next: Partial<Prefs>) {
  current = { ...current, ...next };
  const root = document.documentElement;
  root.dataset.theme = current.theme;
  if (current.crt) delete root.dataset.crt;
  else root.dataset.crt = "off";
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute("content", getComputedStyle(root).getPropertyValue("--tube").trim());
  listeners.forEach((l) => l());
}

export function setTheme(theme: Theme) {
  update({ theme });
  store("hj-theme", theme);
}

export function setCrt(on: boolean) {
  update({ crt: on });
  store("hj-crt", on ? "on" : "off");
}

export function getPrefs() {
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function usePrefs() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => DEFAULTS
  );
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
