import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css files/body.css";
import { useNavigate, useLocation } from "react-router-dom";

const Body = ({ username, role, fullName }) => {
  const [courses, setCourses] = useState([]); 
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  const navigate = useNavigate();
  const location = useLocation();

 
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

  
  useEffect(() => {
    console.log("Username:", username); 
    if (username) {
      const fetchCourses = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/courseRegistrations/user/${username}`
          );
          console.log(response.data); 
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

 
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query); 

    
    if (query === "") {
      setFilteredCourses(courses); 
    } else {
      const filtered = courses.filter(
        (course) =>
          course.courseCode.toLowerCase().startsWith(query.toLowerCase()) 
      );
      setFilteredCourses(filtered);
    }
  };

  const handleCourseClick = (courseCode, courseName) => {
    console.log("Navigating with data:", {
      userName: username, 
      role: role,
      courseCode: courseCode, 
      courseName: courseName, 
    });

    navigate("/CoursePage", {
      state: {
        userName: username, 
        role: role,
        courseCode: courseCode, 
        courseName: courseName, 
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
          {}
          <input
            type="text"
            placeholder="Search by course code"
            value={searchQuery} 
            onChange={handleSearch} 
          />
        </div>
        {loading && <p>Loading courses...</p>}
        {error && <p>{error}</p>}
        <div className="courses">
          {filteredCourses.length === 0 && !loading ? (
            <p>No courses found. Please enroll first...!!</p>
          ) : (
            filteredCourses.map((course, index) => {
              const imageIndex = index % backgroundImages.length; 
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
