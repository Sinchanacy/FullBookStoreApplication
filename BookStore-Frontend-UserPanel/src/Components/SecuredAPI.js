import React,{useState,useEffect} from 'react';
import {  useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default function SecuredAPI() {
    const [API,setAPI]=useState(null)
    const navigate = useNavigate();
    const Navigate=useNavigate();
    const Logout=()=>
    {
        localStorage.removeItem("Token");
        localStorage.removeItem("authenticated");
        navigate("/login");
        
    }
    const GetAPI=async ()=>{
        try {
            const token = localStorage.getItem("Token");
            console.log(token);
            const response = await axios.get("http://localhost:8080/hello", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
            });
            setAPI(response.data)
            console.log(response);
        } catch (error) {
            console.error(error);
        }

    }

    const [authenticated, setauthenticated] = useState(false);
    useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    console.log(loggedInUser);
        if (loggedInUser) {
            console.log("secured API looggged");
            setauthenticated(loggedInUser);
        }
    }, []);
    
    if (!authenticated) {
        console.log(authenticated);
    // Redirect
      Navigate("/login");
    } else {
    return (
        <>
        <div>
        <h3><p className='text-center my-4' >Welcome to Secured API</p></h3>
        </div>
        <div className='text-center'>
            <Button type='submit' onClick={GetAPI}>Get the secured API response</Button>
        </div>
        <div className='text-center my-4'>{API}</div>
        <div>
            <div className='text-center'>
            <Button type='submit' onClick={Logout}>Logout</Button>
            </div>
        </div>
        </>
    );
    }
}
