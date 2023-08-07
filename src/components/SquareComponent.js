import React from 'react';
import "./SquareComponent.css"
import {useState} from 'react'; 


export default function Square( props ) {
    const [cn, setCn] = useState(props.className)
    return <button className= {cn} onClick={props.onSquareClick}> {props.value} </button>;
    }