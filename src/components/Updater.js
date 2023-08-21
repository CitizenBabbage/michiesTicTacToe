import React from 'react';
import { useState, useEffect, useRef} from 'react';
//import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import { areExactlyTheSame, isOdd,  reverseTransformation, dataBaseDuplicator, basicNormalization, areEquivalent , equivalenceScore, isNumber} from '../auxiliary/general/usefulFunctions.js';
import { checkDbase, checkIsANumber } from '../auxiliary/testers/errorCheckers.js';
import "./Updater.css"
import DatabaseDisplay from './DBDisplay.js';



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
    const [naturalLanguageLog, setNaturalLanguageLog] = useState([])
    const [allPlayedBoards, setAllPlayedBoards] = useState([{
        "id":0,
        "state":[
           null,
           null,
           null,
           null,
           null,
           null,
           null,
           null,
           null
        ],
        "turn":"X",
        "response":[
           0.33,
           0.33,
           0.01,
           0,
           0.33,
           0,
           0,
           0,
           0
        ],
        "transform":[
           0,
           0
        ]
     }]); 


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


    useEffect(learnFromGame,[winner])

    

    useEffect(startNewTrainingIteration, [database])


    function startNewTrainingIteration(){
        if (trainingIterations <= 0) return; 
        //console.log("RESTARTING with training iterations remaining: ", trainingIterations-1)
        setSquares(Array(9).fill(null)); 
        setWinner(null); 
        setGameLog([Array(9).fill(null)]); 
        setTrainingIterations(trainingIterations - 1)
    }


    function learnFromGame(){
        console.log("initiating learnFromGame, winner is ", winner)
        if (winner === undefined || winner == null || gameLog === undefined) {
            console.log("Either winner or gamelog is undefined or null. Aborting learnFromGame")
            return
         }  
        else {
            let gameResult = gameresult(winner); // 1 for a win for X, 0 for a draw, -1 for a loss
            checkIsANumber(gameResult, "learnFromGame", "gameResult")
            let newData = updateEachBoardPlayed(gameLog, gameResult)
            console.log("About to reset database")
            setDatabase(newData); 
        }
    }

// returns an updated database, with the response arrays from all the games in the log 
// updated depending on whether they led to a win or a loss. 
    function updateEachBoardPlayed(log, gameResult){
        let nLLog = []; 
        let newData = dataBaseDuplicator(database); 
        checkIsANumber(gameResult, "updateEachBoardPlayed", "gameResult")
        for (let i = 0; i < gameLog.length -1; i++){                //for each state in the game log
            let move = getPositionThatChanged(log[i], log[i+1]);    //find the position that changed 
            let update; 
            if (isOdd(i)) {                                         // if it was an odd round, that was O's turn. 
                update = gameResult * (-1)                          // results for 0 are inverted
            } 
            else update = gameResult; 
            checkIsANumber(update, "updateEachBoardPlayed", "update")
            // the formula makes moves closer to the final move more important
            update = update * (1 - (log.length - i)/10)  
            update = Math.round(update * 100) / 100;
            newData = findAndUpdateEquivalent(newData, update, move, gameLog[i]); 
            nLLog = updateNLLog(nLLog, i, gameResult, update, log[i], move)
            }
        setNaturalLanguageLog(nLLog); 
        return newData; 
    }

    function updateNLLog(nLLog, turn, whoWon, update, initialBoardState, move){
        let winnerTerm, turnPhrase, evaluation, conjunction; 
        if (whoWon === 1){winnerTerm = `X`}
        else if (whoWon === -1){winnerTerm = `O`}
        else winnerTerm = `Nobody`
        if (turn % 2 === 0){turnPhrase = `X`}
        else turnPhrase = `O`
        if (winnerTerm === 'Nobody') {
            evaluation = `neither good nor bad`
            conjunction = 'and'
        }
        else if (winnerTerm === turnPhrase) {
            evaluation = `a good move`
            conjunction = `and`
        }
        else {
            evaluation = `a bad move`
            conjunction = `but`
        }
        let newLog = dataBaseDuplicator(naturalLanguageLog)
        console.log("newLog is : " , newLog)
        let newString = `${winnerTerm} won, ${conjunction} this was ${turnPhrase}'s turn, so playing move ${move} on board [${initialBoardState}] was ${evaluation}. Hence I am updating move ${move} on board [${initialBoardState}] by ${update}.`
        nLLog[turn] = newString; 
        return nLLog;     
    }

    
    

    function findAndUpdateEquivalent(data, update, move, boardState){
        let newData = dataBaseDuplicator(data); 
        for (let j = 0; j < newData.length; j++){                                                   // look through the db for equivalent board state
            if (areEquivalent(boardState, newData[j].state)){                                       // when you find it
                let equivScore = equivalenceScore(boardState, newData[j].state)                     // get the equivalence score 
                let newMove = reverseTransformation(move, equivScore)                               // modify move by that quantity
                newData[j].response[newMove] = Math.max(0, newData[j].response[newMove] + update);  // modify 
                newData[j].response = basicNormalization(newData[j].response); 
                addToAllPlayedBoards(newData[j])
                }
        }
        return newData; 
    }

    function addToAllPlayedBoards(object){
        let newData = dataBaseDuplicator(allPlayedBoards); 
        let presentInSet = false; 
        for (let i = 0; i < newData.length; i++){
            if (areExactlyTheSame(i.state,object.state)){
                presentInSet = true; 
                break; 
        }
        }
        if (!presentInSet) {
            console.log(`Adding ${object} to allPlayedBoards`)
            newData = [...newData,object]; 
            setAllPlayedBoards(newData); 
        }
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

    
    return (
        <div>
            <DatabaseDisplay devMode = {props.devMode} allPlayedBoards = {allPlayedBoards} squares = {props.squares} database = {database} trainingIterations = {trainingIterations} trainingMode = {trainingMode}/>
            <ol>
                {naturalLanguageLog.map((item, index) => 
                     (
                        <li key={index}>
                            <p>{item}</p>
                        </li>
                    )
                )}
            </ol>
        </div>
    )
    

}