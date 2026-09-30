import { useEffect, useRef } from "react";
import Terminal from "../terminal/Terminal";
import { useTerminal } from "../terminal/context";
import "../styles/console.css";

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

/** Quake-style drop-down console, one keystroke away from anywhere on the page. */
export default function Console() {
  const { consoleOpen, setConsoleOpen } = useTerminal();
  const input = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const palette = e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey);
      const tilde = e.key === "`" && (!isTyping(e.target) || e.target === input.current);
      if (palette || tilde) {
        e.preventDefault();
        setConsoleOpen(!consoleOpen);
      } else if (e.key === "Escape" && consoleOpen) {
        setConsoleOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [consoleOpen, setConsoleOpen]);

  useEffect(() => {
    if (consoleOpen) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      input.current?.focus({ preventScroll: true });
    } else if (returnFocus.current) {
      returnFocus.current.focus({ preventScroll: true });
      returnFocus.current = null;
    }
  }, [consoleOpen]);

  return (
    <>
      <div
        className="console-scrim"
        data-open={consoleOpen || undefined}
        onClick={() => setConsoleOpen(false)}
        aria-hidden="true"
      />
      <div
        className="console"
        data-open={consoleOpen || undefined}
        role="dialog"
        aria-label="Console"
        aria-modal="true"
      >
        {/* Stays mounted so it can slide shut; CSS visibility hides it from focus and AT. */}
        <Terminal variant="console" inputRef={input} onClose={() => setConsoleOpen(false)} />
      </div>
    </>
  );
}
