import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/course_body.css";
import { useNavigate } from "react-router-dom";

function CourseBody({ userName, courseCode, courseName, role }) {
  const [introduction, setIntroduction] = useState(
    "Loading course description..."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (courseCode) {
      // Fetch course description
      axios
        .get(`http://localhost:8080/api/courses/description/${courseCode}`)
        .then((response) => {
          if (response.data && response.data.description) {
            setIntroduction(response.data.description);
          } else {
            setIntroduction("No course description updated yet.");
          }
        })
        .catch((error) => {
          console.error("Error fetching course description:", error);
          setIntroduction("Failed to load course description.");
        });

      // Fetch course sections
      axios
        .get(`http://localhost:8080/api/modules/course/${courseCode}`)
        .then((response) => {
          const sectionsWithFiles = response.data.map((section) => ({
            ...section,
            isNew: false,
            isEditing: false,
            fileUrl: "", // Initialize fileUrl
          }));

          // Fetch files for each section
          const fetchFilesForSections = sectionsWithFiles.map((section) =>
            axios
              .get(
                `http://localhost:8080/api/aws/files/${courseCode}/${section.header}`
              )
              .then((fileResponse) => {
                if (fileResponse.data.length > 0) {
                  section.fileUrl = fileResponse.data[0].fileUrl; // Assign the first file URL
                }
                return section;
              })
              .catch((error) => {
                console.error("Error fetching files for section:", error);
                return section;
              })
          );

          Promise.all(fetchFilesForSections).then((updatedSections) => {
            setSections(updatedSections);
          });
        })
        .catch((error) => {
          console.error("Error fetching course sections:", error);
        });
    }
  }, [courseCode]);

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleIntroductionChange = (e) => setIntroduction(e.target.value);

  const handleUpdateIntroduction = () => {
    axios
      .put(
        `http://localhost:8080/api/courses/update-description/${courseCode}`,
        {
          description: introduction,
        }
      )
      .then(() => {
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
        isNew: true,
        fileUrl: "",
      },
    ]);
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedSections = [...sections];
      updatedSections[index].file = file;
      setSections(updatedSections);
    }
  };

  const handleUploadFile = async (index) => {
    const section = sections[index];
    if (!section.file) {
      toast.error("Please select a file to upload.", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", section.file);
    formData.append("courseCode", courseCode);
    formData.append("header", section.header);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/aws/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedSections = [...sections];
      updatedSections[index].fileUrl = response.data.fileUrl;
      setSections(updatedSections);

      toast.success("File uploaded successfully!", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file.", {
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

  const handleSaveSection = (index) => {
    const section = sections[index];
    if (!section.header || !section.description) {
      toast.error("Please fill in both fields before saving.", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    axios
      .post("http://localhost:8080/api/modules", {
        courseCode,
        header: section.header,
        description: section.description,
        fileUrl: section.fileUrl,
      })
      .then((response) => {
        const updatedSections = [...sections];
        updatedSections[index] = { ...response.data, isNew: false };
        setSections(updatedSections);
        toast.success("Section saved successfully!", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() =>
        toast.error("Failed to save section.", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  const handleDeleteSection = (index, header) => {
    axios
      .delete(`http://localhost:8080/api/modules/delete/${header}`)
      .then(() => {
        toast.success("Section deleted.", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSections(sections.filter((_, i) => i !== index));
      })
      .catch(() =>
        toast.error("Failed to delete section.", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  const navigate = useNavigate();

  const handleUnenroll = async () => {
    try {
      const unenrollResponse = await axios.delete(
        `http://localhost:8080/api/courseRegistrations/${userName}/${role}/${courseCode}`
      );

      if (unenrollResponse.status === 204) {
        toast.success(`${courseName} : Unenrolled!`, {
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
              state: { username: userName, role: role },
            });
          },
        });
      } else {
        toast.error("Unenrollment failed. Please try again.");
        console.error("Unenrollment failed:", unenrollResponse);
      }
    } catch (error) {
      console.error("Unenrollment error:", error);
      toast.error("An error occurred during unenrollment.");
    }
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
          <button className="unenroll-btn" onClick={handleUnenroll}>
            {" "}
            Unenroll Me
          </button>
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
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, index)}
                  />
                  <button
                    onClick={() => handleUploadFile(index)}
                    className="update-button"
                  >
                    Upload File
                  </button>
                </>
              ) : (
                <>
                  <h3>{formatDate(section.createdDate)}</h3>
                  <h3>{section.header}</h3>
                  <p>{section.description}</p>
                  {section.fileUrl && (
                    <a
                      href={section.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download File
                    </a>
                  )}
                </>
              )}
              <div className="section-buttons">
                {isEditing && section.isNew && (
                  <button
                    className="edit-btn"
                    onClick={() => handleSaveSection(index)}
                  >
                    Save
                  </button>
                )}
                {isEditing && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteSection(index, section.header)}
                  >
                    Delete
                  </button>
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
