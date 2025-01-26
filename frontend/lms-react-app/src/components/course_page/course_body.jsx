import React, { useState, useEffect } from "react";
import "./css files/course_body.css";

function CourseBody({ userName, courseCode, courseName }) {
  const [introduction, setIntroduction] = useState(
    "Write your course introduction here..."
  ); // State for course introduction
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [sections, setSections] = useState([]); // State for additional sections

  useEffect(() => {
    // Optionally fetch course details if needed using courseCode or userName
    console.log("Course Info:", { courseCode, courseName, userName });
  }, [courseCode, courseName, userName]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  const handleAddSection = () => {
    const newSection = {
      id: sections.length + 1,
      content: `New Section ${sections.length + 1}`,
      isEditing: false,
    };
    setSections([...sections, newSection]);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleEditSectionToggle = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id
          ? { ...section, isEditing: !section.isEditing }
          : section
      )
    );
  };

  const handleSectionContentChange = (id, newContent) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  return (
    <section className="course">
      <h1>PMAT 23456 - Mathematical Method</h1>
      <div className="course-body">
        <div className="course-body1">
          <h2>Course Introduction</h2>
          <div className="course-intro">
            {isEditing ? (
              <textarea
                value={introduction}
                onChange={handleIntroductionChange}
              ></textarea>
            ) : (
              <p>{introduction}</p>
            )}
            <div className="btn">
              <button onClick={handleEditToggle}>
                {isEditing ? "Ok" : "Edit"}
              </button>
            </div>
          </div>
        </div>

        <div className="add-next-body">
          <div className="sections">
            {sections.map((section) => (
              <div key={section.id} className="section">
                {section.isEditing ? (
                  <textarea
                    value={section.content}
                    onChange={(e) =>
                      handleSectionContentChange(section.id, e.target.value)
                    }
                  ></textarea>
                ) : (
                  <h3>{section.content}</h3>
                )}
                <div className="section-controls">
                  <button onClick={() => handleEditSectionToggle(section.id)}>
                    {section.isEditing ? "Save" : "Edit"}
                  </button>
                  <button onClick={() => handleDeleteSection(section.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="add">
            <button onClick={handleAddSection} className="add-btn">
              ADD
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseBody;
