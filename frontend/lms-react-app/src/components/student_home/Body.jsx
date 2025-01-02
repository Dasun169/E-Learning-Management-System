import React from "react";
import "./css files/body.css";

const courses = [
  {
    code: "COSC 32133/BECS 32263",
    name: "Full-Stack Software Development (22/23)",
    level: "Level III",
  },
  {
    code: "PMAT 32322",
    name: "Mathematical Methods (22/23)",
    level: "Level III",
  },
  {
    code: "STAT 32672",
    name: "Non-parametric Statistics (22/23)",
    level: "Level III",
  },
  {
    code: "STAT 32682",
    name: "Statistical Simulations (22/23)",
    level: "Level III",
  },
];

const Body = () => {
  return (
    <div className="dashboard"> 
      <header className="body-header">
        <h1>
          Hi, PS/2020/020 - MADHUKSHA S.T.D.! <span>👋</span>
        </h1>
      </header>

      <section className="course-overview">
        <h2>Course Overview</h2>
        <div className="search-sort">
          <button>All</button>
          <input type="text" placeholder="Search" />
          <select>
            <option>Sort by last accessed</option>
          </select>
        </div>
        <div className="courses">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <div className="course-thumbnail"></div>
              <div className="course-info">
                <h3>{course.code}</h3>
                <p>{course.name}</p>
                <span>{course.level}</span>
              </div>
              <button className="more-options">⋮</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Body;
