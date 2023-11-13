import "./Sidebar.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout"; // Import the LogoutIcon
import ViewListIcon from '@mui/icons-material/ViewList';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <li className="sidebarListItem">
              <AccountCircleIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Dashboard</span>
            </li>
          </Link>
          <Link to="/income" style={{ color: "white", textDecoration: "none" }}>
            <li className="sidebarListItem">
              <LibraryBooksOutlinedIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Record Transaction</span>
            </li>
          </Link>
          <Link to="/view" style={{ color: "white", textDecoration: "none" }}>
            <li className="sidebarListItem">
              <ViewListIcon className="sidebarIcon" />
              <span className="sidebarListItemText">View Transaction</span>
            </li>
          </Link>
          <Link to="/group" style={{ color: "white", textDecoration: "none" }}>
            <li className="sidebarListItem">
              <PersonAddIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Group</span>
            </li>
          </Link>
          <Link to="/chat" style={{ color: "white", textDecoration: "none" }}>
            <li className="sidebarListItem">
              <ChatIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Chat</span>
            </li>
          </Link>
        </ul>
      </div>
      <hr className="sidebarHr"/>
      <div className="sidebarLogout">
        <Link to="/logout" style={{ color: "white", textDecoration: "none" }}>
          <LogoutIcon className="sidebarIcon" />
          <span className="sidebarLogoutText">Logout</span>
        </Link>
      </div>
    </div>
  );
}
