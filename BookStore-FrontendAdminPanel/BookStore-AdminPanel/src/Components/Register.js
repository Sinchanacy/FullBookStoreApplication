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
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstname,setName]=useState('');
  const [email,setEmaial]=useState('');
  const [password,setPassword]=useState('');
  const [reg,setReg]=useState(''); 
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate();
   const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form.checkValidity());
    if(form.checkValidity() === true)
    {
      const user={firstname,email,password};
      console.log("USER:"+user);
      try {
        const response=await axios.post("http://localhost:8080/welcome/register",user,{
        headers:{
          'Content-Type':'application/json',
        },
      })
      setReg("Registration Successful:Verify the email")
      setValidated(true);
      console.log(response.data);
      navigate("/emailVerify");
        
      } catch (error) {
        if(error.response.status===403)
        {
          setReg("Email already registered")
        }
        else
        {
          setReg("Unknown error Occurred")
        }
        
      }  
    }
    else{
      event.preventDefault();
      event.stopPropagation();
      console.log("not validated");
    }
    setValidated(true)
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
    <div className="my-4 container" >
      <p className="mx-3">Already have an account ?
       <Link to="/login">
            <Button className="mx-2" type='submit'>
              Login
            </Button>
      </Link></p>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="mb-3 container">
    <Form.Group as={Col} md="4"  className="my-3" controlId="validationCustomUserName">
          <Form.Label>UserName</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Full name*"
              value={firstname}
              required
              onChange={(e)=>setName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a Email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4"  className="my-3" controlId="validationCustomEmail">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation> 
            <Form.Control
              type="text"
              placeholder="example@gmail.com*"
              value={email}
              required
              onChange={(e)=>setEmaial(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a Email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" className="my-2" controlId="validationCustomPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Password*"
              value={password}
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a Password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        
      <Button className="my-3" type="submit">Register</Button> 
    </Form>
    <div className='mx-3'>Go to <Link className='mx-1' to="/emailVerify">Verify Email?</Link><b className='h5 mx-3'>Registration Status:{reg}</b> </div>
    </div>
    </>
    
  );
}
export default Register;

