import React from 'react';
import { useEffect, useState } from 'react'; 
import { areExactlyTheSame, roundOffElementsInArray } from '../../auxiliary/general/usefulFunctions.js';
import "./DatabaseDisplay.css"
import Board from "../board/Board.js"
import { Tooltip } from '../presentational/ToolTip.js';

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
    const [textTipIndex, setTextTipIndex] = useState(0); 
    const [mouseEventCounter, setMouseEventCounter] = useState(0); 

    const textTips = ["This display shows boards that were encountered during learning", "The colors show how probable each move was in response to the current situation", "The redder the square, the higher the probability", "Hovering your mouse over any board shows more detail, like so...", "In this text window, numbers represent beads remaining for that choice", "# represents an occupied square", "If there are any $'s, they represent rotations or reflections of equivalent moves", "Updating a square is the same as updating its rotations and reflections"]
    
    // useEffect(() => {setUpdateLog(database.filter(item => allPlayedBoards.some(apbItem => areExactlyTheSame(apbItem.state, item.state))))},[allPlayedBoards])

    useEffect(() => {
        setTextTipIndex(prevValue => (prevValue + 1) % textTips.length)
    }
    ,[mouseEventCounter])

    useEffect(() => {
        if (displayRequested) toggleView(); 
    }, [trainingIterations])

    function toggleView(){
        if (toggleText === "View Updates") {
            refreshData(); 
            setToggleText("Hide Updates")
        }
        else {
            setToggleText("View Updates"); 
        }
        setDisplayRequested(prevValue => !prevValue);
    }

    function refreshData(){
        let filteredResults = getAllPlayedBoards(database); 
        setAllPlayedBoards(getAllPlayedBoards(database))
    }

    function getAllPlayedBoards(database){
        const filteredDb = database.filter((item) => item.updates > 0); 
        if (filteredDb.length === 0) {
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
        // let greenComponent = 0; 
        if (value >= 0) redComponent = Math.round(value * 255);
        // else greenComponent = Math.round(-value * 255)
        return `rgb(${redComponent}, 0, 0)`; // 
    }

    let getNormalCount = 0; 
    function getNormalValues(array){
        getNormalCount++; 
        const sum = 1 + array.reduce((acc, val) => val < 0? acc : acc + val, 0);
        return array.map(item => item / sum)
    }

    function changeNegativesToHashForDisplay(board, response){
        let output = []; 
        for (let i = 0; i < board.length; i ++) {
            if (board[i] === 'X' || board[i] === 'O') output[i] = '#'; // a # represents a filled square
        }
        for (let i = 0; i < response.length; i ++) {
            if (output[i] === '#') continue; 
            else if (response[i] === -1) output[i] = '$'; // a $ represents a square that is symmetrical, or a rotational variant, of a square that has been scored
            else  output[i] = response[i]; 
        }
        return output; 
    }

    function formatArrayToGrid(arr) {
        let result = '';
        for (let i = 0; i < arr.length; i += 3) {
          result += arr.slice(i, i + 3).join(' ') + '\n';
        }
        // console.log(`unstringified display is ${result}`)
        // console.log(`display is ${JSON.stringify(result)}`)
        return result;
      }

   

      
    
    
    // checkDbase(database, "2. upDater")
   return (
        <div> 
            <p style = {{fontSize: 12}}> {`Training Games Left: ${trainingIterations}`}</p> 
            <button className='retro-button' onClick={toggleView}>
                    {toggleText}
            </button>
            {/* <Tooltip tooltipText={textTips[textTipIndex]}>
            <div>
                <button className='retro-button' onClick={toggleView}>
                    {toggleText}
                </button>
            </div> 
            </Tooltip> */}
            {displayRequested && 
                <div>
                    <div>
                        <button className='retro-button' onClick={refreshData}>Refresh</button>
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
                                        tipText = {textTips[textTipIndex] +"\n" + formatArrayToGrid(changeNegativesToHashForDisplay(item.state, item.response))}
                                        setMouseEventCounter = {setMouseEventCounter}
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