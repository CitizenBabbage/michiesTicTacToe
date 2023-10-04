//this is a small info window that says that the computer is thinking. 
// an appropriate delay is built in here. 

import React from 'react';
import { useEffect, useState} from 'react'
import { chooseMove } from '../../auxiliary/choiceFunctions/chooseMove.js';
import { checkDbase, checkBoard } from "../../auxiliary/testers/errorCheckers.js"
import {roundOffElementsInArray, placeMark, whoseMove, doubleCheckItsReallyComputersTurn} from "../../auxiliary/general/usefulFunctions.js"
import Board from "../board/Board.js" 
import SoundComponent from '../presentational/sound/SoundFX.js';
import GenomeDisplay from '../presentational/genomeDisplay.js';
import { createGenome } from '../../auxiliary/geneticAlgo/createGenepool.js';



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
    const setResigned = props.setResigned; 
    const setComputerOff = props.setComputerOff; 
    const humansLetter = props.humansLetter; 

    const [probabilityArray, setProbabilityArray] = useState(Array(9).fill(null))
    // const testMode = props.testMode; 
    const computerOff = props.computerOff 
    const [foeSpec,setFoeSpec] = useState(returnFoeSpecs()); 
    const [tempComputerOpponent, setTempComputerOpponent] = useState(foe); 
    const ranking = props.ranking; 
    const controllingGenome = props.controllingGenome;
    const setControllingGenome = props.setControllingGenome;
    const trainingTurn = props.trainingTurn; 
    const trainingIterations = props.trainingIterations; 
    let ruleUsed = '\u00A0'; 

    // the following useEffect updates the controller after learning or change in opponent 
    useEffect(() => {setFoeSpec(returnFoeSpecs())},[database, ranking, network, foe])

    // function setFoeSpecifications(){
    //     if (foe === 'menace') {
    //         console.log("aidm: setting Foe Specifications to database... "); 
    //         setFoeSpec(database)
    //     }
    //     else if (foe === 'evolvo') {
    //         console.log("aidm: setting Foe Specifications to ranking[0].genome... "); 
    //         setFoeSpec(ranking[0].genome)
    //     }
    //     else if (foe === 'Neuro') {
    //         console.log("aidm: setting Foe Specifications to network... "); 
    //         setFoeSpec(network)}
    // }

    function returnFoeSpecs(){
        if (foe === 'menace') {
            console.log("aidm: setting Foe Specifications to database... "); 
            return database; 
        }
        else if (foe === 'evolvo') {
            console.log("aidm: setting Foe Specifications to ranking[0].genome... "); 
            return ranking[0].genome; 
        }
        else if (foe === 'Neuro') {
            console.log("aidm: setting Foe Specifications to network... "); 
            return network
        }
    }
    

    // the following useEffect triggers the AI
    useEffect(()=>{
        console.log("aidm 1: change in training turn or computerOff recognised...")
        console.log("aidm 1a: computerOff is...", computerOff)

        if (!computersTurn()) {
            console.log("aidm 1c: computersTurn check failed ... exiting the useEffect.")
            return;
        }
        console.log("aidm 2: computersTurn check passed ... taking computers turn...")
        takeComputersTurn(); 
        console.log("aidm 3: computersTurn turn taken ...")
    },[trainingTurn, computerOff]) // these values are changed in GameCycle at the right time to trigger the AI


     


    function takeComputersTurn(){
        computerPlay().then(resolvedSquares => {
            //checkBoard(resolvedSquares, "takeComputersTurn");
            console.log("aidm 4: setting squares...")
            setSquares(resolvedSquares); // this triggers restart of gameCycle in gameCycle
            }
        ).catch(error => {
            console.error("Error in takeComputersTurn:", error); 
        });
    }

    function computersTurn(){ //returns true if it is time for the computer to move
        console.log("checking For Computers Turn...");
        console.log("aidm: computersTurn, computeroff is.... ", computerOff) 
        if (computerOff) {
            console.log("computerOff is set to true. Canceling checkForComputersTurn!")
            return false; 
        }; 
        // if (isCalculatingWinner) {
        //     console.log("isCalculatingWinner is still in progress. Canceling checkForComputersTurn!")
        //     return
        // }; 
        if (trainingMode) console.log("it's trainingMode!")
        console.log("trainingIterations are : ", trainingIterations)
        if (trainingMode && trainingIterations <= 0) {
            console.log("Training iterations not set or reduced to 0. Canceling checkForComputersTurn!"); 
            return false; 
        };
        if (winner) {
            console.log("Winner is determined. Canceling checkForComputersTurn!")
            return false; 
        };
        console.log("checkForComputersTurn: Passed!"); 
        // the following is a temporary fix for a bug. It should be unnecessary. 
        if (!doubleCheckItsReallyComputersTurn(squares, humansLetter, trainingMode)) {
            console.log("aidm: failed double check that it really is computer's turn.")
            if (!computerOff) setComputerOff(true); 
            return false; 
        }
        return true; 
    }


    // computerPlay is async because an artificial delay is introduced to make the timing feel natural 
    async function computerPlay() {
        let nextSquares = [...squares];                                             // create duplicate board in memory
        return delayAndChoose(nextSquares).then(choiceAndData => {
            console.log("computerPlay: Move chosen is " , choiceAndData[0])
            if (choiceAndData[0] === -1){
                setResigned(whoseMove(nextSquares))
            }
            nextSquares = placeMark(choiceAndData[0], nextSquares)      // set the board square to X or O, as appropriate
            setProbabilityArray(choiceAndData[1])
            if (foe === 'huris') {ruleUsed = choiceAndData[1]}
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
            if (trainingMode){delayms = 0}
            else delayms = 3000; 
            delay(delayms)
            .then(() => {
                //foeSpec is database for menace, genome for evolvo, network for neuro
                // NOTE that you can't just add evolvo & neuro as opponents for menace
                // because they need to take their foespec, which will be set to menace's
                console.log(`AIDM: foe is `, foe)
                console.log(`AIDM: foeSpec is `, foeSpec)
                const choiceAndData = chooseMove(board, foeSpec, tempComputerOpponent); 
                resolve(choiceAndData);
               
            })
            .catch((error) => {
                console.error("Error in delayAndChoose:", error);
                reject(error);
            });
        });
    }

    let squareColors; 
    if (foe === 'menace'){
        squareColors = ["rgb(255, 255, 0)", "rgb(165, 125, 42)", "rgb(255, 125, 0)", "rgb(0, 255, 0)", "rgb(255,255, 255)", "rgb(255, 0, 0)","rgb(0, 255, 255)","rgb(50, 50, 255)","rgb(255, 0, 255)" ]
    }

    return (
        <div className='center'>
            {!trainingMode && <p> {winner === 'D'? "It is a draw!": winner? `${winner} is the winner!` : !computerOff && !winner?"Thinking...":["huris", "evolvo"].includes(foe)? probabilityArray? probabilityArray: '\u00A0' :'\u00A0'} </p>}

            {/* <p> {!computerOff && !winner?"Thinking...":'\u00A0'} </p> */}
            {foe === 'menace' && !trainingMode && <Board devMode = {props.devMode} boardText = {props.thinkBoardText} squareColors = {squareColors} trainingMode = {trainingMode} squaresClassName = "thinkBoardButton" values = {thinkBoard}/>}
            {foe === 'Neuro' && <Board devMode = {props.devMode} boardText = {props.thinkBoardText} trainingMode = {trainingMode} squaresClassName = "neuroPredictions" values = {thinkBoard}/>}
            {foe === 'minimax' && <Board devMode = {props.devMode} boardText = {props.thinkBoardText} trainingMode = {trainingMode} squaresClassName = "minimaxBoard" values = {thinkBoard}/>}
            <SoundComponent trainingMode = {props.trainingMode} computersTurn = {computersTurn} foe = {foe} whoWon = {props.whoWon} soundEffect = {props.soundEffect} setSoundEffect= {props.setSoundEffect}/>
            {foe === 'evolvo' && <p> Controlling genome is:</p>  }
            {foe === 'evolvo' && <GenomeDisplay trainingMode = {props.trainingMode} genome = {ranking[0]}/> }
        </div>
      
    )
  }

 