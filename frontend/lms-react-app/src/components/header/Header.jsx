import React from "react";
import "./header.css";

function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-logo1">
        <img
          className="navbar-logo1-img"
          src="./Images/studentHome/logoWithText.png"
          alt="logo"
        />
      </div>

      {/* <div className="navbar-search">
        <input type="text" placeholder="Search..." className="search-input" />
      </div> */}
    </nav>
  );
}

export default Header;
