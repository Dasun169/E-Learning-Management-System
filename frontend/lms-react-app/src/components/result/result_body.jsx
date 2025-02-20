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
  const [yearLevels, setYearLevels] = useState({});
  const [showGPA, setShowGPA] = useState(false);
  const [gpa, setGpa] = useState(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [congratulationsMessage, setCongratulationsMessage] = useState("");

  useEffect(() => {
    if (username) {
      setLoading(true);
      setError(null);

     
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

      
      fetch(`http://localhost:8080/api/userResults/userName/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(async (data) => {
          setUserResults(data);

          
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
              return { courseCode: result.courseCode, yearLevel: "N/A" }; 
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

  const calculateGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    userResults.forEach((result) => {
      const grade = result.result;
      const credit = parseInt(result.courseCode.slice(-1)); 

      let gradePoint = 0;
      switch (grade) {
        case "A+":
          gradePoint = 4.0;
          break;
        case "A":
          gradePoint = 4.0;
          break;
        case "A-":
          gradePoint = 3.7;
          break;
        case "B+":
          gradePoint = 3.3;
          break;
        case "B":
          gradePoint = 3.0;
          break;
        case "B-":
          gradePoint = 2.7;
          break;
        case "C+":
          gradePoint = 2.3;
          break;
        case "C":
          gradePoint = 2.0;
          break;
        case "C-":
          gradePoint = 1.7;
          break;
        case "D+":
          gradePoint = 1.3;
          break;
        case "D":
          gradePoint = 1.0;
          break;
        case "D-":
          gradePoint = 0.7;
          break;
        case "E":
          gradePoint = 0.0;
          break;
        default:
          console.warn(`Invalid grade: ${grade}`); 
      }

      totalGradePoints += gradePoint * credit;
      totalCredits += credit;
    });

    if (totalCredits === 0) {
      return { gpa: 0, totalCredits: 0 };
    }
    const calculatedGPA = totalGradePoints / totalCredits;
    return { gpa: calculatedGPA.toFixed(2), totalCredits };
  };

  const handleGPAClick = () => {
    const { gpa: calculatedGPA, totalCredits } = calculateGPA(); 
    setGpa(calculatedGPA);
    setShowGPA(true);
    setTotalCredits(totalCredits);

    let message = "";
    if (calculatedGPA >= 3.7) {
      message = "Congratulations! You get First Class";
    } else if (calculatedGPA >= 3.3) {
      message = "Congratulations! You get Second Class Upper";
    } else if (calculatedGPA >= 3.0) {
      message = "Congratulations! You get Second Class Lower";
    } else if (calculatedGPA >= 2.0) {
      message = "Congratulations! You get Pass";
    } else {
      message = "Unfortunately, you did not meet the passing criteria.";
    }

    setCongratulationsMessage(message);

   
    setTimeout(() => {
      setShowCongratulations(true);
    }, 1000);
  };

  const handleCloseCongratulations = () => {
    setShowCongratulations(false);
  };

  const [totalCredits, setTotalCredits] = useState(0);

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
      <div className="gpa-button-div">
        <button onClick={handleGPAClick} className="gpa-button">
          See Your GPA
        </button>
      </div>
      {showGPA && (
        <div className="show-gpa">
          <p>Total Credits : {totalCredits}</p>
          <p>Your GPA: {gpa}</p>
        </div>
      )}
      {showCongratulations && (
        <div className="congratulations-overlay">
          <div className="congratulations-content">
            <p>{congratulationsMessage}</p>
            <button
              onClick={handleCloseCongratulations}
              className="close-congratulations"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultBody;
