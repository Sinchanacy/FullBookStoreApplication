import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/AddBook.css';
import NavBar from './NavBar';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: 0,
    pages: 0,
    language: '',
    description: '',
    genre: '',
    availability: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the form data to the server using Axios
    axios
      .post('http://localhost:8080/bookStore/adminPanel/addBook', formData)
      .then((response) => {
        console.log('Book added successfully:', response.data);
        navigate('/');
        // Handle success message or navigation to a different page
      })
      .catch((error) => {
        console.error('Error adding book:', error);
        // Handle error message or display an error notification
      });
  };

  return (
    <div>
        <NavBar/>
    <form onSubmit={handleSubmit} className="add-book-form">
      <div>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Author</label>
        <input type="text" name="author" value={formData.author} onChange={handleInputChange} />
      </div>
      <div>
        <label>Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
      </div>
      <div>
        <label>Pages</label>
        <input type="number" name="pages" value={formData.pages} onChange={handleInputChange} />
      </div>
      <div>
        <label>Language</label>
        <input type="text" name="language" value={formData.language} onChange={handleInputChange} />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} />
      </div>
      <div>
        <label>Genre</label>
        <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} />
      </div>
      <div>
        <label>Availability</label>
        <input type="text" name="availability" value={formData.availability} onChange={handleInputChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default AddBook;
