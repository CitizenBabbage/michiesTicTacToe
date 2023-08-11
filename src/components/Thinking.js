//this is a small info window that says that the computer is thinking. 
// an appropriate delay is built in here. 

import React from 'react';
import { useEffect, useRef , useState} from 'react'
import { chooseMove } from "../auxiliary/chooseMove.js"
import {opposite} from "../auxiliary/usefulFunctions.js"
import Board from "./Board" 



export default function Thinking( props ) {
    // const dbs = props.dbs, setDBS = props.setDBS;
    // useEffect(() => {
    //     setDBS(prevValue => prevValue + 1);
    // }, []); 
    // console.log("thinking, debugging sequencer: ", dbs)

    const renderComputersMove = props.renderComputersMove; 
    const board = props.squares; 
    const playersTurn = props.playersTurn;
    const winner = props.winner; 
    const isCalculatingWinner = props.isCalculatingWinner
    const setPlayersTurn = props.setPlayersTurn; 
    const [thinkingWord, setThinkingWord] = useState("");
    const trainingMode = props.trainingMode; 
    const setTrainingMode = props.setTrainingMode
    const opponent = props.opponent; 
    const setOpponent = props.setOpponent; 
    const database = props.database; 
    const [thinkBoard, setThinkBoard] = useState(Array(9).fill(null)); 
    const foe = props.foe; 
    const setFoe = props.setFoe; 
     

    // Whenever isCalculatingWinner changes value, ask the computer to check whether it needs to take a turn
    useEffect(() => {
        console.log("useEffect triggered based on change in isCalculatingWinner")
        if (isCalculatingWinner) return; 
        console.log("1")
        console.log("playersTurn is ", playersTurn)
        if (playersTurn) {setThinkingWord("Player's Turn"); return;} 
        console.log("2")
        if (winner) return;
        console.log("3")
        if (trainingMode){
            setThinkingWord("Training...")
            if (props.trainingIterations === 0){setThinkingWord("Training Complete!")}
        }
        else setThinkingWord("Thinking..."); 
        computerPlay().then(resolvedSquares => {
            renderComputersMove(resolvedSquares); // make sure computerPlay resolves before passing it to renderComputersMove
            if (!trainingMode) {
                //console.log("Training mode is off.")
                setPlayersTurn(true);}
        })
        } 
        , [isCalculatingWinner]);



      function computerPlay() {
        let nextSquares = props.squares.slice();                        // create duplicate board in memory
        if (!nextSquares.includes(null)) return                         // if there are no empty squares left, finish. 
        return delayAndChoose(nextSquares).then(choiceAndBoard => {
            nextSquares[choiceAndBoard[0]] = props.opponent;            // set the board square to X or O, as appropriate
            setThinkBoard(roundOff(choiceAndBoard[1])); 
            if (trainingMode) setOpponent(opposite(opponent));
            return Promise.resolve(nextSquares); 
        });
        }
    

    function reverseFoe(){
        let foes = ["menace","minimax"]
        if (foe === "menace"){
            let randomFoe = foes[Math.floor(Math.random() * foes.length)];
            setFoe(randomFoe)
        }
        else setFoe("menace"); 
    }
  
    function roundOff(array){
        let newArray = []; 
        for (let i = 0; i < array.length; i++){
            newArray.push(Math.round(array[i] * 100) / 100)
        }
        return newArray; 
    }
 
    // the purpose of this is just to create a small delay so that the computer appears to be thinking
    // without it the computer tends to respond simultaneously with the player's move, which is unnatural

    function delay(delay) {
        return new Promise((resolve) => {
        setTimeout(() => {resolve()}, delay);
        });
    }


    function delayAndChoose(board) {
        return new Promise((resolve, reject) => {
            let delayms = 0; 
            if (!trainingMode){delayms = 3000}
            delay(delayms)
            .then(() => {
                const choiceAndBoard = chooseMove(board, database, foe);  
                console.log("foe is: ", foe)
                //console.log("delayAndChoose, selected move is :", choice)
                resolve(choiceAndBoard);
                console.log("choiceAndBoard is: ", choiceAndBoard);
            })
            .catch((error) => {
                console.error("Error in delayAndChoose:", error);
                reject(error);
            });
        });
    }


    return (
        <div>
            <p> {thinkingWord} </p>
            <Board trainingMode = {trainingMode} squaresClassName = "thinkBoardButton" squares = {thinkBoard}/>
        </div>
      
    )
  }

 