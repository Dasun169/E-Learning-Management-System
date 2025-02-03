import React, { useEffect, useState } from "react";
import "./css files/ELEC_PHY_body.css";

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

const ElecPhy = ({ userName }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const elecResponse = await fetch(
          "http://localhost:8080/api/courses/search-by-name/ELEC"
        );
        const elecCourses = await elecResponse.json();

        const physResponse = await fetch(
          "http://localhost:8080/api/courses/search-by-name/PHYS"
        );
        const physCourses = await physResponse.json();

        const allCourses = [...elecCourses, ...physCourses];
        setCourses(allCourses);
        setFilteredCourses(allCourses);

        const enrolledStatusPromises = allCourses.map(async (course) => {
          const response = await fetch(
            `http://localhost:8080/api/courseRegistrations/exists/${userName}/${course.courseCode}`
          );
          return response.ok ? response.json() : false;
        });

        const enrolledStatuses = await Promise.all(enrolledStatusPromises);
        const enrolledCourseCodes = allCourses
          .filter((_, index) => enrolledStatuses[index])
          .map((course) => course.courseCode);

        setEnrolledCourses(enrolledCourseCodes);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchAllCourses();
  }, [userName]);

  useEffect(() => {
    if (!selectedCategory && !selectedLevel) {
      setFilteredCourses(courses);
      return;
    }

    if (selectedCategory && selectedLevel) {
      const fetchFilteredCourses = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/courses/search-by-code/${selectedCategory}/${selectedLevel}`
          );
          if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();
          setFilteredCourses(data);
        } catch (error) {
          console.error("Error fetching filtered courses:", error);
          setFilteredCourses([]);
        }
      };

      fetchFilteredCourses();
    }
  }, [selectedCategory, selectedLevel, courses]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter(
          (course) =>
            course.courseCode.toLowerCase().includes(query.toLowerCase()) ||
            course.courseName.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="dashboard1">
      <section className="course-overview1">
        <h2>Course Enrollment - {userName}</h2>
        <div className="search-sort1">
          <input
            type="text"
            placeholder="Search Courses"
            value={searchQuery}
            onChange={handleSearch}
          />
          <select
            className="search-sort-select"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="">Select Level</option>
            <option value="1">Level I</option>
            <option value="2">Level II</option>
            <option value="3">Level III</option>
            <option value="4">Level IV</option>
          </select>
          <select
            className="search-sort-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="ELEC">ELEC</option>
            <option value="PHYS">PHYS</option>
          </select>
        </div>
        <div className="courses1">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => {
              const imageIndex = index % backgroundImages.length;
              const isEnrolled = enrolledCourses.includes(course.courseCode);

              return (
                <div key={index} className="course-card1">
                  <div
                    className="course-thumbnail1"
                    style={{
                      backgroundImage: `url(${backgroundImages[imageIndex]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="course-info1">
                    <h3>{course.courseCode}</h3>
                    <p>{course.courseName}</p>
                    <span>{course.yearLevel}</span>
                  </div>
                  {!isEnrolled && (
                    <button className="enrllment1">
                      <img src="./Images/lock.png" alt="lock" />
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p>No courses found...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ElecPhy;
