import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Signup';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact={true} path="/register" element={<Register />}  />
          <Route exact={true} path="/login" element={<Login />}  />
          <Route exact={true} path="/" element={<Home /> }  />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

