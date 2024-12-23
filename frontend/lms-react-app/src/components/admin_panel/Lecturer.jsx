import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/lecturer.css";

const Lecturer = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Keep the state, but will pass null

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect user data and manually set the role as "lecturer"
    const userData = {
      userName,
      hashPassword: password,
      fullName,
      contactNumber,
      profileImage: null, // Always send null for profileImage
      createdDate: new Date(), // Current timestamp for createdDate
      updatedDate: new Date(), // Current timestamp for updatedDate
      role: "lecturer", // Manually set the role to "lecturer"
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
        toast.success("Lecturer added successfully!", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Reset form fields after submission
        setUserName("");
        setPassword("");
        setFullName("");
        setContactNumber("");
        setProfileImage(null); // Clear the profile image state
      } else {
        toast.error("Failed to add lecturer.", {
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
      console.error("Error registering lecturer:", error);
      toast.error("Failed to add lecturer.", {
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
      <div className="lecturer-table">
        <h2>Lecturer Registration</h2>
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
                      placeholder="ex: jhond20133"
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
                      placeholder="ex: ABCabc123!@#"
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
                      placeholder="ex: John Doe"
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
                      placeholder="ex: 07########"
                    />
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <label>Profile Picture:</label>
                  </td>
                  <td>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfileImage(null)} // Keep profileImage as null
                    />
                  </td>
                </tr> */}
                <tr>
                  <td colSpan={2} id="submit-button">
                    <button type="submit">Submit</button>
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
