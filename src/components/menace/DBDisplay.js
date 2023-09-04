import React from 'react';
import { useEffect, useState } from 'react'; 
import { areExactlyTheSame, roundOffElementsInArray } from '../../auxiliary/general/usefulFunctions';
import "./DatabaseDisplay.css"
import Board from "../board/Board.js"

function databaseDisplay(props){
    
    const database = props.database; 
    const trainingIterations = props.trainingIterations;
    const trainingMode = props.trainingMode; 
    const squares = props.squares; 
    const allPlayedBoards = props.allPlayedBoards; 
    const [updateLog, setUpdateLog] = useState([]) 
    
    
    // useEffect(() => {setUpdateLog(database.filter(item => allPlayedBoards.some(apbItem => areExactlyTheSame(apbItem.state, item.state))))},[allPlayedBoards])



    function getColor(value) {
        let redComponent = 0; 
        let greenComponent = 0; 
        if (value >= 0) redComponent = Math.round(value * 255);
        else greenComponent = Math.round(-value * 255)
        return `rgb(${redComponent}, ${greenComponent}, 0)`; // green shows negatives, which should never happen. For debugging only. 
    }

    function getNormalValues(array){
        const sum = array.reduce((acc, val) => acc + val, 0);
        return array.map(item => item / sum)
    }
    
    
    // checkDbase(database, "2. upDater")
    if (trainingMode) return (
        <div>
            {/* <p> {props.devMode? `First probability distribution is ${JSON.stringify(roundOffElementsInArray(database[0].response))}`:""}</p>  */}
            <p style = {{fontSize: 12}}> {`Training Iterations Remaining: ${trainingIterations}`}</p> 
            <ul className = 'array'>
                {
                    allPlayedBoards.map((item, index) => {
                    // Assuming item.response is an array of values between 0 and 1
                    const colors = getNormalValues(item.response).map(getColor);
                    const values = item.state;
                    return (
                        <li key={index}>
                            <Board 
                                squaresClassName={"probBoardButton"} 
                                trainingMode={trainingMode} 
                                values={values} 
                                squareColors={colors} 
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
    

}

export default React.memo(databaseDisplay);