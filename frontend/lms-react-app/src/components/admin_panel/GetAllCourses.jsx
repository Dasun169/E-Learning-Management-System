import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css files/GetAllCourses.css"; // Assuming you have a separate CSS file for styling

const GetAllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/courses");
        setCourses(response.data);
      } catch (err) {
        setError("Error fetching courses.");
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="courses-container">
      {error && <div className="error-message">{error}</div>}
      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="course-card" key={course.id}>
              <table className="course-table1">
                <tbody>
                  {/* First row with 3 columns */}
                  <tr className="course-row">
                    <td className="course-detail">
                      <strong>Course ID:</strong> {course.id}
                    </td>
                    <td className="course-detail">
                      <strong>Course Code:</strong> {course.courseCode}
                    </td>
                    <td className="course-detail">
                      <strong>Course Name:</strong> {course.courseName}
                    </td>
                  </tr>
                  {/* Second row with the remaining 3 columns */}
                  <tr className="course-row">
                    <td className="course-detail">
                      <strong>Lecturer ID:</strong> {course.lecturerId}
                    </td>
                    <td className="course-detail">
                      <strong>Year Level:</strong> {course.yearLevel}
                    </td>
                    <td className="course-detail">
                      <strong>Enrollment Key:</strong> {course.enrollmentKey}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default GetAllCourse;
