import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/lecturerRegistration.css";

const LecturerRegistration = ({ loggedInUserRole, adminUserName }) => {
  const [lecturerId, setLecturerId] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!lecturerId || !courseCode) {
      setError("Lecturer ID and Course Code are required.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const checkLecturerResponse = await axios.get(
        `http://localhost:8080/api/users/id/${lecturerId}`
      );

      if (checkLecturerResponse.status === 200) {
        const lecturerData = checkLecturerResponse.data;
        const lecturerUserName = lecturerData.userName;
        const checkCourseResponse = await axios.get(
          `http://localhost:8080/api/courses/by-code/${courseCode}`
        );

        if (checkCourseResponse.status === 200) {
          const courseData = checkCourseResponse.data;
          const courseName = courseData.courseName;
          const yearLevel = courseData.yearLevel;

          const registrationData = {
            userName: lecturerUserName,
            role: "lecturer",
            courseName: courseName,
            courseCode: courseCode,
            yearType: yearLevel,
          };

          const registerLecturerResponse = await axios.post(
            "http://localhost:8080/api/courseRegistrations",
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

            try {
              await axios.post("http://localhost:8080/api/adminHistory", null, {
                params: {
                  userName: adminUserName,
                  role: loggedInUserRole,
                  action: `Registered lecturer: '${lecturerUserName}' for course '${courseCode}' successfully`,
                },
              });
              console.log("Admin history updated successfully");
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

            setMessage("Lecturer registered successfully.");
            setLecturerId("");
            setCourseCode("");
          }
        } else {
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
      if (err.response && err.response.status === 404) {
        setError("Error: Lecturer or course not found.");
      } else {
        setError("Error: Unable to register the lecturer.");
      }

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
      setLoading(false);
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
                      disabled={loading}
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
                      disabled={loading}
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
                      Register Lecturer
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
