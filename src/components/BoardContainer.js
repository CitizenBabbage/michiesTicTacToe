// This handles the following functions: 
// writing the player's choice into the appropriate place in the board 
// writing the computer's choice ditto
// 

import React from 'react';
import { useState, useEffect, useCallback} from 'react';
import Board from "./Board" 
import ClearButton from "./ClearBoardButton"
import { updateDB } from '../auxiliary/update';
import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import Thinking from './Thinking.js'


export default function BoardContainer( props ) {
  console.log('BoardContainer rendered');
    let turn; 
    if (props.player === null) return;                                  // do nothing until you get a value
    if (props.player === 'X'){turn = true} else turn = false;           // X goes first, so player goes first iff player = X
    const [playersTurn, setPlayersTurn] = useState(turn);               // set state to hold whose turn it is
    const [squares, setSquares] = useState(Array(9).fill(null));        // create the board with 9 empty slots
    //const [gameLog, setGameLog] = useState([]); 
    const [database,setDatabase] = useState(db);                        // set the board state database by copying the untrained db
    console.log("database initialized with length ", database.length)
    let status = checkStatus(squares, playersTurn);                     // set whose turn it is


    
        


  
    

    function getChoice( newSquares ){                             // takes a board state as argument
      setSquares(newSquares);                                     // changes the real board to match the argument
      setPlayersTurn(true);                                       // it's now the player's turn
    }
                                   
   // this takes in the board square clicked by the player as an argument, 
   // then handles the placing of an X or an O as appropriate. 
    function placePlayersMark(i) {                          // i = number of square 0 through 8
      if (!playersTurn) {return}   ;                        // if it's not the player's turn, do nothing
      console.log("squares are : ", squares)
      const nextSquares = squares.slice();                  // create duplicate board
      if (squares[i] || calculateWinner(nextSquares)) {     // if the square is occupied or the winner has been decided, 
        console.log("bad click or winner decided")          // don't respond
        return;
      }
      nextSquares[i] = props.player;                        // puts an X or O in the array depending on who is the player
      // setGameLog([...gameLog,[squares,i]])
      setSquares(nextSquares);                              // sets the board equal to the duplicate board
      setPlayersTurn(false);
    }




   

  // checks for result and displays it, else returns values needed to start next turn
    function checkStatus(boardState, playersTurn){
      const result = calculateWinner(boardState);
      //learn(result); 
      if (result === 'X') {return "X is the winner";} 
      else if (result === 'O') {return "O is the winner";}
      else if (result === 'D') {return "It's a draw!";}
      else if (props.player) {return "Next player: " + (playersTurn ? props.player : props.opponent);}
      else return " "; 
    }

    //takes in winner as a symbol 'O' or 'X', determines whether computer won, and returns either 1 or -1 
    function gameResult(winner){
      if (winner !== 'X' && winner !== 'O') return; //ignore draws and incomplete games
      if (props.player === winner) return -1 // computer lost
      else return 1; // else computer won 
    }

    // function learn(winner){
    //   let gameRes = gameResult(winner); 
    //   useEffect(()=>{
    //     let newDB = updateDB(gameLog, gameRes); // returns new DB, with modifications for learning
    //     setDatabase(newDB);
    //     console.log("via BoardContainer/learn, database is now:", database)
    //   },[]) 
       
    // }

    


    function clearBoard() {
        setSquares(Array(9).fill(null)); 
        setPlayersTurn(true);  
    }


   
    return (
      <div>
        <Board handleClick = { placePlayersMark } squares = { squares} ></Board> 
        <p>{ status }</p> 
        <Thinking opponent ={ props.opponent } squares = { squares } getChoice = { getChoice } playersTurn = { playersTurn } calculateWinner = { calculateWinner }/>   
        <ClearButton clear = { clearBoard } reset = {props.reset}> </ClearButton>
      </div> 
    )
  }



  
  function calculateWinner(squares) {
    //part I: check for a winning line 
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    // part ii: check if the board is full
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] !== 'X' && squares[i] !== 'O'){
        break // we've found an empty square so exit the loop
      }
      else {
        // if i = 8 then there are no empty squares and it's a draw. 
        if (i === 8){return 'D'} 
        else continue
      }
    }
    return null;
  }

  