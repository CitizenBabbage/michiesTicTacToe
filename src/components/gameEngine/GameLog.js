import React from 'react';
import { useState, useRef, useEffect} from 'react';
import {areIdentical, includes} from "../../auxiliary/general/usefulFunctions.js"
import Board from "../board/Board.js" 


export default function GameLog( props ){
    // const dbs = props.dbs, setDBS = props.setDBS; 
    // useEffect(() => {
    //     setDBS(prevValue => prevValue + 1);
    // }, []); 
    // console.log("GameLog, debugging sequencer: ", dbs)

    const gameLog = props.gameLog; 
    const setGameLog = props.setGameLog; 
    const squares = props.squares; 
    //const winner = props.winner; 
    const initialRender = useRef(true);
    //const [logBoardButton, setLogBoardButton] = useState("logBoardButton"); 
    const trainingMode = props.trainingMode;
    

    useEffect(addBoardStateToLog,[squares])


    function addBoardStateToLog(){
        //console.log("1. gameLog is ", gameLog)
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        if (!includes(gameLog,squares)) {
            setGameLog((gameLog) => [...gameLog,squares])
        }

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