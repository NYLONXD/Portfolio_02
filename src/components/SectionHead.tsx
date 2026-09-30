import { useTerminal } from "../terminal/context";

/**
 * Every section is the output of a real command. The prompt line shows which one,
 * and clicking it runs that command in the console.
 */
export default function SectionHead({ cmd, title, id }: { cmd: string; title: string; id: string }) {
  const { run, setConsoleOpen } = useTerminal();
  return (
    <header className="sec-head">
      <button
        type="button"
        className="sec-cmd"
        onClick={() => {
          setConsoleOpen(true);
          run(cmd);
        }}
        title="Run this in the console"
      >
        <span className="sec-prompt" aria-hidden="true">
          ~ $
        </span>{" "}
        {cmd}
      </button>
      <h2 className="sec-title lit" id={`${id}-title`}>
        {title}
      </h2>
    </header>
  );
}
