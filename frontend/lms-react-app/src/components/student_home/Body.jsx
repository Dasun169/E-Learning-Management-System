import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css files/body.css";

const Body = ({ username, fullName }) => {
  const [courses, setCourses] = useState([]); // To store all courses
  const [filteredCourses, setFilteredCourses] = useState([]); // To store filtered courses based on user input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query input

  // Fetch courses when the page loads
  useEffect(() => {
    if (username) {
      const fetchCourses = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/courseRegistrations/user/${username}`
          );

          if (response.data) {
            setCourses(response.data); // Store all courses
            setFilteredCourses(response.data); // Initially display all courses
          }
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch course data");
          setLoading(false);
        }
      };

      fetchCourses();
    }
  }, [username]);

  // Filter courses by partial course code
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update the search query state

    // Filter courses based on the courseCode (partial match)
    if (query === "") {
      setFilteredCourses(courses); // If no input, show all courses
    } else {
      const filtered = courses.filter(
        (course) =>
          course.courseCode.toLowerCase().startsWith(query.toLowerCase()) // Filter by start of courseCode
      );
      setFilteredCourses(filtered);
    }
  };

  return (
    <div className="dashboard">
      <header className="body-header">
        <h1>
          Hi,{" "}
          <span id="userNameDisplay">
            {username} - {fullName}
          </span>{" "}
          <span>👋</span>
        </h1>
      </header>

      <section className="course-overview">
        <h2>Course Overview</h2>
        <div className="search-sort">
          {/* Search input field */}
          <input
            type="text"
            placeholder="Search by course code"
            value={searchQuery} // Bind value to searchQuery state
            onChange={handleSearch} // Update filtered courses as user types
          />
          <select>
            <option>Sort by last accessed</option>
          </select>
        </div>
        {loading && <p>Loading courses...</p>}
        {error && <p>{error}</p>}
        <div className="courses">
          {filteredCourses.length === 0 && !loading ? (
            <p>No courses found. Please try a different search.</p>
          ) : (
            filteredCourses.map((course, index) => (
              <div
                key={index}
                className="course-card"
                onClick={() => alert(`Clicked on ${course.courseName}`)}
              >
                <div className="course-thumbnail"></div>
                <div className="course-info">
                  <h3>{course.courseCode}</h3>
                  <p>{course.courseName}</p>
                  <span>{course.yearType}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Body;
