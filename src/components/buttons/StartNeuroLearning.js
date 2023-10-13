import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cursorImage from '../../images/cursor.png';
import pointerImage from '../../images/pointer.png';

export function StartNeuroLearningButton( props ) {
    const setNeuroLearning = props.setNeuroLearning; 
    const trainingSet = props.trainingSet; 
    const [shouldDisable, setShouldDisable] = useState(true); 
    const setTrainingSet = props.setTrainingSet; 
    const setEpochsCounter = props.setEpochsCounter; 



    useEffect(() => {
        console.log("Change in training set. Enabling train button.")
        if (!trainingSet) {
            setShouldDisable(true)} 
        else setShouldDisable(false)
    }, [trainingSet])

    const buttonStyle = {
        color: shouldDisable ? 'grey' : 'white',
        borderColor: shouldDisable ? 'grey' : 'white',
        cursor: shouldDisable ? `url('${cursorImage}'),auto` : `url('${pointerImage}'),pointer`
    };

    // rather than use disable in the jsx attributes I want to run a test when the button is clicked to make sure
    // it really should be inactive. 

    const handleClick = () => {
        console.log("start learning button clicked.  ")
        if (!trainingSet) return; 
        if (shouldDisable) {setShouldDisable(false)}; 
        setNeuroLearning(true) // the change in this should trigger the useEffect in NeuroTrainingPage.js
    };

    return <button className = 'retro-button' onClick={handleClick} style = {buttonStyle}> {shouldDisable? "Preparing": "Train"} </button>;
}