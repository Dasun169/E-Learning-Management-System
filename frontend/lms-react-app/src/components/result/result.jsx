import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import ResultBody from "./result_body.jsx";
import "./css files/result.css";

function ResultPage() {
  const location = useLocation();
  const { username } = location.state || {};
  return (
    <div className="result-page-inside-container">
      <Header />
      <ResultBody username={username} />
      <Footer />
    </div>
  );
}

export default ResultPage;
