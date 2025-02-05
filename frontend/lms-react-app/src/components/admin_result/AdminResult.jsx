import React from "react";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import AdminResultBody from "./AdminResultBody.jsx";
import "./css files/AdminResultBody.css";

function ResultPage() {
  return (
    <div className="result-page-inside-container">
      <Header />
      <AdminResultBody />
      <Footer />
    </div>
  );
}

export default ResultPage;
