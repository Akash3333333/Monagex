// UserProfile.jsx
import React from "react";
import './UserProfile.css';

function UserProfile({ category, note }) {
  return (
    <>
      <div className="userProfileContainer">
        HI, Dont't Forget to pay your 
        {(category === "Bill" || category === "Recharge") &&
        note ? (
          <div className="paymentReminder">
            <p>{note}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default UserProfile;
