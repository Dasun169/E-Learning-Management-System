import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home_page/Home";
import Registration from "./components/registration_page/Registration";
import Admin from "./components/admin_panel/Admin";
import StudentHome from "./components/student_home/StudentHome";
import FullEnrollment from "./components/course_enrollment/FullEnrollment";
import CoursePage from "./components/course_page/course_page";
import HomePageInside from "./components/home_page_inside/home_page_inside";
import StatCsNew from "./components/Home_page_inside_1/STAT_CS";
import ElecPhyNew from "./components/Home_page_inside_1/ELEC_PHY";
import MathsNew from "./components/Home_page_inside_1/MATHS";
import ChemNew from "./components/Home_page_inside_1/CHEM_New";
import ZoolNew from "./components/Home_page_inside_1/ZOOL";
import MicroNew from "./components/Home_page_inside_1/MICRO";
import SENew from "./components/Home_page_inside_1/SE";
import SportsNew from "./components/Home_page_inside_1/SPORT";
import IM from "./components/Home_page_inside_1/IM";
import ResultPage from "./components/result/result";
import AdminResult from "./components/admin_result/AdminResult";
import Profile from "./components/profile/profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/FullEnrollment" element={<FullEnrollment />} />
        <Route path="/CoursePage" element={<CoursePage />} />
        <Route path="/HomePageInside" element={<HomePageInside />} />
        <Route path="/ElecPhyNew" element={<ElecPhyNew />} />
        <Route path="/StatCsNew" element={<StatCsNew />} />
        <Route path="/MathsNew" element={<MathsNew />} />
        <Route path="/ChemNew" element={<ChemNew />} />
        <Route path="/ZoolNew" element={<ZoolNew />} />
        <Route path="/MicroNew" element={<MicroNew />} />
        <Route path="/SENew" element={<SENew />} />
        <Route path="/SportsNew" element={<SportsNew />} />
        <Route path="/IM" element={<IM />} />
        <Route path="/ResultPage" element={<ResultPage />} />
        <Route path="/AdminResult" element={<AdminResult />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
