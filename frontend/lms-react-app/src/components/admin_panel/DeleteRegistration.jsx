import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/deleteRegistration.css"; // Import your CSS file

const DeleteRegistration = ({ loggedInUserRole, adminUserName }) => {
  const [userName, setUserName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e, field) => {
    if (field === "userName") setUserName(e.target.value);
    if (field === "courseCode") setCourseCode(e.target.value);
  };

  const handleDeleteRegistration = async (e) => {
    e.preventDefault();

    if (!userName || !courseCode || !role) {
      setError("All fields (User Name, Course Code, and Role) are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const checkResponse = await axios.get(
        `http://localhost:8080/api/courseRegistrations/exists/${userName}/${courseCode}`
      );

      if (checkResponse.data) {
        // Check if the response is true
        const deleteResponse = await axios.delete(
          `http://localhost:8080/api/courseRegistrations/${userName}/${role}/${courseCode}`
        );

        if (deleteResponse.status === 200 || deleteResponse.status === 204) {
          // 204 No Content is also a success code
          toast.success("Registration deleted successfully.", {
            className: "custom-toast",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          try {
            await axios.post("http://localhost:8080/api/adminHistory", null, {
              params: {
                userName: adminUserName,
                role: loggedInUserRole,
                action: `Deleted registration : '${userName}' with course '${courseCode}' successfully!`,
              },
            });
          } catch (historyError) {
            console.error("Error updating admin history:", historyError);
            toast.error(
              "Failed to update admin history. Please contact admin.",
              {
                className: "custom-toast",
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }

          setUserName("");
          setCourseCode("");
        } else {
          toast.error(
            `Failed to delete registration. Status: ${deleteResponse.status}`,
            {
              className: "custom-toast",
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      } else {
        toast.error("Registration not found.", {
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
    } catch (err) {
      console.error("Error deleting registration:", err);
      toast.error("An error occurred while deleting the registration.", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="deleteRegistration-table">
        <h2>Delete Registration</h2>
        <form onSubmit={handleDeleteRegistration}>
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
                      placeholder="Enter user name"
                      value={userName}
                      onChange={(e) => handleInputChange(e, "userName")}
                      disabled={loading}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Course Code:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g., COSC 1234"
                      value={courseCode}
                      onChange={(e) => handleInputChange(e, "courseCode")}
                      disabled={loading}
                      required
                    />
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
                      disabled={loading}
                      required
                    >
                      <option value="student">Student</option>
                      <option value="lecturer">Lecturer</option>
                    </select>
                  </td>
                </tr>
                {error && (
                  <tr>
                    <td colSpan={2}>
                      <div style={{ color: "red" }}>{error}</div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={2} id="submit-button">
                    <button type="submit" disabled={loading}>
                      {loading ? "Deleting..." : "Delete Registration"}
                    </button>
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

export default DeleteRegistration;
