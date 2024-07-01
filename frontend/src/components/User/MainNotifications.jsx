import React from "react";
import Notifications from "./Notifications";
import Footer from "../Footer";
import './MainNotifications.css';
import UserNav from "./UserNav";

function MainNotifications() {
  
  return (
    <div className="notify-container">
      <UserNav />
      <div className="notify-content">
        <Notifications />
      </div>
      <Footer />
    </div>
  );
};

export default MainNotifications;
