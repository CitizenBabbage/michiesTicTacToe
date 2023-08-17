import React from 'react';
import Square from "./SquareComponent" 
import { placeMark } from '../auxiliary/usefulFunctions';

export default function Board( props ) {
    // const placePlayersMark = props.placePlayersMark; 
    const squares = props.squares; 
    const squaresClassName = props.squaresClassName; 
    const trainingMode = props.trainingMode; 
    const playersTurn = props.playersTurn; 
    const winner = props.winner; 
    const setSquares = props.setSquares; 
    const setPlayersTurn = props.setPlayersTurn; 
  
    if (!Array.isArray(props.squares)) {
      return null; // or return a loading spinner, error message, etc.
    }

    // this takes in the board square clicked by the player as an argument, 
   // then handles the placing of an X or an O as appropriate. 
   
  function placePlayersMark(i) {                          // i = number of square 0 through 8
    let nextSquares = squares.slice();                    // create duplicate board
    if (winner || !playersTurn || squares[i]) {           // if the winner has been decided, it's not player's turn, or the square is occupied, do nothing
      return;
    }
    nextSquares = placeMark(i, nextSquares);              // puts an X or O in the array depending on who is the player
    setSquares(nextSquares);                              // sets the board equal to the duplicate board
    setPlayersTurn(false);
  }


    
    if (!trainingMode) return (
      
      <div>
      <div className = "board-row">
      <Square  className = {squaresClassName} value={squares[0]} onSquareClick={() => placePlayersMark(0)}/>
      <Square  className = {squaresClassName} value={squares[1]} onSquareClick={() => placePlayersMark(1)}/>
      <Square  className = {squaresClassName} value={squares[2]} onSquareClick={() => placePlayersMark(2)}/>
      </div>
      <div className = "board-row">
      <Square  className = {squaresClassName} value={squares[3]} onSquareClick={() => placePlayersMark(3)}/>
      <Square  className = {squaresClassName} value={squares[4]} onSquareClick={() => placePlayersMark(4)}/>
      <Square  className = {squaresClassName} value={squares[5]} onSquareClick={() => placePlayersMark(5)}/>
      </div>
      <div className = "board-row">
      <Square  className = {squaresClassName} value={squares[6]} onSquareClick={() => placePlayersMark(6)}/>
      <Square  className = {squaresClassName} value={squares[7]} onSquareClick={() => placePlayersMark(7)}/>
      <Square  className = {squaresClassName} value={squares[8]} onSquareClick={() => placePlayersMark(8)}/>
      </div>
      </div>
    )
    
    else  return (
      
      <div>
      <div className = "board-row">
      <Square  className = {squaresClassName}  />
      <Square  className = {squaresClassName}  />
      <Square  className = {squaresClassName}  />
      </div>
      <div className = "board-row">
      <Square  className = {squaresClassName}  />
      <Square  className = {squaresClassName}  />
      <Square  className = {squaresClassName}  />
      </div>
      <div className = "board-row">
      <Square  className = {squaresClassName}  />
      <Square  className = {squaresClassName}  />
      <Square  className = {squaresClassName}  />
      </div>
      </div>
    )
  }

  