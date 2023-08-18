import React from 'react';
import "./SquareComponent.css"


function Square( props ) {
    const style = {
        backgroundColor: props.squareColor
    };
    return <button style = {style} className= {props.className} onClick={props.onSquareClick}> {props.value} </button>;
}

export default React.memo(Square);