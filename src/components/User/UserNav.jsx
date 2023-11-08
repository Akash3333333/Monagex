import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserNav.css';

function UserNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="user-nav">
      <div className="user-nav-container">
        <Link className="brand" to="/">
          Monagex
        </Link>
      </div>
      <div className="user-nav-right">
        <div className="custom-dropdown">
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/income">Income</Link>
              </li>
              <li>
                <Link to="/expense">Expense</Link>
              </li>
              <li>
                <Link to="/transfer">Transfer</Link>
              </li>
            </ul>
          )}
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            Record Transaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserNav;
