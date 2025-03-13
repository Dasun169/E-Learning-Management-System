import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/deleteLecturer.css";

const DeleteLecturer = ({ loggedInUserRole, adminUserName }) => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState("lecturer");

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
      const canDeleteRole = (targetRole) => {
        if (loggedInUserRole === "administrator") {
          return true; // Admin can delete any role
        } else if (loggedInUserRole === "admin") {
          return targetRole !== "administrator" && targetRole !== "admin"; // Admin can't delete other admins or administrators
        }
        return false; // Other roles cannot delete
      };

      if (!canDeleteRole(selectedRole)) {
        throw new Error(
          `You do not have permission to delete a ${selectedRole}.`
        );
      }

      const checkResponse = await axios.get(
        `http://localhost:8080/api/users/role/${selectedRole}/userName/${userName}`
      );

      if (checkResponse.status === 200) {
        const deleteResponse = await axios.delete(
          `http://localhost:8080/api/users/${userName}/${selectedRole}`
        );

        if (deleteResponse.status === 204) {
          toast.success(`${selectedRole} deleted successfully!`, {
            className: "custom-toast",
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          try {
            await axios.post("http://localhost:8080/api/adminHistory", null, {
              params: {
                userName: adminUserName,
                role: loggedInUserRole,
                action: `Deleted ${selectedRole}: '${userName}' successfully`, // Updated action message
              },
            });
            console.log("Admin history updated successfully");
          } catch (historyError) {
            console.error("Error updating admin history:", historyError);
            toast.error(
              "Failed to update admin history. Please contact admin.",
              {
                className: "custom-toast",
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }

          setUserName("");
        }
      }
    } catch (err) {
      toast.error(error || `Error: Unable to delete the ${selectedRole}.`, {
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
        <h2>Delete User Account</h2>
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
                <tr>
                  <td>
                    <label>Role:</label>
                  </td>
                  <td>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      disabled={loading}
                    >
                      <option value="student">Student</option>
                      <option value="lecturer">Lecturer</option>
                      {loggedInUserRole === "administrator" && (
                        <option value="admin">Admin</option>
                      )}
                    </select>
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
