export interface Commit {
  hash: string;
  date: string;
  /** Conventional-commit style subject line. */
  subject: string;
  body?: string;
  refs?: string;
}

// Newest first, like `git log`.
export const timeline: Commit[] = [
  {
    hash: "a3f9e1c",
    date: "now",
    refs: "HEAD -> main",
    subject: "status: open to backend internships",
    body: "Learning Go and distributed systems. Building EnvByte and beam in the open.",
  },
  {
    hash: "e18b05f",
    date: "Sep 2026",
    subject: "feat: publish beam to PyPI",
    body: "pip install beam-lan, then one command sends a whole project to another laptop.",
  },
  {
    hash: "4b7e0a9",
    date: "Jul 2026",
    subject: "feat: MedVault and SecurePrint, privacy-first backends",
    body: "Role-scoped medical records with audit logs, and printing that never leaves a copy behind.",
  },
  {
    hash: "7c2d4b8",
    date: "May 2026",
    subject: "feat: ship EnvByte, an end-to-end encrypted .env manager in Rust",
    body: "CLI, Axum API and PostgreSQL, with key rotation, audit logs and signed release binaries.",
  },
  {
    hash: "5d6a3e2",
    date: "Sep 2025",
    refs: "tag: sih-2025",
    subject: "feat(sih): Smart India Hackathon 2025 finalist",
    body: "ML-powered document handling system for Kochi Metro, built with FastAPI, NLP and PostgreSQL.",
  },
  {
    hash: "b94c71d",
    date: "Jun 2025",
    subject: "feat: TrackEdge, real-time logistics tracking",
    body: "Live GPS over Socket.IO, Mapbox ETAs and Redis caching on a multi-tenant MERN stack.",
  },
  {
    hash: "0f3e8a6",
    date: "Feb 2025",
    subject: "feat: travel planner; certified in React (Udemy)",
  },
  {
    hash: "c47d29b",
    date: "Jul 2024",
    subject: "work: intern at Sshrishti Trust, New Delhi",
    body: "Baseline surveys, classroom support and documentation at Salarpur Khera, Jai Hind Camp and the head office.",
  },
  {
    hash: "91ab6f0",
    date: "Nov 2023",
    subject: "chore: first commit on GitHub; CS fundamentals certificate",
  },
  {
    hash: "2e5c0d7",
    date: "2023",
    subject: "init: start Computer Applications at Lovely Professional University",
  },
];
