import './App.css';
import React from 'react';
import ForgotPassword from './Components/ForgotPassword';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import SecuredAPI from './Components/SecuredAPI';
import EmailVerificationToken from './Components/EmailVerificationToken';
import UpdatePrice from './Components/UpdatePrice';
import BookDetails from './Components/BookDetails';
import BooksList from './Components/BooksList';
import AddBook from './Components/AddBook';
import UserOrderDetails from './Components/OrderDetails';
import OrderDetails from './Components/OrderDetails';
import Logout from './Components/Logout';


function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route exact path="/" element={<BooksList />} /> 
      <Route exact path="/book/:id" element={<BookDetails />} /> 
      <Route exact path="/updatePrice/:title" element={<UpdatePrice />} />
      <Route exact path="/forgotPassword" element={<ForgotPassword />} />
      <Route exact path="/securedAPI" element={<SecuredAPI />} />
      <Route exact path="/emailVerify" element={<EmailVerificationToken />} />
      <Route exact path="/addBook" element={<AddBook />} />
      <Route exact path="/orderDetails" element={<OrderDetails />} />
      <Route exact path="/logout" element={<Logout />} />
      
      
     </Routes>
     </Router>
    </>
  );
}

export default App;
