import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import '../CSS/OrderDetails.css'; // Import CSS file for styling

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/bookStore/adminPanel/getOrderDetails'
        );
        console.log(response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.log(error.message);
        if (error.message === 'Request failed with status code 403') {
          navigate('/');
        }
      }
    };

    fetchOrderDetails();
  }, [navigate]);

  return (
    <div className="App">
      <NavBar />
      <div className="order-container">
        {orderDetails.map((order, index) => (
          <div key={index} className="order">
            <h2>Order ID: {order.id}</h2>
            <div className="user-details">
              <h3>User Details Orders</h3>
              <p>Email: {order.userDetailsOrders.email}</p>
              <p>Username: {order.userDetailsOrders.username}</p>
            </div>
            <div className="book-responses">
              <h3>Book Order Responses</h3>
              <div className="book-grid">
                {order.bookOrderResponses.map((response, index) => (
                  <div key={index} className="book-card">
                    <p>Title: {response.title}</p>
                    <p>Author: {response.author}</p>
                    <p>Price: {response.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
