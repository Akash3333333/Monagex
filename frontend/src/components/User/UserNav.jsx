import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserNav.css';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function UserNav() {
  const [anchorEl, setAnchorEl] = useState(null);

  const openAvatarMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeAvatarMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className="user-nav">
      <div className="user-nav-container">
        <Link className="brand" to="/">
          Monagex
        </Link>
      </div>
      <div className="user-nav-right">
        <div className="avatar-container">
          <Avatar onClick={openAvatarMenu} className="user-avatar">
            {/* You can display the user's initials or profile picture here */}
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
