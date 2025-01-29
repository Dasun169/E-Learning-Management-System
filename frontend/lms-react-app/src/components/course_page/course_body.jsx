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
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (courseCode) {
      axios
        .get(`http://localhost:8080/api/courses/description/${courseCode}`)
        .then((response) => {
          setIntroduction(
            response.data?.description || "No course description available."
          );
        })
        .catch(() => {
          setIntroduction("Failed to load course description.");
        });

      axios
        .get(`http://localhost:8080/api/modules/course/${courseCode}`)
        .then((response) => {
          setSections(response.data);
        })
        .catch(() => {
          toast.error("Failed to load sections.");
        });
    }
  }, [courseCode]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleIntroductionChange = (e) => setIntroduction(e.target.value);

  const handleUpdateIntroduction = () => {
    axios
      .put(
        `http://localhost:8080/api/courses/update-description/${courseCode}`,
        { description: introduction }
      )
      .then(() => {
        toast.success("Updated successfully!");
        setIsEditing(false);
      })
      .catch(() => toast.error("Failed to update."));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    return `Created Date - ${date.toLocaleString()}`;
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        header: "",
        description: "",
        createdDate: new Date().toISOString(),
        isEditing: true,
      },
    ]);
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleSaveSection = (index) => {
    const section = sections[index];
    if (!section.header || !section.description) {
      toast.error("Please fill in both fields before saving.");
      return;
    }

    axios
      .post("http://localhost:8080/api/modules", {
        courseCode,
        header: section.header,
        description: section.description,
      })
      .then((response) => {
        const updatedSections = [...sections];
        updatedSections[index] = response.data;
        updatedSections[index].isEditing = false;
        setSections(updatedSections);
        toast.success("Section saved successfully!");
      })
      .catch(() => toast.error("Failed to save section."));
  };

  const handleDeleteSection = (index, header) => {
    axios
      .delete(`http://localhost:8080/api/modules/delete/${header}`)
      .then(() => {
        toast.success("Section deleted.");
        setSections(sections.filter((_, i) => i !== index));
      })
      .catch(() => toast.error("Failed to delete section."));
  };

  return (
    <div>
      <ToastContainer />
      {role === "lecturer" && (
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

        <section className="additional-sections">
          <h1>Sections</h1>
          {sections.map((section, index) => (
            <div key={index} className="section">
              {section.isEditing ? (
                <>
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={section.header}
                    onChange={(e) =>
                      handleSectionChange(index, "header", e.target.value)
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
                  <h3>{formatDate(section.createdDate)}</h3>
                  <h3>{section.header}</h3>
                  <p>{section.description}</p>
                </>
              )}
              <div className="section-buttons">
                {isEditing && (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleSaveSection(index)}
                    >
                      Save
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteSection(index, section.header)}
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
