import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function EmailVerificationToken() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [token,setToken]=useState('');
    const [status,setStatus]=useState("");
    const [error,setError]=useState('')
    const [myStyle,setmyStyle] = useState({color:'red',});
    const Onchange=(e)=>{
      setToken(e.target.value)
      setError("")
    }
  
   

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("hey");
        const form = event.currentTarget;
        setStatus("");
        if (form.checkValidity() === true) {
          
          console.log(token);
          const api=token;
          console.log(api);
          
          try {
            const response=await axios.get(api,{
            headers:{
              'Content-Type':'application/json',
            },
            
          })
            if(response.data==="User Verified Successfully")
            {
                console.log("success");
                setValidated(true)
                navigate("/login");
            }
            else{
                setError("Invalid Token");
            }
              console.log(response.data); 
              console.log("useState"+{setStatus});      
          
        }
          catch (error) {   
            if(error.message==="Request failed with status code 404") 
            {
                setStatus("Not Found Error : 404")
            }
            else{
                setStatus("Network Error")
            }
            
            console.log(error.message);
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
      <h4 className='text-center my-3'>Email verification Token</h4>  
    </div>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="mb-3 container">
        <Form.Group as={Col} md="4" controlId="validationCustomEmail">
          <Form.Label>Token</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              name='token'
              placeholder="token*"
              value={token}
              required
              onChange={Onchange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a token
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <small className='text-muted'><p className='error' style={myStyle}>{error}</p></small>
        <Button className="my-4" type="submit">Verify</Button>
        <div className=' my-3 container h5' style={myStyle}>{status}</div>
        </Form>
        
    
        
    </>
  );
}
