import React from 'react';
import {} from 'react';
import { roundOffElementsInArray } from '../auxiliary/usefulFunctions.js';
import "./DatabaseDisplay.css"
import Board from "./Board.js"

function databaseDisplay(props){
    
    const database = props.database; 
    const trainingIterations = props.trainingIterations;
    const trainingMode = props.trainingMode; 
    


    
    // checkDbase(database, "2. upDater")
    if (trainingMode) return (
        <div>
            <p> {props.devMode? `First probability distribution is ${JSON.stringify(database[0].response)}`:""}</p> 
            <p> {props.devMode? `Number of training iterations remaining is ${trainingIterations}`:""}</p> 
            <ul className='array'>
                {database.map((item, index) => (
                    <li key={index}>
                    <Board squaresClassName = {"probBoardButton"} trainingMode = {props.trainingMode} squares = {roundOffElementsInArray(item.response)} />
                    </li>
                ))}
            </ul>
        </div>
    )
    

}

export default React.memo(databaseDisplay);