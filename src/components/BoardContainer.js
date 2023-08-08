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



export default function BoardContainer( props ) {
  //console.log('BoardContainer rendering...');

  const[debug, setDebug] = useState("initialized"); 

  
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
  const [squaresClassName, setSquaresClassName] = useState("mainBoardButton"); 

  console.log("Training mode in boardContainer is : ", trainingMode)
  function renderComputersMove( newSquares ){                             // takes a board state as argument
    if (playersTurn || winner ) return
    setSquares(newSquares);                                               // changes the real board to match the argument
  }
                                   
   // this takes in the board square clicked by the player as an argument, 
   // then handles the placing of an X or an O as appropriate. 
   
  function placePlayersMark(i) {                          // i = number of square 0 through 8
    if (!playersTurn) {return}   ;                        // if it's not the player's turn, do nothing
    const nextSquares = squares.slice();                  // create duplicate board
    if (squares[i] || winner) {                           // if the square is occupied or the winner has been decided, 
      return;
    }
    nextSquares[i] = props.player;                        // puts an X or O in the array depending on who is the player
    setSquares(nextSquares);                              // sets the board equal to the duplicate board
    setPlayersTurn(false);
  }


  function clearBoard() {
      setSquares(Array(9).fill(null)); 
      setWinner(undefined); 
      setGameLog([]); 
  }


  
  if (!trainingMode || props.trainingIterations < 2) return (
    <div>
      <Board trainingMode = {trainingMode} trainingIterations = {props.trainingIterations} squaresClassName = {squaresClassName} debug = {debug} handleClick = { placePlayersMark } squares = { squares} ></Board> 
      <Thinking database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} setPlayersTurn = {setPlayersTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares } renderComputersMove = { renderComputersMove } playersTurn = { playersTurn } winner = { winner }/>   
      <ClearButton clear = { clearBoard } reset = {props.reset}> </ClearButton>
      <GameLog trainingMode = {trainingMode} winner = {winner} gameLog = {gameLog} setGameLog = {setGameLog} squares = {squares}/> 
      <GameEnd isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} playersTurn = { playersTurn }/>
    </div> 
  )
  else return (
    <div>
        {/* <p> Training... </p> */}
        <Thinking trainingIterations = {props.trainingIterations} database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} setPlayersTurn = {setPlayersTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares } renderComputersMove = { renderComputersMove } playersTurn = { playersTurn } winner = { winner }/>   
        <GameEnd trainingMode = {trainingMode} isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} playersTurn = { playersTurn }/>
        <ClearButton clear = { clearBoard } reset = {props.reset}> </ClearButton>
        <GameLog trainingMode = {trainingMode} winner = {winner} gameLog = {gameLog} setGameLog = {setGameLog} squares = {squares}/> 

      </div> 
    )
  }



  
  

  