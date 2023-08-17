import React from 'react';
import "./SquareComponent.css"


export default function Square( props ) {
    const style = {
        backgroundColor: props.squareColor
    };
    return <button style = {style} className= {props.className} onClick={props.onSquareClick}> {props.value} </button>;
}
