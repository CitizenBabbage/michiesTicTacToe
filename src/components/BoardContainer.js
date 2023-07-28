// This handles the following functions: 
// writing the player's choice into the appropriate place in the board 
// writing the computer's choice ditto
// 

import React from 'react';
import { useState } from 'react';
import Board from "./Board" 
import ClearButton from "./ClearBoardButton"
import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import Thinking from './Thinking.js'
import GameEnd from './GameEnd.js'


export default function BoardContainer( props ) {
  console.log('BoardContainer rendering...');

  const[debug, setDebug] = useState("initialized"); 

  // let turn; 
  // if (props.player === null) return;                                  // do nothing until you get a value
  // if (props.player === 'X'){turn = true} else turn = false;           // X goes first, so player goes first iff player = X
  // const [playersTurn, setPlayersTurn] = useState(turn);               // set state to hold whose turn it is

  const [playersTurn, setPlayersTurn] = useState(props.playersTurn);     // set state to hold whose turn it is
  const [squares, setSquares] = useState(Array(9).fill(null));           // create the board with 9 empty slots
  const [database,setDatabase] = useState(db);                           // set the board state database by copying the untrained db
  console.log("database initialized with length ", database.length)
  const [winner, setWinner] = useState(); 
  const [isCalculatingWinner, setIsCalculatingWinner] = useState(false); 

  function renderComputersMove( newSquares ){                             // takes a board state as argument
    if (playersTurn || winner ) return
    console.log("BoardContainer/renderComputersMove called")
    setSquares(newSquares);                                               // changes the real board to match the argument
  }
                                   
   // this takes in the board square clicked by the player as an argument, 
   // then handles the placing of an X or an O as appropriate. 
  function placePlayersMark(i) {                          // i = number of square 0 through 8
    console.log("placePlayersMark in BoardContainer called")
    if (!playersTurn) {return}   ;                        // if it's not the player's turn, do nothing
    //console.log("squares are : ", squares)
    const nextSquares = squares.slice();                  // create duplicate board
    //console.log(`Players move. Currently board = ${squares} and winner = ${winner}`)
    if (squares[i] || winner) {                            // if the square is occupied or the winner has been decided, 
      //console.log("bad click or winner decided")          // don't respond
      return;
    }
    nextSquares[i] = props.player;                        // puts an X or O in the array depending on who is the player
    // setGameLog([...gameLog,[squares,i]])
    setSquares(nextSquares);                              // sets the board equal to the duplicate board
    setPlayersTurn(false);
  }

  // function reportWinner(value){
  //   console.log("reportWinner in BoardContainer called")
  //   console.log("BoardContainer/reportWinner: isCalculatingWinner is ", isCalculatingWinner)
  //   //console.log("reporting winner is ", winner)
  //   if (value !== 'N') setWinner(value)
  //   let iCWmemory = false; 
  //   if (isCalculatingWinner){iCWmemory = true}
  //   setIsCalculatingWinner(false);
  //   if (iCWmemory) {console.log("isCalculatingWinner just changed value")}
  //   console.log("isCalculatingWinner is now ", isCalculatingWinner)
  // }

  //takes in winner as a symbol 'O' or 'X', determines whether computer won, and returns either 1 or -1 
  function gameResult(winner){
    if (winner !== 'X' && winner !== 'O') return; //ignore draws and incomplete games
    if (props.player === winner) return -1 // computer lost
    else return 1; // else computer won 
  }

  function clearBoard() {
      setSquares(Array(9).fill(null)); 
      setPlayersTurn(true);  
      setWinner(undefined); 
  }


  
  return (
    <div>
      <Board debug = {debug} handleClick = { placePlayersMark } squares = { squares} ></Board> 
      <Thinking setPlayersTurn = {setPlayersTurn} isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } squares = { squares } renderComputersMove = { renderComputersMove } playersTurn = { playersTurn } winner = { winner }/>   
      <GameEnd isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} playersTurn = { playersTurn }/>
      <ClearButton clear = { clearBoard } reset = {props.reset}> </ClearButton>
    </div> 
  )
  }



  
  

  