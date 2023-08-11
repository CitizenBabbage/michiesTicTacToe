import React from 'react';
import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

export function NavigationButton( props ) {
    
    // const dbs = props.dbs, setDBS = props.setDBS; 
    // useEffect(() => {
    //     setDBS(prevValue => prevValue + 1);
    // }, []); 
    // console.log("navigationButton, debugging sequencer: ", dbs)

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.path);
    };

    return <button onClick={handleClick}>{props.label}</button>;
}