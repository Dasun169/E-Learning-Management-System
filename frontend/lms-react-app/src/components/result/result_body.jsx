import React, { useState } from "react"; 
import "./css files/result_body.css"; 

const ResultBody = () => {
    const [courses, setCourses] = useState([
        { code: "ACLT 11013", name: "ACADEMIC LITERACY I", year: "2020/2021", attempt: 1, grade: "D" }
    ]);

    // Function to handle editing input fields
    const handleEdit = (index, field, value) => {
        const updatedCourses = [...courses];
        updatedCourses[index][field] = value;
        setCourses(updatedCourses);
    };

    // Function to add a new row
    const addRow = () => {
        const newCourse = { code: "", name: "", year: "", attempt: 1, grade: "" };
        setCourses([...courses, newCourse]);
    };

    // Function to save row
    const saveRow = (index) => {
        alert(`Course Name: ${courses[index].name}\nGrade: ${courses[index].grade}\n\nSaved Successfully!`);
    };

    // Function to delete a row
    const deleteRow = (index) => {
        const updatedCourses = courses.filter((_, i) => i !== index);
        setCourses(updatedCourses);
    };

    return (
        <div className="inside">
            <div className="inside-inside">
                <div className="container">
                    <div className="sidebar">
                        <a href="#">Registration - Year 1</a>
                        <a href="#">Registration - Year 2</a>
                        <a href="#">Registration - Year 3</a>
                        <a href="#">Registration - Year 4</a>
                        <a href="#">Exam Admission</a>
                        <a href="#">Registration - Repeat</a>
                    </div>

                    <div className="main-content">
                        <h2>First Year Registration</h2>

                        <div className="result-container">
                            <h2>Student Results</h2>
                            <button className="add-row-btn" onClick={addRow}>+ Add New Row</button>
                            <table className="result-table">
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
                                                    onChange={(e) => handleEdit(index, "code", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={course.name}
                                                    onChange={(e) => handleEdit(index, "name", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={course.year}
                                                    onChange={(e) => handleEdit(index, "year", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={course.attempt}
                                                    onChange={(e) => handleEdit(index, "attempt", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={course.grade}
                                                    onChange={(e) => handleEdit(index, "grade", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <button className="save-btn" onClick={() => saveRow(index)}>Save</button>
                                                <button className="delete-btn" onClick={() => deleteRow(index)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="student-info">
                        <p><strong>Student Name with Initial:</strong> Mr S.T.D. MADHUKSHA</p>
                        <p><strong>Student Full Name:</strong> Mr SOYSA THIRIMANNA DILSHAN MADHUKSHA</p>
                        <p><strong>Student University ID No:</strong> PS/2020/020</p>
                        <p><strong>Relevant Student Handbook - Academic Year:</strong> 2020/2021</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultBody;
