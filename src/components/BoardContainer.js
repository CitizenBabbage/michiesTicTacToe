// This handles the following functions: 
// writing the player's choice into the appropriate place in the board 
// writing the computer's choice ditto


// FIX : You can double place your token if you click fast enough. 

import React from 'react';
import { useState } from 'react';
import Board from "./Board" 
import ClearButton from "./ClearBoardButton"
import Thinking from './Thinking.js'
import GameEnd from './GameEnd.js'
import GameLog from './GameLog.js'
import { checkDbase } from '../auxiliary/errorCheckers.js';



export default function BoardContainer( props ) {
  
  const playersTurn = props.playersTurn; 
  const setPlayersTurn = props.setPlayersTurn; 
  const squares = props.squares; 
  const setSquares = props.setSquares; 
  const database = props.database; 
  const winner = props.winner; 
  const setWinner = props.setWinner; 
  const [isCalculatingWinner, setIsCalculatingWinner] = useState(false); 
  const gameLog = props.gameLog; 
  const setGameLog = props.setGameLog;  
  const setTrainingMode = props.setTrainingMode; 
  const trainingMode = props.trainingMode; 
  const trainingIterations = props.trainingIterations; 
  const squaresClassName = "mainBoardButton"; 


  
                                   
   


  function clearBoard() {
      setSquares(Array(9).fill(null)); 
      setWinner(undefined); 
      setGameLog([Array(9).fill(null)]); 
  }



  return (
      <div>
        <Board devMode = {props.devMode} trainingMode = {trainingMode} trainingIterations = {props.trainingIterations} squaresClassName = {squaresClassName} squares = { squares} playersTurn = {playersTurn} winner = {winner} setSquares = {setSquares} setPlayersTurn = {setPlayersTurn}></Board> 
        <Thinking trainingIterations = {trainingIterations} devMode = {props.devMode} setSquares = {setSquares} setFoe = { props.setFoe } foe = {props.foe} database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} setPlayersTurn = {setPlayersTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares } playersTurn = { playersTurn } winner = { winner }/>   
        <ClearButton clear = { clearBoard } reset = {props.reset}> </ClearButton>
        <GameLog devMode = {props.devMode} trainingMode = {trainingMode} winner = {winner} gameLog = {gameLog} setGameLog = {setGameLog} squares = {squares}/> 
        <GameEnd devMode = {props.devMode} isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} playersTurn = { playersTurn }/>
      </div> 
  )
  // if (!trainingMode || props.trainingIterations < 2) return (
  //   <div>
  //     <Board trainingMode = {trainingMode} trainingIterations = {props.trainingIterations} squaresClassName = {squaresClassName} debug = {debug} placePlayersMark = { placePlayersMark } squares = { squares} ></Board> 
  //     <Thinking setFoe = { props.setFoe } foe = {props.foe} database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} setPlayersTurn = {setPlayersTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares } renderComputersMove = { renderComputersMove } playersTurn = { playersTurn } winner = { winner }/>   
  //     <ClearButton clear = { clearBoard } reset = {props.reset}> </ClearButton>
  //     <GameLog trainingMode = {trainingMode} winner = {winner} gameLog = {gameLog} setGameLog = {setGameLog} squares = {squares}/> 
  //     <GameEnd isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} playersTurn = { playersTurn }/>
  //   </div> 
  // )
  // else return (
  //   <div>
  //       {/* <p> Training... </p> */}
  //       <Thinking setFoe = { props.setFoe } foe = {props.foe} trainingIterations = {props.trainingIterations} database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} setPlayersTurn = {setPlayersTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares } renderComputersMove = { renderComputersMove } playersTurn = { playersTurn } winner = { winner }/>   
  //       <GameEnd trainingMode = {trainingMode} isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} playersTurn = { playersTurn }/>
  //       <ClearButton clear = { clearBoard } reset = {props.reset}> </ClearButton>
  //       <GameLog trainingMode = {trainingMode} winner = {winner} gameLog = {gameLog} setGameLog = {setGameLog} squares = {squares}/> 

  //     </div> 
  //   )
  }



  
  

  