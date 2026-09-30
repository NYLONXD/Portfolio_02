import { useEffect } from "react";
import { projects } from "../data/projects";
import "../styles/boot.css";

const POST = [
  "NYLONXD BIOS v2.026  (C) 2023-2026 Himanshu Jha",
  "Memory test ........................ 640K OK",
  "Detecting toolchains ..... rust  ts  python  OK",
  `Mounting /home/himanshu/projects ... ${projects.length} found`,
  "Starting postgres, redis, socket.io ....... OK",
  "Login: guest",
];

// Must match the boot-out animation's end in boot.css.
const BOOT_MS = 1150;

/**
 * A power-on self test, played once per browser session. It's plain markup animated by CSS,
 * so it starts with the HTML instead of waiting for JavaScript. The inline script in
 * index.html decides whether it plays at all (first visit this session, motion allowed).
 */
export default function Boot() {
  useEffect(() => {
    const root = document.documentElement;
    const w = window as Window & { __hjBooted?: boolean };

    const finish = () => {
      if (w.__hjBooted) return;
      delete root.dataset.boot;
      w.__hjBooted = true;
      window.dispatchEvent(new Event("hj:booted"));
    };

    if (!root.dataset.boot) {
      finish();
      return;
    }

    const timer = window.setTimeout(finish, Math.max(0, BOOT_MS - performance.now()));
    const skip = () => finish();
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, []);

  return (
    <div className="boot" aria-hidden="true">
      <pre className="boot-text">
        {POST.map((line, i) => (
          <span key={line} style={{ "--i": i } as React.CSSProperties}>
            {line}
            {"\n"}
          </span>
        ))}
      </pre>
    </div>
  );
}
