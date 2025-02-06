import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import StatCs from "./STAT_CS_body.jsx";

const StatCsNew = () => {
  const location = useLocation();
  const userName = location.state?.username || "Guest"; // Default to "Guest" if userName is not provided
  const role = location.state?.role || "Student";

  return (
    <div className="student-home-container">
      <Header />
      <StatCs userName={userName} role={role} />
      <Footer />
    </div>
  );
};

export default StatCsNew;
