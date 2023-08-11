import React from 'react';
import { useRef, useState, useEffect} from 'react';
import {includes} from "../auxiliary/usefulFunctions.js"
import "./GameLog.css"
import Board from "./Board" 


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
    

    useEffect(()=>{
        //console.log("1. gameLog is ", gameLog)
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        if (!includes(gameLog,squares)) {
            //console.log(`${JSON.stringify(gameLog)} does not include ${JSON.stringify(squares)}`)
            setGameLog((gameLog) => [...gameLog,squares])
        }
    },
    [squares])

   

    if (!trainingMode) return (
        <div>
            <p>Game Log:</p>
            <ul className='list'>
                {gameLog.map((item, index) => (
                    <li key={index}>
                    <Board squaresClassName = {"logBoardButton"} trainingMode = {props.trainingMode} squares = {item} />
                    <p>
                        {/* space between boards */}
                    </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}