import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../CSS/UpdatePrice.css';

const UpdatePrice = () => {
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const bookTitle = location.state?.bookTitle;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const model = {
      title: bookTitle,
      price: price,
    };

    // Send Axios request to update the price
    axios
      .post(`http://localhost:8080/bookStore/adminPanel/updatePrice`, model)
      .then((response) => {
        // Handle successful response
        console.log('Price updated successfully:', response.data);
        navigate('/');
        // Handle success message or navigation to a different page
      })
      .catch((error) => {
        // Handle error response
        console.error('Error updating price:', error);
        // Handle error message or display an error notification
      });
  };

  return (
    <form onSubmit={handleFormSubmit} className="update-price-form">
      <br></br>
      <br></br>
      <h3>Update Price</h3>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default UpdatePrice;
