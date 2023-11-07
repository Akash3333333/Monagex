import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UserNav() {
    // const [islogin,changeIsLogin]=useState(true);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Monagex</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                    </ul>
                    {/* <Link to="/signup" className="btn btn-outline-success">{islogin?"Logout":"Login/SignUp"}</Link> */}
                    <Link to="/transaction" className="btn btn-outline-success">Record transaction</Link>
                </div>
            </div>
        </nav>
    );
}

export default UserNav;
