import './App.css';
import React from 'react';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import SecuredAPI from './Components/SecuredAPI';
import EmailVerificationToken from './Components/EmailVerificationToken';
import BooksList from './Components/BooksList';
import BookDetails from './Components/BookDetails';
import { CartProvider } from './Context/CartContext';
import Cart from './Components/Cart';
import UserOrderDetails from './Components/UserOrderDetails';
import RemoveBook from './Components/RemoveBook';

function App() {
  return (
    <>
      <div className="back">
        <div style={{ backgroundImage: "url(/img/books.jpg)" }}></div>

        <Router>  
        <CartProvider> 
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/forgotPassword" element={<ForgotPassword />} />
            <Route exact path="/securedAPI" element={<SecuredAPI />} />
            <Route exact path="/emailVerify" element={<EmailVerificationToken />} />
            <Route exact path="/bookList" element={<BooksList />} />
            <Route exact path="/book/:id" element={<BookDetails />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/order" element={<UserOrderDetails />} />
            <Route exact path="/removeBook" element={<RemoveBook />} />
            
          </Routes>
          </CartProvider>  
        </Router>
      </div>
    </>
  );
}

export default App;
