import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/deleteLecturer.css";

const DeleteLecturer = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const lecturer = "lecturer";

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!userName) {
      setError("User Name is required.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const checkResponse = await axios.get(
        `http://localhost:8080/api/users/role/${lecturer}/userName/${userName}`
      );

      if (checkResponse.status === 200) {
        const deleteResponse = await axios.delete(
          `http://localhost:8080/api/users/${userName}/${lecturer}`
        );

        if (deleteResponse.status === 204) {
          toast.success("Lecturer deleted successfully!", {
            className: "custom-toast",
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setUserName("");
        }
      }
    } catch (err) {
      toast.error(error || "Error: Unable to delete the lecturer.", {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
     
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="deleteLecturer-table">
        <h2>Delete Lecturer Account</h2>
        <form onSubmit={handleDelete}>
          <div className="div-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>User Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="ex: jhond20133"
                      disabled={loading}
                    />
                  </td>
                </tr>
                {error && (
                  <tr>
                    <td colSpan={2}>
                      <div style={{ color: "red" }}>{error}</div>
                    </td>
                  </tr>
                )}
                {message && (
                  <tr>
                    <td colSpan={2}>
                      <div style={{ color: "green" }}>{message}</div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={2} id="submit-button">
                    <button type="submit">Delete Lecturer</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeleteLecturer;
