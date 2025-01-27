import React, { useState } from "react"; 
import "./css files/home_page_inside_body.css"; 

function HomePageInsideBody() {
  const [isFacultiesOpen, setIsFacultiesOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const toggleFaculties = () => setIsFacultiesOpen(!isFacultiesOpen);
  const toggleLibrary = () => setIsLibraryOpen(!isLibraryOpen);

  return (
    <section className="inside">
        <h1>Course and Lecture Details</h1>
                <button onClick={toggleFaculties} className="couresesButton">
                Courses {isFacultiesOpen ? "▼" : "▶"}
                </button>
                {isFacultiesOpen && (
                <ul className="list">
                    <li>
                    <a href="/industrial-management">Department of Industrial Management</a>
                    </li>
                    <li>
                    <a href="/physics-electronics">Department of Physics & Electronics</a>
                    </li>
                    <li>
                    <a href="/chemistry">Department of Chemistry</a>
                    </li>
                    <li>
                    <a href="/statistics-computer-science">Department of Statistics & Computer Science</a>
                    </li>
                    <li>
                    <a href="/mathematics">Department of Mathematics</a>
                    </li>
                    <li>
                    <a href="/zoology-environmental-management">Department of Zoology and Environmental Management</a>
                    </li>
                    <li>
                    <a href="/plant-molecular-biology">Department of Plant and Molecular Biology</a>
                    </li>
                    <li>
                    <a href="/microbiology">Department of Microbiology</a>
                    </li>
                    <li>
                    <a href="/software-engineering-unit">Software Engineering Teaching Unit</a>
                    </li>
                    <li>
                    <a href="/sports-exercise-science">Sports & Exercise Science Unit</a>
                    </li>
                    <li>
                    <a href="/miscellaneous">Miscellaneous</a>
                    </li>
                </ul>
                )}

            <div className="lecturers">
                <button onClick={toggleLibrary} className="lecturersButton">
                Lecturers {isLibraryOpen ? "▼" : "▶"}
                </button>
                {isLibraryOpen && (
                <ul className="list">
                    <li>
                    <a href="/lecturers/dasun-navidu">Dasun Navidu</a>
                    </li>
                    <li>
                    <a href="/lecturers/kalana-missaka">Kalana Missaka</a>
                    </li>
                </ul>
                )}
            </div>
    </section>
  );
}

export default HomePageInsideBody;
