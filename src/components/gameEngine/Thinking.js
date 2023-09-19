//this is a small info window that says that the computer is thinking. 
// an appropriate delay is built in here. 

import React from 'react';
import { useEffect, useState} from 'react'
import { chooseMove } from '../../auxiliary/choiceFunctions/chooseMove.js';
import { checkDbase, checkBoard } from "../../auxiliary/testers/errorCheckers.js"
import {roundOffElementsInArray, placeMark} from "../../auxiliary/general/usefulFunctions.js"
import Board from "../board/Board.js" 
import SoundComponent from '../presentational/soundFX/SoundFX.js';



export default function Thinking( props ) {
    
    let genome = [1,2,3,4,5,6,7,8,9,10,11,12]; // for now this is just a dummy.
    const network = props.net; 
    
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
    const [foeSpec,setFoeSpec] = useState([]); 
    const [tempComputerOpponent, setTempComputerOpponent] = useState(foe); 


    function setFoeSpecifications(){
        if (foe === 'menace') {setFoeSpec(database)}
        else if (foe === 'evolvo') {setFoeSpec(genome)}
        else if (foe === 'Neuro') {setFoeSpec(network)}
    }

    useEffect(setFoeSpecifications,[])

    // Whenever isCalculatingWinner changes value, ask the computer to check whether it needs to take a turn
    useEffect(
        () => {
            console.log('useffect[isCalculatingWinner,trainingIterations] winner is ', winner),
            checkForComputersTurn()
        },
        [isCalculatingWinner,trainingIterations]
        );


        
    useEffect(
        () => {if (testMode && !playersTurn) {
            console.log('useEffect triggered in thinking, based on change in playersTurn')
            console.log('useffect[playersTurn] winner is ', winner)

            setComputerOff(false)
            checkForComputersTurn()}
        }, [playersTurn]
    )

    function checkForComputersTurn(){
        console.log("checking For Computers Turn..."); 
        console.log("winner should be undefined, but is ", winner)
        if (computerOff) {
            console.log("computerOff is set to true. Canceling checkForComputersTurn!")
            return
        }; 
        if (isCalculatingWinner) {
            console.log("isCalculatingWinner is still in progress. Canceling checkForComputersTurn!")
            return
        }; 
        if (playersTurn) {
            console.log("checkForComputersTurn: Player's turn detected! Canceling checkForComputersTurn!"); 
            return; 
        };
        if (trainingMode && !trainingIterations > 0) {
            console.log("Training iterations not set or reduced to 0. Canceling checkForComputersTurn!"); 
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
        //console.log("passed Thinking/takeComputersTurn 1")
        if (computersTurn) {
            if (squares.includes(null)){                        // if there are empty squares left...
                computerPlay().then(resolvedSquares => {
                    //console.log("takeComputersTurn: squares are ", resolvedSquares)
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
        let nextSquares = [...squares];                                             // create duplicate board in memory
        return delayAndChoose(nextSquares).then(choiceAndProbabilityArray => {
            console.log("computerPlay: Move chosen is " , choiceAndProbabilityArray[0])
            nextSquares = placeMark(choiceAndProbabilityArray[0], nextSquares)      // set the board square to X or O, as appropriate
            //console.log("computerPlay: choiceAndProbabilityArray[1] is", choiceAndProbabilityArray[1])
            setProbabilityArray(choiceAndProbabilityArray[1])
            return Promise.resolve(nextSquares); 
            }
        )
        }
        
    

    // useEffect(
    //     changeTurns,
    //     [computersTurn]
    // )
    
    // function changeTurns(){
    //     if (!computersTurn){
    //         if (!trainingMode) {
    //             setPlayersTurn(true)
    //         }
    //         else {
    //             reverseFoe(); 
    //         }
    //     }
    // }
    
    useEffect(
        updateProbabilityBoard,
        [probabilityArray]
    )

    function updateProbabilityBoard(){
        console.log("updateProbabilityBoard: probabilityArray is ", probabilityArray)
        setThinkBoard(roundOffElementsInArray(probabilityArray)); 
        return; 
    }
    
    // this sets menace to play every other turn during training mode, with a random player 
    // making the opposite move. This ensures menace is exposed to better moves than it picks at random, 
    // speeding up training. 
    // DON'T add evolvo or neuro to the foes list without checking the note below re foeSpecs. 
    function reverseFoe(){
        let foes = ["menace","minimax","huris"]
        if (tempComputerOpponent === "menace"){
            let randomFoe = foes[Math.floor(Math.random() * foes.length)];
            setTempComputerOpponent(randomFoe)
        }
        else setTempComputerOpponent("menace"); 
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
                //foeSpec is database for menace, genome for evolvo, network for neuro
                // NOTE that you can't just add evolvo & neuro as opponents for menace
                // because they need to take their foespec, which will be set to menace's
                const choiceAndBoard = chooseMove(board, foeSpec, tempComputerOpponent); 
                console.log("choiceAndBoard is: ", choiceAndBoard); 
                console.log("delayAndChoose: foe is: ", foe)
                //console.log("delayAndChoose, selected move is :", choice)
                setPlayersTurn(true); 
                resolve(choiceAndBoard);
               
            })
            .catch((error) => {
                console.error("Error in delayAndChoose:", error);
                reject(error);
            });
        });
    }

    return (
        <div className='center'>
            <p> {!playersTurn && !winner?"Thinking...":'\u00A0'} </p>
            {foe === 'menace' && <Board devMode = {props.devMode} trainingMode = {trainingMode} squaresClassName = "thinkBoardButton" values = {thinkBoard}/>}
            {foe === 'Neuro' && <Board devMode = {props.devMode} trainingMode = {trainingMode} squaresClassName = "neuroPredictions" values = {thinkBoard}/>}
            {foe === 'minimax' && <Board devMode = {props.devMode} trainingMode = {trainingMode} squaresClassName = "minimaxBoard" values = {thinkBoard}/>}
            <SoundComponent trainingMode = {props.trainingMode} computersTurn = {computersTurn} foe = {foe} whoWon = {props.whoWon} soundEffect = {props.soundEffect} setSoundEffect= {props.setSoundEffect}/>

        </div>
      
    )
  }

 