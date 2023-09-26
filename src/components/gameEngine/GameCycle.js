import AI_DecisionModule from "./AI_DecisionModule.js";
import React from 'react';
import { useState, useEffect } from 'react';
import { calculateWinner } from "../../auxiliary/engineHelpers/checkWinner.js";
    
export default function GameCycle( props ) {
    const isCalculatingWinner = props.isCalculatingWinner
    const trainingIterations = props.trainingIterations; 
    const setTrainingIterations = props.setTrainingIterations;
    const setComputerOff = props.setComputerOff; 
    const squares = props.squares; 
    const winner = props.winner; 
    const computerOff = props.computerOff; 
    const [trainingTurn, setTrainingTurn] = useState(0); // toggling this triggers next loop in training game
    const setIsCalculatingWinner = props.setIsCalculatingWinner; 
    const setWinner = props.setWinner; 
    const playersTurn = props.playersTurn; 
    const trainingMode = props.trainingMode; 
    const resigned = props.resigned; 
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
    
    ////////////////////////
    ///// PLAY CYCLE ///////
    ////////////////////////

    useEffect (() => {
        console.log("squares triggers useEffect, starting GameCycle")
        const victor = calculateWinner(squares); 
        if (victor){
            setWinner(victor)
        }
        else {
            if (trainingMode) {
                console.log("training mode recognised, setting TrainingTurn")
                setTrainingTurn(prevValue => 1 - prevValue)
            }
            else setComputerOff(prevValue => !prevValue)
        }
    },[squares])

    useEffect (() => {
        if (trainingMode && winner) {restartGame()}
        // else nothing, await user interaction. 
    },[allPlayedBoards]) //this changes at end of learning from game

    function restartGame(){
        console.log("restarting game for the iteration ", trainingIterations)
        setWinner(null); 
        setGameLog([Array(9).fill(null)]); 
        setTrainingIterations(prevValue => prevValue - 1) // reduce training iterations by 1
        setSquares(Array(9).fill(null)); // this restarts the loop by triggering the useEffect at top of this section
    }

    
    

    /////////

    // function fixWinner() {
    //     if (isCalculatingWinner){
    //         checkWinner(squares).then(writeGameResults)
    //         .catch(error => {
    //             console.error("Error from checkWinner:", error);
    //         })
    //     } 
    // }

    //  useEffect(() => { //start new training iteration
    //     if (trainingIterations <= 0) return; 
    //     setSquares(Array(9).fill(null)); 
    //     setWinner(null); 
    //     setGameLog([Array(9).fill(null)]); 
    //     setTrainingIterations(trainingIterations - 1)
    // }, [database])

    // useEffect(checkForEmptySquares, [squares]);

    // // this is called if there is a change in squares. To avoid triggering at the beginning,
    // // when squares is changed to all blank, it checks to see that at least one square is occupied, 
    // // before setting isCalculatingWinner to true.   
    // function checkForEmptySquares(){
    //     if (squares.some(value => value !== null)){setIsCalculatingWinner(true);}
    // }

    ////////////////////////
    ///// end play cycle ///
    ////////////////////////

    return (
        <div>
            <AI_DecisionModule trainingTurn = {trainingTurn} ranking = {props.ranking} setComputerOff = {props.setComputerOff} computerOff = {props.computerOff} soundEffect = {props.soundEffect} setSoundEffect= {props.setSoundEffect} net = {props.net} devMode = {props.devMode} trainingIterations = {trainingIterations} setSquares = {setSquares} setFoe = { props.setFoe } foe = {props.foe} database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares }  winner = { winner }/>   
        </div>
    )
}