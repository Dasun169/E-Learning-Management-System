import React from "react";
import "./css files/profile_body.css";

function Profile() {
  return (
    <section className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-pic">
            <img src="./Images/lock.png" alt="Profile" className="profile-image" />
          </div>
          <h2 className="profile-id">PS/2020/020 - MADHUKSHA S.T.D.</h2>
          <button className="edit-button">Edit Profile</button>
        </div>
        <div className="profile-details">
          <h3 className="details-heading">User Details</h3>
          <ul className="details-list">
            <li>
              <span>Email Address:</span> madhuks-ps2020@stu.kln.ac.lk
            </li>
            <li>
              <span>Country:</span> Sri Lanka
            </li>
            <li>
              <span>City/Town:</span> Galle
            </li>
            <li>
              <span>Timezone:</span> Asia/Colombo
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Profile;
