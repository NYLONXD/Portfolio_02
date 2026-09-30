import { ReactNode, useSyncExternalStore } from "react";

export type LineKind = "input" | "output" | "error";
export type Line = { id: number; kind: LineKind; content: ReactNode };

type State = { lines: Line[]; history: string[] };

/**
 * One shell session shared by the hero terminal and the drop-down console,
 * so whatever a visitor typed in one is still there in the other.
 */
let nextId = 0;
let state: State = { lines: [], history: [] };
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export const session = {
  print(content: ReactNode, kind: LineKind = "output") {
    state = { ...state, lines: [...state.lines, { id: nextId++, kind, content }] };
    emit();
  },
  echoInput(command: string) {
    session.print(command, "input");
    if (command.trim()) {
      state = { ...state, history: [...state.history, command] };
    }
  },
  clear() {
    state = { ...state, lines: [] };
    emit();
  },
  get history() {
    return state.history;
  },
};

const initial: State = { lines: [], history: [] };

export function useSession() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => initial
  );
}
