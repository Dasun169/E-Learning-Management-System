import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css files/course_body.css";

function CourseBody({ userName, courseCode, courseName, role }) {
  const [introduction, setIntroduction] = useState(
    "Loading course description..."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [sections, setSections] = useState([]);
  const [userRole, setUserRole] = useState("");

  // Fetch course description on initial render
  useEffect(() => {
    console.log("Course Info:", { courseCode, courseName, userName, role });
    setUserRole(role); // Ensuring role is set properly

    if (courseCode) {
      // Fetch the course description using axios GET request
      console.log("Fetching course description for courseCode:", courseCode); // Debugging log
      axios
        .get(`http://localhost:8080/api/courses/description/${courseCode}`)
        .then((response) => {
          console.log("API Response:", response); // Log the entire response
          // Assuming the response returns the description in the 'data' field
          if (response.data) {
            setIntroduction(response.data); // Directly set the description
          } else {
            console.log("No description found in response.");
            setIntroduction("No course description available.");
          }
        })
        .catch((error) => {
          console.error("Error fetching course description:", error);
          setIntroduction("Failed to load course description.");
        });
    }
  }, [courseCode, courseName, userName, role]);

  // Log user role for debugging
  useEffect(() => {
    console.log("Updated Role:", userRole);
  }, [userRole]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      { title: "New Section", description: "", isEditing: true },
    ]);
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const toggleSectionEdit = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].isEditing = !updatedSections[index].isEditing;
    setSections(updatedSections);
  };

  const handleDeleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleUpdateIntroduction = () => {
    // Update the introduction (optional API call can be placed here)
    console.log("Updated Introduction:", introduction);
  };

  return (
    <div>
      {/* Edit Toggle Button (Visible only for lecturers) */}
      {userRole === "lecturer" && (
        <div className="edit-toggle-container">
          <button className="edit-toggle-btn" onClick={handleEditToggle}>
            {isEditing ? "Turn Off Edit" : "Turn On Edit"}
          </button>
        </div>
      )}

      {/* Course Content */}
      <div className="course-body">
        <header className="course-header">
          <h1>
            {courseCode}: {courseName}
          </h1>
        </header>

        {/* Introduction Section */}
        <section className="course-introduction">
          <h2>Course Description</h2>
          {isEditing ? (
            <div style={{ position: "relative" }}>
              <textarea
                value={introduction}
                onChange={handleIntroductionChange}
                rows="4"
              />
              {/* Button to update the introduction, right-aligned */}
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

        {/* Sections */}
        <section className="additional-sections">
          <h2>Sections</h2>
          {sections.map((section, index) => (
            <div key={index} className="section">
              {section.isEditing ? (
                <>
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={section.title}
                    onChange={(e) =>
                      handleSectionChange(index, "title", e.target.value)
                    }
                  />
                  <textarea
                    placeholder="Section Description"
                    value={section.description}
                    onChange={(e) =>
                      handleSectionChange(index, "description", e.target.value)
                    }
                    rows="2"
                  />
                </>
              ) : (
                <>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </>
              )}
              <div className="section-buttons">
                {isEditing && (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => toggleSectionEdit(index)}
                    >
                      {section.isEditing ? "Save" : "Edit"}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteSection(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          {isEditing && (
            <button className="course-body-btn" onClick={handleAddSection}>
              Add Section
            </button>
          )}
        </section>
      </div>
    </div>
  );
}

export default CourseBody;
