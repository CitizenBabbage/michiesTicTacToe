import React from 'react';
import "./SquareComponent.css"


export default function Square( props ) {
    
    // const dbs = props.dbs, setDBS = props.setDBS; 
    // useEffect(() => {
    //     setDBS(prevValue => prevValue + 1);
    // }, []); 
    // console.log("squareComponent, debugging sequencer: ", dbs)
    
    
    return <button className= {props.className} onClick={props.onSquareClick}> {props.value} </button>;
    }