import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> Achievement
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Certified Learner</h4>
                <h5>Online Platforms(Udemy)</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
            Completed certifications in Python, React.js & CS Fundamentals. Constantly learning and upgrading skills.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack Web Developer (Project-based)</h4>
                <h5>Personal Projects</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
            Developed full-stack apps like a Travel Planner, Fitness & Wellness Tracker using React, Node.js, Express & MongoDB.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Problem Solver & Learner</h4>
                <h5>Lovely Professional University</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
            Built strong foundations in programming, DSA, and full-stack web development. Actively solving problems on LeetCode, Codeforces & building real-world projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
