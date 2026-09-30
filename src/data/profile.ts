export const profile = {
  name: "Himanshu Jha",
  handle: "nylonxd",
  role: "Backend-first full-stack developer",
  lede: "I build command-line tools, real-time systems, and software that keeps secrets secret.",
  location: "New Delhi, India",
  email: "himanshujha202005@gmail.com",
  resume: "/Himanshu_Jha_Resume.pdf",
  githubJoined: "2023-11-20",
  status: "Open to backend internships",
  bio: [
    "I'm Himanshu, a developer who likes the parts of software most people never see: the API behind the live map, the key exchange behind the sync, the one command that replaces a page of setup steps.",
    "Lately that's meant EnvByte, an end-to-end encrypted .env manager written in Rust where the server never holds a key it can open; TrackEdge, a multi-tenant logistics platform that streams driver GPS over WebSockets; and beam, a Python CLI on PyPI that moves a whole project to another laptop with one command.",
    "I studied Computer Applications at Lovely Professional University (class of 2026, CGPA 8.0), reached the finals of Smart India Hackathon 2025, and keep my problem-solving sharp on LeetCode. Right now I'm learning Go and distributed systems.",
  ],
  facts: [
    { key: "Focus", value: "Real-time systems, security, dev tooling" },
    { key: "Hackathon", value: "Smart India Hackathon 2025 finalist" },
    { key: "LeetCode", value: "200+ problems, 1500+ contest rating" },
    { key: "Learning", value: "Go, distributed systems" },
  ],
};

export type Photo = { file: string; src: string; alt: string };

/** Files live in public/photos as <src>-480.webp and <src>-800.webp, cropped to 4:5. */
export const photos: Photo[] = [
  {
    file: "himanshu.jpg",
    src: "/photos/himanshu",
    alt: "Himanshu Jha smiling at the camera, wearing glasses, a white shirt and a blue tie",
  },
  {
    file: "night-out.jpg",
    src: "/photos/night-out",
    alt: "Himanshu Jha on a lit street at night in a denim shirt, looking off to the side",
  },
];

export const findPhoto = (file: string) => photos.find((p) => p.file === file);

export type Link = { label: string; href: string; cmd: string };

export const links: Link[] = [
  { label: "GitHub", href: "https://github.com/NYLONXD", cmd: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/himanshu-jha-nylonxd",
    cmd: "linkedin",
  },
  { label: "X", href: "https://x.com/Nylonxd", cmd: "x" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/himanshu_igl/",
    cmd: "instagram",
  },
];
