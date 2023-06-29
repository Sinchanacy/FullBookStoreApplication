import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
const UserOrderDetails = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('Token');
    const emailId = localStorage.getItem('email');

    axios
      .get(
        "http://localhost:8080/bookStore/userPanel/getUserOrderDetails",
        {
          params: {
            email: emailId,
          },
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <NavBar/>
      {details.map((order) => (
        <div className="order-box" key={order.id}>
          <div className="order-header">
            <h3>Order ID: {order.id}</h3>
          </div>
          <b>
          <div className="bookListGrid">
            {order.books.map((book) => (
              <div className="book" key={book.id}>
                <div>
                    <br></br>
                    <br></br>
                <div className="content">Title: {book.title}</div>
                <div className="content">Author: {book.author}</div>
                <div className="content">Price: ${book.price}</div>
                </div>
              </div>
            ))}
          </div>
          </b>
        </div>
      ))}
    </div>
  );
};

export default UserOrderDetails;
