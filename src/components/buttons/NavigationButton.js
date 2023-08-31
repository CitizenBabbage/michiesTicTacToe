import React from 'react';
import { useNavigate } from 'react-router-dom';

export function NavigationButton( props ) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.path);
    };

    return <button className = 'retro-button' onClick={handleClick}>{props.label}</button>;
}