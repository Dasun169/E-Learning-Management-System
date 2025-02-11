import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css files/home_page_inside.css";
import Header from "../headerHome/HeaderHome";
import HomePageInsideBody from "./home_page_inside_body";
import Footer from "../footer/Footer";

const HomePageInside = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, role } = location.state || {};

  useEffect(() => {
    const handleNavigation = (event) => {
      if (event.state && event.state.fromHomePageInside) {
        return; // Already handled by StudentHome receiving the state
      }

      if (!event.state || !event.state.fromHomePageInside) {
        navigate("/studentHome", { state: { username, role } });
      }
    };

    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [navigate, username, role]);

  return (
    <div className="home-page-inside-container">
      <Header username={username} role={role} />
      <HomePageInsideBody username={username} role={role} />
      <Footer />
    </div>
  );
};

export default HomePageInside;
