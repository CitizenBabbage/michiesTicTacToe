import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import PortraitButton from '../components/buttons/PortraitButton.js'

import hurisPortrait from '../images/chosen/huris2.png'
import evolvoPortrait from '../images/chosen/evolvoFinal.png'
import menacePortrait from '../images/chosen/menace.png'
import minimaxPortrait from '../images/chosen/minimax.png'
// import minximaPortrait from '../images/minxima/af896fd40d0249c88c952f8308485f6888596ec3.webp'
import neuroPortrait from '../images/chosen/neuro3.png'
import SelectionMusic from '../components/presentational/sound/selectionMusic.js';

export default function selectOpponent( props ){
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
        // minximaPortrait
    ];

    const names = [
        'Menace',
        'Huris',
        'Minimax',
        'Evolvo', 
        'Neuro',
        // 'Minxima'
    ];

    const styles = [
        'Brute Memorizer',
        'Rule Follower',
        'Space Searcher',
        'Darwinian', 
        'Connectionist',
        // 'Minxima'
    ];

    const currentPortraitIndexRef = useRef(currentPortraitIndex); 
    const currentNameIndexRef = useRef(currentNameIndex); 


    useEffect(() => {
        currentPortraitIndexRef.current = currentPortraitIndex; // Update the ref whenever the state changes
    }, [currentPortraitIndex]);


    useEffect(() => {
        currentNameIndexRef.current = currentNameIndex; 
    }, [currentNameIndex]);


    function handleLeftArrowClick (){
        setCurrentPortraitIndex((prevIndex) => (prevIndex - 1 + portraits.length) % portraits.length);
        setCurrentNameIndex((prevIndex) => (prevIndex - 1 + names.length) % names.length);
    }

    function handleRightArrowClick (){
        setCurrentPortraitIndex((prevIndex) => (prevIndex + 1) % portraits.length);
        setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);
    }


    function handleRightArrowClick (){
        setCurrentPortraitIndex((prevIndex) => (prevIndex + 1) % portraits.length);
        setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);
    }


    function handlePortraitClick (){
        goToSelectedPage ()
    }


    function goToSelectedPage () {
        switch (currentPortraitIndexRef.current) { // Use the ref value here
            case 0:
                navigate("/menace");
                //console.log("currentPortraitIndex is ", currentPortraitIndexRef.current)
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
            // case 5:
            //     navigate("/minxima");
            //     break;
            default:
                break;
        }
    }

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
                goToSelectedPage(); 
            }
        };
        window.addEventListener("keydown", handleKeyPress);
    
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [navigate]); 



    return (
        <div>
            <div className = 'intropage'>
                <div className = 'twoRows'>
                    <p className='centered'>Select your opponent</p> 
                    <div className='threeBoards'>
                        <button className='leftButton' onClick={handleLeftArrowClick}/> 
                        <PortraitButton handlePortraitClick = {handlePortraitClick} portraitIndex = {currentPortraitIndex} characterStyle = {styles[currentNameIndex]} len = {portraits.length} src={portraits[currentPortraitIndex]} alt="Portrait" characterName = {names[currentNameIndex]}/>
                        <button className = 'rightButton' onClick={handleRightArrowClick}/>
                        {/* <SelectionMusic audioSelected = {props.audioSelected}/> */}
                    </div>
                </div>
            </div> 
        </div> 
    
    )
}
