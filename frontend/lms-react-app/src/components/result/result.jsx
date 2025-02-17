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
    const handleNavigation = (event) => {
      if (event.state && event.state.fromResultPage) {
        return;
      }
      if (!event.state || !event.state.fromResultPage) {
        navigate("/studentHome", { state: { username, role } });
      }
    };

    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [navigate, username, role]);

  return (
    <div className="result-page-inside-container">
      <Header username={username} role={role} />
      <ResultBody username={username} />
      <Footer />
    </div>
  );
}

export default ResultPage;
