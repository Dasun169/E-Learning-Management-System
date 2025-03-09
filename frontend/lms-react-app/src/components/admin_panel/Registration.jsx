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
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidContactNumber = (contactNumber) => {
    const contactNumberRegex = /^[0-9]{10}$/;
    return contactNumberRegex.test(contactNumber);
  };

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

        setUserName("");
        setPassword("");
        setFullName("");
        setContactNumber("");
        setEmail("");
        setProfileImage(null);
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
                    <label>Email:</label>
                  </td>
                  <td>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g: johndoe@example.com"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} id="submit-button">
                    <button type="submit">Update Admin</button>
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
