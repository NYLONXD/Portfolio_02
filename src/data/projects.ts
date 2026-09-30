export type ProjectLink = { label: string; href: string };

export type DemoLine = { kind: "cmd" | "out" | "note"; text: string };

export interface Project {
  slug: string;
  name: string;
  summary: string;
  year: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
  featured?: boolean;
  /** Lines shown in the project's terminal pane. Taken from the project's own README. */
  demo?: { title: string; lines: DemoLine[] };
}

const gh = (repo: string) => `https://github.com/NYLONXD/${repo}`;

export const projects: Project[] = [
  {
    slug: "envbyte",
    name: "EnvByte",
    summary:
      "End-to-end encrypted .env manager for teams. Secrets are encrypted on your machine, so the server only ever stores ciphertext it can't open.",
    year: "2026",
    stack: ["Rust", "Axum", "PostgreSQL", "Docker"],
    highlights: [
      "Each member holds an X25519 identity key; the project key is sealed to each of them and files are encrypted with AES-256-GCM",
      "Offboarding is one command: envbyte rotate mints a new key, re-encrypts every file and seals it only to people who remain",
      "Versioned history with rollback, owner/admin/member/viewer roles, single-use invites and a per-project audit log",
      "Prebuilt binaries for Linux, macOS and Windows, each checked against a published SHA-256 before install",
    ],
    links: [
      { label: "live site", href: "https://envbyte.trackedge.in" },
      { label: "source", href: gh("EnvByte_CLI") },
    ],
    featured: true,
    demo: {
      title: "envbyte",
      lines: [
        { kind: "cmd", text: "curl -fsSL https://envbyte.trackedge.in/install.sh | sh" },
        { kind: "cmd", text: "envbyte register" },
        { kind: "cmd", text: "envbyte create my-application" },
        { kind: "cmd", text: 'envbyte push --file .env --message "initial config"' },
        { kind: "note", text: "# encrypted locally, only ciphertext leaves the laptop" },
        { kind: "cmd", text: "envbyte rotate" },
        { kind: "note", text: "# new key, sealed only to members who remain" },
      ],
    },
  },
  {
    slug: "trackedge",
    name: "TrackEdge",
    summary:
      "Multi-tenant logistics platform. Shops create shipments, drivers stream live GPS, and customers follow the delivery on a map without signing up.",
    year: "2025",
    stack: ["React", "Express", "MongoDB", "Redis", "Socket.IO", "Mapbox"],
    highlights: [
      "Driver locations are pushed over Socket.IO to every open tracking page in real time",
      "Road-aware ETAs from the Mapbox Directions API instead of straight-line guesses",
      "Redis caches tracking data for 30 seconds and shipment lists for 5 minutes",
      "Each shop gets an isolated workspace with admin, driver and customer roles, invite links and email OTP",
    ],
    links: [
      { label: "live site", href: "https://trackedge.in" },
      { label: "source", href: gh("Live_supply_tracker") },
    ],
    featured: true,
    demo: {
      title: "trackedge — how a delivery flows",
      lines: [
        { kind: "out", text: "admin    registers shop, invites drivers" },
        { kind: "out", text: "   │     creates shipment (Places + Directions)" },
        { kind: "out", text: "   ▼" },
        { kind: "out", text: "driver   accepts invite, gets assigned" },
        { kind: "out", text: "   │     shares live GPS over Socket.IO" },
        { kind: "out", text: "   ▼" },
        { kind: "out", text: "customer opens /track/:id, sees map + ETA" },
        { kind: "note", text: "# no account needed to track" },
      ],
    },
  },
  {
    slug: "beam",
    name: "beam",
    summary:
      "Send a whole project to someone else's laptop from the terminal. Upload, walk away, and they pick it up with a code whenever they like.",
    year: "2026",
    stack: ["Python", "CLI", "Cloudflare Workers", "R2"],
    highlights: [
      "Leaves out node_modules, virtualenvs, Rust's target/ and other rebuildable folders with no ignore file to write",
      "Encrypts the zip, tries a chain of free hosts, and falls through when one is down",
      "Optional self-hosted relay on Cloudflare Workers with a TTL and burn-after-read",
      "--lan hands files straight across the local network with no upload and no size limit",
    ],
    links: [
      { label: "pypi", href: "https://pypi.org/project/beam-lan/" },
      { label: "source", href: gh("beam") },
    ],
    featured: true,
    demo: {
      title: "beam",
      lines: [
        { kind: "cmd", text: "beam send D:/projects/my_app" },
        { kind: "out", text: "  left out : frontend/node_modules  1.2 GB" },
        { kind: "out", text: "             backend/.venv          310.4 MB" },
        { kind: "out", text: "  start    : backend   Python -> app.py" },
        { kind: "out", text: "             frontend  Node -> npm run dev" },
        { kind: "out", text: "  code : xEGsg-gbDICMBKMQ69BmvI" },
        { kind: "note", text: "# on the other laptop, any time later" },
        { kind: "cmd", text: "beam receive xEGsg-gbDICMBKMQ69BmvI" },
      ],
    },
  },
  {
    slug: "qr-attendance",
    name: "QR Attendance",
    summary:
      "Take attendance with an existing Google Form without ever sharing its link. Students scan a QR code that changes every 15 seconds.",
    year: "2026",
    stack: ["NestJS", "React", "PostgreSQL", "Redis", "Docker"],
    highlights: [
      "The form URL stays on the server; the QR only holds a short-lived gateway link",
      "Tokens come from crypto.randomBytes(32), live 15 seconds in Redis and are checked server-side",
      "Students reach the form only after redeeming a one-time grant",
    ],
    links: [
      { label: "live site", href: "https://qr-generator-iota-pearl.vercel.app" },
      { label: "source", href: gh("QR_generator") },
    ],
  },
  {
    slug: "medvault",
    name: "MedVault",
    summary:
      "Medical-records API for hospitals, doctors and patients, with private file storage and an audit trail.",
    year: "2026",
    stack: ["FastAPI", "PostgreSQL", "Cloudinary"],
    highlights: [
      "Cookie-based JWT auth with patient, doctor, admin and hospital-admin roles",
      "Reports are stored as authenticated Cloudinary assets instead of public URLs, with checksums and audit logs",
      "Upload pipeline detects PDF, image, DICOM and structured inputs and queues the right processing job",
    ],
    links: [{ label: "source", href: gh("MediVeria_Backend") }],
  },
  {
    slug: "secureprint",
    name: "SecurePrint",
    summary:
      "Print Aadhaar, PAN or bank statements at a cyber café without leaving a copy behind on the shop's computer.",
    year: "2026",
    stack: ["React", "Express", "Web Crypto"],
    highlights: [
      "The browser encrypts the file before upload; the shop only gets a one-time print session",
      "Each shop has its own QR code, and the encrypted file is deleted after printing or when the session expires",
    ],
    links: [{ label: "source", href: gh("SecurePrint") }],
  },
  {
    slug: "kmrl",
    name: "KMRL document system",
    summary:
      "Smart India Hackathon 2025 finalist project: upload, read and search large volumes of documents for Kochi Metro.",
    year: "2025",
    stack: ["FastAPI", "NLP", "PostgreSQL", "Redis", "AWS"],
    highlights: [
      "Document reading and analysis pipeline that makes uploaded files searchable",
      "Live processing status in the UI while documents are uploaded and analysed",
    ],
    links: [
      { label: "backend", href: gh("KMRLSIH_Backend") },
      { label: "nlp", href: gh("KMRLSIH_NLP") },
    ],
  },
  {
    slug: "newslens",
    name: "NewsLens",
    summary:
      'Search news by meaning instead of keywords, so "heart attack prevention" finds "Reducing cardiovascular risk".',
    year: "2026",
    stack: ["FastAPI", "Sentence Transformers", "Vector DB", "Docker"],
    highlights: [
      "Articles become 384-dimension embeddings with all-MiniLM-L6-v2",
      "Queries are matched by cosine similarity over an HNSW index",
    ],
    links: [{ label: "source", href: gh("newslens-semantic-search") }],
  },
  {
    slug: "screenshare",
    name: "Screenshare",
    summary: "Remote screen sharing and control in the browser.",
    year: "2026",
    stack: ["NestJS", "Socket.IO"],
    highlights: [],
    links: [{ label: "source", href: gh("screenshare") }],
  },
  {
    slug: "morse-chat",
    name: "Morse Code Chat",
    summary: "A chat app where you and your friends talk in Morse code.",
    year: "2026",
    stack: ["Expo", "TypeScript", "Socket.IO"],
    highlights: ["Real-time messaging between phones over Socket.IO"],
    links: [
      { label: "app", href: gh("Morse-Code-Chat-Frontend") },
      { label: "server", href: gh("Morse-Code-Chat-backend") },
    ],
  },
  {
    slug: "book-exchange",
    name: "Book Exchange",
    summary: "An app for trading books directly with other readers.",
    year: "2025",
    stack: ["Angular", "Ionic", "Node.js"],
    highlights: [],
    links: [
      { label: "app", href: gh("Decentralized_Book_Exchange") },
      { label: "server", href: gh("Decentralized_Book_Exchange_backend") },
    ],
  },
  {
    slug: "travel-planner",
    name: "Travel Planner",
    summary: "Plan trips, manage itineraries and keep track of what the trip costs.",
    year: "2025",
    stack: ["React", "Express", "MongoDB"],
    highlights: [
      "Itinerary management and destination search",
      "REST API on Express with MongoDB storage",
    ],
    links: [{ label: "source", href: gh("Travel-Planner01") }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export const findProject = (query: string) => {
  const q = query.toLowerCase().replace(/\s+/g, "-");
  return projects.find(
    (p) => p.slug === q || p.name.toLowerCase().replace(/\s+/g, "-") === q
  );
};
