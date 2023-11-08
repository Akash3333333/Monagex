import React from "react";
import UserNav from "../User/UserNav";
import Sidebar from "../Sidebar";
import ExpenseForm from "./ExpenseForm";
import Footer from "../Footer";
import './Expense.css';
import TransNav from "./TransNav";

function Expense() {
    return (
        <div className="expense-container">
                <TransNav/>
            <div className="expense-content">
                <Sidebar  />
                <ExpenseForm />
            </div>
            <Footer />
        </div>
    );
}

export default Expense;
