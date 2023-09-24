import React from 'react';

import BoardContainer from '../board/BoardContainer.js';
// import MenaceUpdater from './MenaceUpdater';
import { IdFacts } from '../presentational/IdFacts.js';
import { TrainingIterationsField } from '../buttons/TrainingIterationsField.js';
import { NavigationButton } from '../buttons/NavigationButton.js';
import SoundComponent from '../presentational/soundFX/SoundFX.js';
import { EvolvoUpdater } from './evolvoUpdater.js';


export function EvolvoTrainingPage (props) {
    const humansLetter = props.humansLetter;  
  
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

    return (
    <div className='page'> 
      <div className='gameshell'>
            <NavigationButton path = "/selectOpponent" label = 'Menu'/>
            <BoardContainer devMode = {props.devMode} computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } src = {props.src} setFoe = { props.setFoe } foe = {foe} trainingIterations = {trainingIterations} setResigned = {setResigned} humansLetter = {humansLetter} squares = {squares} setSquares = {setSquares} trainingMode = {trainingMode}  setTrainingMode = {setTrainingMode} gameLog = {gameLog} setGameLog = {setGameLog} database = {database} winner = {winner} setWinner = {setWinner} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} reset = {reset} ></BoardContainer>
            <TrainingIterationsField setSoundEffect = {props.setSoundEffect} trainingMode = { trainingMode } setTrainingIterations = {setTrainingIterations}  xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} value = {value} setValue = {setValue}/>
            
      </div>
      <div>
        <IdFacts name = {props.name} blurb = {props.blurb} src = {props.src} trainingMode = { trainingMode }/>
        <EvolvoUpdater trainingMode = {trainingMode} devMode = {props.devMode}  database = {database} setDatabase = {setDatabase} winner = {winner} gameLog = {gameLog} trainingIterations = {trainingIterations} setTrainingIterations = {setTrainingIterations} setWinner = {setWinner}  setGameLog = {setGameLog} setSquares = {setSquares} /> 
        <SoundComponent 
          setSoundEffect = {props.setSoundEffect}
          soundEffect = {props.soundEffect} 
          trainingSound = {props.trainingSound}
          winSound = {props.winSound}
          loseSound = {props.loseSound}
          bravadoSound = {props.bravadoSound}
          startSound = {props.startSound} 
          trainingMode = {props.trainingMode}
        />
      </div>
    </div>  
    )

}