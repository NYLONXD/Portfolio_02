import { useSyncExternalStore } from "react";

export const themes = ["green", "amber", "paper"] as const;
export type Theme = (typeof themes)[number];

export const themeInfo: Record<Theme, string> = {
  green: "P1 green phosphor",
  amber: "P3 amber phosphor",
  paper: "Green-bar printout paper",
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

export function cycleTheme() {
  const i = themes.indexOf(current.theme);
  setTheme(themes[(i + 1) % themes.length]);
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
