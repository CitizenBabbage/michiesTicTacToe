//this is a small info window that says that the computer is thinking. 
// an appropriate delay is built in here. 

import React from 'react';
import { useEffect, useRef , useState} from 'react'
import { chooseMove } from "../auxiliary/chooseMove.js"
import {opposite} from "../auxiliary/usefulFunctions.js"
import Board from "./Board" 



export default function Thinking( props ) {
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
    const [thinkBoard, setThinkBoard] = useState(Array(9).fill(null))


    useEffect(() => {
        // Whenever isCalculatingWinner changes value, ask the computer to check whether it needs to take a turn
        if (playersTurn || winner ) {setThinkingWord("Player's Turn"); return;} 
        if (isCalculatingWinner) return; 
        else {
            if (trainingMode){setThinkingWord("Training...")}
            else setThinkingWord("Thinking..."); 
            computerPlay().then(resolvedSquares => {
                renderComputersMove(resolvedSquares); // make sure computerPlay resolves before passing it to renderComputersMove
                if (!trainingMode) {
                    //console.log("Training mode is off.")
                    setPlayersTurn(true);}
            })
        } 
      }, [isCalculatingWinner]);



      function computerPlay() {
        //console.log("computerPlay called in Thinking")
        console.log("thinking/computerPlay: About to take a turn. Opponent is: ", props.opponent)
        if (props.squares === undefined){props.setIsCalculatingWinner(true); return}
        let nextSquares = props.squares.slice(); // create duplicate board in memory
        if (props.winner) return Promise.resolve(board); // if player has just won, stop
        if (nextSquares.includes(null)) {// if there are any empty squares left
            if (trainingMode !== true) { // if ordinary game
                return delayAndChoose(nextSquares).then(choiceAndBoard => {
                    nextSquares[choiceAndBoard[0]] = props.opponent; // set the board square to X or O, as appropriate
                    setThinkBoard(roundOff(choiceAndBoard[1])); 
                    return Promise.resolve(nextSquares); 
                });
                }
            else return delayAndChoose(nextSquares).then(choiceAndBoard => {
                nextSquares[choiceAndBoard[0]] = props.opponent; // set the board square to X or O, as appropriate
                setThinkBoard(roundOff(choiceAndBoard[1])); 
                setOpponent(opposite(opponent));
                return Promise.resolve(nextSquares); 
                }
            )
        // if there are no empty squares left...
        return Promise.resolve(nextSquares); // 
        }
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
            if (trainingMode !== true){delayms = 3000}
            delay(delayms)
            .then(() => {
                const choiceAndBoard = chooseMove(board, database); 
                console.log("choiceAndBoard is: ", choiceAndBoard); 
                //console.log("delayAndChoose, selected move is :", choice)
                resolve(choiceAndBoard);
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

 