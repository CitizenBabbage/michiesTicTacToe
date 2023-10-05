import AI_DecisionModule from "./AI_DecisionModule.js";
import React from 'react';
import { useState, useEffect } from 'react';
import { calculateWinner } from "../../auxiliary/engineHelpers/checkWinner.js";
import { opposite } from "../../auxiliary/general/usefulFunctions.js";
import { doubleCheckItsReallyComputersTurn } from "../../auxiliary/general/usefulFunctions.js";
    
export default function GameCycle( props ) {
    const isCalculatingWinner = props.isCalculatingWinner
    const trainingIterations = props.trainingIterations; 
    const setTrainingIterations = props.setTrainingIterations;
    const setComputerOff = props.setComputerOff; 
    const squares = props.squares; 
    const winner = props.winner; 
    const computerOff = props.computerOff; 
    // const [trainingTurn, setTrainingTurn] = useState(0); // toggling this triggers next loop in training game
    const trainingTurn = props.trainingTurn;
    const setTrainingTurn = props.setTrainingTurn; 
    const setIsCalculatingWinner = props.setIsCalculatingWinner; 
    const setWinner = props.setWinner; 
    const playersTurn = props.playersTurn; 
    const trainingMode = props.trainingMode; 
    const resigned = props.resigned; 
    const setResigned = props.setResigned; 
    const setWhoWon = props.setWhoWon; 
    const humansLetter = props.humansLetter;
    const network = props.net; 
    const setTrainingMode = props.setTrainingMode; 
    const setGameLog = props.setGameLog; 
    const database = props.database;
    const allPlayedBoards = props.allPlayedBoards; 
    const setAllPlayedBoards = props.setAllPlayedBoards;

    const [thinkBoard, setThinkBoard] = useState(Array(9).fill(null)); 
    const foe = props.foe; 
    // const setFoe = props.setFoe; 
    const setSquares = props.setSquares; 
     

    const [probabilityArray, setProbabilityArray] = useState(Array(9).fill(null))
    // const testMode = props.testMode; 
    const [foeSpec,setFoeSpec] = useState([]); 
    const [tempComputerOpponent, setTempComputerOpponent] = useState(foe); 
    const ranking = props.ranking; 
    const [controllingGenome, setControllingGenome] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13]); 
    
    //for debugging
    const [gameTracker, setGameTracker] = useState(0)
    const [turnTracker, setTurnTracker] = useState(0)



    ////////////////////////
    ///// PLAY CYCLE ///////
    ////////////////////////

    useEffect (() => {
        //console.log(`gc1: squares change to ${squares} triggers useEffect, starting GameCycle`)
        setTurnTracker(prevValue => prevValue +1); 
        console.log("turntracker is : ", turnTracker); 
        console.log("squares are ", squares); 

        const victor = calculateWinner(squares); 
        if (victor){
            console.log("victor detected!")
            setWinner(victor)
        }
        else {
            if (trainingMode) {
                //console.log("training mode recognised, setting TrainingTurn")
                setTrainingTurn(prevValue => 1 - prevValue)
            }
            else {
                //console.log("gs: game mode recognised, changing computer off from current value : ", computerOff)

                setComputerOff(prevValue => !prevValue)
            }
            // setting trainingTurn / computerOff triggers takeComputersturn in AI_DecisionModule (also addBoardStateToLog in gamelog)
        }
        //console.log("gc2: finished setting trainingTurn/computerOff")

    },[squares])

   

    useEffect (() => {
        setTurnTracker(0); 
        setGameTracker(prevValue => prevValue +1); 
        console.log("gametracker is : ", turnTracker);
        //console.log("gc3: restarting Game")
        console.log("trainingMode is: ", trainingMode)
        console.log("winner is: ", winner)
        if (trainingMode && winner) {
            console.log("GC: restarting game!")
            restartGame()
        }
        // else nothing, await user interaction. 
    },[database]) //this changes at end of learning from game in MU

    function restartGame(){
        //console.log("restarting game for the iteration ", trainingIterations)
        setResigned(null); 
        setWinner(null); 
        setGameLog([Array(9).fill(null)]); 
        setTrainingIterations(prevValue => prevValue - 1) // reduce training iterations by 1
        //console.log("gc: setting squares in restart game")
        setSquares(Array(9).fill(null)); // this restarts the turn loop by triggering the useEffect at top of this section
    }


        


    ////////////////////////
    ///// end play cycle ///
    ////////////////////////



    return (
        <div>
            <AI_DecisionModule humansLetter = {props.humansLetter} setResigned = {props.setResigned} thinkBoardText = {props.thinkBoardText} controllingGenome = {props.controllingGenome} setControllingGenome = {props.setControllingGenome} trainingTurn = {trainingTurn} ranking = {props.ranking} setComputerOff = {props.setComputerOff} computerOff = {props.computerOff} soundEffect = {props.soundEffect} setSoundEffect= {props.setSoundEffect} net = {props.net} devMode = {props.devMode} trainingIterations = {trainingIterations} setSquares = {setSquares} setFoe = { props.setFoe } foe = {props.foe} database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares }  winner = { winner }/>   
        </div>
    )
}