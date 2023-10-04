import React from 'react';
import { useState, useEffect, useRef} from 'react';
//import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import "./Updater.css"
import { NLlog } from '../presentational/NLlog.js';
import DatabaseDisplay from './DBDisplay.js';
import { learnFromGame, startNewTrainingIteration, updateHistoryLog } from './menaceUpdaterHelpers.js';
import {MenaceTrainingPage} from './MenaceTrainingPage.js'


export default function MenaceUpdater(props){
    const winner = props.winner; 

    const database = props.database; 
    const setDatabase = props.setDatabase; 
    
    
    const trainingIterations = props.trainingIterations;
    const setTrainingIterations = props.setTrainingIterations;
    const setWinner = props.setWinner;  

    const gameLog = props.gameLog; 
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
    const previousDatabaseRef = useRef();

    

    // updates database based on game 
    useEffect(() => {
        console.log("mu1: updating database...")
        const newDataAndLog = learnFromGame(winner, gameLog, database)
        if (newDataAndLog) {
            console.log("mu2: setting database...")
            setDatabase(newDataAndLog[0]); 
            if (!trainingMode) setNLLogStats(newDataAndLog[1])
            console.log("mu3: finishing setting database and NL stats.")
        }
    },[winner])

    // reports change to database
    useEffect(() => {
        if (previousDatabaseRef.current && JSON.stringify(database) !== JSON.stringify(previousDatabaseRef.current)) {
            console.log('Database has changed!');
        }
        // After checking, update the ref for next time
        previousDatabaseRef.current = database;
    }, [database]);


    // when the database is updated, get the updated objects, with new response arrays, and add them to the history
    useEffect(() => {
        console.log('mu4: Database has changed! updating allPlayedBoards by adding ', gameLog);
        setAllPlayedBoards(updateHistoryLog(allPlayedBoards, gameLog, database))
        console.log('mu5: Finished updating allPlayedBoards.');

    },[database]) 

    
    
    

    
    if (trainingMode) return (
        <div> 
            <MenaceTrainingPage
                computerOff = {props.computerOff} trainingTurn = {props.trainingTurn} setTrainingTurn = {props.setTrainingTurn}

                allPlayedBoards = {allPlayedBoards} 
                setAllPlayedBoards = {setAllPlayedBoards}

                setComputerOff = {props.setComputerOff} 
                
                naturalLanguageLog = {naturalLanguageLog} 
                setNaturalLanguageLog = {setNaturalLanguageLog}
                nLLogStats = {nLLogStats}
                setWinner = {props.setWinner}

                setSoundEffect = {props.setSoundEffect}
                soundEffect = {props.soundEffect}
                trainingSound = {props.trainingSound}

                humansLetter = {props.humansLetter}
                xsTurn={props.xsTurn} 
                setXsTurn={props.setXsTurn}
                setWhoWon = {props.setWhoWon}
                
                winner = {winner}
                isCalculatingWinner = {props.isCalculatingWinner}
                setIsCalculatingWinner = {props.setIsCalculatingWinner}

                database = {database}
                setDatabase = {setDatabase}

                gameLog = {gameLog}
                setGameLog = {setGameLog}

                trainingMode = {trainingMode}
                setTrainingMode = {props.setTrainingMode}

                value = {props.value}
                setValue = {props.setValue}

                trainingIterations = {trainingIterations}
                setTrainingIterations = {setTrainingIterations}

                squares = {props.squares}
                setSquares = {setSquares}

                resigned = {props.resigned}
                setResigned = {props.setResigned}

                foe = {props.foe}
                setFoe = {props.setFoe}

                reset = {props.reset}
                returnToGame = {props.returnToGame} 

                name = {props.name} 
                playStyle = {props.playStyle}
                blurb = {props.blurb} 
                src = {props.src}
            />  
      </div>   
        
    )
    

}