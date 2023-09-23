import React from 'react';
// import { Button } from 'primereact/button';
import { useEffect } from 'react';


import BoardContainer from '../board/BoardContainer.js';
import GameEnd from './GameEnd.js';
import GameLog from './GameLog.js';
import Thinking from './Thinking.js';
import MenaceUpdater from '../menace/MenaceUpdater.js';
import { IdFacts } from '../presentational/IdFacts.js';
import { TrainingIterationsField } from '../buttons/TrainingIterationsField.js';
import { NavigationButton } from '../buttons/NavigationButton.js';
import SoundComponent from '../presentational/soundFX/SoundFX.js';


export default function PlayPage (props) {
    const humansLetter = props.humansLetter;  
    const playersTurn = props.playersTurn; 
    const setPlayersTurn = props.setPlayersTurn; 
  
    const winner = props.winner; 
    const setWinner = props.setWinner;  
    const database = props.database;
    const setDatabase = props.setDatabase; 
    const isCalculatingWinner = props.isCalculatingWinner; 
    const setIsCalculatingWinner = props.setIsCalculatingWinner; 
  
    const gameLog = props.gameLog; 
    const setGameLog = props.setGameLog; 
    const trainingMode = props.trainingMode; 
    const setTrainingMode = props.setTrainingMode;
    const value = props.value; 
    const setValue = props.setValue; 
    const trainingIterations = props.trainingIterations; 
    const setTrainingIterations = props.setTrainingIterations
    const squares = props.squares; 
    const setSquares = props.setSquares; 
    const resigned = props.resigned; 
    const setResigned = props.setResigned; 
    const foe = props.foe; 
    const reset = props.reset; 
    const returnToGame = props.returnToGame;
    const setHumansLetter = props.setHumansLetter; 
    //const startTraining = props.startTraining; 
    const handleTrainingModeClick = props.handleTrainingModeClick; 

    useEffect(()=>{
      console.log("start of playPage, props.soundEffect is ", props.soundEffect)
    }, [])

    

    return (
    <div className='page'> 
      <div className='gameshell'>
          <div className='space-around'>
            <NavigationButton path = "/selectOpponent" label = 'Menu'/>
            {!trainingMode && <button className = 'retro-button' onClick = {handleTrainingModeClick}> Train </button> }
          </div>
            
            <BoardContainer devMode = {props.devMode} testMode = { props.testMode} computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } src = {props.src} setFoe = { props.setFoe } foe = {foe} trainingIterations = {trainingIterations} setResigned = {setResigned} humansLetter = {humansLetter} squares = {squares} setSquares = {setSquares} trainingMode = {trainingMode}  setTrainingMode = {setTrainingMode} gameLog = {gameLog} setGameLog = {setGameLog} database = {database} winner = {winner} setWinner = {setWinner} setPlayersTurn = {setPlayersTurn} playersTurn = {playersTurn} reset = {reset} ></BoardContainer>
            <TrainingIterationsField setSoundEffect = {props.setSoundEffect} trainingMode = { trainingMode } setTrainingIterations = {setTrainingIterations}  setPlayersTurn = {setPlayersTurn} foe = {foe} value = {value} setValue = {setValue}/>
            <Thinking soundEffect = {props.soundEffect} setSoundEffect= {props.setSoundEffect} net = {props.net} devMode = {props.devMode} testMode = { props.testMode } computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } trainingIterations = {trainingIterations} setSquares = {setSquares} setFoe = { props.setFoe } foe = {props.foe} database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} playersTurn = { playersTurn } setPlayersTurn = {setPlayersTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares }  winner = { winner }/>   
            <GameLog devMode = {props.devMode} trainingMode = {trainingMode} winner = {winner} gameLog = {gameLog} setGameLog = {setGameLog} squares = {squares}/> 
            <GameEnd humansLetter = {humansLetter} setWhoWon = {props.setWhoWon} devMode = {props.devMode} resigned = { resigned } isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} playersTurn = { playersTurn }/>
      </div>
      <div>
        <IdFacts name = {props.name} blurb = {props.blurb} src = {props.src} trainingMode = { trainingMode }/>
        <MenaceUpdater trainingMode = {trainingMode} devMode = {props.devMode}  database = {database} setDatabase = {setDatabase} winner = {winner} gameLog = {gameLog} trainingIterations = {trainingIterations} setTrainingIterations = {setTrainingIterations} setWinner = {setWinner}  setGameLog = {setGameLog} setSquares = {setSquares} /> 
        <SoundComponent foe = {foe} whoWon = {props.whoWon} soundEffect = {props.soundEffect} setSoundEffect= {props.setSoundEffect}/>
      </div>
    </div>  
    )

}