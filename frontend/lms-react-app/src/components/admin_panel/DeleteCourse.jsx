import React from "react";
import "./css files/deleteCourse.css";

const DeleteCourse = () => (
  <div className="deleteCourse-table">
    <h2>Delete Course Account</h2>
    <form action="">
      <div className="div-table">
        <table>
          <tr>
            <td>
              <label>Course Code:</label>
            </td>
            <td>
              <input type="text" placeholder="ex:COSC 1234" />
            </td>
          </tr>
          <tr>
            <td colSpan={2} id="submit-button">
              <button type="submit">Submit</button>
            </td>
          </tr>
        </table>
      </div>
    </form>
  </div>
);

export default DeleteCourse;
