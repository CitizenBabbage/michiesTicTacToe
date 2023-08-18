// This handles the following functions: 
// writing the player's choice into the appropriate place in the board 
// writing the computer's choice ditto


// FIX : You can double place your token if you click fast enough. 

import React from 'react';
import { useState } from 'react';
import Board from "./Board" 
import ClearButton from "./ClearBoardButton"



export default function BoardContainer( props ) {
  
  const playersTurn = props.playersTurn; 
  const setPlayersTurn = props.setPlayersTurn; 
  const squares = props.squares; 
  const setSquares = props.setSquares; 
  const winner = props.winner; 
  const setWinner = props.setWinner; 
  const setGameLog = props.setGameLog;  
  const trainingMode = props.trainingMode; 
  const squaresClassName = "mainBoardButton"; 


  
                                   
   


  function clearBoard() {
      setSquares(Array(9).fill(null)); 
      setWinner(undefined); 
      setGameLog([Array(9).fill(null)]); 
  }



  return (
      <div>
        <Board devMode = {props.devMode} trainingMode = {trainingMode} trainingIterations = {props.trainingIterations} squaresClassName = {squaresClassName} values = { squares } playersTurn = {playersTurn} winner = {winner} setSquares = {setSquares} setPlayersTurn = {setPlayersTurn}></Board> 
        <ClearButton clear = { clearBoard } reset = {props.reset}> </ClearButton>
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



  
  

  