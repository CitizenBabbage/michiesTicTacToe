import React from 'react';
import { useNavigate } from 'react-router-dom';

export function StartNeuroLearningButton( props ) {
    const setNeuroLearning = props.setNeuroLearning; 
    const getTrainingSet = props.getTrainingSet; 

    const handleClick = () => {
        // console.log("start learning button clicked")
        setNeuroLearning(true); // the change in this should trigger the useEffect in NeuroTrainingPage.js
    };

    return <button className = 'retro-button' onClick={handleClick}> Start Learning </button>;
}