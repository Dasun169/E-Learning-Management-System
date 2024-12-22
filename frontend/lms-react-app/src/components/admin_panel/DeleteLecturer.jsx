import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css files/deleteLecturer.css";

const DeleteLecturer = () => {
  const [userName, setUserName] = useState(""); // State to hold the userName input value
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(""); // To handle error messages
  const [message, setMessage] = useState(""); // To display success or failure messages

  // Function to handle form submission
  const handleDelete = async (e) => {
    e.preventDefault();

    if (!userName) {
      setError("User Name is required.");
      return;
    }

    setLoading(true); // Set loading to true before making the requests
    setError(""); // Clear any previous errors
    setMessage(""); // Clear any previous success message

    try {
      const checkResponse = await axios.get(
        `http://localhost:8080/api/users/${userName}`
      );

      if (checkResponse.status === 200) {
        const deleteResponse = await axios.delete(
          `http://localhost:8080/api/users/${userName}`
        );

        if (deleteResponse.status === 204) {
          // Show success toast on successful deletion
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

          //setMessage("Lecturer account deleted successfully.");
          setUserName(""); // Clear the input field after successful deletion
        }
      }
    } catch (err) {
      // Step 3: Handle errors (either lecturer not found or unable to delete)
      if (err.response && err.response.status === 404) {
        //setError("Error: Lecturer not found.");
      } else {
        //setError("Error: Unable to delete the lecturer.");
      }

      //setMessage(""); // Clear any previous success message

      // Show error toast
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
      //setLoading(false); // Set loading to false after the request finishes
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
                      disabled={loading} // Disable input while loading
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
                    <button type="submit">Submit</button>
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
