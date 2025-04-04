import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import bcrypt from "bcryptjs"; // Import bcryptjs
import "./css files/Home.css";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Logging in with:", { username, role });

      // Fetch user data from the server
      const response = await axios.get(
        `http://localhost:8080/api/users/role/${role}/userName/${username}`
      );

      const user = response.data;
      console.log("User fetched:", user);

      // Compare the entered password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.hashPassword);

      if (isPasswordValid) {
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

        setTimeout(() => {
          if (role === "admin" || role === "administrator") {
            navigate("/Admin", {
              state: { username: username, role: role },
            });
          } else {
            navigate("/StudentHome", {
              state: { username: username, role: role },
            });
          }
        }, 2000);
      } else {
        toast.error("Invalid password. Please try again.", {
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
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("User not found or invalid username/role.", {
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
  };

  return (
    <>
      <ToastContainer />
      <div className="body">
        <div className="form-section">
          <div className="form-container">
            <div className="navbar-logo2">
              <img src="./Images/studentHome/logoWithText.png" alt="logo" />
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
              <div className="password-input-container1">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  id="password"
                  name="password"
                  className="input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-button1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>

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
                <option value="administrator">Administrator</option>
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
