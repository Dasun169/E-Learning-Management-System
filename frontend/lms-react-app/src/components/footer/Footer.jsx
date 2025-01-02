import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
         <div className="footer-section-logo">
            <img src="./Images/studentHome/logo.png" alt="logo"/>
        </div>
        <div className="footer-section-about">
          <h3>About Us</h3>
          <p>
            Welcome to Lernify Education, your ultimate learning platform. We are
            committed to delivering quality education to students worldwide.
          </p>
        </div>

        <div className="footer-section-links">
          <h3>Quick Links</h3>
                <p><a href="/home">Home</a></p>
                <p><a href="/course">MY Course</a></p>
                <p><a href="/dashboard">Dash Board</a></p>
                <p><a href="/qae">QAE</a></p>
        </div>

        <div className="footer-section-contact">
          <h3>Contact Us</h3>
          <p>Email: support@LEducation.lk</p>
          <p>Phone: +94 11 2345678</p>
        </div>
      </div>
      <div className="footer-bottom">
          <p>© 2025 Group 03. All Rights Reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
