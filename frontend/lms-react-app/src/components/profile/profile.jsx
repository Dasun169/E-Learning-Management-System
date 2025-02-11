import React, { useEffect } from "react";
import Header from "../headerHome/HeaderHome";
import Footer from "../footer/Footer";
import ProfileBody from "./profile_body";
import { useLocation, useNavigate } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, role } = location.state || {};

  useEffect(() => {
    const handleNavigation = (event) => {
      if (event.state && event.state.fromProfilePage) {
        return; // Already handled by StudentHome receiving the state
      }

      if (!event.state || !event.state.fromProfilePage) {
        navigate("/studentHome", { state: { username, role } });
      }
    };

    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [navigate, username, role]);

  return (
    <div>
      <Header username={username} role={role} />
      <ProfileBody username={username} role={role} />
      <Footer />
    </div>
  );
}

export default Profile;
