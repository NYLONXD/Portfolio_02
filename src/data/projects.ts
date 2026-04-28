export interface Project {
  id: number;
  title: string;
  category: string;
  techStack: string;
  description: string;
  image: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Live Supply Tracker",
    category: "Full Stack Web App",
    techStack: "MongoDB, Express.js, React, Node.js",
    description:
      "Real-time supply chain tracking platform with live updates, route visualization, and delivery status monitoring.",
    image: "/images/project1.png",
    link: "https://trackedg.in",
  },
  {
    id: 2,
    title: "KRML Backend",
    category: "Backend API",
    techStack: "Python, FastAPI, PostgreSQL",
    description:
      "High-performance backend service for managing and organizing documents with fast search and retrieval capabilities.",
    image: "/images/project2.png",
    link: "https://github.com/NYLONXD/KMRLSIH_Backend"
  },

  {
    id: 3,
    title: "Travel Planner",
    category: "Full Stack Web App",
    techStack: "MERN STACK",
    description: "A web application for planning and organizing travel itineraries.",
    image: "/images/project1.png",
    link: "https://github.com/NYLONXD/travel-planner",
  },
  {
    id: 4,
    title: "HubToTransit",
    category: "Mobile Application",
    techStack: "ReactNative, Node.js, Kafka, Socket.IO, AWS",
    description: "A Deilvery App with real-time updates, route. For every vehical",
    image: "/images/HubToTransit.png",
    link: "https://github.com/NYLONXD/HubToTransit_app",
  },
  
];

export default projects;
