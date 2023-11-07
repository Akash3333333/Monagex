import React from "react";
import "./content.css";
import TransNav from "./TransNav";
import TransferForm from "./TransferForm";

function TransferContent() {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <TransNav />
                <TransferForm />
            </div>
        </div>
    )
};

export default TransferContent;