import React from 'react';
import { useRef, useState, useEffect} from 'react';
import {includes} from "../auxiliary/usefulFunctions.js"

export default function GameLog( props ){
    const gameLog = props.gameLog; 
    const setGameLog = props.setGameLog; 
    const squares = props.squares; 
    //const winner = props.winner; 
    const initialRender = useRef(true);


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

   

    return (
        <div>
            <p>Game Log:</p>
            <ul>
                {gameLog.map((item, index) => (
                    <li key={index}>{JSON.stringify(item)}</li>
                ))}
            </ul>
        </div>
    )
}