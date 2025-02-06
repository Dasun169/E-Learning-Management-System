import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./css files/profile_body.css";

function ProfileBody() {
  const location = useLocation();
  const { username, role } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username && role) {
      setLoading(true);
      setError(null);

      fetch(`http://localhost:8080/api/users/role/${role}/userName/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          setFormData({
            username: data.userName,
            fullName: data.fullName,
            email: data.email,
            contactNumber: data.contactNumber,
            password: "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Error fetching user data.");
        })
        .finally(() => setLoading(false));
    }
  }, [username, role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/update?userName=${formData.username}&role=${role}&fullName=${formData.fullName}&contactNumber=${formData.contactNumber}&email=${formData.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // No body needed for this API, data is sent as query parameters
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update successful, refresh user data
      fetch(`http://localhost:8080/api/users/role/${role}/userName/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          setFormData({
            // Update form data with new API values
            username: data.userName,
            fullName: data.fullName,
            email: data.email,
            contactNumber: data.contactNumber,
            password: "", // Password should not be retrieved or pre-filled
          });
        })
        .catch((error) => {
          console.error("Error fetching updated user data:", error);
          setError("Error fetching updated user data.");
        });

      setIsEditing(false); // Close edit mode
      alert("Profile updated successfully!"); // Or a toast notification
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile."); // Set error message to display
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Display error message
  }

  if (!userData) {
    return <div>User data not available.</div>; // Handle cases where userData is still null
  }

  return (
    <div className="inside7">
      <div className="inside-inside7">
        <div className="profile-section7">
          <img
            src="./Images/ProPic.png"
            alt="Profile Icon"
            className="profile-img7"
          />
          <h2>{userData.fullName}</h2>
        </div>
        <div className="edit-section7">
          <button className="edit-btn7" onClick={toggleEdit}>
            {isEditing ? "Edit Profile" : "Edit Profile"}
          </button>

          <h3>Edit Profile</h3>
          <form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={isEditing ? formData.username : userData.userName} // Use userData for display
              placeholder={userData.userName} // Use userData for placeholder
              onChange={handleChange}
              readOnly={!isEditing}
            />
            {/* <label>Password</label>
            <input
              type="password"
              name="password"
              value={isEditing ? formData.password : ""} // Password not displayed or pre-filled
              placeholder="********"
              onChange={handleChange}
              readOnly={!isEditing}
            /> */}
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={isEditing ? formData.fullName : userData.fullName}
              placeholder={userData.fullName}
              onChange={handleChange}
              readOnly={!isEditing}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={isEditing ? formData.email : userData.email}
              placeholder={userData.email}
              onChange={handleChange}
              readOnly={!isEditing}
            />
            <label>Contact</label>
            <input
              type="text"
              name="contactNumber" // Match backend parameter name
              value={
                isEditing ? formData.contactNumber : userData.contactNumber
              }
              placeholder={userData.contactNumber}
              onChange={handleChange}
              readOnly={!isEditing}
            />
            {isEditing && (
              <button type="submit" className="edit-btn7">
                Save Changes
              </button>
            )}{" "}
            {/* Conditionally render save button */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;
