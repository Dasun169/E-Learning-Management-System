import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css files/AdminHistory.css";
const AdminHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/adminHistory/byDate"
        );
        setHistory(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching admin history.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      {loading ? (
        <div className="loading-message">Loading... Please Wait!!!</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <h2>Admin History</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Action Time</th>
                <th>User Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((entry) => (
                  <tr key={entry.id} className="history-entry">
                    <td>{new Date(entry.actionTime).toLocaleString()}</td>
                    <td>{entry.userName}</td>
                    <td>{entry.role}</td>
                    <td>{entry.action}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No history available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminHistory;
