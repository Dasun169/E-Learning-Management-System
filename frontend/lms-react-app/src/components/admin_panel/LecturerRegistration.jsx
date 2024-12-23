import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/lecturerRegistration.css";

const LecturerRegistration = () => {
  const [lecturerId, setLecturerId] = useState(""); // State to hold the lecturerId input value
  const [courseCode, setCourseCode] = useState(""); // State to hold the courseCode input value
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(""); // To handle error messages
  const [message, setMessage] = useState(""); // To display success or failure messages

  // Function to handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!lecturerId || !courseCode) {
      setError("Lecturer ID and Course Code are required.");
      return;
    }

    setLoading(true); // Set loading to true before making the requests
    setError(""); // Clear any previous errors
    setMessage(""); // Clear any previous success message

    try {
      // Step 1: Check if the lecturer exists
      const checkLecturerResponse = await axios.get(
        `http://localhost:8080/api/users/id/${lecturerId}`
      );

      if (checkLecturerResponse.status === 200) {
        // Step 2: Check if the course exists
        const checkCourseResponse = await axios.get(
          `http://localhost:8080/api/courses/exists/${courseCode}`
        );

        if (checkCourseResponse.status === 200) {
          // Step 3: Proceed to register the lecturer if the course is valid
          const registrationData = {
            lecturerId,
            courseCode,
          };

          const registerLecturerResponse = await axios.post(
            "http://localhost:8080/api/lecturerRegistration/save",
            registrationData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (
            registerLecturerResponse.status === 200 ||
            registerLecturerResponse.status === 201
          ) {
            // Show success toast on successful registration
            toast.success("Lecturer registered successfully!", {
              className: "custom-toast",
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setMessage("Lecturer registered successfully.");
            setLecturerId(""); // Clear the lecturer ID input after successful registration
            setCourseCode(""); // Clear the course code input after successful registration
          }
        } else {
          // If the course code is invalid, show an error toast
          setError("Invalid course code.");
          toast.error("Invalid course code!", {
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
      } else {
        // If the lecturer doesn't exist, show an error toast
        setError("Lecturer not found.");
        toast.error("Lecturer not found!", {
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
      // Handle errors (e.g., unable to check lecturer or course)
      if (err.response && err.response.status === 404) {
        setError("Error: Lecturer or course not found.");
      } else {
        setError("Error: Unable to register the lecturer.");
      }

      // Show error toast
      toast.error(error || "Error: Unable to register the lecturer.", {
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
      <div className="lecturer-registration">
        <h2>Lecturer Course Registration</h2>
        <form onSubmit={handleRegister}>
          <div className="div-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Lecturer ID:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={lecturerId}
                      onChange={(e) => setLecturerId(e.target.value)}
                      placeholder="ex: L12345"
                      disabled={loading} // Disable input while loading
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
                      value={courseCode}
                      onChange={(e) => setCourseCode(e.target.value)}
                      placeholder="ex: CS101"
                      disabled={loading} // Disable input while loading
                    />
                  </td>
                </tr>
                {error && (
                  <tr>
                    <td colSpan={2}>
                      <div style={{ color: "red" }}></div>
                    </td>
                  </tr>
                )}
                {message && (
                  <tr>
                    <td colSpan={2}>
                      <div style={{ color: "green" }}></div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={2} id="submit-button">
                    <button type="submit" disabled={loading}>
                      Submit
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

export default LecturerRegistration;
