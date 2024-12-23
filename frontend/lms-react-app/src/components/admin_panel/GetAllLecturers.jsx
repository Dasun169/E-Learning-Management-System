import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css files/GetAllLecturers.css"; // Assuming you have a separate CSS file for styling

const GetAllLecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all lecturers from the API
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users"); // Adjust the API endpoint as needed
        setLecturers(response.data);
      } catch (err) {
        setError("Error fetching lecturers.");
        console.error(err);
      }
    };

    fetchLecturers();
  }, []);

  return (
    <div className="lecturers-container">
      {error && <div className="error-message">{error}</div>}
      <div className="lecturers-list">
        {lecturers.length > 0 ? (
          lecturers.map((lecturer) => (
            <div className="lecturer-card" key={lecturer.id}>
              <table className="lecturer-table1">
                <tbody>
                  {/* First row with lecturer details */}
                  <tr className="lecturer-row">
                    <td className="lecturer-detail">
                      <strong>Lecturer ID:</strong> {lecturer.id}
                    </td>
                    <td className="lecturer-detail">
                      <strong>Username:</strong> {lecturer.userName}
                    </td>
                    <td className="lecturer-detail">
                      <strong>Full Name:</strong> {lecturer.fullName}
                    </td>
                  </tr>
                  {/* Second row with more lecturer details */}
                  <tr className="lecturer-row">
                    <td className="lecturer-detail">
                      <strong>Email:</strong> {lecturer.email}
                    </td>
                    <td className="lecturer-detail">
                      <strong>Role:</strong> {lecturer.role}
                    </td>
                    <td className="lecturer-detail">
                      <strong>Status:</strong> {lecturer.status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No lecturers available.</p>
        )}
      </div>
    </div>
  );
};

export default GetAllLecturers;
