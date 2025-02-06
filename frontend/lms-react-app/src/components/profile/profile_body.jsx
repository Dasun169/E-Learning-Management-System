import React from "react";
import "./css files/profile_body.css";

function ProfileBody() {
  return (
    <div className="inside">
        <div className="inside-inside">
            <div className="profile-section">
                <img src="./Images/ProPic.png" alt="Profile Icon" className="profile-img" />
                <h2>S.T.D Madhuksha</h2>
                <nav>
                    <a href="#">Your Courses</a>
                    <a href="#">Course Enrollment</a>
                    <a href="#">Course Result</a>
                </nav>
            </div>
            <div className="edit-section">
          <h3>Edit Profile</h3>
          <form>
            <label>User Name</label>
            <input type="text" defaultValue="S.T.D Madhuksha" />

            <label>Password</label>
            <input type="password" defaultValue="@^#&%@&@" />

            <label>Full Name</label>
            <input type="text" defaultValue="Adhalisla.aihd" />

            <label>Email</label>
            <input type="email" defaultValue="Adhalisla.aihd@gmail.com" />

            <label>Contact</label>
            <input type="text" defaultValue="992688585" />

            <button type="submit">Edit Profile</button>
            </form>
            </div>

        </div>
    </div>
  );
}

export default ProfileBody;
