import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import TekTokTaoLogo from '../components/presentational/TekTokTaoLogo.js';
import IntroTheme from '../components/presentational/IntroTheme.js';
import IntroTune from '../components/presentational/sound/introTune.js';


 
const Intro = ( props ) => {
    const location = useLocation();
    const audioSelected = props.audioSelected; 
    const navigate = useNavigate();
    // const [keyPressed, setKeyPressed] = useState(false); 
    const setMusicStarted = props.setMusicStarted; 
    const keyPressed = props.musicStarted; 
    const [permissionToProceed, setPermissionToProceed] = useState(false); 

    
    useEffect(() => {
        function handleKeyPress(){
            if (!keyPressed && permissionToProceed) {
                setMusicStarted(true) // this triggers the useEffect in selectionMusic.js & plays the theme
                navigate("/selectOpponent");
            }
            
        }
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('click', handleKeyPress);

        return () => {
                window.removeEventListener('keydown', handleKeyPress);
                window.removeEventListener('click', handleKeyPress);

        };
        
    } 
        , [permissionToProceed])
    

    return (
        <div className = 'intropage'>
            <div className = 'logoContainer'>
                <TekTokTaoLogo setPermissionToProceed = {setPermissionToProceed} />
                <IntroTune audioSelected = {props.audioSelected}/>
            </div> 
        </div>
    )
};
 
export default Intro;