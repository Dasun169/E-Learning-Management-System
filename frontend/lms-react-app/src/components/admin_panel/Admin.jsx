import React, { useState } from "react";
import Lecturer from "./Lecturer";
import Course from "./Course";
import DeleteLecturer from "./DeleteLecturer";
import DeleteCourse from "./DeleteCourse";
import LecturerRegistration from "./LecturerRegistration";
import DeleteRegistration from "./DeleteRegistration";
import GetAllCourses from "./GetAllCourses";
import GetAllLecturers from "./GetAllLecturers";
import Register from "./Registration";
import AdminResultBody from "../admin_result/AdminResultBody";
import AdminResult from "./AdminResult";
import AdminHistory from "./AdminHistory";
import "./css files/Admin.css";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Admin() {
  const [activeForm, setActiveForm] = useState(null);
  const location = useLocation();
  const { username, role } = location.state || {};
  const adminUserName = username;

  return (
    <>
      <div className="container">
        <div className="left-nav-bar div1">
          <h1>DashBoard</h1>
          <div className="nav-bar5">
            <ul>
              <li>
                <a
                  href="#lecturer"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("lecturer");
                  }}
                >
                  Add a User
                </a>
              </li>
              <li>
                <a
                  href="#course"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("course");
                  }}
                >
                  Add a Course
                </a>
              </li>
              <li>
                <a
                  href="#deleteLecturer"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("deleteLecturer");
                  }}
                >
                  Delete a User
                </a>
              </li>
              <li>
                <a
                  href="#deleteCourse"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("deleteCourse");
                  }}
                >
                  Delete a Course
                </a>
              </li>
              <li>
                <a
                  href="#lecturerRegistration"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("lecturerRegistration");
                  }}
                >
                  Lecturer Registration
                </a>
              </li>
              <li>
                <a
                  href="#deleteRegistration"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("deleteRegistration");
                  }}
                >
                  Delete Registration
                </a>
              </li>
              <li>
                <a
                  href="#getAllCourses"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("getAllCourses");
                  }}
                >
                  See all courses
                </a>
              </li>
              <li>
                <a
                  href="#getAllLecturers"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("getAllLecturers");
                  }}
                >
                  See all lecturers
                </a>
              </li>
              <li>
                <a
                  href="#adminResult"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("adminResult");
                  }}
                >
                  Add Results
                </a>
              </li>
              <li>
                <a
                  href="#adminHistory"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("adminHistory");
                  }}
                >
                  LMS Activity
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="right-bar div2">
          <div className="header">
            <div className="logo">
              <img src="./Images/studentHome/logoWithText.png" alt="" />
            </div>
            <div className="topic">
              <h1>Admin Panel</h1>
            </div>
            <div className="logout-button">
              <div className="circle-setting">
                <Link to="/">
                  <img src="./Images/box-arrow-right.svg" alt="Go to Home" />
                </Link>
              </div>
            </div>
          </div>

          <div className="admin-body">
            <div className="left-admin-body">
              <div className="add-lecturer add-box">
                <div className="lecture-logo">
                  <a
                    href="#lecturer"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveForm("lecturer");
                    }}
                  >
                    <img src="./Images/add-user.jpg" alt="" />
                  </a>
                </div>
                <div className="lecture-title">
                  <span id="lecturer-text">
                    <a
                      href="#lecturer"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveForm("lecturer");
                      }}
                    >
                      Add a User
                    </a>
                  </span>
                </div>
              </div>

              <div className="add-course add-box">
                <div className="course-logo">
                  <a
                    href="#course"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveForm("course");
                    }}
                  >
                    <img src="./Images/add-course.jpg" alt="" />
                  </a>
                </div>
                <div className="course-title">
                  <span id="course-text">
                    <a
                      href="#course"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveForm("course");
                      }}
                    >
                      Add a Course
                    </a>
                  </span>
                </div>
              </div>
              <div className="add-course add-box">
                <div className="course-logo1">
                  <a
                    href="#adminResult"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveForm("adminResult");
                    }}
                  >
                    <img src="./Images/add-result.jpg" alt="" />
                  </a>
                </div>
                <div className="course-title1">
                  <span id="course-text1">
                    <a
                      href="#adminResult"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveForm("adminResult");
                      }}
                    >
                      Add Result
                    </a>
                  </span>
                </div>
              </div>
              <div className="add-course add-box">
                <div className="course-logo">
                  <a
                    href="#deleteLecturer"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveForm("deleteLecturer");
                    }}
                  >
                    <img src="./Images/delete-user.jpg" alt="" />
                  </a>
                </div>
                <div className="course-title">
                  <span id="course-text">
                    <a
                      href="#deleteLecturer"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveForm("deleteLecturer");
                      }}
                    >
                      Delete a User
                    </a>
                  </span>
                </div>
              </div>
              <div className="add-course add-box">
                <div className="course-logo">
                  <a
                    href="#deleteCourse"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveForm("deleteCourse");
                    }}
                  >
                    <img src="./Images/course-delete.png" alt="" />
                  </a>
                </div>
                <div className="course-title">
                  <span id="course-text">
                    <a
                      href="#deleteCourse"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveForm("deleteCourse");
                      }}
                    >
                      Delete a Course
                    </a>
                  </span>
                </div>
              </div>
              <div className="add-course add-box">
                <div className="course-logo1">
                  <a
                    href="#adminHistory"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveForm("adminHistory");
                    }}
                  >
                    <img src="./Images/user-activity.jpg" alt="" />
                  </a>
                </div>
                <div className="course-title1">
                  <span id="course-text1">
                    <a
                      href="#adminHistory"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveForm("adminHistory");
                      }}
                    >
                      Admin History
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="right-admin-body">
              <img src="./Images/admin-panel.png" alt="" />
            </div>
          </div>

          <div className="details-display">
            {activeForm === "lecturer" && (
              <Lecturer loggedInUserRole={role} adminUserName={adminUserName} />
            )}
            {activeForm === "course" && (
              <Course loggedInUserRole={role} adminUserName={adminUserName} />
            )}
            {activeForm === "deleteLecturer" && (
              <DeleteLecturer
                loggedInUserRole={role}
                adminUserName={adminUserName}
              />
            )}
            {activeForm === "deleteCourse" && (
              <DeleteCourse
                loggedInUserRole={role}
                adminUserName={adminUserName}
              />
            )}
            {activeForm === "lecturerRegistration" && (
              <LecturerRegistration
                loggedInUserRole={role}
                adminUserName={adminUserName}
              />
            )}
            {activeForm === "deleteRegistration" && (
              <DeleteRegistration
                loggedInUserRole={role}
                adminUserName={adminUserName}
              />
            )}
            {activeForm === "adminResult" && (
              <AdminResult
                loggedInUserRole={role}
                adminUserName={adminUserName}
              />
            )}
            {activeForm === "register" && <Register />}
            {activeForm === "getAllCourses" && <GetAllCourses />}
            {activeForm === "getAllLecturers" && <GetAllLecturers />}
            {activeForm === "adminResultBody" && <AdminResultBody />}
            {activeForm === "adminHistory" && <AdminHistory />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
