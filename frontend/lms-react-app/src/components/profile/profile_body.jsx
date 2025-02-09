import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/profile_body.css";

function ProfileBody({ username, role }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    contactNumber: "",
  }); // Removed password field as it's not being updated here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username && role) {
      fetchUserData();
    }
  }, [username, role]);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/role/${role}/userName/${username}`
      );
      if (!response.ok) {
        const errorData = await response.json(); // Try to get error message from server
        const errorMessage =
          errorData?.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setUserData(data);
      setFormData({
        username: data.userName,
        fullName: data.fullName,
        email: data.email,
        contactNumber: data.contactNumber,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message); // Set the actual error message
      toast.error(error.message); // Display the error message in the toast
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing); // Simplified toggle
    if (isEditing) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/update?userName=${formData.username}&role=${role}&fullName=${formData.fullName}&contactNumber=${formData.contactNumber}&email=${formData.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.message || "Failed to update profile.";
        toast.error(errorMessage);
        return;
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      fetchUserData(); // Refresh user data after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile.");
    }
  };

  // ... rest of your component code (loading, error handling, JSX)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!userData) {
    return <div>User data not available.</div>;
  }

  return (
    // ... your JSX ...
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
            {isEditing ? "Save" : "Edit Profile"}
          </button>

          <h3>Edit Profile</h3>
          <form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={isEditing ? formData.username : userData?.userName || ""}
              placeholder={userData?.userName || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={isEditing ? formData.fullName : userData?.fullName || ""}
              placeholder={userData?.fullName || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={isEditing ? formData.email : userData?.email || ""}
              placeholder={userData?.email || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
            <label>Contact</label>
            <input
              type="text"
              name="contactNumber"
              value={
                isEditing
                  ? formData.contactNumber
                  : userData?.contactNumber || ""
              }
              placeholder={userData?.contactNumber || ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
            {isEditing && (
              <button type="submit" className="edit-btn7">
                Save Changes
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;
