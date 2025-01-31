import React from "react";
import "./css files/MATHS_body.css";

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

const backgroundImages = [
  "https://th.bing.com/th/id/OIP.4n767ii5z9sdzFjJNEm7vgHaHa?rs=1&pid=ImgDetMain",
  "https://img.freepik.com/free-vector/simple-pattern-background_1319-147.jpg",
  "https://static.vecteezy.com/system/resources/previews/002/176/171/original/cute-floral-pattern-background-simple-pattern-design-template-vector.jpg",
  "https://th.bing.com/th/id/OIP.Ybs87k7UWtZDnz8hRYqwGQHaHa?rs=1&pid=ImgDetMain",
  "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/abstract-vector-seamless-pattern-mosaic-of-wire-hexagons-outlines-on-white-background-simple-retro-design-wallpaper-petr-polak.jpg",
  "https://th.bing.com/th/id/OIP.brTqKF0p32qzlFtU6gMdswHaEU?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.i476LXnXmnnqH-bMoNF67gHaEK?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.5kgX68tPcDwHccBbonGfkAHaHq?rs=1&pid=ImgDetMain",
  "https://static.vecteezy.com/system/resources/previews/000/365/303/original/cubes-retro-pattern-vector.jpg",
];

const Maths = ({ userName }) => {
  return (
    <div className="dashboard2">
      <section className="course-overview2">
        <h2>Course Enrollment - {userName}</h2> {/* Display username */}
        <div className="search-sort2">
          <input type="text" placeholder="Search Courses" />
          <select>
            <option>Level I</option>
            <option>Level II</option>
            <option>Level III</option>
            <option>Level IV</option>
          </select>
          <select>
            <option>PMAT</option>
            <option>AMAT</option>
          </select>
        </div>
        <div className="courses2">
          {courses.map((course, index) => {
            const imageIndex = index % backgroundImages.length;
            return (
              <div key={index} className="course-card2">
                <div
                  className="course-thumbnail2"
                  style={{
                    backgroundImage: `url(${backgroundImages[imageIndex]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="course-info2">
                  <h3>{course.code}</h3>
                  <p>{course.name}</p>
                  <span>{course.level}</span>
                </div>
                <button className="enrllment2">
                  <img src="./Images/lock.png" alt="lock" />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Maths;