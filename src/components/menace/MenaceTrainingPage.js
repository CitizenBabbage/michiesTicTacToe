import React from 'react';
import { Button } from 'primereact/button';
import { useEffect } from 'react';


import BoardContainer from '../board/BoardContainer';
import GameEnd from '../gameEngine/GameEnd';
import GameLog from '../gameEngine/GameLog';
import Thinking from '../gameEngine/Thinking';
import { IdFacts } from '../presentational/IdFacts';
import { TrainingIterationsField } from '../buttons/TrainingIterationsField';
import { NavigationButton } from '../buttons/NavigationButton';
import SoundComponent from '../presentational/soundFX/SoundFX';
import { NLlog } from '../presentational/NLlog.js';
import DatabaseDisplay from './DBDisplay.js';


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

    useEffect(() => console.log(`WARNING: foe has changed to ${foe}!`), [foe])

    return (

   
      <div className='page'> 

        <div className='threeRows'>

          <div label = "column1, row1"> 
            <NavigationButton path = "/selectOpponent" label = 'Menu'/>
            {trainingMode && <Button className = 'retro-button' onClick = {returnToGame}> Back To Game </Button> }
          </div> 

          <div label = "column1, row2" className='twoColumns'>
            <div>
              <BoardContainer devMode = {props.devMode} testMode = { props.testMode} computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } src = {props.src} setFoe = { props.setFoe } foe = {foe} trainingIterations = {trainingIterations} setResigned = {setResigned} humansLetter = {humansLetter} squares = {squares} setSquares = {setSquares} trainingMode = {trainingMode}  setTrainingMode = {setTrainingMode} gameLog = {gameLog} setGameLog = {setGameLog} database = {database} winner = {winner} setWinner = {setWinner} setPlayersTurn = {setPlayersTurn} playersTurn = {playersTurn} reset = {reset} ></BoardContainer>
              <TrainingIterationsField setSoundEffect = {props.setSoundEffect} trainingMode = { trainingMode } setTrainingIterations = {setTrainingIterations}  setPlayersTurn = {setPlayersTurn} foe = {foe} value = {value} setValue = {setValue}/>
            </div>
            <div>
              <IdFacts name = {props.name} playStyle = {props.playStyle} blurb = {props.blurb} src = {props.src} trainingMode = { trainingMode }/>
            </div>
          </div> 
          <div label = "column1, row3">
            <GameEnd setWhoWon = {props.setWhoWon} humansLetter = {humansLetter}  devMode = {props.devMode} resigned = { resigned } isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} playersTurn = { playersTurn }/>
            <NLlog naturalLanguageLog = { props.naturalLanguageLog } setNaturalLanguageLog = { props.setNaturalLanguageLog } nLLogStats = { props.nLLogStats }/>
            <Thinking setSoundEffect = {props.setSoundEffect} devMode = {props.devMode} testMode = { props.testMode } computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } trainingIterations = {trainingIterations} setSquares = {setSquares} setFoe = { props.setFoe } foe = {props.foe} database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} playersTurn = { playersTurn } setPlayersTurn = {setPlayersTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares }  setWinner = {setWinner} winner = { winner }/>   
            <GameLog devMode = {props.devMode} trainingMode = {trainingMode} winner = {winner} gameLog = {gameLog} setGameLog = {setGameLog} squares = {squares}/> 

          </div>

        </div>

        <div label = "second column">
          <DatabaseDisplay devMode = {props.devMode} allPlayedBoards = {props.allPlayedBoards} squares = {props.squares} database = {database} trainingIterations = {trainingIterations} trainingMode = {trainingMode}/>
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