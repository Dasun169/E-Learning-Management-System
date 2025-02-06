import React from 'react'
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import ProfileBody from './profile_body.jsx';

function Profile() {
  return (
    <div>
       <Header />
       <ProfileBody />
       <Footer /> 
    </div>
  )
}

export default Profile;
