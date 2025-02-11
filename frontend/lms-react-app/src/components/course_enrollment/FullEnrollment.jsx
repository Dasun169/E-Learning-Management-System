import Header from "../headerHome/HeaderHome";
import Footer from "../footer/Footer";
import Enrollment from "./enrollment";
import "./css files/fullEnrollment.css";
import { useLocation } from "react-router-dom";

function FullEnrollment() {
  const location = useLocation();
  const { userName, role, courseName, courseCode, yearLevel } =
    location.state || {};

  return (
    <div>
      <Header username={userName} role={role} />
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
