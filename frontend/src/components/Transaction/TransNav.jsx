import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar"; // Material-UI Avatar component
import Popover from "@mui/material/Popover"; // Material-UI Popover component
import Typography from "@mui/material/Typography"; // Material-UI Typography component
import axios from "axios"; // Axios for making HTTP requests
import "./TransNav.css"; // CSS file for styling TransNav component


function TransNav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://monagex-backend.vercel.app/api/profile/getProfile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Assuming you store the token in localStorage
          }
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
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
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <nav className="trans-nav">
      <div className="leftitems">
        <Link to="/home" className="leftitemtext">
          MonageX
        </Link>
      </div>
      <div className="trans-nav-right">
        <div className="rc">
          <ul className="trans-list">
          <li>
              <Link to="/home" className="rightText">
                Home
              </Link>
            </li>
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
                  <Link to="/home" onClick={toggleDropdown}>
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
                 
                src={`https://monagex-backend.vercel.app/uploads/${user.profilePhoto}`}
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
                    <Link to="/home" onClick={closeAvatarMenu}>
                      Home
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
