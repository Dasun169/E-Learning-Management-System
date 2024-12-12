import React from "react";
import "./css files/lecturer.css";

const Lecturer = () => (
  <div className="lecturer-table">
    <h2>Lecturer Registration</h2>
    <form>
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
            <td>
              <label>Password:</label>
            </td>
            <td>
              <input type="text" placeholder="ex:ABCabc123!@#" />
            </td>
          </tr>
          <tr>
            <td>
              <label>Full Name:</label>
            </td>
            <td>
              <input type="text" placeholder="ex:Jhone Doe" />
            </td>
          </tr>
          <tr>
            <td>
              <label>Contact Number:</label>
            </td>
            <td>
              <input type="text" placeholder="ex:07########" />
            </td>
          </tr>
          <tr>
            <td>
              <label>Profile Picture:</label>
            </td>
            <td>
              <input type="file" accept="image/*" />
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

export default Lecturer;
