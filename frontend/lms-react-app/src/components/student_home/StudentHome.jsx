import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./css files/studentHome.css";
import Body from "./Body";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const StudentHome = () => {
  const location = useLocation();
  const { username, role } = location.state || {}; // Retrieve username and role from state passed via navigate

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data based on the username
    if (username) {
      axios
        .get(`http://localhost:8080/api/users/${username}`)
        .then((response) => {
          setUserData(response.data); // Set the fetched user data
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [username]);

  return (
    <div>
      <Header />
      {/* Pass username and role as props to the Body component */}
      {userData && (
        <Body username={username} role={role} fullName={userData.fullName} />
      )}
      <Footer />
    </div>
  );
};

export default StudentHome;
