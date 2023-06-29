import React from 'react';
import Button from 'react-bootstrap/Button';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';

    
const BooksList=()=>{
    const[books,setBooks]=useState([]);
    const[currpage,setCurrPage]=useState(1);
    const booksPerPage=12;
    const totalPages=Math.ceil(books.length/booksPerPage)
    const navigate = useNavigate();
    useEffect(()=>{
          const token = localStorage.getItem("Token");
          console.log(token);
          axios.get("http://localhost:8080/bookStore/userPanel/allBooks",{
          headers: {
              'Authorization': 'Bearer ' + token
          }
          })
        .then(resp=>{
            console.log(resp.data);
            setBooks(resp.data);
        }
        ).catch(err=>{
          console.log(err.message);
          if(err.message==="Request failed with status code 403")
          {
            navigate("/")
          }
        });

    },[]    
    )
    const handleBookDetails = (bookId) => {
      navigate(`/book/${bookId}`, { state: { bookId } });
    };
    const startIndex = (currpage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const currentBooks = books.slice(startIndex, endIndex);
    const handlePreviousPage = () => {
      setCurrPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
      setCurrPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    
  return (
    
    <div>
      <NavBar/>
    <br></br>
    <br></br>
    
    <div className="App">

        <div className="bookListGrid">
          {currentBooks.map((book) => (
            <div className="book" key={book.id}>
              <div className="content">{book.title}</div>
              <Button className="details-btn" onClick={() => handleBookDetails(book.id)}>
                Details
              </Button>
            </div>
          ))}
        </div>
        <br></br>
        <br></br>
        <div className="pagination">
      <button disabled={currpage === 1} onClick={handlePreviousPage}>
        Previous
      </button>
      <button disabled={currpage === totalPages} onClick={handleNextPage}>
        Next
      </button>
    </div>
      </div>
      <br></br>
      </div>
    
  )
}
  export default BooksList
