import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ResignButton( props ) {
    const setResigned = props.setResigned; 
    const humansLetter = props.humansLetter; 

    const handleClick = () => {
        setResigned(humansLetter);
    };

    return <button className = 'retro-button' onClick={handleClick}> Resign </button>;
}