import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './UserNav.css';

function UserNav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile/getProfile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Assuming you store the token in localStorage
          }
        });
        setUser(response.data.user);
      } catch (error) {
        setError('Error fetching user profile');
      } finally {
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
    <nav className="user-nav">
      <div className="brand">
        <Link to="/home" className="uleftitemtext">MonageX</Link>
      </div>
      <div className="user-nav-right">
        <div className="uc">
          <ul className="user-list">
            <li>
              <Link to="/home" className="urightText">
                Home
              </Link>
            </li>
            <li>
              <Link to="/income" className="urightText">
                Record Transaction
              </Link>
            </li>
            <li>
              <Link to="/view" className="urightText">
                View Transaction
              </Link>
            </li>
            <li>
                <Link to="/group" className="urightText">
                  Groups
                </Link>
              </li>
                <li>
                  <Link to="/notifications" className="urightText">
                    Friends
                  </Link>
                </li>
                <li>
                  <Link to="/split" className="urightText">
                    Split/Settle
                  </Link>
                </li>
          </ul>
          </div>
          <div className="uham" onClick={toggleDropdown}>
            ☰
          </div>
          {showDropdown && (
            <div className="user-ham-dropdown">
              <ul className="user-ham-menu-list">
                <li>
                  <Link to="/home" onClick={toggleDropdown}>
                    Home
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
            {user && user.profilePhoto ? (
              <img
              src={`http://localhost:5000/uploads/${user.profilePhoto}`}
              alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '4px solid #fff',
                  borderRadius: '50%',
                  }}
                  />
                  ) : (
                    <img src="/images/noAvatar.png" alt="Profile" style={{ width: '100%', height: '100%' }} />
                    )}
          </Avatar>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={closeAvatarMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
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
                    Homepage
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

export default UserNav;
