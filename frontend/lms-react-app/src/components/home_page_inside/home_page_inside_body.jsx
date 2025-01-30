import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css files/home_page_inside_body.css";

function HomePageInsideBody() {
  const location = useLocation();
  const { username } = location.state || {};

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path, { state: { username } });
  };

  return (
    <section className="inside">
      <h1>Faculty of Science (Courses Enrollment)</h1>
      <div className="inside-inside">
        <h2>Departments</h2>
        <ul className="list">
          <li>
            <button onClick={() => navigateTo("/StatCsNew")}>
              Department of Statistics & Computer Science
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/MathsNew")}>
              Department of Mathematics
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/ElecPhyNew")}>
              Department of Physics & Electronics
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/industrial-management")}>
              Department of Industrial Management
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/chemistry")}>
              Department of Chemistry
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("/zoology-environmental-management")}
            >
              Department of Zoology and Environmental Management
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/plant-molecular-biology")}>
              Department of Plant and Molecular Biology
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/microbiology")}>
              Department of Microbiology
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/software-engineering-unit")}>
              Software Engineering Teaching Unit
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/sports-exercise-science")}>
              Sports & Exercise Science Unit
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/miscellaneous")}>
              Miscellaneous
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default HomePageInsideBody;
