import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/deleteCourse.css"; // Assuming this CSS file styles your component

const DeleteCourse = () => {
  const [courseCode, setCourseCode] = useState(""); // State to hold the courseCode input value
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(""); // To handle error messages
  const [message, setMessage] = useState(""); // To display success or failure messages

  // Handle input change for courseCode
  const handleInputChange = (e) => {
    setCourseCode(e.target.value);
  };

  // Function to check if the course exists and then delete it
  const handleDeleteCourse = async (e) => {
    e.preventDefault(); // Prevent form default action (refresh)

    // Validate input
    if (!courseCode) {
      setError("Course Code is required.");
      return;
    }

    setLoading(true); // Set loading to true before the request
    setError(""); // Clear any previous errors
    setMessage(""); // Clear any previous success message

    try {
      // First, check if the course exists by courseCode
      const checkResponse = await axios.get(
        `http://localhost:8080/api/courses/exists/${courseCode}`
      );

      if (checkResponse.status === 200) {
        // If the course exists, proceed with deletion
        const deleteResponse = await axios.delete(
          `http://localhost:8080/api/courses/delete/${courseCode}`
        );

        if (deleteResponse.status === 200) {
          // Show success toast on successful deletion
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

          //setMessage("Course deleted successfully.");
          setCourseCode(""); // Clear the input field after successful deletion
        }
      }
    } catch (err) {
      // Handle errors such as course not found or unable to delete
      if (err.response && err.response.status === 404) {
        //setError(`Error: Course with code ${courseCode} not found.`);
      } else {
        //setError("Error: Unable to delete the course.");
      }
      setMessage(""); // Clear any previous success message

      // Show error toast
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
      setLoading(false); // Set loading to false after the request finishes
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
                      disabled={loading} // Disable input while loading
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
