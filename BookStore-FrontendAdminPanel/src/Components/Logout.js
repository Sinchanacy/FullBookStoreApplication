import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Logout=()=> {
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.setItem('email','')
        localStorage.setItem('Token','')
        console.log(localStorage.getItem('Token'));
        navigate("/")
        
    }
        
  )

  return (
    <div>
      
    </div>
  );
}
export default  Logout
