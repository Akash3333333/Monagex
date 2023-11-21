import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import "./TransNav.css";

function TransNav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, []);

  const openAvatarMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeAvatarMenu = () => {
    setAnchorEl(null);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="trans-nav">
      <div className="leftitems">
        <Link to="/" className="leftitemtext">
          MonageX
        </Link>
      </div>
      <div className="trans-nav-right">
        <div className="rc">
          <ul className="trans-list">
            <li>
              <Link to="/income" className="rightText">
                Income
              </Link>
            </li>
            <li>
              <Link to="/expense" className="rightText">
                Expense
              </Link>
            </li>
            <li>
              <Link to="/transfer" className="rightText">
                Transfer
              </Link>
            </li>
          </ul>
          </div>
          <div className="ham" onClick={toggleDropdown}>
            ☰
          </div>
          {showDropdown && (
            <div className="ham-dropdown">
              <ul className="ham-menu-list">
                <li>
                  <Link to="/" onClick={toggleDropdown}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/income" onClick={toggleDropdown}>
                    Record Transaction
                  </Link>
                </li>
                <li>
                  <Link to="/view" onClick={toggleDropdown}>
                    View Transaction
                  </Link>
                </li>
                <li>
                  <Link to="/group" onClick={toggleDropdown}>
                    Group
                  </Link>
                </li>
                <li>
                  <Link to="/notifications" onClick={toggleDropdown}>
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link to="/split" onClick={toggleDropdown}>
                    Split Expenses
                  </Link>
                </li>
              </ul>
            </div>
          )}
        
        <div className="avatar1">
          <div className="avatar-container">
            <Avatar onClick={openAvatarMenu} className="user-avatar">
              {user.profilePhoto ? (
                <img
                  src={`http://localhost:5000/uploads/${user.profilePhoto}`}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    border: "4px solid #fff",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <img src="/default-avatar.png" alt="Profile" />
              )}
            </Avatar>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={closeAvatarMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <div className="avatar-menu">
                <Typography className="avatar-menu-title"></Typography>
                <ul className="avatar-menu-list">
                  <li>
                    <Link to="/profile" onClick={closeAvatarMenu}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={closeAvatarMenu}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/logout" onClick={closeAvatarMenu}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TransNav;
