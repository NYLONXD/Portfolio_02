import { PropsWithChildren, ReactNode, useCallback, useMemo, useState } from "react";
import { execute, SectionId } from "./commands";
import { TerminalContext, useTerminal } from "./context";
import { session } from "./session";
import { prefersReducedMotion } from "../lib/prefs";

export function TerminalProvider({ children }: PropsWithChildren) {
  const [consoleOpen, setConsoleOpen] = useState(false);

  const run = useCallback((input: string) => {
    session.echoInput(input);
    const output = execute(input, {
      navigate(id: SectionId) {
        setConsoleOpen(false);
        const target = id === "top" ? document.body : document.getElementById(id);
        target?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      },
      open(url: string) {
        window.open(url, "_blank", "noopener,noreferrer");
      },
      clear: session.clear,
      closeConsole: () => setConsoleOpen(false),
      history: () => session.history,
    });
    if (output !== null) session.print(output as ReactNode);
  }, []);

  const api = useMemo(() => ({ run, consoleOpen, setConsoleOpen }), [run, consoleOpen]);

  return <TerminalContext.Provider value={api}>{children}</TerminalContext.Provider>;
}

/** A command name that runs itself when clicked, for people who'd rather not type. */
export function Cmd({ cmd, children }: { cmd: string; children?: ReactNode }) {
  const { run } = useTerminal();
  return (
    <button type="button" className="t-cmd" onClick={() => run(cmd)}>
      {children ?? cmd}
    </button>
  );
}
