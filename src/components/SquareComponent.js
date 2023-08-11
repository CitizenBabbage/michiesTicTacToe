import React from 'react';
import "./SquareComponent.css"
import { useState, useEffect} from 'react';


export default function Square( props ) {
    
    // const dbs = props.dbs, setDBS = props.setDBS; 
    // useEffect(() => {
    //     setDBS(prevValue => prevValue + 1);
    // }, []); 
    // console.log("squareComponent, debugging sequencer: ", dbs)
    
    const [cn, setCn] = useState(props.className)
    return <button className= {cn} onClick={props.onSquareClick}> {props.value} </button>;
    }