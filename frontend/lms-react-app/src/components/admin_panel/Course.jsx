import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/course.css";

const Course = () => {
  const [id, setId] = useState(""); // State for ID
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [lecturerId, setLecturerId] = useState("");
  const [description, setDescription] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [enrollmentKey, setEnrollmentKey] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      id: parseInt(id),
      courseName,
      courseCode,
      lecturerId: parseInt(lecturerId),
      description,
      yearLevel,
      enrollmentKey,
    };

    console.log(courseData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/courses",
        courseData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Course added successfully!", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setId("");
        setCourseName("");
        setCourseCode("");
        setLecturerId("");
        setDescription("");
        setYearLevel("");
        setEnrollmentKey("");
      } else {
        toast.error("Failed to add course.", {
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
      console.error("Error adding course:", error);
      toast.error("Error: Failed to add course.", {
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
      <div className="course-table">
        <ToastContainer />
        <h2>Course Registration</h2>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              {}
              <tr>
                <td>
                  <label>Course Name:</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="ex: Machine Learning"
                  />
                </td>
                <td>
                  <label>Course Code:</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="ex: COSC 1234"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Lecturer Id:</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={lecturerId}
                    onChange={(e) => setLecturerId(e.target.value)}
                    placeholder="ex: 001"
                  />
                </td>
                <td>
                  <label>Description:</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="ex: Machine learning is the..."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Year Level:</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={yearLevel}
                    onChange={(e) => setYearLevel(e.target.value)}
                    placeholder="ex: 2"
                  />
                </td>
                <td>
                  <label>Enrollment Key:</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={enrollmentKey}
                    onChange={(e) => setEnrollmentKey(e.target.value)}
                    placeholder="ex: COSC1234"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} id="submit-button">
                  <button type="submit">Add a Course</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default Course;
