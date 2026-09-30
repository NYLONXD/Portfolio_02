import { ReactNode } from "react";
import { findPhoto, links, photos, profile } from "../data/profile";
import { findProject, projects } from "../data/projects";
import { getPrefs, setCrt, setTheme, themeInfo, themes, Theme } from "../lib/prefs";
import {
  ContactCard,
  Ext,
  Finger,
  GitLog,
  Neofetch,
  PhotoOutput,
  ProjectDetail,
  ProjectList,
} from "./outputs";
import { Cmd } from "./TerminalProvider";

export type SectionId = "top" | "about" | "work" | "stack" | "log" | "contact";

export type Ctx = {
  navigate: (id: SectionId) => void;
  open: (url: string) => void;
  clear: () => void;
  closeConsole: () => void;
  history: () => string[];
};

type Command = {
  name: string;
  aliases?: string[];
  usage?: string;
  summary?: string; // commands without one are easter eggs and stay out of `help`
  args?: () => string[];
  run: (args: string[], ctx: Ctx) => ReactNode | null;
};

const sections: Record<string, SectionId> = {
  "~": "top",
  "/": "top",
  "..": "top",
  about: "about",
  work: "work",
  projects: "work",
  stack: "stack",
  log: "log",
  experience: "log",
  contact: "contact",
};

const files = ["plan.txt", "resume.pdf", ...photos.map((p) => p.file)];

const error = (text: ReactNode) => <span className="t-err">{text}</span>;

const openTargets = () => [...projects.map((p) => p.slug), ...links.map((l) => l.cmd), "resume"];

const commands: Command[] = [
  {
    name: "help",
    summary: "list what this terminal can do",
    run: () => (
      <div className="t-block">
        <ul className="t-list t-help">
          {commands
            .filter((c) => c.summary)
            .map((c) => (
              <li key={c.name}>
                <span>
                  <Cmd cmd={c.name} />
                  {c.usage && <span className="t-dim"> {c.usage}</span>}
                </span>
                <span className="t-dim">{c.summary}</span>
              </li>
            ))}
        </ul>
        <p className="t-dim">
          Tab completes, ↑ and ↓ walk your history. Press ` or Ctrl+K anywhere on the page to
          open this console.
        </p>
      </div>
    ),
  },
  {
    name: "about",
    summary: "who I am, in three paragraphs",
    run: () => (
      <div className="t-block">
        {profile.bio.map((para) => (
          <p key={para.slice(0, 16)}>{para}</p>
        ))}
      </div>
    ),
  },
  {
    name: "projects",
    aliases: ["work"],
    summary: "everything I've built",
    run: () => <ProjectList />,
  },
  {
    name: "project",
    usage: "<name>",
    summary: "details and links for one project",
    args: () => projects.map((p) => p.slug),
    run: ([name]) => {
      if (!name) return <ProjectList />;
      const p = findProject(name);
      if (!p) {
        return error(
          <>
            project: no project called "{name}". Run <Cmd cmd="projects" /> to see them all.
          </>
        );
      }
      return <ProjectDetail project={p} />;
    },
  },
  {
    name: "stack",
    aliases: ["neofetch", "skills"],
    summary: "languages and tools I use",
    run: () => <Neofetch />,
  },
  {
    name: "log",
    aliases: ["experience", "career"],
    summary: "my path so far, newest first",
    run: () => <GitLog />,
  },
  {
    name: "git",
    args: () => ["log", "status"],
    run: ([sub]) => {
      if (sub === "log") return <GitLog />;
      if (sub === "status") {
        return (
          <span>
            On branch main. {profile.status}; run <Cmd cmd="contact" /> to talk.
          </span>
        );
      }
      return error("git: only `git log` and `git status` work here.");
    },
  },
  {
    name: "contact",
    summary: "email and socials",
    run: () => <ContactCard />,
  },
  {
    name: "resume",
    aliases: ["cv"],
    summary: "open my résumé (PDF)",
    run: (_, ctx) => {
      ctx.open(profile.resume);
      return <span className="t-dim">Opening Himanshu_Jha_Resume.pdf in a new tab.</span>;
    },
  },
  {
    name: "email",
    aliases: ["mail"],
    run: () => {
      window.location.href = `mailto:${profile.email}`;
      return <span className="t-dim">Opening your mail app to write to {profile.email}.</span>;
    },
  },
  {
    name: "open",
    usage: "<name>",
    summary: "open a project, github, linkedin or x in a new tab",
    args: openTargets,
    run: ([target], ctx) => {
      if (!target) return error("open: name a project or profile, for example: open envbyte");
      const project = findProject(target);
      const link = links.find((l) => l.cmd === target.toLowerCase());
      const url =
        project?.links[0].href ??
        link?.href ??
        (target.toLowerCase() === "resume" ? profile.resume : undefined);
      if (!url) {
        return error(
          <>
            open: nothing called "{target}". Try one of: {openTargets().slice(0, 6).join(", ")}
          </>
        );
      }
      ctx.open(url);
      return <span className="t-dim">Opened {url}</span>;
    },
  },
  {
    name: "cd",
    usage: "<section>",
    summary: "jump to a section of the page",
    args: () => ["about", "work", "stack", "log", "contact", "~"],
    run: ([dir = "~"], ctx) => {
      const id = sections[dir.replace(/\/$/, "").replace(/^~\//, "")];
      if (!id) {
        return error(<>cd: no such section: {dir}. Sections: about, work, stack, log, contact</>);
      }
      ctx.navigate(id);
      return null;
    },
  },
  {
    name: "ls",
    run: () => (
      <ul className="t-inline">
        {["about", "work", "stack", "log", "contact"].map((d) => (
          <li key={d}>
            <Cmd cmd={`cd ${d}`}>{d}/</Cmd>
          </li>
        ))}
        {files.map((f) => (
          <li key={f}>
            <Cmd cmd={`cat ${f}`}>{f}</Cmd>
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: "cat",
    args: () => files,
    run: ([file], ctx) => {
      if (file === "plan.txt") return <Finger />;
      const photo = findPhoto(file ?? "");
      if (photo) return <PhotoOutput photo={photo} />;
      if (file === "resume.pdf") {
        ctx.open(profile.resume);
        return <span className="t-dim">resume.pdf is a PDF, so it opens in a new tab instead.</span>;
      }
      return error(`cat: ${file ?? ""}: No such file. Files here: ${files.join(", ")}`);
    },
  },
  {
    name: "theme",
    usage: "[name]",
    summary: "switch the screen color (run it alone to list them)",
    args: () => [...themes],
    run: ([name]) => {
      if (!name) {
        const { theme } = getPrefs();
        return (
          <ul className="t-list">
            {themes.map((t) => (
              <li key={t}>
                <Cmd cmd={`theme ${t}`}>{t}</Cmd>
                <span className="t-dim">
                  {themeInfo[t]}
                  {t === theme && " (current)"}
                </span>
              </li>
            ))}
          </ul>
        );
      }
      if (!(themes as readonly string[]).includes(name)) {
        return error(`theme: unknown theme "${name}". Choose one of: ${themes.join(", ")}.`);
      }
      setTheme(name as Theme);
      return <span className="t-dim">Theme set to {name}.</span>;
    },
  },
  {
    name: "crt",
    usage: "[on|off]",
    summary: "turn the scanlines and glow on or off",
    args: () => ["on", "off"],
    run: ([mode]) => {
      const on = mode ? mode === "on" : !getPrefs().crt;
      setCrt(on);
      return <span className="t-dim">CRT effect {on ? "on" : "off"}.</span>;
    },
  },
  {
    name: "clear",
    aliases: ["cls"],
    summary: "clear the screen",
    run: (_, ctx) => {
      ctx.clear();
      return null;
    },
  },
  { name: "finger", args: () => ["himanshu"], run: () => <Finger /> },
  {
    name: "whoami",
    run: () => (
      <span>
        guest <span className="t-dim">(I'm himanshu. Try</span> <Cmd cmd="finger himanshu" />
        <span className="t-dim">)</span>
      </span>
    ),
  },
  {
    name: "history",
    run: (_, ctx) => (
      <ol className="t-history">
        {ctx.history().map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ol>
    ),
  },
  { name: "date", run: () => new Date().toString() },
  { name: "echo", run: (args) => args.join(" ") },
  { name: "pwd", run: () => "/home/guest" },
  { name: "github", run: (_, ctx) => openLink("github", ctx) },
  { name: "linkedin", run: (_, ctx) => openLink("linkedin", ctx) },
  { name: "x", aliases: ["twitter"], run: (_, ctx) => openLink("x", ctx) },
  { name: "instagram", run: (_, ctx) => openLink("instagram", ctx) },
  {
    name: "sudo",
    run: () => error("guest is not in the sudoers file. This incident will be reported."),
  },
  {
    name: "rm",
    run: (args) =>
      error(args.some((a) => a.startsWith("-") && a.includes("r")) ? "rm: nice try." : "rm: permission denied"),
  },
  {
    name: "exit",
    aliases: ["logout", "quit"],
    run: (_, ctx) => {
      ctx.closeConsole();
      return <span className="t-dim">There's no leaving, but <Cmd cmd="contact" /> gets you to me.</span>;
    },
  },
  {
    name: "vim",
    aliases: ["vi", "nano", "emacs"],
    run: () => <span className="t-dim">Editors are disabled here. The source is on <Ext href="https://github.com/NYLONXD/Portfolio_02">GitHub</Ext>.</span>,
  },
];

function openLink(cmd: string, ctx: Ctx) {
  const link = links.find((l) => l.cmd === cmd)!;
  ctx.open(link.href);
  return <span className="t-dim">Opened {link.href}</span>;
}

const lookup = new Map<string, Command>();
for (const c of commands) {
  lookup.set(c.name, c);
  c.aliases?.forEach((a) => lookup.set(a, c));
}

/** Split on spaces, keeping "quoted strings" together. */
function tokenize(input: string) {
  return [...input.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map((m) => m[1] ?? m[2] ?? m[3]);
}

export function execute(input: string, ctx: Ctx): ReactNode | null {
  const [name, ...args] = tokenize(input.trim());
  if (!name) return null;
  const command = lookup.get(name.toLowerCase());
  if (!command) {
    return error(
      <>
        command not found: {name}. Run <Cmd cmd="help" /> for the list.
      </>
    );
  }
  return command.run(args, ctx);
}

/** Tab completion: returns the completed input, or the candidates when it's ambiguous. */
export function complete(input: string): { value: string; options: string[] } {
  const endsWithSpace = /\s$/.test(input);
  const parts = tokenize(input);
  const completingCommand = parts.length <= 1 && !endsWithSpace;
  const partial = endsWithSpace ? "" : (parts[parts.length - 1] ?? "");
  const pool = completingCommand
    ? [...lookup.keys()]
    : (lookup.get(parts[0]?.toLowerCase() ?? "")?.args?.() ?? []);
  const options = pool.filter((o) => o.startsWith(partial.toLowerCase())).sort();
  if (options.length === 0) return { value: input, options: [] };

  const prefix = options.reduce((acc, o) => {
    let i = 0;
    while (i < acc.length && acc[i] === o[i]) i++;
    return acc.slice(0, i);
  });
  const head = endsWithSpace ? input : input.slice(0, input.length - partial.length);
  const value = head + prefix + (options.length === 1 ? " " : "");
  return { value, options: options.length > 1 ? options : [] };
}
