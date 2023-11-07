import React from "react";
import './income.css';
import Sidebar from "../Sidebar";
import Transac from "./Transac";
import Content from "./content";

function Income() {
    return (
        <>
            <div className="a">
                <Sidebar />
                <Content />
            </div>
        </>
    )
};

export default Income;