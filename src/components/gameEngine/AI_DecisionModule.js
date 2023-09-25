//this is a small info window that says that the computer is thinking. 
// an appropriate delay is built in here. 

import React from 'react';
import { useEffect, useState} from 'react'
import { chooseMove } from '../../auxiliary/choiceFunctions/chooseMove.js';
import { checkDbase, checkBoard } from "../../auxiliary/testers/errorCheckers.js"
import {roundOffElementsInArray, placeMark} from "../../auxiliary/general/usefulFunctions.js"
import Board from "../board/Board.js" 
import SoundComponent from '../presentational/soundFX/SoundFX.js';



export default function AI_DecisionModule( props ) {
    
    const network = props.net; 
    
    const winner = props.winner; 
    const trainingMode = props.trainingMode; 
    const database = props.database;

    const [thinkBoard, setThinkBoard] = useState(Array(9).fill(null)); 
    const foe = props.foe; 
    // const setFoe = props.setFoe; 
    const setSquares = props.setSquares; 
    const squares = props.squares; 
     

    const [probabilityArray, setProbabilityArray] = useState(Array(9).fill(null))
    // const testMode = props.testMode; 
    const computerOff = props.computerOff 
    const [foeSpec,setFoeSpec] = useState([]); 
    const [tempComputerOpponent, setTempComputerOpponent] = useState(foe); 
    const ranking = props.ranking; 
    const [controllingGenome, setControllingGenome] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13]); 
    const trainingTurn = props.trainingTurn; 


    // the following useEffect updates the controller after learning or change in opponent 
    useEffect(setFoeSpecifications,[database, ranking, network, foe])

    function setFoeSpecifications(){
        if (foe === 'menace') {setFoeSpec(database)}
        else if (foe === 'evolvo') {setFoeSpec(ranking[0])}
        else if (foe === 'Neuro') {setFoeSpec(network)}
    }

    // the following useEffect triggers the AI
    useEffect(()=>{
        if (!computersTurn()) return;
        takeComputersTurn(); 
    },[trainingTurn, computerOff]) // these values are changed in GameCycle at the right time to trigger the AI


    function takeComputersTurn(){
        computerPlay().then(resolvedSquares => {
            checkBoard(resolvedSquares, "takeComputersTurn");
            setSquares(resolvedSquares); // this triggers restart of gameCycle in gameCycle
            }
        ).catch(error => {
            console.error("Error in takeComputersTurn:", error); 
        });
    }

    function computersTurn(){ //returns true if it is time for the computer to move
        console.log("checking For Computers Turn..."); 
        if (computerOff) {
            console.log("computerOff is set to true. Canceling checkForComputersTurn!")
            return
        }; 
        // if (isCalculatingWinner) {
        //     console.log("isCalculatingWinner is still in progress. Canceling checkForComputersTurn!")
        //     return
        // }; 
        if (trainingMode && !trainingIterations > 0) {
            console.log("Training iterations not set or reduced to 0. Canceling checkForComputersTurn!"); 
            return; 
        };
        if (winner) {
            console.log("Winner is determined. Canceling checkForComputersTurn!")
            return
        };
        console.log("checkForComputersTurn: Passed!"); 
        return true; 
    }


    // computerPlay is async because an artificial delay is introduced to make the timing feel natural 
    async function computerPlay() {
        let nextSquares = [...squares];                                             // create duplicate board in memory
        return delayAndChoose(nextSquares).then(choiceAndProbabilityArray => {
            console.log("computerPlay: Move chosen is " , choiceAndProbabilityArray[0])
            nextSquares = placeMark(choiceAndProbabilityArray[0], nextSquares)      // set the board square to X or O, as appropriate
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
                // NOTE that you can't just add evolvo & neuro as opponents for menace
                // because they need to take their foespec, which will be set to menace's
    function reverseFoe(){
        let foes = ["menace","minimax","huris"]
        if (tempComputerOpponent === "menace"){
            let randomFoe = foes[Math.floor(Math.random() * foes.length)];
            setTempComputerOpponent(randomFoe)
        }
        else setTempComputerOpponent("menace"); 
    }
  
    
 
    // the purpose of this is just to create a small delay so that the computer appears to be thinking.
    // Without this the computer responds almost simultaneously with player move, which feels unnatural

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
                //setPlayersTurn(true); 
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
            {!trainingMode && <p> {winner === 'D'? "It is a draw!": winner? `${winner} is the winner!` : !computerOff && !winner?"Thinking...":'\u00A0'} </p>}

            {/* <p> {!computerOff && !winner?"Thinking...":'\u00A0'} </p> */}
            {foe === 'menace' && <Board devMode = {props.devMode} trainingMode = {trainingMode} squaresClassName = "thinkBoardButton" values = {thinkBoard}/>}
            {foe === 'Neuro' && <Board devMode = {props.devMode} trainingMode = {trainingMode} squaresClassName = "neuroPredictions" values = {thinkBoard}/>}
            {foe === 'minimax' && <Board devMode = {props.devMode} trainingMode = {trainingMode} squaresClassName = "minimaxBoard" values = {thinkBoard}/>}
            <SoundComponent trainingMode = {props.trainingMode} computersTurn = {computersTurn} foe = {foe} whoWon = {props.whoWon} soundEffect = {props.soundEffect} setSoundEffect= {props.setSoundEffect}/>
            {foe === 'evolvo' && <p> Controlling genome is: {JSON.stringify(ranking[0])}</p>  }
        </div>
      
    )
  }

 