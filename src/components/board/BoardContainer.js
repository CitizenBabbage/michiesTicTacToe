// This handles the following functions: 
// writing the player's choice into the appropriate place in the board 
// writing the computer's choice ditto


// FIX : You can double place your token if you click fast enough. 

import React from 'react';
import { useState } from 'react';
import Board from "./Board.js" 
import ClearButton from "../buttons/ClearBoardButton.js"
import { ResignButton } from '../buttons/ResignButton.js';



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
  const setResigned = props.setResigned; 


  
                                   
   


  function clearBoard() {
    // console.log("boardContainer: setting squares in clearBoard")

      setSquares(Array(9).fill(null)); 
      setWinner(undefined); 
      setResigned(null); 
      setGameLog([Array(9).fill(null)]);
      // console.log("trainingMode is ", trainingMode)
      // if (props.testMode) {setPlayersTurn(true); setComputerOff(true)}
      // console.log("setComputerOff is ", props.computerOff)
  }


  return (
    trainingMode?
      <div className='center'>
          {!trainingMode && <img src = {props.src} className = 'thumbnail'/>}
          <Board devMode = {props.devMode} computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } trainingMode = {trainingMode} trainingIterations = {props.trainingIterations} squaresClassName = {squaresClassName} values = { squares } playersTurn = {playersTurn} winner = {winner} setSquares = {setSquares} setPlayersTurn = {setPlayersTurn}></Board> 
      </div>
      :
      <div className='center'>
        <Board devMode = {props.devMode} computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } trainingMode = {trainingMode} trainingIterations = {props.trainingIterations} squaresClassName = {squaresClassName} values = { squares } playersTurn = {playersTurn} winner = {winner} setSquares = {setSquares} setPlayersTurn = {setPlayersTurn}></Board> 
        <div className = 'horizontal-button-container'>
          <ResignButton setResigned = {props.setResigned} humansLetter = {props.humansLetter}/>
          <ClearButton clear = { clearBoard } reset = {props.reset}> </ClearButton>
          
        </div>
      </div> 
  )

}