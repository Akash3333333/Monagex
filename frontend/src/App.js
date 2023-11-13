import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Auth/Login';
// import Register from './components/Auth/Signup';
import Sidebar from './components/Sidebar';
// import Feed from './components/Feed';
import UserProfile from './components/User/UserProfile';
import Income from './components/Transaction/income';
import Expense from './components/Transaction/Expense';
import Transfer from './components/Transaction/Transfer';
import ViewTransac from './components/Transaction/ViewTransac';
import Signup from './components/Auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddFriend from './components/User/AddFriend';
import MainGroup from './components/User/MainGroup';
import Logout from './components/Auth/Logout';
import axios from 'axios';
import UserNav from './components/User/UserNav';
// import Msg from './components/User/Msg';
import ResetPassword from './components/Auth/ResetPassword';
import ForgetPassword from './components/Auth/ForgetPassword';



function App() {
  
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Check for the presence of the JWT token
    const token = localStorage.getItem('jwt');

    if (token) {
      // Make an authenticated request to fetch user data
      axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}8`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <Router>
      <div>
      {user && <UserNav user={user} />}
        <Routes>
          <Route exact={true} path="/signup" element={<Signup />}  />
          <Route exact={true} path="/login" element={<Login />}  />
          <Route exact={true} path="/" element={<Home /> }  />
          <Route exact={true} path="/profile" element={<UserProfile /> }  />
          <Route exact={true} path="/sidebar" element={<Sidebar /> }  />
          {/* <Route exact={true} path="/feed" element={<Feed /> }  /> */}
          {/* <Route exact={true} path="/transaction" element={<Maintransac /> }  /> */}
          <Route exact={true} path="/income" element={<Income /> }  />
          <Route exact={true} path="/expense" element={<Expense /> }  />
          <Route exact={true} path="/transfer" element={<Transfer /> }  />
          <Route exact={true} path="/view" element={<ViewTransac /> }  />
          <Route exact={true} path="/group" element={<MainGroup /> }  />
          <Route exact={true} path="/logout" element={<Logout /> }  />
          {/* <Route exact={true} path="/chat" element={<Msg /> }  /> */}
          <Route exact={true} path="/forget-password" element={<ForgetPassword /> }  />
          <Route exact={true} path="/reset-password/:token" element={<ResetPassword /> }  />
          
        </Routes>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar   />
      </div>
    </Router>
  );
}

export default App;