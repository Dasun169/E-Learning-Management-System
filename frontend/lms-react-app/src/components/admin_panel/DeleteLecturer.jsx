import React from "react";
import "./css files/deleteLecturer.css";

const DeleteLecturer = () => (
  <div className="deleteLecturer-table">
    <h2>Delete Lecturer Account</h2>
    <form action="">
      <div className="div-table">
        <table>
          <tr>
            <td>
              <label>User Name:</label>
            </td>
            <td>
              <input type="text" placeholder="ex:jhond20133" />
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

export default DeleteLecturer;
