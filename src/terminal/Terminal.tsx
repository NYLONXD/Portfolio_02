import { KeyboardEvent, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { complete } from "./commands";
import { session, useSession } from "./session";
import { useTerminal } from "./context";
import { Cmd } from "./TerminalProvider";
import { prefersReducedMotion } from "../lib/prefs";
import "../styles/terminal.css";

type Props = {
  variant: "hero" | "console";
  /** Typed out and run once, after the boot screen, if the visitor hasn't typed yet. */
  autorun?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onClose?: () => void;
};

const PROMPT = "guest@nylonxd:~$";

// useLayoutEffect warns during the prerender; this keeps the client behavior.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Terminal({ variant, autorun, inputRef, onClose }: Props) {
  const { run } = useTerminal();
  const { lines, history } = useSession();
  const [value, setValue] = useState("");
  const [caret, setCaret] = useState(0);
  const [focused, setFocused] = useState(false);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const localRef = useRef<HTMLInputElement>(null);
  const input = inputRef ?? localRef;
  const body = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const id = useId();

  // Keep the newest output in view without scrolling the page itself.
  useIsoLayoutEffect(() => {
    const el = body.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines.length]);

  useEffect(() => {
    if (!autorun) return;
    let timer: number | undefined;
    let cancelled = false;

    const type = (i: number) => {
      if (cancelled || touched.current) return;
      if (i > autorun.length) {
        setValue("");
        setCaret(0);
        run(autorun);
        return;
      }
      setValue(autorun.slice(0, i));
      setCaret(i);
      timer = window.setTimeout(() => type(i + 1), 70 + Math.random() * 60);
    };

    const start = () => {
      if (session.history.length > 0) return; // already used, e.g. from the console
      if (prefersReducedMotion()) {
        run(autorun);
        return;
      }
      timer = window.setTimeout(() => type(1), 450);
    };

    const w = window as Window & { __hjBooted?: boolean };
    if (w.__hjBooted) start();
    else window.addEventListener("hj:booted", start, { once: true });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener("hj:booted", start);
    };
  }, [autorun, run]);

  const set = (next: string) => {
    setValue(next);
    setCaret(next.length);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    touched.current = true;
    if (e.key === "Enter") {
      e.preventDefault();
      run(value);
      set("");
      setHistoryIndex(null);
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (history.length === 0) return;
      e.preventDefault();
      const up = e.key === "ArrowUp";
      const from = historyIndex ?? history.length;
      const next = Math.min(Math.max(from + (up ? -1 : 1), 0), history.length);
      setHistoryIndex(next === history.length ? null : next);
      set(history[next] ?? "");
    } else if (e.key === "Tab") {
      if (!value) return; // let Tab move focus when there's nothing to complete
      e.preventDefault();
      const { value: completed, options } = complete(value);
      set(completed);
      if (options.length) {
        session.echoInput(value);
        session.print(<span className="t-dim">{options.join("   ")}</span>);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      session.clear();
    } else if (e.key === "c" && e.ctrlKey && !window.getSelection()?.toString()) {
      e.preventDefault();
      session.echoInput(`${value}^C`);
      set("");
    } else if (e.key === "Escape" && onClose) {
      onClose();
    }
  };

  const syncCaret = () => setCaret(input.current?.selectionStart ?? value.length);

  const focusInput = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, button") || window.getSelection()?.toString()) return;
    input.current?.focus({ preventScroll: true });
  };

  return (
    <div className={`term term-${variant}`} data-focused={focused || undefined}>
      <div className="term-bar">
        <span>{variant === "console" ? "console" : "tty1"}</span>
        <span className="term-title">guest@nylonxd: ~</span>
        {onClose ? (
          <button type="button" className="term-close" onClick={onClose}>
            esc
          </button>
        ) : (
          <span aria-hidden="true">80×24</span>
        )}
      </div>
      <div
        className="term-body"
        ref={body}
        onClick={focusInput}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        <div className="t-line t-welcome">
          <p>Type a command and press Enter, or click one to run it.</p>
          <p className="t-dim">
            New here? Try <Cmd cmd="help" />, <Cmd cmd="projects" /> or <Cmd cmd="contact" />.
          </p>
        </div>
        {lines.map((line) => (
          <div key={line.id} className={`t-line t-${line.kind}`}>
            {line.kind === "input" ? (
              <>
                <span className="t-prompt" aria-hidden="true">
                  {PROMPT}
                </span>{" "}
                <span className="sr-only">You ran: </span>
                {line.content}
              </>
            ) : (
              line.content
            )}
          </div>
        ))}
        <div className="t-inputline">
          <label htmlFor={id} className="t-prompt">
            {PROMPT}
            <span className="sr-only"> Type a command</span>
          </label>
          <div className="t-field">
            <span className="t-mirror" aria-hidden="true">
              {value.slice(0, caret)}
              <span className="t-caret">{value[caret] ?? " "}</span>
              {value.slice(caret + 1)}
            </span>
            <input
              id={id}
              ref={input}
              value={value}
              onChange={(e) => {
                touched.current = true;
                setValue(e.target.value);
                setCaret(e.target.selectionStart ?? e.target.value.length);
              }}
              onKeyDown={onKeyDown}
              onKeyUp={syncCaret}
              onSelect={syncCaret}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
