import React, { useState } from "react";
import "./css files/deleteCourse.css";

const DeleteCourse = () => {
  const [courseCode, setCourseCode] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setCourseCode(e.target.value);
  };

  const handleDeleteCourse = async (e) => {
    e.preventDefault();

    if (!courseCode) {
      setMessage("Course Code is required!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/courses/delete/${courseCode}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setMessage(
          `Course with code ${courseCode} has been deleted successfully.`
        );
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage || "Failed to delete the course.");
      }
    } catch (error) {
      setMessage("An error occurred while deleting the course.");
    }
  };

  return (
    <div className="deleteCourse-table">
      <h2>Delete Course Account</h2>
      <form onSubmit={handleDeleteCourse}>
        <div className="div-table">
          <table>
            <tr>
              <td>
                <label>Course Code:</label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="ex: COSC 1234"
                  value={courseCode}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} id="submit-button">
                <button type="submit">Submit</button>
              </td>
            </tr>
          </table>
        </div>
      </form>
      {message && <p>{message}</p>} {/* Display the message */}
    </div>
  );
};

export default DeleteCourse;
