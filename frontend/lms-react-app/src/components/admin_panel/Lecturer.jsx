import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/lecturer.css";

const Lecturer = ({ loggedInUserRole, username }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [role, setRole] = useState("lecturer");

  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFullNameValid, setIsFullNameValid] = useState(false);
  const [isContactNumberValid, setIsContactNumberValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const checkUserNameExists = async (userName) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userName}`
      );
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidFullName = (fullName) => {
    const fullNameRegex = /^[a-zA-Z\s\-']+$/;
    return fullNameRegex.test(fullName);
  };

  // Contact number validation
  const isValidContactNumber = (number) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(number);
  };

  const isValidPassword = (password) => {
    return password.length > 8; // More than 8 characters
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Invalid email format.", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!isValidContactNumber(contactNumber)) {
      toast.error("Contact number must be exactly 10 digits.", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const isUserNameExist = await checkUserNameExists(userName);
    if (isUserNameExist) {
      toast.error("The User Name already exists", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const currentDate = new Date();

    const userData = {
      userName,
      hashPassword: password,
      fullName,
      contactNumber,
      email,
      profileImage: null,
      createdDate: currentDate.toISOString(),
      updatedDate: currentDate.toISOString(),
      role: role,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("User added successfully!", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUserName("");
        setPassword("");
        setFullName("");
        setContactNumber("");
        setEmail("");
        setProfileImage(null);
      } else {
        toast.error("Failed to add user.", {
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
      console.error("Error registering user:", error);
      toast.error("Failed to add user.", {
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

  // Handle input changes
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setIsUserNameValid(e.target.value.trim() !== "");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(isValidPassword(e.target.value));
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setIsFullNameValid(isValidFullName(e.target.value)); // Validate on change
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
    setIsContactNumberValid(isValidContactNumber(e.target.value));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(isValidEmail(e.target.value));
  };

  // Render dropdown options based on logged-in user's role
  const renderRoleOptions = () => {
    if (loggedInUserRole === "administrator") {
      return (
        <>
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
          <option value="administrator">Administrator</option>
          <option value="admin">Admin</option>
        </>
      );
    } else if (loggedInUserRole === "admin") {
      return (
        <>
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <ToastContainer />
      <div className="lecturer-table">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="div-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>User Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={userName}
                      onChange={handleUserNameChange}
                      placeholder="e.g: jhond20133"
                    />
                    {isUserNameValid ? (
                      <span className="span-right"> ✅</span>
                    ) : (
                      <span className="span-right"> ❌</span> // Show cross if invalid
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Password:</label>
                  </td>
                  <td>
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="e.g: ABCabc123!@#"
                    />
                    {isPasswordValid ? (
                      <span className="span-right"> ✅</span>
                    ) : (
                      <span className="span-right"> ❌</span> // Show cross if invalid
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Role:</label>
                  </td>
                  <td>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      {renderRoleOptions()}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Full Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={fullName}
                      onChange={handleFullNameChange}
                      placeholder="e.g: John Doe"
                    />
                    {isFullNameValid ? (
                      <span className="span-right"> ✅</span>
                    ) : (
                      <span className="span-right"> ❌</span> // Show cross if invalid
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Contact Number:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={contactNumber}
                      onChange={handleContactNumberChange}
                      placeholder="e.g: 0123456789"
                    />
                    {isContactNumberValid ? (
                      <span className="span-right"> ✅</span>
                    ) : (
                      <span className="span-right"> ❌</span> // Show cross if invalid
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Email:</label>
                  </td>
                  <td>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="e.g: johndoe@example.com"
                    />
                    {isEmailValid ? (
                      <span className="span-right"> ✅</span>
                    ) : (
                      <span className="span-right"> ❌</span> // Show cross if invalid
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} id="submit-button">
                    <button type="submit">Add a User</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
};

export default Lecturer;
