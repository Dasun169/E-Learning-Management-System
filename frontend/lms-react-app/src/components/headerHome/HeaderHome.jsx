import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./headerHome.css";
import HomePageInside from "../home_page_inside/home_page_inside";

const HeaderHome = ({ username, role }) => {
  const navigate = useNavigate();

  const goToHomePageInside = () => {
    navigate("/HomePageInside", { state: { username } });
  };

  const goToResultPage = () => {
    navigate("/ResultPage", { state: { username } });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo1">
        <img
          className="navbar-logo1-img"
          src="./Images/studentHome/logoWithText.png"
          alt="logo"
        />
      </div>

      {role === "student" && (
        <div className="navbar-links">
          <button className="nav-button" onClick={goToHomePageInside}>
            Course Enrollment
          </button>
          <button className="nav-button" onClick={goToResultPage}>
            See Courses Results
          </button>
        </div>
      )}

      <div className="navbar-search">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </nav>
  );
};

export default HeaderHome;
