import React from "react";
import "./css files/profile_body.css";

function ProfileBody() {
  return (
    <div className="inside">
        <div className="inside-inside">
            <div className="profile-section">
            <img src="./Images/ProPic.png" alt="Profile Icon" className="profile-img" />
            <h2>Dilshan Madhuksha</h2>
            <nav>
                <a href="#">Your Courses</a>
                <a href="#">Course Enrollment</a>
                <a href="#">Course Result</a>
            </nav>
            </div>

        </div>
    </div>
  );
}

export default ProfileBody;
