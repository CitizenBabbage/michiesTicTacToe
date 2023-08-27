import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import TekTokTaoLogo from '../components/TekTokTaoLogo';
import IntroTheme from '../components/IntroTheme';

import './index.css'

 
const Home = ( props ) => {
    // const [audioSelected, setAudioSelected] = useState(false); 
    const [highlightedButton, setHighlightedButton] = useState("topButton")
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "ArrowUp") {
                if (highlightedButton === "bottomButton"){setHighlightedButton("topButton")}
            } else if (event.key === "ArrowDown") {
                if (highlightedButton === "topButton"){setHighlightedButton("bottomButton")}
            }

            else if (event.key === "Enter") {
                if (highlightedButton === "topButton"){
                    props.setAudioSelected(true)
                    console.log("audioSelected at child level")
                    navigate("/intro?AudioSelected=true")
                }
                else if (highlightedButton === "bottomButton"){
                    props.setAudioSelected(false)
                    navigate("/intro?AudioSelected=false")
                }
            }
        };
        window.addEventListener("keydown", handleKeyPress);
    
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [highlightedButton]); // 
    
    
      

    return (
        <div className = 'buttonContainer' >
            <button className = {highlightedButton === "topButton"? 'highlightedButton': 'normalButton'}>Proceed with audio on</button> 
            <button className = {highlightedButton === "bottomButton"? 'highlightedButton': 'normalButton'}>Proceed with audio off</button> 
        </div> 
    )
};
 
export default Home;