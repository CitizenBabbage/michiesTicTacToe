import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import PortraitButton from '../components/PortraitButton'
import TekTokTaoLogo from '../components/TekTokTaoLogo';

import hurisPortrait from '../images/huris/10a7f78f1fd64265a7df0efd71c8c959bc63d032.webp'
import evolvoPortrait from '../images/evolvo4.webp'
import menacePortrait from '../images/menace/77fa83d664df40fb96fe7fb183d4004a02d73734.webp'
import minimaxPortrait from '../images/minimax/2c5a7d46e7f04555884426495b8cb09c4d07a752.webp'
import minximaPortrait from '../images/minxima/af896fd40d0249c88c952f8308485f6888596ec3.webp'
import neuroPortrait from '../images/neuro/7cd6bd08398c4f948061c6e50555f7da5c4145b4.webp'

import './index.css'

 
const Home = ( props ) => {
    const location = useLocation();
    const [keyPressed, setKeyPressed] = useState(false);  

    useEffect(() => {
        function handleKeyPress(){
            setKeyPressed(true)
        }
        window.addEventListener('keydown', handleKeyPress);
        return 
            () => {
                window.removeEventListener('keydown', handleKeyPress);
        };
        
    } 
        , [])
    
      

    const [currentPortraitIndex, setCurrentPortraitIndex] = useState(0);
    const [currentNameIndex, setCurrentNameIndex] = useState(0);
    const navigate = useNavigate();
    //navigate('/newPath');
    const portraits = [
        menacePortrait,
        hurisPortrait,
        minimaxPortrait,
        evolvoPortrait, 
        neuroPortrait,
        minximaPortrait
    ];

    const names = [
        'Menace',
        'Huris',
        'Minimax',
        'Evolvo', 
        'Neuro',
        'Minxima'
    ];

    const currentPortraitIndexRef = useRef(currentPortraitIndex); 
    const currentNameIndexRef = useRef(currentNameIndex); 


    useEffect(() => {
        currentPortraitIndexRef.current = currentPortraitIndex; // Update the ref whenever the state changes
    }, [currentPortraitIndex]);

    useEffect(() => {
        currentNameIndexRef.current = currentNameIndex; 
    }, [currentNameIndex]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "ArrowRight") {
                setCurrentPortraitIndex((prevIndex) => (prevIndex + 1) % portraits.length);
                setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);

            } else if (event.key === "ArrowLeft") {
                setCurrentPortraitIndex((prevIndex) => (prevIndex - 1 + portraits.length) % portraits.length);
                setCurrentNameIndex((prevIndex) => (prevIndex - 1 + names.length) % names.length);
            }

            if (event.key === "Enter") {
                switch (currentPortraitIndexRef.current) { // Use the ref value here
                    case 0:
                        navigate("/menace");
                        console.log("currentPortraitIndex is ", currentPortraitIndexRef.current)
                        break;
                    case 1:
                        navigate("/huris");
                        break;
                    case 2:
                        navigate("/minimax");
                        break;
                    case 3:
                        navigate("/evolvo");
                        break;
                    case 4:
                        navigate("/neuro");
                        break;
                    case 5:
                        navigate("/minxima");
                        break;
                    default:
                        break;
                }
            }
        };
        window.addEventListener("keydown", handleKeyPress);
    
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [navigate]); // Only dependency is navigate

    if (keyPressed === true) return (
        <div>
            <h1>Welcome to TAK TEK TAO</h1>
            <div> 
                <p>Select your opponent</p> 
                <PortraitButton src={portraits[currentPortraitIndex]} alt="Portrait" characterName = {names[currentNameIndex]}/>
            </div>
        </div>
    )
    else return (
        <div>
            <TekTokTaoLogo/>
            <p>Press Any Key</p>
        </div>
    )
};
 
export default Home;