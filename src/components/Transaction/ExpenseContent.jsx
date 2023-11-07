import React from "react";
import "./content.css";
import TransNav from "./TransNav";
import ExpenseForm from "./ExpenseForm";

function ExpenseContent() {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <TransNav />
                <ExpenseForm />
            </div>
        </div>
    )
};

export default ExpenseContent;