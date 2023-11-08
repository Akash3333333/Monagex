import React from "react";
import Footer from "./Footer";
import UserNav from "./User/UserNav";
import UserProfile from "./User/UserProfile";
import Sidebar from "./Sidebar";
import './home.css';

function Home()
{
    return(
        <>
        <UserNav />
        <div className="home-container">
          <Sidebar/>
          <UserProfile/>
        </div>
        <Footer />
        </>
    )
};

export default Home;