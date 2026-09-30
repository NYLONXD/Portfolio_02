import { createContext, useContext } from "react";

export type TerminalApi = {
  run: (input: string) => void;
  consoleOpen: boolean;
  setConsoleOpen: (open: boolean) => void;
};

export const TerminalContext = createContext<TerminalApi | null>(null);

export function useTerminal() {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminal must be used inside TerminalProvider");
  return ctx;
}
