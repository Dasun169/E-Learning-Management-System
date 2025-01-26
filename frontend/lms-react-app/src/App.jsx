import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home_page/Home";
import Registration from "./components/registration_page/Registration";
import Admin from "./components/admin_panel/Admin";
import StudentHome from "./components/student_home/StudentHome";
import FullEnrollment from "./components/course_enrollment/FullEnrollment";
import CoursePage from "./components/course_page/course_page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/FullEnrollment" element={<FullEnrollment />} />
        <Route path="/" element={<CoursePage />} />
      </Routes>
    </Router>
  );
}

export default App;
