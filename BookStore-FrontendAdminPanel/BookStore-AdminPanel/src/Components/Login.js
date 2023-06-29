import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const [validated, setValidated] = useState(false);
  const [email,setEmaial]=useState('');
  const [password,setPassword]=useState('');
  const [Token,setToken]=useState('');
  //const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hey");
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const user={email,password};
      console.log("USER:"+user);
      try {
        const response=await axios.post("http://localhost:8080/welcome/authenticate",user,{
        headers:{
          'Content-Type':'application/json',
        },
          
      })
          if(response.data.token===null)
          {
            setToken("User Not Found")
          }
          else
          {
            setToken("User verified Successfully :"+response.data.token)
            console.log(response.data.token);
            localStorage.setItem("authenticated", true);
            localStorage.setItem("Token",response.data.token)
            setValidated(true);
            navigate("/securedAPI");
          }
          console.log(response.data);
      
    }
      catch (error) {    
        setToken("Invalid email or Password")
      } 
    }
    else{
      event.preventDefault();
      event.stopPropagation();
    }
   setValidated(true)
  };
  return (
    <>
    <div className='align-items-center'>
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
      <p className="mx-5">Don't have an account yet? <Link to="/register">
            <Button className="mx-2" type='submit'>
              Register
            </Button>
          </Link></p>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="mb-3 align-items-center">
        <Form.Group as={Col} md="4" controlId="validationCustomEmail">
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
        <div className="my-4" ><Link to="/forgotPassword">Forgot Password?</Link></div>  
     <Button className="my-2" type="submit">Login</Button>
     
    </Form>
    <div>Login Status : <p>{Token}</p> </div>
    </div>
    </div>
    
    </>
    
  );
}

export default Login;
