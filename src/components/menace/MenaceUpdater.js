import React from 'react';
import { useState, useEffect, useRef} from 'react';
//import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import { boardFull, areExactlyTheSame, isOdd,  reverseTransformation, dataBaseDuplicator, areEquivalent , equivalenceScore, isNumber} from '../../auxiliary/general/usefulFunctions.js';
import { checkIsIntegral, checkBeadSubbase, checkIsANumber } from '../../auxiliary/testers/errorCheckers.js';
import "./Updater.css"
import { NLlog } from '../presentational/NLlog.js';
import DatabaseDisplay from './DBDisplay.js';



export default function MenaceUpdater(props){
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
    const [allPlayedBoards, setAllPlayedBoards] = useState([ // allPlayedBoards always starts with the starting board
            {
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
               4,
               4,
               0,
               0,
               4,
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
    const [nLLogStats, setNLLogStats] = useState([])


    //useEffect(() => {console.log(`useEffect reports: Value of winner changed to ${winner}`)},[winner])

    //useEffect(() => {console.log(`useEffect reports: Value of database changed. New first response state is ${database[0].response}`)},[winner])
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

    // when the database is updated, get the updated objects, with new response arrays, and add them to the history
    useEffect(updateHistoryLog,[database]) 

    function updateHistoryLog(){ 
        //console.log(`updateHistoryLog called: allPlayedBoards has length ${allPlayedBoards.length} and is as follows: ${JSON.stringify(allPlayedBoards)}. gameLog has length ${gameLog.length}`)
        let newAllPlayedBoards = dataBaseDuplicator(allPlayedBoards);
        checkBeadSubbase(newAllPlayedBoards, "updateHistoryLog")
        for (let j = 0; j < gameLog.length; j++){ //for each item in the new gameLog, find the corresponding object and update the history log with it
            //console.log(`checking gamelog[${j}], which is `, gameLog[j])
            let gameLogObject = returnCorrespondingObjectFromDatabase(gameLog[j]); 
            if (!gameLogObject && !(boardFull(gameLog[j]))) throw new Error(` at updateHistoryLog: board state ${gameLog[j]} has no corresponding object`)
            newAllPlayedBoards = updateHistory(newAllPlayedBoards,gameLogObject)
        }
        //console.log(`icounter is ${icounter}, jcounter is ${jcounter} and kcounter is ${kcounter} `)
        //console.log(`newAllPlayedBoards has length ${newAllPlayedBoards.length} and is `, newAllPlayedBoards)
        setAllPlayedBoards(newAllPlayedBoards);
    }

    function returnCorrespondingObjectFromDatabase(boardstate){
        for (let k = 0; k < database.length; k++){ // find the database object it corresponds to
            if (areEquivalent(database[k].state,boardstate)){
                return database[k]; 
            }
        }
    }

    function updateHistory(historyBase, object){
        if (!object) return historyBase; // we get an undefined object for full board states, ignore. 
        let isInHistoryAlready = false; 
        for (let i = 0; i < historyBase.length; i++){ // for each board object in historyBase
            if (areExactlyTheSame(historyBase[i].state,object.state)){
                //console.log("Updating a board state that is already in history...  ")
                historyBase = [...historyBase.slice(0,i),object, ...historyBase.slice(i+1)]
                isInHistoryAlready = true; 
                break; 
                }
            }
        if (!isInHistoryAlready) historyBase = [...historyBase,object] // if it wasnt anywhere in the set, push it to the end
        //console.log("historyBase is ", historyBase)
        return historyBase; 
        }

    function startNewTrainingIteration(){
        if (trainingIterations <= 0) return; 
        //console.log("RESTARTING with training iterations remaining: ", trainingIterations-1)
        setSquares(Array(9).fill(null)); 
        setWinner(null); 
        setGameLog([Array(9).fill(null)]); 
        setTrainingIterations(trainingIterations - 1)
    }


    function learnFromGame(){
        //console.log("initiating learnFromGame, winner is ", winner)
        if (winner === undefined || winner == null || gameLog === undefined) {
            console.log("Either winner or gamelog is undefined or null. Aborting learnFromGame")
            return
         }  
        else {
            let gameResult = gameresult(winner); // 1 for a win for X, 0 for a draw, -1 for a loss
            checkIsANumber(gameResult, "learnFromGame", "gameResult")
            let newData = updateEachBoardPlayed(gameLog, gameResult)
            //console.log("About to update database")
            setDatabase(newData); 
        }
    }

// returns an updated database, with the response arrays from all the games in the log 
// updated depending on whether they led to a win or a loss. 
    function updateEachBoardPlayed(log, gameResult){ // gameResult = 1: X won, =0 : draw, =-1: O won 
        let nLLog = []; 
        let newData = dataBaseDuplicator(database); 
        checkIsANumber(gameResult, "updateEachBoardPlayed", "gameResult")
        for (let i = 0; i < gameLog.length -1; i++){                //for each state in the game log
            let move = getPositionThatChanged(log[i], log[i+1]);    //find the position that changed 
            let update; 
            if (isOdd(i)) {                                         // if it was an odd round, that was O's turn. 
                update = gameResult * (-1)                          // uninvert result for O
            } 
            else update = gameResult; 
            if (update > 0) update *= 3 // 3 points for a win
            else if (update === 0) update = 1; // 1 point for a draw
            checkIsANumber(update, "updateEachBoardPlayed", "update")  
            newData = findAndUpdateEquivalent(newData, update, move, gameLog[i]); 
            nLLog = [...nLLog, [gameResult, update, log[i], move]]
            }
        setNLLogStats(nLLog)
        // setNaturalLanguageLog(nLLog); 
        return newData; 
    }

    



    

    function findAndUpdateEquivalent(data, update, move, boardState){
        //console.log(`Updating for ${JSON.stringify(boardState)}`)
        let newData = dataBaseDuplicator(data); 
        for (let j = 0; j < newData.length; j++){                                                   // look through the db for equivalent board state
            if (areEquivalent(boardState, newData[j].state)){                                       // when you find it
                let equivScore = equivalenceScore(boardState, newData[j].state)                     // get the equivalence score 
                let newMove = reverseTransformation(move, equivScore)                               // use that to rotate/flip move appropriately
                let newBeadCount = Math.max(0, newData[j].response[newMove] + update); 
                //console.log("newBeadCount is", newBeadCount); 
                checkIsIntegral(newBeadCount, "findAndUpdateEquivalent")
                newData[j].response[newMove] = newBeadCount;                                        // update response array accordingly 
                //addToAllPlayedBoards(newData[j])
                }
        }
        return newData; 
    }

    //remove if not called 
    function addToAllPlayedBoards(object){
        let newAllPlayedBoards = dataBaseDuplicator(allPlayedBoards);
        checkBeadSubbase(newAllPlayedBoards, "addToAllPlayedBoards") 
        let presentInSet = false; 
        for (let i = 0; i < newAllPlayedBoards.length; i++){
            if (areEquivalent(newAllPlayedBoards[i].state,object.state)){
                newAllPlayedBoards = [...newAllPlayedBoards.slice(0,i),object, ...newAllPlayedBoards.slice(i+1)]
                presentInSet = true; 
                break; 
        }
        }
        if (!presentInSet) {
            // console.log(`Adding ${JSON.stringify(object)} to allPlayedBoards`)
            // console.log(`Prior to addition allPlayedBoards has length: ${allPlayedBoards.length}`)
            newAllPlayedBoards = [...newAllPlayedBoards,object]; 
            setAllPlayedBoards(newAllPlayedBoards); 
            //console.log(`After addition allPlayedBoards has length: ${allPlayedBoards.length}`)
        }
        else {
            console.log(`1. ${JSON.stringify(object)} is already in allPlayedBoards`)
        }
    }

    


    function getPositionThatChanged(array1, array2){
        for (let i = 0; i < array1.length; i++){
            if (array1[i] !== array2[i]) {return i}
        }
    }



    // //takes in winner as a symbol 'O' or 'X', determines whether computer won, and returns either 1 or -1 
    function gameresult(winner){
        //console.log("winner is", winner)
        if (winner !== 'X' && winner !== 'O' && winner !== "D") return; //ignore incomplete games
        if (winner === "X") return 1 // 
        else if (winner === "O") return -1 //
        else return 0; // else it's a draw
    }

    
    if (trainingMode) return (
        <div>
            <DatabaseDisplay devMode = {props.devMode} allPlayedBoards = {allPlayedBoards} squares = {props.squares} database = {database} trainingIterations = {trainingIterations} trainingMode = {trainingMode}/>
            <NLlog naturalLanguageLog = { naturalLanguageLog } setNaturalLanguageLog = { setNaturalLanguageLog } nLLogStats = { nLLogStats }/>
        </div>
    )
    

}