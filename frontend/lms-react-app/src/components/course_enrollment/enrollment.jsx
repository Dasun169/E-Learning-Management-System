import "./css files/enrollment.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Enrollment({ userName, courseName, courseCode, yearLevel }) {
  const [lecturerName, setLecturerName] = useState("Loading...");
  const role = "lecturer";

  useEffect(() => {
    const fetchLecturerName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/courseRegistrations/single/${courseCode}/${role}`
        );

        if (response.status === 200 && response.data) {
          setLecturerName(response.data);
        } else {
          setLecturerName("Lecturer name not found");
          console.error("Could not retrieve lecturer name.");
        }
      } catch (error) {
        console.error("Error fetching lecturer name:", error);
        setLecturerName("Error loading lecturer name");
      }
    };

    if (courseCode) {
      fetchLecturerName();
    }
  }, [courseCode]);

  return (
    <div className="course-enrollment5">
      <h1>
        {courseCode} - {courseName}
      </h1>
      <section className="body5">
        <div className="left5">
          <h2>Enrolment options</h2>
          <div className="lecture5">
            <h3>Lecturer's Name: {lecturerName}</h3>{" "}
            {/* Display the fetched name */}
          </div>
          <div className="link5">
            <a href="#">
              {courseCode} - {courseName}
            </a>
          </div>
        </div>

        <div className="right5">
          <div className="title5">
            <h3>Self Enrolment (Student)</h3>
          </div>
          <div className="enrollment-option5">
            <h4>Enrolment key</h4>
            <input type="text" />
            <button>Enrol Me</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Enrollment;
