
import "./css files/STAT_CS_body.css";

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

const StatCs = () => {
  return (
    <div className="dashboard"> 
      <section className="course-overview">
        <div className="search-sort">
          <input type="text" placeholder="Search Courses" />
          <select>
            <option>Level I</option>
            <option>Level II</option>
            <option>Level III</option>
            <option>Level IV</option>
          </select>
          <select>
            <option>STAT</option>
            <option>COSC</option>
            <option>COST</option>
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
              <button className="enrllment"><img src="./Images/lock.png" alt="lock"/></button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StatCs;