import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/AdminResult.css";

const AdminResult = ({ loggedInUserRole, adminUserName }) => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [courseRegistrations, setCourseRegistrations] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const role = "student";

  // List of possible results
  const resultOptions = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "E",
  ];

  const handleSearch = async () => {
    if (!userName) {
      toast.error("Please enter a user name.", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const userResponse = await axios.get(
        `http://localhost:8080/api/users/role/${role}/userName/${userName}`
      );

      if (userResponse.data) {
        setUserData(userResponse.data);

        const registrationsResponse = await axios.get(
          `http://localhost:8080/api/courseRegistrations/user/${userName}/${role}`
        );
        setCourseRegistrations(registrationsResponse.data);

        const resultsResponse = await axios.get(
          `http://localhost:8080/api/userResults/userName/${userName}`
        );
        const existingResults = resultsResponse.data;

        // Initialize userResults with default values
        const initializedResults = registrationsResponse.data.map((reg) => {
          const existingResult = existingResults.find(
            (result) => result.courseCode === reg.courseCode
          );
          return {
            ...reg,
            result: existingResult ? existingResult.result : "",
            yearType: reg.yearType,
          };
        });

        setUserResults(initializedResults);
      } else {
        toast.error("User not found.", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUserData(null);
        setCourseRegistrations([]);
        setUserResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data.", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUserData(null);
      setCourseRegistrations([]);
      setUserResults([]);
    }
  };

  const handleResultChange = (index, value) => {
    const updatedResults = [...userResults];
    updatedResults[index].result = value;
    setUserResults(updatedResults);
  };

  const handleSubmit = async () => {
    try {
      for (const result of userResults) {
        if (result.result.trim() !== "") {
          const exists = await axios.get(
            `http://localhost:8080/api/userResults/exists/${userName}/${result.courseCode}`
          );

          if (exists.data) {
            // Update existing result using PUT
            await axios.put(
              `http://localhost:8080/api/userResults/update/${userName}/${result.courseCode}/${result.result}`
            );
          } else {
            // Create new result using POST
            await axios.post("http://localhost:8080/api/userResults", {
              userName: userName,
              courseCode: result.courseCode,
              courseName: result.courseName,
              yearLevel: result.yearType,
              result: result.result,
            });
          }
        }
      }

      toast.success("Results updated successfully!", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      try {
        await axios.post("http://localhost:8080/api/adminHistory", null, {
          params: {
            userName: adminUserName,
            role: loggedInUserRole,
            action: `Updated results : '${userName}' successfully`,
          },
        });
        console.log("Admin history updated successfully");
      } catch (historyError) {
        console.error("Error updating admin history:", historyError);
        toast.error("Failed to update admin history. Please contact admin.", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      setCourseRegistrations([]);
      setUserResults([]);
      setUserName("");
      setUserData(null);
    } catch (error) {
      console.error("Error updating results:", error);
      toast.error("Failed to update results.");
    }
  };

  return (
    <div className="admin-result-container">
      <ToastContainer />
      <h2>Student Results Management</h2>
      <div className="search-area">
        <input
          type="text"
          placeholder="Enter User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {courseRegistrations.length > 0 && (
        <table className="result-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Year Level</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {courseRegistrations.map((registration, index) => (
              <tr key={registration.id}>
                <td>{registration.courseCode}</td>
                <td>{registration.courseName}</td>
                <td>{registration.yearType}</td>
                <td>
                  <select
                    value={userResults[index]?.result || ""}
                    onChange={(e) => handleResultChange(index, e.target.value)}
                  >
                    <option value="">Select Result</option>
                    {resultOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {courseRegistrations.length > 0 && (
        <div className="submit-area">
          <button onClick={handleSubmit}>Update Results</button>
        </div>
      )}
    </div>
  );
};

export default AdminResult;
