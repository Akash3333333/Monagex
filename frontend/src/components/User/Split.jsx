import React, { useEffect, useState } from "react";
import axios from 'axios';
import Notifications from "./Notifications";
import Footer from "../Footer";
import './Split.css';
// import TransNav from "./TransNav";
import Sidebar from "../Sidebar";
import UserNav from "./UserNav";
import SplitGrp from "./SplitGrp";

function Split () {
  

  return (
    <div className="split-container">
      <UserNav />
      <div className="split-content">
        <SplitGrp  />
      </div>
      <Footer />
    </div>
  );
};

export default Split;
