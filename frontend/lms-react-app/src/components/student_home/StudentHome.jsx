import React, { useEffect, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import axios from "axios";
import "./css files/studentHome.css";
import Body from "./Body";
import HeaderHome from "../headerHome/HeaderHome";
import Footer from "../footer/Footer";

const StudentHome = () => {
  const location = useLocation();
  const { username, role } = location.state || {};
  const navigationType = useNavigationType();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (username) {
      if (navigationType === "POP" || navigationType === "PUSH") {
        axios
          .get(`http://localhost:8080/api/users/${username}`)
          .then((response) => {
            setUserData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
        console.log("Other navigation type:", navigationType);
      }
    } else {
      setUserData(null);
    }
  }, [username, navigationType]);

  return (
    <div>
      <HeaderHome username={username} role={role} />
      {userData && (
        <Body username={username} role={role} fullName={userData.fullName} />
      )}
      <Footer />
    </div>
  );
};

export default StudentHome;
