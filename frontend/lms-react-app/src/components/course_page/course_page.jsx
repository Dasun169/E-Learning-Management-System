import "./css files/course_page.css";

import Header from "../header/Header.jsx";
import CourseBody from "./course_body.jsx";
import Footer from "../footer/Footer.jsx";

const CoursePage = () => {
  return (
    <div className="course-enrollment-container">
      <Header />
      <CourseBody />
      <Footer />
    </div>
  
  );
};

export default CoursePage;
