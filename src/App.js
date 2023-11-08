import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Signup';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import UserProfile from './components/User/UserProfile';
import Income from './components/Transaction/income';
import Expense from './components/Transaction/Expense';
import Transfer from './components/Transaction/Transfer';
import ViewTransac from './components/Transaction/ViewTransac';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact={true} path="/signup" element={<Register />}  />
          <Route exact={true} path="/login" element={<Login />}  />
          <Route exact={true} path="/" element={<Home /> }  />
          <Route exact={true} path="/profile" element={<UserProfile /> }  />
          <Route exact={true} path="/sidebar" element={<Sidebar /> }  />
          <Route exact={true} path="/feed" element={<Feed /> }  />
          {/* <Route exact={true} path="/transaction" element={<Maintransac /> }  /> */}
          <Route exact={true} path="/income" element={<Income /> }  />
          <Route exact={true} path="/expense" element={<Expense /> }  />
          <Route exact={true} path="/transfer" element={<Transfer /> }  />
          <Route exact={true} path="/view" element={<ViewTransac /> }  />
        </Routes>
      </div>
    </Router>
  );
}

export default App;