import React from 'react';
// import { Button } from 'primereact/button';
import { useEffect } from 'react';


import BoardContainer from '../board/BoardContainer.js';
import GameEnd from './GameEnd.js';
import GameLog from './GameLog.js';
import GameCycle from './GameCycle.js';
import MenaceUpdater from '../menace/MenaceUpdater.js';
import { IdFacts } from '../presentational/IdFacts.js';
import { TrainingIterationsField } from '../buttons/TrainingIterationsField.js';
import { NavigationButton } from '../buttons/NavigationButton.js';
import SoundComponent from '../presentational/sound/SoundFX.js';
import { NLlog } from '../presentational/NLlog.js';



export default function PlayPage (props) {
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
    const setHumansLetter = props.setHumansLetter; 
    //const startTraining = props.startTraining; 
    const handleTrainingModeClick = props.handleTrainingModeClick; 

    // useEffect(()=>{
    //   console.log("start of playPage, props.soundEffect is ", props.soundEffect)
    // }, [])

    useEffect(()=>{
      if (props.ranking) console.log("in playpage, setting of ranking has been recognised! ")
    }, [props.ranking])
    

    return (
    <div className='page'> 
      <div className='gameshell'>
          <div className='space-around'>
            <NavigationButton path = "/selectOpponent" label = 'Menu'/>
            {!trainingMode && <button className = 'retro-button' onClick = {handleTrainingModeClick}> Train </button> }
          </div>
            
            <BoardContainer devMode = {props.devMode} computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } src = {props.src} setFoe = { props.setFoe } foe = {foe} trainingIterations = {trainingIterations} setResigned = {setResigned} humansLetter = {humansLetter} squares = {squares} setSquares = {setSquares} trainingMode = {trainingMode}  setTrainingMode = {setTrainingMode} gameLog = {gameLog} setGameLog = {setGameLog} database = {database} winner = {winner} setWinner = {setWinner} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} reset = {reset} ></BoardContainer>
            <TrainingIterationsField setSoundEffect = {props.setSoundEffect} trainingMode = { trainingMode } setTrainingIterations = {setTrainingIterations}  xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} foe = {foe} value = {value} setValue = {setValue}/>
            <GameCycle humansLetter = {props.humansLetter} resigned = {resigned} setResigned = {setResigned} setTrainingTurn = {props.setTrainingTurn} thinkBoardText = {props.thinkBoardText} controllingGenome = {props.controllingGenome} setControllingGenome = {props.setControllingGenome} setWinner = {setWinner} ranking = {props.ranking} setComputerOff = {props.setComputerOff} computerOff = {props.computerOff} soundEffect = {props.soundEffect} setSoundEffect= {props.setSoundEffect} net = {props.net} devMode = {props.devMode} trainingIterations = {trainingIterations} setSquares = {setSquares} setFoe = { props.setFoe } foe = {props.foe} database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares }  winner = { winner }/>   
            <GameLog computerOff = {props.computerOff} devMode = {props.devMode} trainingMode = {trainingMode} winner = {winner} gameLog = {gameLog} setGameLog = {setGameLog} squares = {squares}/> 
            {/* <GameEnd humansLetter = {humansLetter} setWhoWon = {props.setWhoWon} devMode = {props.devMode} resigned = { resigned } isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} xsTurn={props.xsTurn} setXsTurn={props.setXsTurn}/> */}
            {foe === 'menace' && <MenaceUpdater trainingTurn = {props.trainingTurn} setWinner = {setWinner} setComputerOff = {props.setComputerOff} computerOff = {props.computerOff} trainingMode = {trainingMode} devMode = {props.devMode}  database = {database} setDatabase = {setDatabase} winner = {winner} gameLog = {gameLog} trainingIterations = {trainingIterations} setTrainingIterations = {setTrainingIterations} setGameLog = {setGameLog} setSquares = {setSquares} /> 
}      </div>
      <div>
        <IdFacts name = {props.name} blurb = {props.blurb} src = {props.src} trainingMode = { trainingMode }/>
        {/* Menace updater included here so MENACE can learn from the games it plays in game mode, not just when training */}
        <SoundComponent computerOff = {props.computerOff} foe = {foe} whoWon = {props.whoWon} soundEffect = {props.soundEffect} setSoundEffect= {props.setSoundEffect}/>
      </div>
    </div>  
    )

}