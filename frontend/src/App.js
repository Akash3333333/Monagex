// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Auth/Login';
// import Register from './components/Auth/Signup';
import Income from './components/Transaction/income';
import Expense from './components/Transaction/Expense';
import Transfer from './components/Transaction/Transfer';
import ViewTransac from './components/Transaction/ViewTransac';
import Signup from './components/Auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainGroup from './components/User/MainGroup';
import Logout from './components/Auth/Logout';
// import Msg from './components/User/Msg';
import ResetPassword from './components/Auth/ResetPassword';
import ForgetPassword from './components/Auth/ForgetPassword';
import MainNotifications from './components/User/MainNotifications';
import Split from './components/User/Split';
import Profile from './components/User/Profile';
import SplitItem from './components/User/SplitItem';


const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route exact={true} path="/signup" element={<Signup />}  />
          <Route exact={true} path="/login" element={<Login />}  />
          <Route exact={true} path="/home" element={<Home /> }  />
          <Route exact={true} path="/profile" element={<Profile /> }  />
          {/* <Route exact={true} path="/sidebar" element={<Sidebar /> }  /> */}
          {/* <Route exact={true} path="/feed" element={<Feed /> }  /> */}
          {/* <Route exact={true} path="/transaction" element={<Maintransac /> }  /> */}
          {/* <Route path="/income" element={<ProtectedRoute element={<Income />} />} /> */}
          <Route path="/income" element={<Income />} />
          <Route exact={true} path="/expense" element={<Expense /> }  />
          <Route exact={true} path="/transfer" element={<Transfer /> }  />
          <Route exact={true} path="/view" element={<ViewTransac /> }  />
          <Route exact={true} path="/group" element={<MainGroup  /> }  />
          <Route exact={true} path="/logout" element={<Logout /> }  />
          {/* <Route exact={true} path="/chat" element={<Msg /> }  /> */}
          <Route exact={true} path="/forget-password" element={<ForgetPassword /> }  />
          <Route exact={true} path="/reset-password/:token" element={<ResetPassword /> }  />
          <Route exact={true} path="/notifications" element={<MainNotifications  /> }  />
          <Route path="/split" element={<Split />} />
          <Route path="/grp/:groupId" element={<SplitItem />} />
        </Routes>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar   />
      </>
    </Router>
  );
}

export default App;