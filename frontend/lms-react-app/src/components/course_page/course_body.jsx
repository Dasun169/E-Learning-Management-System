import React, { useState, useEffect } from "react";
import "./css files/course_body.css";

function CourseBody({ userName, courseCode, courseName, role }) {
  const [introduction, setIntroduction] = useState(
    "Write your course introduction here..."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [sections, setSections] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    console.log("Course Info:", { courseCode, courseName, userName, role });
    setUserRole(role); // Ensuring role is set properly
  }, [courseCode, courseName, userName, role]);

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
          <h2>Introduction</h2>
          {isEditing ? (
            <textarea
              value={introduction}
              onChange={handleIntroductionChange}
              rows="4"
            />
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
