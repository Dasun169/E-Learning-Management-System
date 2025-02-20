import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../headerHome/HeaderHome";
import Footer from "../footer/Footer";
import ElecPhy from "./ELEC_PHY_body";

const ElecPhyNew = () => {
  const location = useLocation();
  const userName = location.state?.username || "Guest"; 
  const role = location.state?.role || "Student";

  return (
    <div className="student-home-container">
      <Header username={userName} role={role} />
      <ElecPhy userName={userName} role={role} />
      <Footer />
    </div>
  );
};

export default ElecPhyNew;
