import React from "react";
import UserNav from "../User/UserNav";
import Sidebar from "../Sidebar";
import TransferForm from "./TransferForm";
import Footer from "../Footer";
import './Transfer.css';
import TransNav from "./TransNav";

function Transfer() {
    return (
        <div className="transfer-container">
                <TransNav/>
            <div className="transfer-content">
                <Sidebar  />
                <TransferForm />
            </div>
            <Footer />
        </div>
    );
}

export default Transfer;
