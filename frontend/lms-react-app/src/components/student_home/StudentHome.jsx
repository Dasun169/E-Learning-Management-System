import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
import "./css files/studentHome.css";
import Body from "./Body";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const StudentHome = () => {
  const location = useLocation();
  const { username } = location.state || {}; // Retrieve the username from the state passed via navigate

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // If we have the username, fetch user data from the backend
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
      {/* Pass both username and fullName as props to the Body component */}
      {userData && <Body username={username} fullName={userData.fullName} />}
      <Footer />
    </div>
  );
};

export default StudentHome;
