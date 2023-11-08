import React from "react";
import { Link } from "react-router-dom";
import './TransNav.css'; // Create a separate CSS file for styling

function TransNav() {
  return (
    <nav className="trans-nav">
      <div className="leftitems">
        <Link to="/" className="leftitemtext">MonageX</Link>
      </div>
      <div className="trans-nav-items">
        <Link to="/income" className="nav-link">Income</Link>
        <Link to="/expense" className="nav-link">Expense</Link>
        <Link to="/transfer" className="nav-link">Transfer</Link>
      </div>
    </nav>
  );
}

export default TransNav;
