import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/Registration.css";

function Registration() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState(""); // Added state for email
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState(""); // New email state

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

  const handleSubmit = async (e) => {
    e.preventDefault();
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    const currentDate = new Date();

    const userData = {
      userName,
      hashPassword: password,
      fullName,
      contactNumber,
      email, // Added email to userData
      profileImage: null,
      email, // Include email in the user data
      createdDate: currentDate.toISOString(),
      updatedDate: currentDate.toISOString(),
      role: "student",
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
        toast.success("Student registered successfully!", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Reset form fields
        setUserName("");
        setPassword("");
        setFullName("");
        setContactNumber("");
        setEmail(""); // Clear email field
        setProfileImage(null);
        setEmail(""); // Reset email field
      } else {
        toast.error("Failed to register student.", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
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
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="registration-table">
        <h2>Student Registration</h2>
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
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g: jhond20133"
                    />
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
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="e.g: ABCabc123!@#"
                    />
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
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g: John Doe"
                    />
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
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="e.g: 0123456789"
                    />
                  </td>
                </tr>
                <tr>
                  <td>

                  </td>
                  <td>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} id="submit-button">
                    <button type="submit">Add a Student</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
}

export default Registration;
