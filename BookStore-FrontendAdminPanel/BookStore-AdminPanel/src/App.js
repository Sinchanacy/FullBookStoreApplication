import './App.css';
import React from 'react';
import Login from './Components/Login';
import NavBar from './Components/NavBar';
import ForgotPassword from './Components/ForgotPassword';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Register from './Components/Register';
import SecuredAPI from './Components/SecuredAPI';
import EmailVerificationToken from './Components/EmailVerificationToken';


function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route exact path="/" element={<NavBar />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/forgotPassword" element={<ForgotPassword />} />
      <Route exact path="/securedAPI" element={<SecuredAPI />} />
      <Route exact path="/emailVerify" element={<EmailVerificationToken />} />
     </Routes>
     </Router>
    </>
  );
}

export default App;
