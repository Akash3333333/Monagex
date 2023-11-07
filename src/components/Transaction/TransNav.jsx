import React from "react";
import { Link } from "react-router-dom";

function TransNav()
{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div>
                <Link className="navbar-brand" to="/income">Income</Link>
                <Link className="navbar-brand" to="/expense">Expense</Link>
                <Link className="navbar-brand" to="/Transfer">Transfer</Link>
            </div>
        </nav>
    )
};

export default TransNav;