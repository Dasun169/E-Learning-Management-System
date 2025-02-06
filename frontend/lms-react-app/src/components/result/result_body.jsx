import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./css files/result_body.css";

const ResultBody = () => {
  const location = useLocation();
  const { username } = location.state || {};
  const [fullName, setFullName] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yearLevels, setYearLevels] = useState({}); // Store year levels by course code

  useEffect(() => {
    if (username) {
      setLoading(true);
      setError(null);

      // Fetch user details
      fetch(`http://localhost:8080/api/users/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setFullName(data.fullName))
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Error fetching user data.");
        });

      // Fetch user results
      fetch(`http://localhost:8080/api/userResults/userName/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(async (data) => {
          setUserResults(data);

          // Fetch year levels for each course
          const yearLevelPromises = data.map(async (result) => {
            try {
              const yearLevelResponse = await fetch(
                `http://localhost:8080/api/courses/yearLevel/${result.courseCode}`
              );
              if (!yearLevelResponse.ok) {
                throw new Error(
                  `HTTP error! status: ${yearLevelResponse.status}`
                );
              }
              const yearLevelData = await yearLevelResponse.json();
              return {
                courseCode: result.courseCode,
                yearLevel: yearLevelData,
              };
            } catch (error) {
              console.error(
                `Error fetching year level for ${result.courseCode}:`,
                error
              );
              return { courseCode: result.courseCode, yearLevel: "N/A" }; // Default value
            }
          });

          const resolvedYearLevels = await Promise.all(yearLevelPromises);
          const yearLevelMap = resolvedYearLevels.reduce((acc, curr) => {
            acc[curr.courseCode] = curr.yearLevel;
            return acc;
          }, {});
          setYearLevels(yearLevelMap);
        })
        .catch((error) => {
          console.error("Error fetching user results:", error);
          setError("Error fetching user results.");
        })
        .finally(() => setLoading(false));
    }
  }, [username]);

  return (
    <div className="inside8">
      <h1>Student Results</h1>
      <div className="inside-inside8">
        <div className="student-info8">
          <p>
            <b>Student Full Name:</b> <span>{fullName}</span>
          </p>
          <p>
            <b>Student User Name:</b> <span>{username}</span>
          </p>
        </div>

        <div className="main-content8">
          <div className="result-container8">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
              <table className="result-table8">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Year Level</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {userResults.map((result, index) => (
                    <tr key={index}>
                      <td>{result.courseCode}</td>
                      <td>{result.courseName}</td>
                      <td>
                        {yearLevels[result.courseCode] || "Loading..."}
                      </td>{" "}
                      {/* Display yearLevel */}
                      <td>{result.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultBody;
