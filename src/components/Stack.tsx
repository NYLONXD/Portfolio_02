import { Neofetch } from "../terminal/outputs";
import SectionHead from "./SectionHead";

export default function Stack() {
  return (
    <section id="stack" className="sec" aria-labelledby="stack-title">
      <SectionHead id="stack" cmd="neofetch" title="Stack" />
      <div className="stack-screen">
        <Neofetch />
      </div>
    </section>
  );
}
