import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css files/GetAllCourses.css"; // Ensure this CSS file is updated as provided

const GetAllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

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
      <h2>Course Details</h2>
      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="course-card" key={course.id}>
              <div className="course-row">
                <p>
                  <strong>Course ID:</strong> {course.id}
                </p>
                <p>
                  <strong>Course Code:</strong> {course.courseCode}
                </p>
                <p>
                  <strong>Course Name:</strong> {course.courseName}
                </p>
                <p>
                  <strong>Lecturer ID:</strong> {course.lecturerId}
                </p>
                <p>
                  <strong>Year Level:</strong> {course.yearLevel}
                </p>
                <p>
                  <strong>Enrollment Key:</strong> {course.enrollmentKey}
                </p>
              </div>
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
