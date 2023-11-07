import React from "react";
import Sidebar from "../Sidebar";
import Transac from "./Transac";
import './Maintransac.css'

function Maintransac()
{
    return(
        <>
        <div className="a">
        <Sidebar />
            <Transac />
        </div>
        </>
    )
};

export default Maintransac;