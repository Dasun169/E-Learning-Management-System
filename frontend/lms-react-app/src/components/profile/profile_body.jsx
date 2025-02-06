import React, { useState } from "react";
import "./css files/profile_body.css";

function ProfileBody() {
            const [isEditing, setIsEditing] = useState(false);
            const [formData, setFormData] = useState({
                username: "S.T.D Madhuksha",
                password: "@^#&%@&@",
                fullName: "Adhalisla.aihd",
                email: "Adhalisla.aihd@gmail.com",
                contact: "992688585"
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
            <button className="edit-btn" onClick={toggleEdit}>
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

                {isEditing && <button type="submit">Save Changes</button>}
            </form>
            </div>

        </div>
    </div>
  );
}

export default ProfileBody;
