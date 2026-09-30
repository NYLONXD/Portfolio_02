import { GitLog } from "../terminal/outputs";
import SectionHead from "./SectionHead";

export default function Log() {
  return (
    <section id="log" className="sec" aria-labelledby="log-title">
      <SectionHead id="log" cmd="git log" title="Log" />
      <GitLog />
    </section>
  );
}
