import React from "react";
import ExpenseContent from "./ExpenseContent";
import Sidebar from "../Sidebar";

function Expense()
{
    return(
        <>
            <div className="a">
                <Sidebar />
                <ExpenseContent />
            </div>
        </>
    )
};

export default Expense;