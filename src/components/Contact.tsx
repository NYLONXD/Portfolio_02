import { useState } from "react";
import { links, profile } from "../data/profile";
import SectionHead from "./SectionHead";
import "../styles/contact.css";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="sec contact" aria-labelledby="contact-title">
      <SectionHead id="contact" cmd="contact" title="Contact" />
      <p className="contact-lede">
        I'm looking for backend internships and I'm happy to talk about Rust, real-time systems or
        anything I've built. Email is the fastest way to reach me.
      </p>
      <div className="contact-mail">
        <a href={`mailto:${profile.email}`} className="contact-address">
          {profile.email.replace(/@.*/, "")}
          <wbr />
          {profile.email.replace(/^[^@]*/, "")}
        </a>
        <button type="button" className="btn btn-ghost" onClick={copy}>
          {copied ? "Copied" : "Copy address"}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Email address copied" : ""}
        </span>
      </div>
      <ul className="contact-links">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Résumé (PDF)
          </a>
        </li>
      </ul>
    </section>
  );
}
