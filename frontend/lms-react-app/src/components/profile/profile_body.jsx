import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./css files/profile_body.css";

function ProfileBody() {
  const location = useLocation();
  const { username, role } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "S.T.D Madhuksha",
    fullName: "Adhalisla.aihd",
    email: "Adhalisla.aihd@gmail.com",
    contact: "992688585",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };
  return (
    <div className="inside7">
      <div className="inside-inside7">
        <div className="profile-section7">
          <img
            src="./Images/ProPic.png"
            alt="Profile Icon"
            className="profile-img7"
          />
          <h2>S.T.D Madhuksha</h2>
        </div>
        <div className="edit-section7">
          <button className="edit-btn7" onClick={toggleEdit}>
            {isEditing ? "Save" : "Edit Profile"}
          </button>

          <h3>Edit Profile</h3>
          <form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={isEditing ? formData.username : ""}
              placeholder={!isEditing ? formData.username : ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={isEditing ? formData.password : ""}
              placeholder={!isEditing ? "********" : ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={isEditing ? formData.fullName : ""}
              placeholder={!isEditing ? formData.fullName : ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={isEditing ? formData.email : ""}
              placeholder={!isEditing ? formData.email : ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={isEditing ? formData.contact : ""}
              placeholder={!isEditing ? formData.contact : ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;
