import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../headerHome/HeaderHome";
import Footer from "../footer/Footer";
import ResultBody from "./result_body";
import "./css files/result.css";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, role } = location.state || {};

  useEffect(() => {
    // This effect runs when the component mounts AND when the location changes
    const handleNavigation = (event) => {
      if (event.state && event.state.fromResultPage) {
        // Check if we came from ResultPage
        // If the user went back from ResultPage, we don't need to do anything.
        // The StudentHome component will receive the correct state automatically.
        return;
      }
      if (!event.state || !event.state.fromResultPage) {
        // If the user did not came from ResultPage, then navigate to Student Home page.
        navigate("/studentHome", { state: { username, role } });
      }
    };

    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [navigate, username, role]); // Add navigate, username, and role to the dependency array

  return (
    <div className="result-page-inside-container">
      <Header username={username} role={role} />
      <ResultBody username={username} />
      <Footer />
    </div>
  );
}

export default ResultPage;
