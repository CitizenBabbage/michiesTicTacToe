import React from 'react';
import {useState, useEffect} from 'react';
import logo from '../../images/logo-williams.png'
import './TekTokTaoLogo.css'

export default function TekTokTaoLogo( props ) {
    const [showImage, setShowImage] = useState(false);  // Initial state set to false
    const setPermissionToProceed = props.setPermissionToProceed; 
  
    useEffect(() => {
    const timer = setTimeout(() => {
        setShowImage(true);  
        setPermissionToProceed(true); 
    }, 5500); 


    return () => clearTimeout(timer);  // Clear the timer when component unmounts
  }, []);  // 


    return (
        <div>
          {showImage && (<img src= { logo } alt="Tek Tok Tao logo" />)}
          {!showImage && (<p>Loading...</p>)}
          {showImage && (<p style={{ textAlign: 'center' }}>  {`  `}Press Any Key</p>)}
        </div>
        )

}

