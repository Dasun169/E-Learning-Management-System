import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/deleteCourse.css";

const DeleteCourse = ({ loggedInUserRole, adminUserName }) => {
  const [courseCode, setCourseCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setCourseCode(e.target.value);
  };

  const handleDeleteCourse = async (e) => {
    e.preventDefault();

    
    if (!courseCode) {
      setError("Course Code is required.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const checkResponse = await axios.get(
        `http://localhost:8080/api/courses/exists/${courseCode}`
      );

      if (checkResponse.status === 200) {
        const deleteResponse = await axios.delete(
          `http://localhost:8080/api/courses/delete/${courseCode}`
        );

        if (deleteResponse.status === 200) {
          toast.success("Course deleted successfully.", {
            className: "custom-toast",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setCourseCode("");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
       
      } else {
        
      }
      setMessage("");

      
      toast.error(error || "Error: Unable to delete the course.", {
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
      <div className="deleteCourse-table">
        <h2>Delete Course</h2>
        <form onSubmit={handleDeleteCourse}>
          <div className="div-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Course Code:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g., COSC 1234"
                      value={courseCode}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </td>
                </tr>
                {error && (
                  <tr>
                    <td colSpan={2}>
                      <div style={{ color: "red" }}>{error}</div>
                    </td>
                  </tr>
                )}
                {message && (
                  <tr>
                    <td colSpan={2}>
                      <div style={{ color: "green" }}>{message}</div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={2} id="submit-button">
                    <button type="submit">Delete Course</button>
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

export default DeleteCourse;
