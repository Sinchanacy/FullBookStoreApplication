import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRow,
    MDBCol
}
from 'mdb-react-ui-kit';
import { Form, Alert } from 'react-bootstrap';
function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    // console.log(authenticated);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setErrors({
                    ...errors,
                    email: 'Please enter a valid email address'
                });
            } else {
                setErrors({
                    ...errors,
                    email: ''
                });
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        }
        if (!formData.password) {
            validationErrors.password = 'Password is required';
        }
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:8080/bookStore/userPanel/authenticate", formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response.status);
                if(response.data.token===null)
                    {
                      setErrorMessage("User Not Found")
                    }
                else
                {
                   console.log(response.data.token);
                   setSuccessMessage('Logged in Successfully');
                   localStorage.setItem("Token",response.data.token)
                   localStorage.setItem("email",formData.email)
                    setErrorMessage('');
                    navigate("/bookList");
                }
                console.log(response.data);
                setFormData({
                  email: '',
                  password: ''
                });
                setErrors({});
      
            }
              catch (error) {    
                setErrorMessage("Invalid email or Password")
              } 
            
        }
    }
    return (
        <MDBContainer fluid className='my-5'>
            <MDBRow className='g-0 align-items-center justify-content-center'>
                <MDBCol sm='10' md='8' lg='4'>
                    <MDBCard className='my-5 cascading-right' style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
                        <MDBCardBody className='p-5 shadow-5 text-center'>
                            <h2 className="fw-bold mb-5">Login Form</h2>
                            <Form onSubmit={handleSubmit}>
                                <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' name='email' value={formData.email} onChange={handleInputChange} />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                                <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' name='password' value={formData.password} onChange={handleInputChange} />
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                                <div className='mt-3'>
                                    <p>
                                        <Link to='/fp-token'>Forgot Password?</Link>
                                    </p>
                                </div>
                                <MDBBtn className='w-100 mb-4' size='md' type='submit'>Login</MDBBtn>
                                {successMessage && <Alert variant='success'>{successMessage}</Alert>}
                                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                            </Form>
                            <div className='mt-3'>
                                <p>
                                    Don't have an account?
                                    <Link to='/register'>Register</Link>
                                </p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
export default Login