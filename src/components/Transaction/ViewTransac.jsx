import React from "react";
import UserNav from "../User/UserNav";
import Sidebar from "../Sidebar";
// import ViewTransacForm from "./ViewTransacForm";
import Footer from "../Footer";
import './ViewTransac.css';
// import TransNav from "./TransNav";
import Graph from "./Graph";

function ViewTransac() {
    return (
        <div className="view-container">
                <UserNav/>
            <div className="view-content">
                <Sidebar  />
                <Graph />
            </div>
            <Footer />
        </div>
    );
}

export default ViewTransac;
