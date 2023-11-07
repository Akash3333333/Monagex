import React from "react";
import "./content.css";
import TransNav from "./TransNav";
import IncomeForm from "./IncomeForm";

function Content() {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <TransNav />
                <IncomeForm />
            </div>
        </div>
    )
};

export default Content;