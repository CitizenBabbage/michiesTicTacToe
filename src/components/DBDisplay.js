import React from 'react';
import "./DBDisplay.css"
import Board from "./Board.js"

function databaseDisplay(props){
    
    const database = props.database; 
    const trainingIterations = props.trainingIterations;
    const trainingMode = props.trainingMode; 
    
    function getColor(value) {
        let redComponent = 0; 
        let greenComponent = 0; 
        if (value >= 0) redComponent = Math.round(value * 255);
        else greenComponent = Math.round(-value * 255)
        return `rgb(${redComponent}, ${greenComponent}, 0)`;
    }
    
    // checkDbase(database, "2. upDater")
    if (trainingMode) return (
        <div>
            <p> {props.devMode? `First probability distribution is ${JSON.stringify(database[0].response)}`:""}</p> 
            <p> {props.devMode? `Number of training iterations remaining is ${trainingIterations}`:""}</p> 
            <ul className='array'>
                {database.map((item, index) => {
                    // Assuming item.response is an array of values between 0 and 1
                    const colors = item.response.map(getColor);

                    return (
                        <li key={index}>
                            <Board 
                                squaresClassName={"probBoardButton"} 
                                trainingMode={trainingMode} 
                                squares={Array(9).fill("")} 
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