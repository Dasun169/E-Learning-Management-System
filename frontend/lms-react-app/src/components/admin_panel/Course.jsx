import React from "react";
import "./css files/course.css";

const Course = () => (
  <div className="course-table">
    <h2>Course Registration</h2>
    <form>
      <table>
        <tr>
          <td>
            <label>Course Name:</label>
          </td>
          <td>
            <input type="text" placeholder="ex:Machine Learning" />
          </td>
          <td>
            <label>Course Code:</label>
          </td>
          <td>
            <input type="text" placeholder="ex:COSC 1234" />
          </td>
        </tr>
        <tr>
          <td>
            <label>Lecturer Id:</label>
          </td>
          <td>
            <input type="text" placeholder="ex:001" />
          </td>
          <td>
            <label>Description:</label>
          </td>
          <td>
            <input type="text" placeholder="ex:Machine learnbring is the..." />
          </td>
        </tr>
        <tr>
          <td>
            <label>Year Level:</label>
          </td>
          <td>
            <input type="text" placeholder="ex:2" />
          </td>
          <td>
            <label>Enrollment Key:</label>
          </td>
          <td>
            <input type="text" placeholder="ex:COSC1234" />
          </td>
        </tr>
        <tr>
          <td colSpan={4} id="submit-button">
            <button type="submit">Submit</button>
          </td>
        </tr>
      </table>
    </form>
  </div>
);

export default Course;
