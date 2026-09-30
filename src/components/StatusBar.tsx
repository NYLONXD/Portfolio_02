import { useEffect, useState } from "react";
import Palette from "./Palette";
import "../styles/statusbar.css";

const windows = [
  { id: "top", label: "~" },
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "stack", label: "stack" },
  { id: "log", label: "log" },
  { id: "contact", label: "contact" },
];

const delhiTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

/** Navigation styled as a tmux status line: the section you're reading is the active window. */
export default function StatusBar() {
  const [active, setActive] = useState("top");
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    windows.forEach((w) => {
      const el = document.getElementById(w.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tick = () => setTime(delhiTime());
    tick();
    const timer = window.setInterval(tick, 20_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="statusbar">
      <a className="statusbar-session" href="#top">
        [nylonxd]
      </a>
      <nav aria-label="Sections">
        <ol className="statusbar-windows">
          {windows.map((w, i) => (
            <li key={w.id}>
              <a href={`#${w.id}`} aria-current={active === w.id ? "location" : undefined}>
                <span className="statusbar-index">{i}:</span>
                {w.label}
                <span className="statusbar-flag" aria-hidden="true">
                  {active === w.id ? "*" : ""}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="statusbar-right">
        <Palette />
        <span className="statusbar-clock" title="Local time in New Delhi">
          {time ? `Delhi ${time}` : "Delhi --:--"}
        </span>
      </div>
    </header>
  );
}
