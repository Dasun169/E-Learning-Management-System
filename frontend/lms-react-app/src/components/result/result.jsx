import React from "react";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import ResultBody from "./result_body.jsx";
import "./css files/result.css";

function ResultPage() {
  return (
    <div className="result-page-inside-container">
      <Header />
      <ResultBody />
      <Footer />
    </div>
  );
}

export default ResultPage;
