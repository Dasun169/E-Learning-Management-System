import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home_page/Home";
import Registration from "./components/registration_page/Registration";
import Admin from "./components/admin_panel/Admin";
import StudentHome from "./components/student_home/StudentHome";
import FullEnrollment from "./components/course_enrollment/FullEnrollment";
import CoursePage from "./components/course_page/course_page";
import HomePageInside from "./components/home_page_inside/home_page_inside";
import StatCs from "./components/home_page_inside_1/STAT_CS";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/FullEnrollment" element={<FullEnrollment />} />
        <Route path="/CoursePage" element={<CoursePage />} />
        <Route path="/HomePageInside" element={<HomePageInside />} />
        <Route path="/" element={<StatCs />} />
      </Routes>
    </Router>
  );
}

export default App;
