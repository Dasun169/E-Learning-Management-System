import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./headerHome.css";

const HeaderHome = ({ username, role }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);
  const logoRef = useRef(null);

  const goToHomePageInside = () => {
    navigate("/HomePageInside", { state: { username, role } });
    setShowDropdown(false);
  };

  const goToLoginPage = () => {
    navigate("/");
    setShowDropdown(false);
  };

  const goToResultPage = () => {
    navigate("/ResultPage", { state: { username, role } });
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const updateProfile = () => {
    navigate("/Profile", { state: { username, role } });
    setShowDropdown(false);
  };

  const goToStudentHome = () => {
    navigate("/studentHome", { state: { username, role, fromHeader: true } });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!profileIconRef.current ||
          !profileIconRef.current.contains(event.target))
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="navbar">
      <div
        className="navbar-logo1"
        onClick={goToStudentHome}
        ref={logoRef}
        style={{ cursor: "pointer" }}
      >
        <img
          className="navbar-logo1-img"
          src="./Images/studentHome/logoWithText.png"
          alt="logo"
        />
      </div>

      {role === "student" && (
        <div className="navbar-links">
          <button className="nav-button" onClick={goToStudentHome}>
            Home Page
          </button>
          <button className="nav-button" onClick={goToHomePageInside}>
            Course Enrollment
          </button>
          <button className="nav-button" onClick={goToResultPage}>
            See Courses Results
          </button>
        </div>
      )}

      <div
        className="profile-icon"
        onClick={toggleDropdown}
        ref={profileIconRef}
      >
        <img
          src="./Images/ProPic.png"
          alt="Profile Icon"
          className="profile-img1"
        />
        {showDropdown && (
          <div className="dropdown" ref={dropdownRef}>
            <ul>
              <li onClick={updateProfile}>Update Profile</li>
              {role === "student" && (
                <>
                  <li onClick={goToHomePageInside}>Course Enrollment</li>
                  <li onClick={goToResultPage}>See Results</li>
                </>
              )}
              <li onClick={goToLoginPage}>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HeaderHome;
