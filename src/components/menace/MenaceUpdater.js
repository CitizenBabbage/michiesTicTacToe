import React from 'react';
import { useState, useEffect, useRef} from 'react';
//import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import "./Updater.css"
import { NLlog } from '../presentational/NLlog.js';
import DatabaseDisplay from './DBDisplay.js';
import { learnFromGame, startNewTrainingIteration, updateHistoryLog } from './menaceUpdaterHelpers.js';



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


    useEffect(() => {
        const newDataAndLog = learnFromGame(winner, gameLog, database)
        if (newDataAndLog) {
            setDatabase(newDataAndLog[0]); 
            setNLLogStats(newDataAndLog[1])
        }
    },[winner])

    

    useEffect(() => { //start new training iteration
        if (trainingIterations <= 0) return; 
        setSquares(Array(9).fill(null)); 
        setWinner(null); 
        setGameLog([Array(9).fill(null)]); 
        setTrainingIterations(trainingIterations - 1)
    }, [database])


    // when the database is updated, get the updated objects, with new response arrays, and add them to the history
    useEffect(() => {
        setAllPlayedBoards(updateHistoryLog(allPlayedBoards, gameLog, database))
    },[database]) 

    
    
    

    
    if (trainingMode) return (
        <div>
            <DatabaseDisplay devMode = {props.devMode} allPlayedBoards = {allPlayedBoards} squares = {props.squares} database = {database} trainingIterations = {trainingIterations} trainingMode = {trainingMode}/>
            <NLlog naturalLanguageLog = { naturalLanguageLog } setNaturalLanguageLog = { setNaturalLanguageLog } nLLogStats = { nLLogStats }/>
        </div>
    )
    

}