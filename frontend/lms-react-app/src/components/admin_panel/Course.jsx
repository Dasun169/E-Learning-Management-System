import React, { useState } from "react";
import axios from "axios";
import "./css files/course.css";

const Course = () => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [lecturerId, setLecturerId] = useState("");
  const [description, setDescription] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [enrollmentKey, setEnrollmentKey] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      courseName,
      courseCode,
      lecturerId,
      description,
      yearLevel,
      enrollmentKey,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/courses",
        courseData
      );

      if (response.status === 200 || response.status === 201) {
        setMessage("Course added successfully!");
      } else {
        setMessage("Failed to add course.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      setMessage("Error: Failed to add course.");
    }
  };

  return (
    <div className="course-table">
      <h2>Course Registration</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Course Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="ex: Machine Learning"
                />
              </td>
              <td>
                <label>Course Code:</label>
              </td>
              <td>
                <input
                  type="text"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="ex: COSC 1234"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Lecturer Id:</label>
              </td>
              <td>
                <input
                  type="text"
                  value={lecturerId}
                  onChange={(e) => setLecturerId(e.target.value)}
                  placeholder="ex: 001"
                />
              </td>
              <td>
                <label>Description:</label>
              </td>
              <td>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ex: Machine learning is the..."
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Year Level:</label>
              </td>
              <td>
                <input
                  type="text"
                  value={yearLevel}
                  onChange={(e) => setYearLevel(e.target.value)}
                  placeholder="ex: 2"
                />
              </td>
              <td>
                <label>Enrollment Key:</label>
              </td>
              <td>
                <input
                  type="text"
                  value={enrollmentKey}
                  onChange={(e) => setEnrollmentKey(e.target.value)}
                  placeholder="ex: COSC1234"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={4} id="submit-button">
                <button type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Course;
