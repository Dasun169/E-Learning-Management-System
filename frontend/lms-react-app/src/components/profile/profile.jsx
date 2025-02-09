import React from "react";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import ProfileBody from "./profile_body.jsx";
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const { username, role } = location.state || {};

  return (
    <div>
      <Header />
      <ProfileBody username={username} role={role} />
      <Footer />
    </div>
  );
}

export default Profile;
