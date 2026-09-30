# Himanshu Jha — portfolio

A portfolio that works like an old green-phosphor terminal. Every section on the page is the output of a real command, and the terminal in the hero (or the drop-down console, opened with `` ` `` or `Ctrl+K`) can run all of them.

Built with React, TypeScript and Vite. No 3D, no animation libraries: the page is prerendered to static HTML at build time and hydrated by about 60 KB of gzipped JavaScript.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check, build, then prerender into dist/
npm run preview   # serve dist/ at http://localhost:4173
```

## Change the content

Everything you'd want to edit lives in `src/data/`:

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, one-line pitch, bio paragraphs, email, social links, résumé path |
| `projects.ts` | Projects. `featured: true` puts one in the big panels with a terminal demo |
| `timeline.ts` | The career log shown as `git log`, newest first |
| `stack.ts` | The `neofetch` rows and the ASCII logo |

The résumé is `public/Himanshu_Jha_Resume.pdf`. Replace the file and keep the name.

## Terminal commands

`help`, `about`, `projects`, `project <name>`, `stack`, `log`, `contact`, `resume`, `open <name>`, `cd <section>`, `theme [green|amber|cyan|white|red|paper]`, `crt [on|off]`, `clear`, plus a few easter eggs. Commands are defined in `src/terminal/commands.tsx`.

## How it's put together

- `index.html` has a tiny inline script that restores the saved theme before first paint and decides whether the boot screen plays (once per session, never with reduced motion).
- `scripts/prerender.mjs` renders the app with `react-dom/server` and writes the HTML into `dist/index.html`; `src/main.tsx` hydrates it.
- Themes are CSS variables in `src/styles/global.css`: `green` (default), `amber`, `cyan`, `white`, `red` and `paper` (green-bar printout). Visitors pick one from the color chips in the bottom bar; to add a theme, add a block there and its name in `src/lib/prefs.ts` and `index.html`.
