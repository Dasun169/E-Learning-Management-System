import React, { useState } from "react";
import "./css files/AdminResultBody.css";

const ResultBody = () => {
  const [courses, setCourses] = useState([
    { code: "", name: "", year: "", attempt: 1, grade: "" },
  ]);

  const handleEdit = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const addRow = () => {
    const newCourse = { code: "", name: "", year: "", attempt: 1, grade: "" };
    setCourses([...courses, newCourse]);
  };

  const saveRow = (index) => {
    alert(
      `Course Name: ${courses[index].name}\nGrade: ${courses[index].grade}\n\nSaved Successfully!`
    );
  };

  const deleteRow = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  const [selectedYear, setSelectedYear] = useState("Year 1");

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="inside-inside">
      <div className="student-info">
        <h2>Student Results</h2>
        <p>
          <b>Student Name:</b> Mr S.T.D. MADHUKSHA
        </p>
        <p>
          <b>Student User Name:</b> PS/2020/020
        </p>
        <p>
          <b>Academic Year:</b> 2020/2021
        </p>
      </div>
      <div className="sidebar">
        <select
          className="year-select"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="Year 1">Year 1</option>
          <option value="Year 2">Year 2</option>
          <option value="Year 3">Year 3</option>
          <option value="Year 4">Year 4</option>
        </select>
      </div>

      <div className="main-content">
        <div className="result-container">
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>AcYear</th>
                <th>Attempt</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={course.code}
                      className="input-field5"
                      onChange={(e) =>
                        handleEdit(index, "code", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) =>
                        handleEdit(index, "name", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={course.year}
                      onChange={(e) =>
                        handleEdit(index, "year", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={course.attempt}
                      onChange={(e) =>
                        handleEdit(index, "attempt", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={course.grade}
                      onChange={(e) =>
                        handleEdit(index, "grade", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button className="save-btn" onClick={() => saveRow(index)}>
                      Save
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteRow(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-row-btn" onClick={addRow}>
            + Add New Row
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultBody;
