import React, { useContext } from 'react';
import CartContext from '../Context/CartContext';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import '../CSS/Cart.css'; // Import CSS file for custom styles

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleAddToOrder = async () => {
    const orderDetails = {
      books: cartItems.map((item) => item),
      email: localStorage.getItem('email'),
    };
    try {
      const token = localStorage.getItem('Token');
      console.log(token);
      const response = await axios.post("http://localhost:8080/bookStore/userPanel/addBook", orderDetails, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      setOrderStatus("Order Placed Successfully");
      clearCart();
      console.log(response.data);
    } catch (error) {
      setOrderStatus("Order Failed");
      console.log(error);
    }
  };

  const handleRemoveFromCart = (bookId) => {
    removeFromCart(bookId);
  };

  return (
    <div>
      <NavBar />
      <br />
      {cartItems.length > 0 ? (
        <div className="bookListGrid">
          {cart.map((book) => (
            <div className="book" key={book.id}>
              <div className="content">{book.title}</div>
              <Button className="remove-from-cart-btn" onClick={() => handleRemoveFromCart(book.id)}>
                Remove from Cart
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No books in cart</p>
      )}
      <br></br>
      <div className="place-order-container">
        <Button className="place-order-btn" onClick={() => handleAddToOrder()}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Cart;
