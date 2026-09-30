import { profile } from "../data/profile";
import Photos from "./Photos";
import SectionHead from "./SectionHead";

export default function About() {
  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <SectionHead id="about" cmd="about" title="About" />
      <div className="about-grid">
        <div className="about-bio">
          {profile.bio.map((para) => (
            <p key={para.slice(0, 16)}>{para}</p>
          ))}
        </div>
        <div className="about-photo">
          <Photos />
        </div>
        <figure className="file about-facts">
          <figcaption className="file-name">himanshu.toml</figcaption>
          <pre>
            <code>
              <span className="tok-section">[himanshu]</span>
              {"\n"}
              {profile.facts.map((f) => (
                <span key={f.key}>
                  <span className="tok-key">{f.key.toLowerCase().padEnd(10)}</span>={" "}
                  <span className="tok-str">"{f.value}"</span>
                  {"\n"}
                </span>
              ))}
            </code>
          </pre>
        </figure>
      </div>
    </section>
  );
}
