import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/AdminResult.css"; 

const AdminResult = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [courseRegistrations, setCourseRegistrations] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const role = "student";

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
        
        setUserData(userResponse.data); )

        const registrationsResponse = await axios.get(
          `http://localhost:8080/api/courseRegistrations/user/${userName}/${role}`
        );
        setCourseRegistrations(registrationsResponse.data);

       
        setUserResults(
          registrationsResponse.data.map((reg) => ({
            ...reg,
            result: "",
            yearType: reg.yearType,
          }))
        );
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
      const response = await axios.post(
        "http://localhost:8080/api/userResults/bulk",
        userResults,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
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
        
        setCourseRegistrations([]); 
        setUserResults([]);
        setUserName(""); 
        setUserData(null);
      } else {
        toast.error("Failed to update results.");
      }
    } catch (error) {
      console.error("Error updating results:", error);
      toast.error("Failed to update results.");
    }
  };

  return (
    <div className="admin-result-container">
      {" "}
      {}
      <ToastContainer />
      <h2>Student Results Management</h2>
      <div className="search-area">
        {" "}
        {}
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
                  <input
                    type="text"
                    value={userResults[index].result} 
                    onChange={(e) => handleResultChange(index, e.target.value)}
                    placeholder="Enter Result"
                  />
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
