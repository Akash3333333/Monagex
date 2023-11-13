import React from "react";
import UserNav from "../User/UserNav";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import './MainGroup.css';
import Group from "./Group";

function MainGroup() {
    return (
        <div className="mainGroup-container">
                <UserNav/>
            <div className="mainGroup-content">
                <Sidebar  />
                 <Group/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainGroup;