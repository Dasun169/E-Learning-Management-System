import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Maths from "./MATHS_body.jsx";

const MathsNew = () => {
  const location = useLocation();
  const userName = location.state?.username || "Guest"; // Default to "Guest" if userName is not provided

  return (
    <div className="student-home-container">
      <Header />
      <Maths userName={userName} />
      <Footer />
    </div>
  );
};

export default MathsNew;