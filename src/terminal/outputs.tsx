import { PhosphorImage } from "../components/Photos";
import { links, Photo, profile } from "../data/profile";
import { Project, projects } from "../data/projects";
import { asciiLogo, stack } from "../data/stack";
import { timeline } from "../data/timeline";
import { setTheme, themeInfo, themes, themeSwatch } from "../lib/prefs";
import { Cmd } from "./TerminalProvider";

export function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^https?:/.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}

export function Neofetch() {
  return (
    <div className="neofetch">
      <pre className="neofetch-logo" aria-hidden="true">
        {asciiLogo.join("\n")}
      </pre>
      <div>
        <dl className="neofetch-info">
          <div className="neofetch-title">
            <dt className="sr-only">user</dt>
            <dd>
              <b>himanshu</b>@<b>nylonxd</b>
            </dd>
          </div>
          {stack.map((row) => (
            <div key={row.key}>
              <dt>{row.key}</dt>
              <dd>{row.items.join(", ")}</dd>
            </div>
          ))}
          <div>
            <dt>Uptime</dt>
            <dd>on GitHub since Nov 2023</dd>
          </div>
        </dl>
        <div className="neofetch-palette" role="group" aria-label="Screen color">
          {themes.map((t) => (
            <button
              key={t}
              type="button"
              style={{ background: themeSwatch[t] }}
              aria-label={`${t}: ${themeInfo[t]}`}
              title={themeInfo[t]}
              onClick={() => setTheme(t)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function GitLog({ limit }: { limit?: number }) {
  const commits = limit ? timeline.slice(0, limit) : timeline;
  return (
    <ol className="gitlog">
      {commits.map((c) => (
        <li key={c.hash}>
          <span className="gitlog-graph" aria-hidden="true" />
          <div className="gitlog-head">
            <span className="gitlog-hash">{c.hash}</span>
            {c.refs && <span className="gitlog-refs">({c.refs})</span>}
            <time className="gitlog-date">{c.date}</time>
          </div>
          <p className="gitlog-subject">
            <span className="gitlog-type">{c.subject.slice(0, c.subject.indexOf(": ") + 1)}</span>{" "}
            {c.subject.slice(c.subject.indexOf(": ") + 2)}
          </p>
          {c.body && <p className="gitlog-body">{c.body}</p>}
        </li>
      ))}
    </ol>
  );
}

export function ProjectList() {
  return (
    <div>
      <ul className="t-list">
        {projects.map((p) => (
          <li key={p.slug}>
            <Cmd cmd={`project ${p.slug}`}>{p.slug}</Cmd>
            <span className="t-dim">{p.summary.split(/(?<=\.)\s/)[0]}</span>
          </li>
        ))}
      </ul>
      <p className="t-dim">
        Pick one for details, or run <Cmd cmd="cd work" /> to see them on the page.
      </p>
    </div>
  );
}

export function ProjectDetail({ project: p }: { project: Project }) {
  return (
    <div className="t-block">
      <p>
        <b className="t-hi">{p.name}</b> <span className="t-dim">({p.year})</span>
      </p>
      <p>{p.summary}</p>
      {p.highlights.length > 0 && (
        <ul className="t-bullets">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      <p className="t-dim">stack: {p.stack.join(", ")}</p>
      <p className="t-links">
        {p.links.map((l) => (
          <Ext key={l.href} href={l.href}>
            [{l.label}]
          </Ext>
        ))}
      </p>
    </div>
  );
}

export function ContactCard() {
  return (
    <div className="t-block">
      <p>
        Email is the fastest way to reach me:{" "}
        <Ext href={`mailto:${profile.email}`}>{profile.email}</Ext>
      </p>
      <ul className="t-list">
        {links.map((l) => (
          <li key={l.href}>
            <span className="t-key">{l.label}</span>
            <Ext href={l.href}>{l.href.replace(/^https:\/\/(www\.)?/, "")}</Ext>
          </li>
        ))}
        <li>
          <span className="t-key">Résumé</span>
          <Ext href={profile.resume}>Himanshu_Jha_Resume.pdf</Ext>
        </li>
      </ul>
    </div>
  );
}

export function Finger() {
  return (
    <div className="t-block">
      <dl className="t-finger">
        <div>
          <dt>Login:</dt>
          <dd>himanshu</dd>
        </div>
        <div>
          <dt>Name:</dt>
          <dd>{profile.name}</dd>
        </div>
        <div>
          <dt>Location:</dt>
          <dd>{profile.location}</dd>
        </div>
        <div>
          <dt>On since:</dt>
          <dd>Nov 2023 on github.com/NYLONXD</dd>
        </div>
        <div>
          <dt>Picture:</dt>
          <dd>
            <Cmd cmd="cat himanshu.jpg">himanshu.jpg</Cmd>
          </dd>
        </div>
      </dl>
      <p>Plan:</p>
      <p className="t-indent">
        {profile.role}. Building EnvByte and beam. {profile.status}.
      </p>
      <p className="t-dim">
        Try <Cmd cmd="about" />, <Cmd cmd="projects" /> or <Cmd cmd="help" />.
      </p>
    </div>
  );
}

export function PhotoOutput({ photo }: { photo: Photo }) {
  return (
    <figure className="t-photo">
      <PhosphorImage photo={photo} sizes="240px" />
      <figcaption>
        {photo.file}. For real color, run <Cmd cmd="cd about" /> and tick [ ] color.
      </figcaption>
    </figure>
  );
}
