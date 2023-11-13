import React from "react";
import Footer from "./Footer";
import UserNav from "./User/UserNav";
import UserProfile from "./User/UserProfile";
import Sidebar from "./Sidebar";
import './home.css';

function Home()
{
    return(
        <div className="home-container">
        <UserNav />
        <div className="home-content">
          <Sidebar/>
          <UserProfile/>
        </div>
        <Footer />
        </div>
    )
};

export default Home;