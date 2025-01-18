import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./css files/Home.css";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          username: username,
          password: password,
          role: role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful login response from the backend
      if (response.status === 200) {
        toast.success("Login successful!", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirect based on the role after successful login
        if (role === "admin") {
          setTimeout(() => navigate("/Admin"), 2000);
        } else if (role === "student" || role === "lecturer") {
          setTimeout(() => {
            navigate("/StudentHome", { state: { username: username } });
          }, 2000);
        }
      }
    } catch (error) {
      // Handle login failure
      if (error.response && error.response.data) {
        toast.error(error.response.data, {
          className: "custom-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Login failed. Please try again.", {
          className: "custom-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="body">
        <div className="form-section">
          <div className="form-container">
            <div className="navbar-logo">
              <img src="./Images/login/logo.jpg" alt="logo" />
              <h1>L-Education</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="label">
                User Name :
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
                Password :
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
                Role :
              </label>
              <select
                id="role"
                name="role"
                className="input1"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option>
              </select>

              <div className="forgot-password">
                <a href="/forgot_password">Forgot Password?</a>
              </div>

              <button type="submit" id="home-button">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="image-section">
          <img src="./Images/login/pic4.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default Home;
