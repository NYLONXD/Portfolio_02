import { CSSProperties, useEffect, useRef } from "react";
import { setTheme, Theme, themeInfo, themes, themeSwatch, usePrefs } from "../lib/prefs";

const chip = (t: Theme) => ({ "--chip": themeSwatch[t] }) as CSSProperties;

/**
 * Screen color picker for the status bar. Wide screens show every color as a chip;
 * narrow ones fold them into a menu that opens upward, so the section tabs still fit.
 */
export default function Palette() {
  const { theme } = usePrefs();
  const menu = useRef<HTMLDetailsElement>(null);

  // A <details> menu doesn't close on outside clicks by itself.
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (menu.current?.open && !menu.current.contains(e.target as Node)) menu.current.open = false;
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  const pick = (t: Theme) => {
    setTheme(t);
    if (menu.current) menu.current.open = false;
  };

  return (
    <>
      <div className="palette" role="group" aria-label="Screen color">
        <span className="palette-label" aria-hidden="true">
          color
        </span>
        {themes.map((t) => (
          <button
            key={t}
            type="button"
            className="palette-chip"
            style={chip(t)}
            aria-pressed={t === theme}
            aria-label={`${t}: ${themeInfo[t]}`}
            title={themeInfo[t]}
            onClick={() => pick(t)}
          />
        ))}
      </div>

      <details className="palette-menu" ref={menu}>
        <summary aria-label={`Screen color: ${theme}. Change color`}>
          <span className="palette-chip" style={chip(theme)} aria-hidden="true" />
          {theme}
        </summary>
        <ul>
          {themes.map((t) => (
            <li key={t}>
              <button type="button" aria-pressed={t === theme} onClick={() => pick(t)}>
                <span className="palette-chip" style={chip(t)} aria-hidden="true" />
                {t}
              </button>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
