import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

export function NavigationButton({ path, label }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(path);
    };

    return <button onClick={handleClick}>{label}</button>;
}