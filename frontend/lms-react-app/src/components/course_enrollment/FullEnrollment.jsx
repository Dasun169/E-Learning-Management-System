import Header from "../header/Header";
import Footer from "../footer/Footer";
import Enrollment from "./enrollment";
import "./css files/fullEnrollment.css";
import { useLocation } from "react-router-dom";

function FullEnrollment() {
  const location = useLocation();
  const { userName, courseName, courseCode, yearLevel } = location.state || {};

  return (
    <div>
      <Header />
      <Enrollment
        userName={userName}
        courseName={courseName}
        courseCode={courseCode}
        yearLevel={yearLevel}
      />
      <Footer />
    </div>
  );
}

export default FullEnrollment;
