import React from 'react';

import BoardContainer from '../board/BoardContainer.js';
// import MenaceUpdater from './MenaceUpdater';
import { IdFacts } from '../presentational/IdFacts.js';
import { EnterGenerations } from '../buttons/EnterGenerations.js';
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

      <div className='threeRows'>

        <div label = "column1, row1"> 
          <NavigationButton path = "/selectOpponent" label = 'Menu'/>
          {trainingMode && <button className = 'retro-button' onClick = {returnToGame}> Back To Game </button> }
        </div> 

        <div label = "column1, row2" className='twoColumns'>
          <div>
            <BoardContainer devMode = {props.devMode} computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } src = {props.src} setFoe = { props.setFoe } foe = {foe} trainingIterations = {trainingIterations} setResigned = {setResigned} humansLetter = {humansLetter} squares = {squares} setSquares = {setSquares} trainingMode = {trainingMode}  setTrainingMode = {setTrainingMode} gameLog = {gameLog} setGameLog = {setGameLog} database = {database} winner = {winner} setWinner = {setWinner} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} reset = {reset} ></BoardContainer>
            <EnterGenerations setSoundEffect = {props.setSoundEffect} trainingMode = { trainingMode } setGenerations = {props.setGenerations}  xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} value = {value} setValue = {setValue}/>
          </div>
          <div>
            <IdFacts name = {props.name} playStyle = {props.playStyle} blurb = {props.blurb} src = {props.src} trainingMode = { trainingMode }/>
          </div>
        </div> 
        <div label = "column1, row3">

        </div>

      </div>

      <div label = "second column">
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