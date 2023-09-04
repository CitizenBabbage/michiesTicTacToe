import React from 'react';
import { useNavigate } from 'react-router-dom';

export function StartNeuroLearningButton( props ) {
    const setNeuroLearning = props.setNeuroLearning; 

    const handleClick = () => {
        setNeuroLearning(true);
    };

    return <button className = 'retro-button' onClick={handleClick}> Start Learning </button>;
}