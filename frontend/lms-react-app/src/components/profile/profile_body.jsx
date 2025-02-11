import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/profile_body.css";

function ProfileBody({ username, role }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [originalUserData, setOriginalUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    contactNumber: "",
    hashPassword: "",
  });
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
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();

      setUserData(data);
      setOriginalUserData(data);
      setFormData({
        username: data.userName,
        fullName: data.fullName,
        email: data.email,
        contactNumber: data.contactNumber,
        hashPassword: data.hashPassword,
      });
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/update?userName=${formData.username}` +
          `&role=${role}` +
          `&hashPassword=${formData.hashPassword}` +
          `&fullName=${formData.fullName}` +
          `&email=${formData.email}` +
          `&contactNumber=${formData.contactNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      toast.success("Profile updated successfully!", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        setIsEditing(false);
        fetchUserData();
      }, 200);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="inside7">
      <div className="inside-inside7">
        <div className="profile-section7">
          <img
            src="./Images/ProPic.png"
            alt="Profile"
            className="profile-img7"
          />
          <h3>User Name : {formData.username}</h3>
          <h3>Full Name : {formData.fullName}</h3>
        </div>

        <div className="edit-section7">
          <button
            className="edit-btn7"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                readOnly={!isEditing}
              />
              <label>Password</label>
              <input
                type="password"
                name="hashPassword"
                value={formData.hashPassword}
                onChange={handleChange}
                readOnly={!isEditing}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly={!isEditing}
              />
              <label>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            {isEditing && (
              <button type="submit" className="save-btn7">
                Save Changes
              </button>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProfileBody;
