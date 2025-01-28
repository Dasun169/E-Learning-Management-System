import "./css files/course_page.css";
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/Header.jsx";
import CourseBody from "./course_body.jsx";
import Footer from "../footer/Footer.jsx";

const CoursePage = () => {
  const location = useLocation(); // Get location object
  const { userName, courseCode, courseName, role } = location.state || {}; // Extract role

  return (
    <div className="course-enrollment-container">
      <Header />
      <CourseBody
        userName={userName}
        courseCode={courseCode}
        courseName={courseName}
        role={role} // Pass role to CourseBody
      />
      <Footer />
    </div>
  );
};

export default CoursePage;
