import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../CSS/BookDetails.css';
import NavBar from './NavBar';
import CartContext from '../Context/CartContext';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const location = useLocation();
  const bookId = location.state?.bookId;
  const { addToCart } = useContext(CartContext);
  
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get(
          "http://localhost:8080/bookStore/userPanel/bookDetails",
          {
            params: {
              id: bookId,
            },
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        );

        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookDetails(); // Call the fetchBookDetails function
  }, [bookId]);

  const handleAddToCart = () => {
    console.log("added");
    addToCart(book);
  };
  

  return (
    <div className="container">
      <br></br>
      <br></br>
      <div className="book-details-box">
        <h1>Book Details</h1>
        <br></br>
        {book ? (
          <>
            <h4 className=" ">Title: {book.title}</h4>
            <h4>Author: {book.author}</h4>
            <p><b>Description: {book.description}</b></p>
            <p>Genre: {book.genre} </p>
            <p>Language: {book.language} </p>
            <p>No of Pages: {book.pages}</p>
            <h5><b>Price: ${book.price}</b><p>Availability: {book.availability} </p></h5>

            <div className="centered-wrapper">
              <div className="centered-content">
              <Button className="add-to-cart-btn" onClick={() => handleAddToCart(book)}>
              Add to Cart
                 </Button>
                <Link to="/bookList">
                  <Button className="my-2 mx-4" type="submit">Back</Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
