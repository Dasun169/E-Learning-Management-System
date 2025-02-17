import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css files/home_page_inside_body.css";

function HomePageInsideBody() {
  const location = useLocation();
  const { username, role } = location.state || {};

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path, { state: { username, role } });
  };

  return (
    <section className="inside1">
      <h1>Faculty of Science (Courses Enrollment)</h1>
      <div className="inside-inside1">
        <h2>Departments</h2>
        <ul className="list">
          <li>
            <button onClick={() => navigateTo("/StatCsNew")}>
              Department of Statistics & Computer Science
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/ElecPhyNew")}>
              Department of Physics & Electronics
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/MathsNew")}>
              Department of Mathematics
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/IM")}>
              Department of Industrial Management
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/ChemNew")}>
              Department of Chemistry
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/ZoolNew")}>
              Department of Zoology and Environmental Management
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/MicroNew")}>
              Department of Microbiology
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/SENew")}>
              Software Engineering
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/SportsNew")}>
              Sports Science
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default HomePageInsideBody;
