import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import TekTokTaoLogo from '../components/presentational/TekTokTaoLogo';
import IntroTheme from '../components/presentational/IntroTheme';


 
const Home = ( props ) => {
    const location = useLocation();
    const [audioSelected, setAudioSelected] = useState(false);  
    const navigate = useNavigate();
    const [keyPressed, setKeyPressed] = useState(false); 

    
    useEffect(() => {
        function handleKeyPress(){
            if (!keyPressed) {
                setKeyPressed(true)
                navigate("/selectOpponent");
            }
            
        }
        window.addEventListener('keydown', handleKeyPress);
        return () => {
                window.removeEventListener('keydown', handleKeyPress);
        };
        
    } 
        , [])
    
        
    useEffect(() => {
        // Parse the query parameters from the URL
        const queryParams = new URLSearchParams(window.location.search);
        setAudioSelected(queryParams.get('AudioSelected')); 
    }, []);

    if (audioSelected) return (
        <div className = 'intropage'>
            <div className = 'logoContainer'>
                {/* <IntroTheme/> */}
                <TekTokTaoLogo/>
                {/* <p>Press Any Key</p> */}
            </div> 
        </div>
    )
    else return (
        <div className = 'intropage'>
            <div className = 'logoContainer'>
                <TekTokTaoLogo/>
                <p>Press Any Key</p>
            </div> 
    </div>
    )
};
 
export default Home;