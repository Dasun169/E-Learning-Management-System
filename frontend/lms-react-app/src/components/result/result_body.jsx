import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css files/result_body.css";

const ResultBody = () => {
  const location = useLocation();
  const { username } = location.state || {};
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:8080/api/users/${username}`)
        .then((response) => response.json())
        .then((data) => setFullName(data.fullName))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [username]);

  const [courses, setCourses] = useState([{ code: "", name: "", grade: "" }]);

  const handleEdit = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const [selectedYear, setSelectedYear] = useState("Year 1");

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="inside">
      <h2>Student Results</h2>
      <div className="inside-inside">
        <div className="student-info">
          <p>
            <b>Student Full Name:</b> <span>{fullName}</span>
          </p>
          <p>
            <b>Student User Name:</b> <span>{username}</span>
          </p>
        </div>

        <div className="main-content">
          <div className="result-container">
            <table className="result-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td id="courseCode"></td>
                    <td id="courseName"></td>
                    <td id="grade"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultBody;
