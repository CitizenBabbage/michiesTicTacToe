import React from 'react';
import { useState, useRef, useEffect} from 'react';
import {areIdentical, includes} from "../../auxiliary/general/usefulFunctions.js"
import Board from "../board/Board.js" 


export default function GameLog( props ){

    const gameLog = props.gameLog; 
    const setGameLog = props.setGameLog; 
    const squares = props.squares; 
    //const winner = props.winner; 
    const initialRender = useRef(true);
    //const [logBoardButton, setLogBoardButton] = useState("logBoardButton"); 
    const trainingMode = props.trainingMode;
    const trainingTurn = props.trainingTurn; 
    const computerOff = props.computerOff; 

    useEffect(() => {
        console.log("gl1: exploring adding board state to log...")
        if (squares) addBoardStateToLog(); 
    },[trainingTurn, computerOff])


    function addBoardStateToLog(){
        // console.log("1. gameLog is ", gameLog)
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        if (!includes(gameLog,squares)) {
            setGameLog((gameLog) => [...gameLog,squares])
            console.log("gl2. gameLog set ")
        }
        else (console.log("gamelog: didn't add board state to log because it was already included!"))

    }

    

   

    if (!trainingMode) return (
        <div>
            <p>Game Log:</p>
            <ul className='gamelog'>
                {gameLog.map((item, index) => (
                    <li key={index} className = 'gamelog-item'>
                    <Board squaresClassName = {"logBoardButton"} trainingMode = {props.trainingMode} values = {item} />
                    <p>
                        {/* space between boards */}
                    </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}