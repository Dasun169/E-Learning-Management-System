import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css files/body.css";
import { useNavigate, useLocation } from "react-router-dom";

const Body = ({ username, role, fullName }) => {
  const [courses, setCourses] = useState([]); // To store all courses
  const [filteredCourses, setFilteredCourses] = useState([]); // To store filtered courses based on user input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query input

  const navigate = useNavigate();
  const location = useLocation();

  // Array of image URLs for the background
  const backgroundImages = [
    "https://th.bing.com/th/id/OIP.4n767ii5z9sdzFjJNEm7vgHaHa?rs=1&pid=ImgDetMain",
    "https://img.freepik.com/free-vector/simple-pattern-background_1319-147.jpg",
    "https://static.vecteezy.com/system/resources/previews/002/176/171/original/cute-floral-pattern-background-simple-pattern-design-template-vector.jpg",
    "https://th.bing.com/th/id/OIP.Ybs87k7UWtZDnz8hRYqwGQHaHa?rs=1&pid=ImgDetMain",
    "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/abstract-vector-seamless-pattern-mosaic-of-wire-hexagons-outlines-on-white-background-simple-retro-design-wallpaper-petr-polak.jpg",
    "https://th.bing.com/th/id/OIP.brTqKF0p32qzlFtU6gMdswHaEU?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.i476LXnXmnnqH-bMoNF67gHaEK?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.5kgX68tPcDwHccBbonGfkAHaHq?rs=1&pid=ImgDetMain",
    "https://static.vecteezy.com/system/resources/previews/000/365/303/original/cubes-retro-pattern-vector.jpg",
  ];

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate("/");
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  // Fetch courses when the page loads
  useEffect(() => {
    console.log("Username:", username); // Check if username is available
    if (username) {
      const fetchCourses = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const response = await axios.get(
            `http://localhost:8080/api/courseRegistrations/user/${username}`
          );
          console.log(response.data); // Log the API response
          if (response.data) {
            setCourses(response.data);
            setFilteredCourses(response.data);
          }
          setLoading(false);
        } catch (err) {
          console.error("Error fetching courses:", err); // Log the error
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

  const handleCourseClick = (courseCode, courseName) => {
    console.log("Navigating with data:", {
      userName: username, // Should log the username
      role: role,
      courseCode: courseCode, // Should log the selected course code
      courseName: courseName, // Should log the selected course name
    });

    navigate("/CoursePage", {
      state: {
        userName: username, // Pass username
        role: role,
        courseCode: courseCode, // Pass courseCode
        courseName: courseName, // Pass courseName
      },
    });
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
        </div>
        {loading && (
          <div className="skeleton-container">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton-card"></div>
            ))}
          </div>
        )}
        {error && <p>{error}</p>}
        <div className="courses">
          {filteredCourses.length === 0 && !loading ? (
            <p>No courses found. Please enroll first...!!</p>
          ) : (
            filteredCourses.map((course, index) => {
              const imageIndex = index % backgroundImages.length; // Get the image index using modulo
              return (
                <div
                  key={index}
                  className="course-card"
                  onClick={() =>
                    handleCourseClick(course.courseCode, course.courseName)
                  }
                >
                  <div
                    className="course-thumbnail"
                    style={{
                      backgroundImage: `url(${backgroundImages[imageIndex]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="course-info">
                    <h3>{course.courseCode}</h3>
                    <p>{course.courseName}</p>
                    <span>Year Level : {course.yearType}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default Body;
