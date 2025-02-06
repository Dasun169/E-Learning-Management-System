import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/enrollment.css";
import { useNavigate } from "react-router-dom";

function Enrollment({ userName, courseName, courseCode, yearLevel }) {
  const [lecturerName, setLecturerName] = useState("Loading...");
  const [enrollmentKeyInput, setEnrollmentKeyInput] = useState("");
  const [enrollmentError, setEnrollmentError] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const role = "student";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLecturerName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/courseRegistrations/single-user-by-course-and-role/${courseCode}/${role}` // Corrected API endpoint
        );

        if (response.status === 200 && response.data) {
          setLecturerName(response.data);
        } else {
          setLecturerName("Lecturer name not found");
          console.error("Could not retrieve lecturer name.");
        }
      } catch (error) {
        console.error("Error fetching lecturer name:", error);
        setLecturerName("Error loading lecturer name");
      }
    };

    if (courseCode) {
      fetchLecturerName();
    }
  }, [courseCode]);

  const handleEnroll = async () => {
    setEnrollmentError("");
    setIsEnrolling(true);

    try {
      const keyCheckResponse = await axios.get(
        `http://localhost:8080/api/courses/enrollment-key/${courseCode}`
      );

      if (
        keyCheckResponse.status === 200 &&
        keyCheckResponse.data === enrollmentKeyInput
      ) {
        const registrationData = {
          userName: userName,
          role: role,
          courseName: courseName,
          courseCode: courseCode,
          yearType: yearLevel,
        };

        const enrollmentResponse = await axios.post(
          "http://localhost:8080/api/courseRegistrations",
          registrationData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (
          enrollmentResponse.status === 200 ||
          enrollmentResponse.status === 201
        ) {
          toast.success("Successfully enrolled!", {
            className: "custom-toast",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => {
              navigate("/StudentHome", {
                state: { username: userName, role: "student" },
              });
            },
          });
          setEnrollmentKeyInput("");
        } else {
          setEnrollmentError("Enrollment failed. Please try again.");
          console.error("Enrollment failed:", enrollmentResponse);
          toast.error("Enrollment failed!", {
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
        setEnrollmentError("Incorrect enrollment key.");
        toast.error("Incorrect enrollment key.", {
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
      console.error("Enrollment error:", error);
      setEnrollmentError("An error occurred during enrollment.");
      toast.error("An error occurred during enrollment.", {
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
      setIsEnrolling(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="course-enrollment5">
        <h1>
          {courseCode} - {courseName}
        </h1>
        <section className="body5">
          <div className="left5">
            <h2>Enrolment options</h2>
            <div className="lecture5">
              <h3>Lecturer's Name: {lecturerName}</h3>
            </div>
            <div className="link5">
              <a href="#">
                {courseCode} - {courseName}
              </a>
            </div>
          </div>

          <div className="right5">
            <div className="title5">
              <h3>Self Enrolment (Student)</h3>
            </div>
            <div className="enrollment-option5">
              <h4>Enrolment key</h4>
              <input
                type="text"
                value={enrollmentKeyInput}
                onChange={(e) => setEnrollmentKeyInput(e.target.value)}
                placeholder="Enter enrollment key"
              />
              {enrollmentError && (
                <p style={{ color: "red" }}>{enrollmentError}</p>
              )}
              <button onClick={handleEnroll} disabled={isEnrolling}>
                {isEnrolling ? "Enrolling..." : "Enrol Me"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Enrollment;
