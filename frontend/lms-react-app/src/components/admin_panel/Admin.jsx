import React, { useState } from "react";
import Lecturer from "./Lecturer";
import Course from "./Course";
import DeleteLecturer from "./DeleteLecturer";
import DeleteCourse from "./DeleteCourse";
import "./css files/Admin.css";
import img1 from "./Images/Leanify1.png";

function Admin() {
  const [activeForm, setActiveForm] = useState(null);
  return (
    <>
      <div className="container">
        <div className="left-nav-bar div1">
          <div className="minimize-bar">
            <a href="">
              <img src="./Images/list.svg" alt="" />
            </a>
          </div>
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
                <a href="">See all courses</a>
              </li>
              <li>
                <a href="">See all courses</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-bar div2">
          <div className="header">
            <div className="logo">
              <img src={img1} alt="" />
            </div>
            <div className="topic">
              <h1>Admin Panel</h1>
            </div>
            <div className="logout-button">
              <div className="circle-setting">
                <a href="">
                  <img src="./Images/box-arrow-right.svg" alt="" />
                </a>
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
                      Add a <br /> Lecturer
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
                      Add a <br /> Course
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
