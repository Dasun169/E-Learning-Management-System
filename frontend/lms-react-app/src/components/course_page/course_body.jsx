import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/course_body.css";

function CourseBody({ userName, courseCode, courseName, role }) {
  const [introduction, setIntroduction] = useState(
    "Loading course description..."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    console.log("Course Info:", { courseCode, courseName, userName, role });
    setUserRole(role);

    if (courseCode) {
      axios
        .get(`http://localhost:8080/api/courses/description/${courseCode}`)
        .then((response) => {
          if (response.data && response.data.description) {
            setIntroduction(response.data.description);
          } else {
            setIntroduction("No course description available.");
          }
        })
        .catch((error) => {
          console.error("Error fetching course description:", error);
          setIntroduction("Failed to load course description.");
        });
    }
  }, [courseCode]);

  useEffect(() => {
    console.log("Updated Role:", userRole);
  }, [userRole]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  const handleUpdateIntroduction = () => {
    if (!courseCode) {
      console.error("Course code is missing!");
      return;
    }
    axios
      .put(
        `http://localhost:8080/api/courses/update-description/${courseCode}`,
        {
          description: introduction,
        }
      )
      .then((response) => {
        console.log("Updated successfully:", response);
        toast.success("Updated successfully!", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating course description:", error);
        toast.error("Failed to update.", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <ToastContainer />
      {userRole === "lecturer" && (
        <div className="edit-toggle-container">
          <button className="edit-toggle-btn" onClick={handleEditToggle}>
            {isEditing ? "Turn Off Edit" : "Turn On Edit"}
          </button>
        </div>
      )}
      <div className="course-body">
        <header className="course-header">
          <h1>
            {courseCode}: {courseName}
          </h1>
        </header>
        <section className="course-introduction">
          <h1>Course Description</h1>
          {isEditing ? (
            <div style={{ position: "relative" }}>
              <textarea
                value={introduction}
                onChange={handleIntroductionChange}
                rows="4"
              />
              <button
                className="update-btn"
                onClick={handleUpdateIntroduction}
                style={{ position: "absolute", right: "10px", top: "10px" }}
              >
                Update
              </button>
            </div>
          ) : (
            <p>{introduction}</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default CourseBody;
