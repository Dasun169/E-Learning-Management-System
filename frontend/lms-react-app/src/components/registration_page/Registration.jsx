import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/Registration.css";

function Registration() {
  // Define state variables for the form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Profile image will be null

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current date for createdDate and updatedDate
    const currentDate = new Date();

    // Create the user data object
    const userData = {
      userName,
      hashPassword: password,
      fullName,
      contactNumber,
      profileImage: null, // Profile image is set to null
      createdDate: currentDate.toISOString(), // Send current date as createdDate
      updatedDate: currentDate.toISOString(), // Send current date as updatedDate
      role: "student", // Role is set as "student"
    };

    try {
      // Send the data to the backend (assuming POST method is set up at /api/users)
      const response = await axios.post(
        "http://localhost:8080/api/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json", // Send data as JSON
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        // Handle success with toast notification
        toast.success("Student registered successfully!", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Reset form fields after successful submission
        setUserName("");
        setPassword("");
        setFullName("");
        setContactNumber("");
        setProfileImage(null); // Clear the profile image state
      } else {
        // Handle failure with toast notification
        toast.error("Failed to register student.", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error during student registration:", error);
      toast.error("Failed to register student.", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="body">
        <div className="image-section">
          <img src="./Images/registration/pic.png" alt="Student" />
        </div>
        <div className="form-section">
          <div className="form-container">
            <h2>Student Registration</h2>
            <form onSubmit={handleSubmit}>
              <label className="label-text">User Name:</label>
              <input
                className="input-field"
                type="text"
                placeholder="e.g: jhond20133"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <label className="label-text">Password:</label>
              <input
                className="input-field"
                type="password"
                placeholder="e.g: ABCabc123!@#"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label-text">Full Name:</label>
              <input
                className="input-field"
                type="text"
                placeholder="e.g: John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <label className="label-text">Contact Number:</label>
              <input
                className="input-field"
                type="text"
                placeholder="e.g: 0123456789"
                required
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />

              <button className="submit-button" type="submit">
                Register Student
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;