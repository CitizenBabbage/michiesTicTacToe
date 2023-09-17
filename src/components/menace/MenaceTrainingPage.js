import React from 'react';
import { Button } from 'primereact/button';

import BoardContainer from '../board/BoardContainer';
import GameEnd from '../gameEngine/GameEnd';
import GameLog from '../gameEngine/GameLog';
import Thinking from '../gameEngine/Thinking';
import MenaceUpdater from './MenaceUpdater';
import { IdFacts } from '../presentational/IdFacts';
import { TrainingIterationsField } from '../buttons/TrainingIterationsField';
import { NavigationButton } from '../buttons/NavigationButton';
import SoundComponent from '../presentational/soundFX/SoundFX';


export function MenaceTrainingPage (props) {
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

    return (
    <div className='page'> 
      <div className='gameshell'>
            <NavigationButton path = "/selectOpponent" label = 'Menu'/>
            <BoardContainer devMode = {props.devMode} testMode = { props.testMode} computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } src = {props.src} setFoe = { props.setFoe } foe = {foe} trainingIterations = {trainingIterations} setResigned = {setResigned} humansLetter = {humansLetter} squares = {squares} setSquares = {setSquares} trainingMode = {trainingMode}  setTrainingMode = {setTrainingMode} gameLog = {gameLog} setGameLog = {setGameLog} database = {database} winner = {winner} setWinner = {setWinner} setPlayersTurn = {setPlayersTurn} playersTurn = {playersTurn} reset = {reset} ></BoardContainer>
            <TrainingIterationsField setSoundEffect = {props.setSoundEffect} trainingMode = { trainingMode } setTrainingIterations = {setTrainingIterations}  setPlayersTurn = {setPlayersTurn} foe = {foe} value = {value} setValue = {setValue}/>
            <Thinking devMode = {props.devMode} testMode = { props.testMode } computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } trainingIterations = {trainingIterations} setSquares = {setSquares} setFoe = { props.setFoe } foe = {props.foe} database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} playersTurn = { playersTurn } setPlayersTurn = {setPlayersTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares }  winner = { winner }/>   
            {trainingMode && <Button className = 'retro-button' onClick = {returnToGame}> Back To Game </Button> }
            <GameLog devMode = {props.devMode} trainingMode = {trainingMode} winner = {winner} gameLog = {gameLog} setGameLog = {setGameLog} squares = {squares}/> 
            <GameEnd devMode = {props.devMode} resigned = { resigned } isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} playersTurn = { playersTurn }/>
      </div>
      <div>
        <IdFacts name = {props.name} blurb = {props.blurb} src = {props.src} trainingMode = { trainingMode }/>
        <MenaceUpdater trainingMode = {trainingMode} devMode = {props.devMode}  database = {database} setDatabase = {setDatabase} winner = {winner} gameLog = {gameLog} trainingIterations = {trainingIterations} setTrainingIterations = {setTrainingIterations} setWinner = {setWinner}  setGameLog = {setGameLog} setSquares = {setSquares} /> 
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