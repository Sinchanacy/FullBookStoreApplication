import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../CSS/BookDetails.css';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const location = useLocation();
  const bookId = location.state?.bookId;
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response=axios.get(
          `http://localhost:8080/bookStore/adminPanel/bookDetails?id=${bookId}`,
        ).then(
          (response)=>{
            console.log(response.data);
            setBook(response.data);
          }
        ).catch(
          (err) => {
            console.error(err.message);  
          }
        )
        
      } catch (err) {
        console.log(err.message);
          if(err.message=="Request failed with status code 403")
          {
            navigate("/")
          }
      }
    };

    fetchBookDetails(); // Call the fetchBookDetails function
  }, [bookId]);
  

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
            <p>Book Count: {book.count}</p>
            <h5><b>Price: ${book.price}</b><p>Availability: {book.availability} </p></h5>

            <div className="centered-wrapper">
              <div className="centered-content">
                 <br></br>
                <Link to="/">
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
