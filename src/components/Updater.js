import React from 'react';
import { useEffect, useRef} from 'react';
//import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import { isOdd,  reverseTransformation, dataBaseDuplicator, normalizeResponses, areEquivalent , equivalenceScore, isNumber} from '../auxiliary/usefulFunctions.js';
import { checkDbase, checkIsANumber } from '../auxiliary/errorCheckers.js';
import { roundOffElementsInArray } from '../auxiliary/usefulFunctions.js';
import "./Updater.css"
import DatabaseDisplay from './DatabaseDisplay.js';



export default function Updater(props){
    const winner = props.winner; 

    const database = props.database; 
    const setDatabase = props.setDatabase; 
    
    const gameLog = props.gameLog; 
    const trainingIterations = props.trainingIterations;
    const setTrainingIterations = props.setTrainingIterations;
    const setWinner = props.setWinner;  
    const setGameLog = props.setGameLog; 
    const setSquares = props.setSquares; 
    const trainingMode = props.trainingMode; 
    

    useEffect(() => {console.log(`useEffect reports: Value of winner changed to ${winner}`)},[winner])

    useEffect(() => {console.log(`useEffect reports: Value of database changed. New first response state is ${database[0].response}`)},[winner])
    const previousDatabaseRef = useRef();

    useEffect(() => {
        if (previousDatabaseRef.current && JSON.stringify(database) !== JSON.stringify(previousDatabaseRef.current)) {
            console.log('Database has changed!');
        }
        // After checking, update the ref for the next render
        previousDatabaseRef.current = database;
    }, [database]);

    // checkDbase(database, "upDater")

    useEffect(learnFromGame,[winner])

    

    useEffect(startNewTrainingIteration, [database])


    function startNewTrainingIteration(){
        if (trainingIterations <= 0) return; 
        //console.log("RESTARTING with training iterations remaining: ", trainingIterations-1)
        setSquares(Array(9).fill(null)); 
        setWinner(null); 
        setGameLog([]); 
        setTrainingIterations(trainingIterations - 1)
    }


    function learnFromGame(){
        console.log("initiating learnFromGame, winner is ", winner)
        if (winner === undefined || winner == null || gameLog === undefined || !trainingMode) {
            console.log("Either winner or gamelog is undefined or null, or we're not in trainingmode. Aborting learnFromGame")
            return
         }  
        else {
            let gameResult = gameresult(winner); // 1 for a win for X, 0 for a draw, -1 for a loss
            checkIsANumber(gameResult, "learnFromGame", "gameResult")
            let newData = updateEachBoardPlayed(gameLog, gameResult)
            console.log("About to reset database")
            setDatabase(newData); 
            checkDbase(database, "2. learnFromGame--database")
        }
    }

// returns an updated database, with the response arrays from all the games in the log 
// updated depending on whether they led to a win or a loss. 
    function updateEachBoardPlayed(log, gameResult){
        let newData = dataBaseDuplicator(database); 
        checkDbase(newData, "updateEachBoardPlayed A")
        gameResult = gameResult/10; 
        checkIsANumber(gameResult, "updateEachBoardPlayed", "gameResult")
        for (let i = 0; i < gameLog.length -1; i++){                //for each state in the game log
            let move = getPositionThatChanged(log[i], log[i+1]);    //find the position that changed 
            let update; 
            if (isOdd(i)) {                                         // if it was an odd round, that was O's turn. 
                update = gameResult * (-1)                          // results for 0 are inverted
            } 
            else update = gameResult; 
            checkIsANumber(update, "updateEachBoardPlayed", "update")
            // *see explanation of the following formula below. 
            update = update * (1 - (gameLog.length/10)); 
            newData = findAndUpdateEquivalent(newData, update, move, gameLog[i]); 
            }
        checkDbase(newData, "updateEachBoardPlayed Z")
        return newData; 
    }

    //  updateEachBoardPlayed tested and is not responsible

    //         // *The longer the game, the worse for the winner and better for the loser
    //         // thus the longer the game, the more the reward should approximate a tie. 
    //         // 1 - gameLog.length/10 is large for short games and small for long games 
    //         // when multiplied by update it becomes positive for wins and negative for losses

    

    function findAndUpdateEquivalent(data, update, move, boardState){
        checkDbase(data, "findAndUpdateEquivalent A")
        let newData = dataBaseDuplicator(data); 
        checkDbase(data, "findAndUpdateEquivalent B")
        for (let j = 0; j < newData.length; j++){                                                   // look through the db for equivalent board state
            if (areEquivalent(boardState, newData[j].state)){                                       // when you find it
                let equivScore = equivalenceScore(boardState, newData[j].state)                     // get the equivalence score 
                let newMove = reverseTransformation(move, equivScore)                               // modify move by that quantity
                newData[j].response[newMove] = Math.max(0, newData[j].response[newMove] + update);  // modify 
                newData[j].response = normalizeResponses(newData[j].response); 
                }
        }
        checkDbase(data, "findAndUpdateEquivalent Z")
        return newData; 
    }

    


    function getPositionThatChanged(array1, array2){
        for (let i = 0; i < array1.length; i++){
            if (array1[i] !== array2[i]) {return i}
        }
    }



    // //takes in winner as a symbol 'O' or 'X', determines whether computer won, and returns either 1 or -1 
    function gameresult(winner){
        console.log("winner is", winner)
        if (winner !== 'X' && winner !== 'O' && winner !== "D") return; //ignore incomplete games
        if (winner === "X") return 1 // 
        else if (winner === "O") return -1 //
        else return 0; // else it's a draw
    }

    
    // checkDbase(database, "2. upDater")
    return (
        <div>
            <DatabaseDisplay devMode = {props.devMode} database = {database} trainingIterations = {trainingIterations} trainingMode = {trainingMode}/>
        </div>
    )
    

}