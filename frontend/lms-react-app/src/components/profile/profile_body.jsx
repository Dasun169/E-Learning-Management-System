import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs"; // Import bcryptjs
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
    hashPassword: "", // Hashed password from the backend
  });
  const [plainPassword, setPlainPassword] = useState(""); // Plain text password for editing
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFullNameValid, setIsFullNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isContactNumberValid, setIsContactNumberValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const isValidFullName = (fullName) => {
    const fullNameRegex = /^[a-zA-Z\s\-']+$/;
    return fullNameRegex.test(fullName);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidContactNumber = (number) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(number);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

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
        hashPassword: data.hashPassword, // Hashed password from the backend
      });
      setPlainPassword(data.hashPassword); // Set hashed password as plain text for editing
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "hashPassword") {
      // Update plain text password for editing
      setPlainPassword(value);
      setIsPasswordValid(isValidPassword(value));
    } else {
      setFormData({ ...formData, [name]: value });

      // Real-time validation
      switch (name) {
        case "fullName":
          setIsFullNameValid(isValidFullName(value));
          break;
        case "email":
          setIsEmailValid(isValidEmail(value));
          break;
        case "contactNumber":
          setIsContactNumberValid(isValidContactNumber(value));
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isFullNameValid ||
      !isEmailValid ||
      !isContactNumberValid ||
      !isPasswordValid
    ) {
      toast.error("Please correct the invalid fields.");
      return;
    }

    try {
      // Hash the new password before sending it to the backend
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

      const response = await fetch(
        `http://localhost:8080/api/users/update?userName=${formData.username}` +
          `&role=${role}` +
          `&hashPassword=${hashedPassword}` + // Send the hashed password
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
        fetchUserData(); // Refresh user data
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
              <div className="input-with-validation">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
                {isEditing && (
                  <span className="validation-icon">
                    {isFullNameValid ? "✅" : "❌"}
                  </span>
                )}
              </div>

              <label>Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  name="hashPassword"
                  value={plainPassword} // Display hashed password as plain text
                  onChange={handleChange}
                  readOnly={!isEditing}
                  placeholder="Enter new password"
                />
                {isEditing && (
                  <button
                    type="button"
                    className="toggle-password-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                )}
              </div>

              <label>Email</label>
              <div className="input-with-validation">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
                {isEditing && (
                  <span className="validation-icon">
                    {isEmailValid ? "✅" : "❌"}
                  </span>
                )}
              </div>

              <label>Contact Number</label>
              <div className="input-with-validation">
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
                {isEditing && (
                  <span className="validation-icon">
                    {isContactNumberValid ? "✅" : "❌"}
                  </span>
                )}
              </div>
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
