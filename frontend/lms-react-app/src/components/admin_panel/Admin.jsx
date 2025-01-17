import React, { useState } from "react";
import Lecturer from "./Lecturer";
import Course from "./Course";
import DeleteLecturer from "./DeleteLecturer";
import DeleteCourse from "./DeleteCourse";
import LecturerRegistration from "./LecturerRegistration";
import GetAllCourses from "./GetAllCourses";
import GetAllLecturers from "./GetAllLecturers";
import Register from "./Registration"; // Import the Register component
import "./css files/Admin.css";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";

function Admin() {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <>
      <div className="container">
        <div className="left-nav-bar div1">
          <h1>DashBoard</h1>
          <div className="nav-bar">
            <ul>
              <li>
                <a
                  href="#lecturer"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("lecturer");
                  }}
                >
                  Add a Lecturer
                </a>
              </li>
              <li>
                <a
                  href="#register"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("register");
                  }}
                >
                  Add a Student
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
                  Delete a Lecturer
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
                    <img src="./Images/person-add.svg" alt="" />
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
                      Add a Lecturer
                    </a>
                  </span>
                </div>
              </div>
              <div className="add-course add-box">
                <div className="course-logo">
                  <a
                    href="#register"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveForm("register");
                    }}
                  >
                    <img src="./Images/person-add.svg" alt="" />
                  </a>
                </div>
                <div className="course-title">
                  <span id="course-text">
                    <a
                      href="#register"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveForm("register");
                      }}
                    >
                      Add a Student
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
                    <img src="./Images/journals.svg" alt="" />
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
                <div className="course-logo">
                  <a
                    href="#deleteLecturer"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveForm("deleteLecturer");
                    }}
                  >
                    <img src="./Images/journals.svg" alt="" />
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
                      Delete a Lecturer
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
                    <img src="./Images/journals.svg" alt="" />
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
                    href="#lecturerRegistration"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveForm("lecturerRegistration");
                    }}
                  >
                    <img src="./Images/journals.svg" alt="" />
                  </a>
                </div>
                <div className="course-title1">
                  <span id="course-text1">
                    <a
                      href="#lecturerRegistration"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveForm("lecturerRegistration");
                      }}
                    >
                      Lecturer Registration
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
            {activeForm === "lecturer" && <Lecturer />}
            {activeForm === "course" && <Course />}
            {activeForm === "deleteLecturer" && <DeleteLecturer />}
            {activeForm === "deleteCourse" && <DeleteCourse />}
            {activeForm === "lecturerRegistration" && <LecturerRegistration />}
            {activeForm === "register" && <Register />}
            {activeForm === "getAllCourses" && <GetAllCourses />}
            {activeForm === "getAllLecturers" && <GetAllLecturers />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
