import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './UserNav.css';

function UserNav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
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

  return (
    <div className="user-nav">
      <div className="user-nav-container">
        <Link className="brand" to="/home">
          MonageX
        </Link>
      </div>
      <div className="user-nav-right">
        <div className="user">
          <ul className="user-menu-list">
            <li>
              <Link to="/home">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/income">
                Record Transaction
              </Link>
            </li>
            <li>
                  <Link to="/view" >
                  View Transaction
                  </Link>
                </li>
                <li>
                  <Link to="/group" >
                  Group
                  </Link>
                </li>
                <li>
                  <Link to="/notifications" >
                  Notifications
                  </Link>
                </li>
                <li>
                  <Link to="/split" >
                  Split Expenses
                  </Link>
                </li>
          </ul>
        </div>
        <div className="avatar-container">
          <Avatar
            onClick={openAvatarMenu}
            className="user-avatar"
          >
            {user.profilePhoto ? (
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
              <img src="/images/noAvatar.png" alt="Profile" style={{  width: '100%',
              height: '100%'}} />
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
  );
}

export default UserNav;
