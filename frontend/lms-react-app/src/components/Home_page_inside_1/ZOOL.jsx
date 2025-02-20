import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../headerHome/HeaderHome";
import Footer from "../footer/Footer";
import Zool from "./ZOOL_body";

const ZOOL_New = () => {
  const location = useLocation();
  const userName = location.state?.username || "Guest"; 
  const role = location.state?.role || "Student";

  return (
    <div className="student-home-container">
      <Header username={userName} role={role} />
      <Zool userName={userName} role={role} />
      <Footer />
    </div>
  );
};

export default ZOOL_New;
