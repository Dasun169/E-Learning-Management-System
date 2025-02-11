import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../headerHome/HeaderHome";
import Footer from "../footer/Footer";
import StatCs from "./STAT_CS_body";

const StatCsNew = () => {
  const location = useLocation();
  const userName = location.state?.username || "Guest"; // Default to "Guest" if userName is not provided
  const role = location.state?.role || "Student";

  return (
    <div className="student-home-container">
      <Header username={userName} role={role} />
      <StatCs userName={userName} role={role} />
      <Footer />
    </div>
  );
};

export default StatCsNew;
