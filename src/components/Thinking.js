//this is a small info window that says that the computer is thinking. 
// an appropriate delay is built in here. 

import React from 'react';
import { useEffect, useState} from 'react'
import { chooseMove } from '../auxiliary/choiceFunctions/chooseMove.js';
import { checkDbase, checkBoard } from "../auxiliary/testers/errorCheckers.js"
import {roundOffElementsInArray, placeMark} from "../auxiliary/general/usefulFunctions.js"
import Board from "./Board" 



export default function Thinking( props ) {
    
    let apexCritter = [1,2,3,4,5,6,7,8,9,10,11,12]; // for now this is just a dummy. 

    const playersTurn = props.playersTurn;
    const setPlayersTurn = props.setPlayersTurn; 
    
    const winner = props.winner; 
    const isCalculatingWinner = props.isCalculatingWinner
    const [thinkingWord, setThinkingWord] = useState("");
    const trainingMode = props.trainingMode; 
    const database = props.database;

    const [thinkBoard, setThinkBoard] = useState(Array(9).fill(null)); 
    const foe = props.foe; 
    const setFoe = props.setFoe; 
    const setSquares = props.setSquares; 
    const squares = props.squares; 
    const trainingIterations = props.trainingIterations; 
    const [computersTurn, setComputersTurn] = useState(false)
    const [probabilityArray, setProbabilityArray] = useState(Array(9).fill(null))
    const testMode = props.testMode; 
    const computerOff = props.computerOff 
    const setComputerOff = props.setComputerOff; 

    //const setFoe = props.setFoe; 



    // Whenever isCalculatingWinner changes value, ask the computer to check whether it needs to take a turn
    useEffect(
        checkForComputersTurn,
        [isCalculatingWinner,trainingIterations]
        );

    useEffect(
        () => {if (testMode && !playersTurn) {
            console.log('useEffect triggered in thinking, based on change in playersTurn')
            setComputerOff(false)
            checkForComputersTurn()}
        }, [playersTurn]
    )

    function checkForComputersTurn(){
        console.log("checking For Computers Turn..."); 
        if (computerOff) return; 
        if (isCalculatingWinner) {
            console.log("isCalculatingWinner is still in progress...")
            return
        }; 
        if (playersTurn) {
            console.log("checkForComputersTurn: Player's turn detected!"); 
            return; 
        };
        if (playersTurn) {
            console.log("I should not be here."); 
            return; 
        };
        if (winner) {
            console.log("Winner is determined. Canceling checkForComputersTurn!")
            return
        };
        console.log("checkForComputersTurn: Passed!"); 
        setComputersTurn(true); 
    }

    useEffect(
        takeComputersTurn,
        [computersTurn]
        );

    function takeComputersTurn(){
        console.log("passed Thinking/takeComputersTurn 1")
        if (computersTurn) {
            if (squares.includes(null)){                        // if there are empty squares left...
                computerPlay().then(resolvedSquares => {
                    console.log("squares are ", resolvedSquares)
                    checkBoard(resolvedSquares, "takeComputersTurn");
                    setSquares(resolvedSquares);
                    }
                ).catch(error => {
                    console.error("Error in takeComputersTurn:", error); 
                });
            }
            setComputersTurn(false)
        }
        // console.log("passed Thinking/takeComputersTurn 2")
    }


    function computerPlay() {
        console.log("Thinking/computerplay: playersTurn is ", playersTurn  )
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
            else {
                reverseFoe(); 
            }
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
    
    // this sets menace to play every other turn during training mode, with a random player 
    // making the opposite move. This ensures menace is exposed to better moves than it picks at random, 
    // speeding up training. 
    function reverseFoe(){
        let foes = ["menace","minimax"]
        if (foe === "menace"){
            let randomFoe = foes[Math.floor(Math.random() * foes.length)];
            setFoe(randomFoe)
        }
        else setFoe("menace"); 
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
                console.log("choosing move")
                const choiceAndBoard = chooseMove(board, database, [foe,apexCritter]);  //apexCritter will only be defined for evolvo
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
            <Board devMode = {props.devMode} trainingMode = {trainingMode} squaresClassName = "thinkBoardButton" values = {thinkBoard}/>
        </div>
      
    )
  }

 