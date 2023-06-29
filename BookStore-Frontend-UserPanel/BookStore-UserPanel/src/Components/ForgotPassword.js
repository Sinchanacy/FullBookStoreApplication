
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [validated, setValidated] = useState(false);
  const [validated2, setValidated2] = useState(false);
  const [email,setEmaial]=useState('');
  const [newPassword,setPassword]=useState('');
  const [link,setLink]=useState('Enter new password after password reset link is sent');
  const [token,setToken]=useState('');
  const [passLink,SetPassLink]=useState("nolink");
  const [status,setStatus]=useState('');
  const [error,setError]=useState('')
  const [myStyle,setmyStyle] = useState({color:'red',});
  const Onchange=(e)=>{
    setToken(e.target.value)
    setError("")
  }
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hey");
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const user={email};
      console.log("USER:"+user);
      try {
        const response=await axios.post("http://localhost:8080/resetpassword",user,{
        headers:{
          'Content-Type':'application/json',
        },
        
      })
          console.log(response.data);
          setLink('New password');
          setToken('Password reset token sent successfully');
          SetPassLink(response.data);
   
    }
      catch (error) {    
        setStatus("Email not registered")
        console.log("Invalid email or Password")
      } 
    }
    else{
      event.preventDefault();
      event.stopPropagation();
    }
   setValidated(true)
  };
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    console.log("hey");
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const user={newPassword};
      console.log("USER:"+user);
      console.log(passLink);
      const api=passLink;
      
      try {
        const response=await axios.post(api,user,{
        headers:{
          'Content-Type':'application/json',
        },
        
      })
         setStatus(response.data)
          console.log(response.data);
          navigate("/login");
          
          
      
    }
      catch (error) {    
        console.log("Password Reset Token Expiered")
      } 
    }
    else{
      event.preventDefault();
      event.stopPropagation();
    }
   setValidated2(true)
  };


  return (
    <>
    <Navbar className="navbar navbar-expand-lg bg-info d-none d-lg-flex noprint justify-content-between">
      <Container fluid>
        <Image alt="logo" src="https://d3fufwrs5ttbo7.cloudfront.net/layout-media/logo-eform.svg" className='mx-5' />
        <Navbar.Brand href="/"><b>Home</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-3 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
            <Image alt="logo"src="https://d3fufwrs5ttbo7.cloudfront.net/layout-media/irs-logo.png" className='mx-5' />
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      <h4 className='text-center my-3'>Password Reset Token</h4>  
    </div>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="mb-3 container">
        <Form.Group as={Col} md="4" controlId="validationCustomEmail">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="example@gmail.com*"
              value={email}
              name="email"
              required
              onChange={Onchange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a Email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button className="my-2" type="submit">Submit</Button>
        <div>
      <h6 className='text-center my-3'>{token}</h6>  
    </div>
        </Form>
        <Form noValidate validated={validated2} onSubmit={handleSubmit2} className="mb-3 container">
        <Form.Group as={Col} md="4" className="my-2" controlId="validationCustomPassword">
          <Form.Label>{link}</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="*password"
              value={newPassword}
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a Password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group> 
     <Button className="my-2" type="submit">Login</Button>
     <div className=' my-3 container h5'>{status}</div>
     
    </Form>
        
        
    </>
  );
}
