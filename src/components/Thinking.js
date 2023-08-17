//this is a small info window that says that the computer is thinking. 
// an appropriate delay is built in here. 

import React from 'react';
import { useEffect, useState} from 'react'
import { chooseMove } from '../auxiliary/chooseMove.js';
import { checkDbase, checkBoard } from "../auxiliary/errorCheckers.js"
import {roundOffElementsInArray, placeMark} from "../auxiliary/usefulFunctions.js"
import Board from "./Board" 



export default function Thinking( props ) {
    

    const renderComputersMove = props.renderComputersMove; 
    const playersTurn = props.playersTurn;
    const winner = props.winner; 
    const isCalculatingWinner = props.isCalculatingWinner
    const setPlayersTurn = props.setPlayersTurn; 
    const [thinkingWord, setThinkingWord] = useState("");
    const trainingMode = props.trainingMode; 
    const database = props.database;

    const [thinkBoard, setThinkBoard] = useState(Array(9).fill(null)); 
    const foe = props.foe; 
    const [isCalculatingTurn, setIsCalculatingTurn] = useState(false)
    const setSquares = props.setSquares; 
    const squares = props.squares; 
    const trainingIterations = props.trainingIterations; 
    const [computersTurn, setComputersTurn] = useState(false)
    const [probabilityArray, setProbabilityArray] = useState(Array(9).fill(null))
    //const setFoe = props.setFoe; 



    // Whenever isCalculatingWinner changes value, ask the computer to check whether it needs to take a turn
    useEffect(
        checkForComputersTurn,
        [isCalculatingWinner,trainingIterations]
        );


    function checkForComputersTurn(){
        console.log("checking For Computers Turn..."); 
        if (isCalculatingWinner) {
            console.log("isCalculatingWinner is still in progress...")
            return
        }; 
        if (playersTurn) {
            console.log("checkForComputersTurn: Player's turn detected!"); 
            return; 
        };
        if (winner) {
            console.log("Winner is determined. Canceling checkForComputersTurn!")
            return
        };
        setComputersTurn(true); 
    }

    useEffect(
        takeComputersTurn,
        [computersTurn]
        );

    function takeComputersTurn(){
        //console.log("passed Thinking/takeComputersTurn 1")
        if (computersTurn) {
            if (squares.includes(null)){                        // if there are empty squares left...
                computerPlay().then(resolvedSquares => {
                    checkBoard(resolvedSquares, "takeComputersTurn");
                    console.log("squares are ", resolvedSquares)
                    setSquares(resolvedSquares);
                    }
                ).catch(error => {
                    console.error("Error in takeComputersTurn:", error);
                    // Handle the error as appropriate for your application here
                });
            }
            setComputersTurn(false)
        }
        // console.log("passed Thinking/takeComputersTurn 2")
    }


    function computerPlay() {
        console.log("current player is ", )
        console.log("passed Thinking/computerPlay 1")
        let nextSquares = [...squares];                                             // create duplicate board in memory
        return delayAndChoose(nextSquares).then(choiceAndProbabilityArray => {
            nextSquares = placeMark(choiceAndProbabilityArray[0], nextSquares)      // set the board square to X or O, as appropriate
            // nextSquares[choiceAndProbabilityArray[0]] = props.opponent;             
            setProbabilityArray(choiceAndProbabilityArray[1])
            console.log("passed Thinking/computerPlay 2")
            return Promise.resolve(nextSquares); 
            }
        )
        }
        
    

    useEffect(
        changeTurns,
        [computersTurn]
    )
    
    function changeTurns(){

        if (!computersTurn){
            if (!trainingMode) {
                setPlayersTurn(true)
            }
            // else {
            //     setOpponent(opposite(opponent));
            //     //reverseFoe(); 
            // }
        }
    }
    
    useEffect(
        updateProbabilityBoard,
        [probabilityArray]
    )

    function updateProbabilityBoard(){
        setThinkBoard(roundOffElementsInArray(probabilityArray)); 
        return; 
    }
    

    // function reverseFoe(){
    //     let foes = ["menace","minimax"]
    //     if (foe === "menace"){
    //         let randomFoe = foes[Math.floor(Math.random() * foes.length)];
    //         setFoe(randomFoe)
    //     }
    //     else setFoe("menace"); 
    // }
  
    
 
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
                console.log("choosing move")
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
            <Board devMode = {props.devMode} trainingMode = {trainingMode} squaresClassName = "thinkBoardButton" squares = {thinkBoard}/>
        </div>
      
    )
  }

 