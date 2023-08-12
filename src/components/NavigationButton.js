import React from 'react';
import { BrowserRouter as useNavigate } from 'react-router-dom';

export function NavigationButton( props ) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.path);
    };

    return <button onClick={handleClick}>{props.label}</button>;
}