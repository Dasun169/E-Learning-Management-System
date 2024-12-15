import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css files/Home.css";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if username and password match "admin" and "admin1234"
    if (username === "admin" && password === "admin1234") {
      navigate("/Admin"); // Redirect to Admin page
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>
      <div className="body">
        <div className="image-section">
          <img src="./Images/login/pic4.png" alt="" />
        </div>
        <div className="form-section">
          <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="label">
                User Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input"
                placeholder="Enter your user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label htmlFor="role" className="label">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
              </select>

              <div className="forgot-password">
                <a href="/forgot_password">Forgot Password?</a>
              </div>

              <button type="submit" id="home-button">
                Login
              </button>
            </form>
            <div className="signup">
              <p>
                Don't have an account? <Link to="/Registration">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
