import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    id: 1,
    name: "Chat Bot",
    category: "Web Development",
    tools: "HTML,CSS,Js,Python",
    image: "/images/Project3.png",
    link: "https://github.com/NYLONXD/ChatBot", // Website link
  },
  {
    id: 2,

    name: "Travel Planner",
    category: "Full-Stack Development",
    tools: "React, Node.js, Express.js, MongoDB, Bootstrap",
    image: "/images/project1.png",
    link: "https://github.com/NYLONXD/Travel-Planner-01-", // GitHub link
  },
  {
    id: 3,
    name: "Chess",
    category: "Game Development",
    tools: "C++",
    image: "/images/project3.webp",
    link: "https://github.com/NYLONXD/Chess", // GitHub link
  },
  {
    id: 4,
    name: "Fitness & Yoga",
    category: "Web Development",
    tools: "React, Tailwind CSS",
    image: "/images/project4.png",
    link: "https://example.com/fitness-yoga", // Website link
  },
  {
    id: 5,
    name: "Portfolio",
    category: "Web Development",
    tools: "HTML, CSS, JavaScript",
    image: "/images/project5.png",
    link: "https://github.com/NYLONXD/My-Portfolio", // GitHub link
  },
  {
    id: 6,
    name: "MilkZin",
    category: "Full-Stack Development",
    tools: "TypeScript, Tailwind CSS, Express.js",
    image: "/images/project2.png",
    link: "https://github.com/NYLONXD/MilkyWiz", // Website link
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;
    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinType: !ScrollTrigger.isTouch ? "transform" : "fixed",
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      duration: 40,
      delay: 0.2,
    });
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{project.id}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link} // Pass the link to WorkImage
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;