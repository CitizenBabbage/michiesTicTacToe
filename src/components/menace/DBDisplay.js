import React from 'react';
import { useEffect, useState } from 'react'; 
import { areExactlyTheSame, roundOffElementsInArray } from '../../auxiliary/general/usefulFunctions.js';
import "./DatabaseDisplay.css"
import Board from "../board/Board.js"

function databaseDisplay(props){
    
    const database = props.database; 
    const trainingIterations = props.trainingIterations;
    const trainingMode = props.trainingMode; 
    const squares = props.squares; 
    const allPlayedBoards = props.allPlayedBoards; 
    const setAllPlayedBoards = props.setAllPlayedBoards; 
    const [updateLog, setUpdateLog] = useState([]) 
    const updatesText = "View the board states MENACE has learned from."
    const [displayRequested, setDisplayRequested] = useState(false)
    const [toggleText, setToggleText] = useState("View Updates")
    
    // useEffect(() => {setUpdateLog(database.filter(item => allPlayedBoards.some(apbItem => areExactlyTheSame(apbItem.state, item.state))))},[allPlayedBoards])

    function toggleView(){
        if (toggleText === "View Updates") setToggleText("Hide Updates")
        else setToggleText("View Updates")
        setDisplayRequested(prevValue => !prevValue);
    }

    function refreshData(){
        let filteredResults = getAllPlayedBoards(database); 
        console.log("filteredResults are ", filteredResults)
        setAllPlayedBoards(getAllPlayedBoards(database))
    }

    function getAllPlayedBoards(database){
        const filteredDb = database.filter((item) => item.updates > 0); 
        if (filteredDb.length === 0) {
            console.log("dbd: filtered database has no elements")
            return [ // allPlayedBoards always requires at least the starting board
                {
                "id":0,
                "state":[
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
                ],
                "turn":"X",
                "response":[
                4,
                4,
                0,
                0,
                4,
                0,
                0,
                0,
                0
                ],
                "transform":[
                0,
                0
                ],
                updates: 0
                }
        ];
    }
        else return filteredDb; 
    }

    function getColor(value) {
        let redComponent = 0; 
        let greenComponent = 0; 
        if (value >= 0) redComponent = Math.round(value * 255);
        else greenComponent = Math.round(-value * 255)
        return `rgb(${redComponent}, ${greenComponent}, 0)`; // green shows negatives, which should never happen. For debugging only. 
    }
    let getNormalCount = 0; 
    function getNormalValues(array){
        getNormalCount++; 
        console.log("getNormalCount is ", getNormalCount); 
        const sum = array.reduce((acc, val) => acc + val, 0);
        return array.map(item => item / sum)
    }
    
    
    // checkDbase(database, "2. upDater")
   return (
        <div> 
            <p style = {{fontSize: 12}}> {`Training Games Left: ${trainingIterations}`}</p> 
            <div className='tooltip-container'>
                <div>
                    <div className='tooltip-text'>
                        {props.updatesText}
                    </div>
                    <div>
                        <button onClick={toggleView}>{toggleText}</button>
                    </div> 
                </div>
            </div>
            {displayRequested && 
                <div>
                    <div>
                        <button onClick={refreshData}>Refresh</button>
                    </div> 
                    {/* <p> {props.devMode? `First probability distribution is ${JSON.stringify(roundOffElementsInArray(database[0].response))}`:""}</p>  */}
                    <ul className = 'array'>
                        {
                            allPlayedBoards.map((item, index) => {
                            // Assuming item.response is an array of values between 0 and 1
                            const colors = getNormalValues(item.response).map(getColor);
                            const vals = item.state;
                            return (
                                <li key={index}>
                                    <Board 
                                        squaresClassName={"probBoardButton"} 
                                        trainingMode={trainingMode} 
                                        values={vals} 
                                        squareColors={colors} 
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            }
        </div>
    )
    
    

}

export default React.memo(databaseDisplay);