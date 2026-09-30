import { profile } from "../data/profile";
import Terminal from "../terminal/Terminal";
import "../styles/hero.css";

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <h1 id="hero-name" className="hero-name">
        <span className="lit">Himanshu</span> <span className="lit">Jha</span>
      </h1>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-lede">
            {profile.role}. {profile.lede}
          </p>
          <p className="hero-status">
            <span className="led" aria-hidden="true" />
            {profile.status}
          </p>
          <p className="hero-actions">
            <a className="btn" href="#work">
              See my work
            </a>
            <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
              Email me
            </a>
          </p>
          <p className="hero-hint">
            Press <kbd>`</kbd> or <kbd>Ctrl</kbd>+<kbd>K</kbd> anywhere for a console.
          </p>
        </div>
        <Terminal variant="hero" autorun="finger himanshu" />
      </div>
    </section>
  );
}
