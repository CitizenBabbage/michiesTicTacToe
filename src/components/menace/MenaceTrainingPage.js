import React from 'react';
import { useEffect } from 'react';


import BoardContainer from '../board/BoardContainer.js';
import GameCycle from '../gameEngine/GameCycle.js';
import GameLog from '../gameEngine/GameLog.js';
// import Thinking from '../gameEngine/AI_DecisionModule.js';
import { IdFacts } from '../presentational/IdFacts.js';
import { TrainingIterationsField } from '../buttons/TrainingIterationsField.js';
import { NavigationButton } from '../buttons/NavigationButton.js';
import SoundComponent from '../presentational/sound/SoundFX.js';
import { NLlog } from '../presentational/NLlog.js';
import DatabaseDisplay from './DBDisplay.js';


export function MenaceTrainingPage (props) {
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
    const allPlayedBoards = props.allPlayedBoards; 
    const setAllPlayedBoards = props.setAllPlayedBoards; 

    // this ensures that squares are null when training begins, so that setSquares (in TrainingIterationsField) will launch the Gamecycle
    useEffect(() => {
      console.log("mtp: setting squares in useEffect")
      setSquares([null,null,null,null,null,null,null,null,null,])
    }, [])
    
    
    return (
      <div className='page'> 

        <div className='threeRows'>

          <div label = "column1, row1"> 
            <NavigationButton path = "/selectOpponent" label = 'Menu'/>
            {trainingMode && <button className = 'retro-button' onClick = {returnToGame}> Game </button> }
          </div> 

          <div label = "column1, row2" >
            <div>
              <div>
                <IdFacts name = {props.name} playStyle = {props.playStyle} blurb = {props.blurb} src = {props.src} trainingMode = { trainingMode }/>
              </div>
              <BoardContainer devMode = {props.devMode} computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } src = {props.src} setFoe = { props.setFoe } foe = {foe} trainingIterations = {trainingIterations} setResigned = {setResigned} humansLetter = {humansLetter} squares = {squares} setSquares = {setSquares} trainingMode = {trainingMode}  setTrainingMode = {setTrainingMode} gameLog = {gameLog} setGameLog = {setGameLog} database = {database} winner = {winner} setWinner = {setWinner} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} reset = {reset} ></BoardContainer>
              <TrainingIterationsField setSquares = {props.setSquares} setSoundEffect = {props.setSoundEffect} trainingMode = { trainingMode } setTrainingIterations = {setTrainingIterations}  xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} value = {value} setValue = {setValue}/>    
            </div>
          </div> 
          <div label = "column1, row3">
            {/* <GameEnd setWhoWon = {props.setWhoWon} humansLetter = {humansLetter}  devMode = {props.devMode} resigned = { resigned } isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn}/> */}
            <GameCycle trainingTurn = {props.trainingTurn} setTrainingTurn = {props.setTrainingTurn} allPlayedBoards = {allPlayedBoards} setAllPlayedBoards = {setAllPlayedBoards} setTrainingIterations = {props.setTrainingIterations} setGameLog = {props.setGameLog} setWinner = {props.setWinner} ranking = {props.ranking} setComputerOff = {props.setComputerOff} computerOff = {props.computerOff} soundEffect = {props.soundEffect} setSoundEffect= {props.setSoundEffect} net = {props.net} devMode = {props.devMode} trainingIterations = {trainingIterations} setSquares = {setSquares} setFoe = { props.setFoe } foe = {props.foe} database = {database} trainingMode = {trainingMode} setTrainingMode = {props.setTrainingMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares }  winner = { winner }/>   
            <GameLog computerOff = {props.computerOff} trainingTurn = {props.trainingTurn} devMode = {props.devMode} trainingMode = {trainingMode} winner = {winner} gameLog = {gameLog} setGameLog = {setGameLog} squares = {squares}/> 
            {/* {trainingMode && <NLlog naturalLanguageLog = { props.naturalLanguageLog } setNaturalLanguageLog = { props.setNaturalLanguageLog } nLLogStats = { props.nLLogStats }/>} */}

          </div>

        </div>

        <div label = "second column">
          <DatabaseDisplay gameLog = {props.gameLog} devMode = {props.devMode} allPlayedBoards = {props.allPlayedBoards} squares = {props.squares} database = {database} trainingIterations = {trainingIterations} trainingMode = {trainingMode}/>
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