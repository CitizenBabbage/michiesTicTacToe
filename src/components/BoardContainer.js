import React from 'react';
import { useState, useEffect } from 'react';
import Board from "./Board" 
import ClearButton from "./ClearBoardButton"

export default function BoardContainer( props ) {
    let turn; 
    if (props.player === null) return; 
    if (props.player === 'X'){turn = true} else turn = false; 
    const [playersTurn, setPlayersTurn] = useState(turn);
    const [squares, setSquares] = useState(Array(9).fill(null)); 
    let status = checkStatus(squares, playersTurn);

    useEffect(() => {
      console.log(`players turn change detected to ${playersTurn}`)
      opponentPlays()
    }, [playersTurn]);

    const opponentPlays = async () => {
      console.log(`props.opponent is `,props.opponent)
      if (!playersTurn){
        const nextSquares = squares.slice();
        if (calculateWinner(nextSquares)) return;             // if player has just won, stop
        if (nextSquares.includes(null)) {                     // if there are any empty squares left
          let nextSquareToMoveTo = await delayAndChoose(nextSquares)
          console.log("nextSquareToMoveTo is", nextSquareToMoveTo)
          nextSquares[nextSquareToMoveTo] = props.opponent
          setSquares(nextSquares); 
          setPlayersTurn(true);
        }
      }
    } 

                                   
   
    function handleClickBoard(i) {                          // i = number of square 0 through 8
      if (!playersTurn) {return}   ;                        // if it's not the player's turn, do nothing
      const nextSquares = squares.slice();                  // create duplicate board
      if (squares[i] || calculateWinner(nextSquares)) {     // if the square is occupied or the winner has been decided, don't respond
        console.log("bad click or winner decided")
        return;
      }
      nextSquares[i] = props.player;                        // puts an X or O in the array depending on who is the player
      setSquares(nextSquares);                              // sets the board equal to the duplicate board
      setPlayersTurn(false);
    }

    function chooseEmptySquare(board){
      if (calculateWinner(squares)) return; 
      let randomSquare = Math.floor(Math.random()*9); 
      if (board[randomSquare] === null){
        return randomSquare
      }
      else return chooseEmptySquare(board); 
    }

    function delay(delay) {
      return new Promise((resolve) => {
        setTimeout(() => {resolve()}, delay);
      });
    }

    // function delayAndChoose(board) {
    //   delay(4000).then((result) => {return chooseEmptySquare(board)})
    //   .catch((error) => {console.log("Error in delayAndChoose");throw error; });
    // }

    function delayAndChoose(board) {
      return new Promise((resolve, reject) => {
        delay(3000)
          .then(() => {
            const choice = chooseEmptySquare(board);
            //setPlayersTurn(true);                                 //it's Player's turn again
            resolve(choice);
          })
          .catch((error) => {
            console.error("Error in delayAndChoose:", error);
            reject(error);
          });
      });
    }

  // checks for result and displays it, else returns values needed to start next turn
    function checkStatus(boardState, playersTurn){
      const result = calculateWinner(boardState);
      if (result === 'X') {return "X is the winner";} 
      else if (result === 'O') {return "O is the winner";}
      else if (result === 'D') {return "It's a draw!";}
      else if (props.player) {return "Next player: " + (playersTurn ? props.player : props.opponent);}
      else return " "; 
    }

    function clearBoard() {
        setSquares(Array(9).fill(null)); 
        setPlayersTurn(true);  
    }
    return (
      <div>
        <Board handleClick = { handleClickBoard } squares = { squares} ></Board> 
        <p>{ status }</p>    
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

  