import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css files/GetAllLecturers.css";

const GetAllLecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/role/lecturer"
        );
        setLecturers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching lecturers.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  return (
    <div className="lecturers-container">
      {loading ? (
        <div className="loading-message">Loading... Please Wait!!!</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <h2>Lecturer Details</h2>
          <div className="lecturers-list">
            {lecturers.length > 0 ? (
              lecturers.map((lecturer) => (
                <div className="lecturer-card" key={lecturer.id}>
                  <p>
                    <strong>Lecturer ID:</strong> {lecturer.id}
                  </p>
                  <p>
                    <strong>Username:</strong> {lecturer.userName}
                  </p>
                  <p>
                    <strong>Full Name:</strong> {lecturer.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {lecturer.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {lecturer.role}
                  </p>
                </div>
              ))
            ) : (
              <p>No lecturers available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GetAllLecturers;
