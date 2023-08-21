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
  const setComputerOff = props.setComputerOff;  


  
                                   
   


  function clearBoard() {
      setSquares(Array(9).fill(null)); 
      setWinner(undefined); 
      setGameLog([Array(9).fill(null)]);
      console.log("trainingMode is ", trainingMode)
      if (props.testMode) {setPlayersTurn(true); setComputerOff(true)}
      console.log("setComputerOff is ", props.computerOff)
  }


  return (
      <div>
        <Board devMode = {props.devMode} testMode = { props.testMode } computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } trainingMode = {trainingMode} trainingIterations = {props.trainingIterations} squaresClassName = {squaresClassName} values = { squares } playersTurn = {playersTurn} winner = {winner} setSquares = {setSquares} setPlayersTurn = {setPlayersTurn}></Board> 
        <ClearButton clear = { clearBoard } reset = {props.reset}> </ClearButton>
      </div> 
  )

}