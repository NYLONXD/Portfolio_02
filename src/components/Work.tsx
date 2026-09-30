import { featuredProjects, otherProjects, Project } from "../data/projects";
import { Ext } from "../terminal/outputs";
import SectionHead from "./SectionHead";
import "../styles/work.css";

function Links({ project }: { project: Project }) {
  return (
    <p className="proj-links">
      {project.links.map((l) => (
        <Ext key={l.href} href={l.href}>
          {l.label}
          <span className="sr-only"> for {project.name}</span>
        </Ext>
      ))}
    </p>
  );
}

function Featured({ project: p }: { project: Project }) {
  return (
    <article className="feat" aria-labelledby={`p-${p.slug}`}>
      <div className="feat-info">
        <h3 id={`p-${p.slug}`} className="feat-name">
          {p.name}
        </h3>
        <p className="feat-summary">{p.summary}</p>
        <ul className="feat-points">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p className="feat-stack">
          {p.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
        <Links project={p} />
      </div>
      {p.demo && (
        <figure className="feat-demo" aria-label={`${p.name} in a terminal`}>
          <figcaption className="file-name">{p.demo.title}</figcaption>
          <pre>
            {p.demo.lines.map((l, i) => (
              <span key={i} className={`demo-${l.kind}`}>
                {l.kind === "cmd" && <span className="demo-prompt">$ </span>}
                {l.text}
                {"\n"}
              </span>
            ))}
          </pre>
        </figure>
      )}
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="sec" aria-labelledby="work-title">
      <SectionHead id="work" cmd="projects" title="Work" />
      <div className="feat-list">
        {featuredProjects.map((p) => (
          <Featured key={p.slug} project={p} />
        ))}
      </div>

      <h3 className="more-title">More projects</h3>
      <ul className="more">
        {otherProjects.map((p) => (
          <li key={p.slug}>
            <details className="more-row">
              <summary>
                <span className="more-name">{p.name}</span>
                <span className="more-summary">{p.summary}</span>
                <span className="more-stack">{p.stack.slice(0, 3).join(", ")}</span>
                <span className="more-year">{p.year}</span>
              </summary>
              <div className="more-detail">
                {p.highlights.length > 0 && (
                  <ul>
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
                <p className="more-fullstack">Built with {p.stack.join(", ")}.</p>
                <Links project={p} />
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
