import React from 'react';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-page">
      <div className="background"></div>
      <div className="content">
        <h1>Welcome to MonageX</h1>
        <p>Your one-stop destination for all transaction tracking.</p>
        {/* <div className="video-container">
          <p className="demo-heading">Watch Our Demo</p>
          <video controls>
            <source src={process.env.PUBLIC_URL + '/images/MonageX_DemoVideo.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}
      </div>
    </div>
  );
};

export default Welcome;
