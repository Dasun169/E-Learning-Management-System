import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./css files/home_page_inside.css";
import Header from "../header/Header.jsx";
import HomePageInsideBody from "./home_page_inside_body.jsx";
import Footer from "../footer/Footer.jsx";

const HomePageInside = () => {
  const location = useLocation();
  const { username, role } = location.state || {}; // Retrieve username from state

  return (
    <div className="home-page-inside-container">
      {/* Pass username to Header */}
      <Header />
      <HomePageInsideBody username={username} role={role} />
      <Footer />
    </div>
  );
};

export default HomePageInside;
