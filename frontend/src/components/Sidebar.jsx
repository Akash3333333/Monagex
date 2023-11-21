import "./Sidebar.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout"; // Import the LogoutIcon
import ViewListIcon from '@mui/icons-material/ViewList';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" >
            <li className="sidebarListItem">
              <AccountCircleIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Dashboard</span>
            </li>
          </Link>
          <Link to="/income" >
            <li className="sidebarListItem">
              <LibraryBooksOutlinedIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Record Transaction</span>
            </li>
          </Link>
          <Link to="/view" >
            <li className="sidebarListItem">
              <ViewListIcon className="sidebarIcon" />
              <span className="sidebarListItemText">View Transaction</span>
            </li>
          </Link>
          <Link to="/group" >
            <li className="sidebarListItem">
              <PersonAddIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Group</span>
            </li>
          </Link>
          <Link to="/notifications" >
            <li className="sidebarListItem">
              <NotificationsActiveIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Notifications</span>
            </li>
          </Link>
          <Link to="/split" >
            <li className="sidebarListItem">
              <SplitscreenIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Split Expenses</span>
            </li>
          </Link>
          {/* <Link to="/chat" >
            <li className="sidebarListItem">
              <ChatIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Chat</span>
            </li>
          </Link> */}
        </ul>
      </div>
      <hr className="sidebarHr"/>
      <div className="sidebarLogout">
        <Link to="/logout" >
          <LogoutIcon className="sidebarIcon" />
          <span className="sidebarLogoutText">Logout</span>
        </Link>
      </div>
    </div>
  );
}
