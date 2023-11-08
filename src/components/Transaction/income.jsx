import React from "react";
import UserNav from "../User/UserNav";
import Sidebar from "../Sidebar";
import IncomeForm from "./IncomeForm";
import Footer from "../Footer";
import './income.css';
import TransNav from "./TransNav";

function Income() {
    return (
        <div className="income-container">
                <TransNav/>
            <div className="income-content">
                <Sidebar  />
                <IncomeForm />
            </div>
            <Footer />
        </div>
    );
}

export default Income;
