import React from "react";
import "./css files/Registration.css";

function Registration() {
  return (
    <div className="body">
      <div className="image-section">
        <img src="./Images/registration/pic.png" alt="Student" />
      </div>
      <div className="form-section">
        <div className="form-container">
          <h2>Student Registration</h2>
          <form action="/submit_registration" method="post">
            <label className="label-text" htmlFor="name">
              Full Name:
            </label>
            <input
              className="input-field"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
            />

            <label className="label-text" htmlFor="email">
              Email:
            </label>
            <input
              className="input-field"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
            />

            <label className="label-text" htmlFor="password">
              Password:
            </label>
            <input
              className="input-field"
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              required
            />

            <label className="label-text" htmlFor="image">
              Image:
            </label>
            <input
              className="image-input"
              type="file"
              id="image"
              name="image"
              required
            />

            <label className="label-text" htmlFor="phone">
              Phone Number:
            </label>
            <input
              className="input-field"
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              required
            />

            <label className="label-text" htmlFor="course">
              Course:
            </label>
            <input
              className="input-field"
              type="text"
              id="course"
              name="course"
              placeholder="Enter the course you're registering for"
              required
            />

            <button className="submit-button" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
