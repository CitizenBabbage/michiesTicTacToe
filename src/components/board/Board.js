import React from 'react';
import Square from "./SquareComponent.js" 
import { placeMark } from '../../auxiliary/general/usefulFunctions.js';

export default function Board( props ) {
    // const placePlayersMark = props.placePlayersMark; 
    const values = props.values; 
    const squaresClassName = props.squaresClassName; 
    const playersTurn = props.playersTurn; 
    const winner = props.winner; 
    const setSquares = props.setSquares; 
    const setPlayersTurn = props.setPlayersTurn;
    const testMode = props.testMode; 
    
    if (!Array.isArray(props.values)) {
      return null; // or return a loading spinner, error message, etc.
    }
    // this takes in the board square clicked by the player as an argument, 
   // then handles the placing of an X or an O as appropriate. 
   
  function placePlayersMark(i) {                          // i = number of square 0 through 8
    console.log("Placing player's mark!")
    let nextSquares = values.slice();                    // create duplicate board
    if (winner || !playersTurn || values[i]) {           // if the winner has been decided, it's not player's turn, or the square is occupied, do nothing
      console.log(`Cannot play because ${winner? 'game is already won': !playersTurn? "it's not player's turn" : 'space is occuped'}`)
      return;
    }
    nextSquares = placeMark(i, nextSquares);              // puts an X or O in the array depending on who is the player
    setSquares(nextSquares);                              // sets the board equal to the duplicate board
    
    if (!props.computerOff) {
      setPlayersTurn(false);
    }
  }
  let squareColors = props.squareColors; 
  if (!squareColors){squareColors = Array(9).fill(null)}
  

   return (
      
      <div>
      <div className = "board-row">
      <Square  className = {squaresClassName} value={values[0]} onSquareClick={() => placePlayersMark(0)} squareColor = {squareColors[0]}/>
      <Square  className = {squaresClassName} value={values[1]} onSquareClick={() => placePlayersMark(1)} squareColor = {squareColors[1]}/>
      <Square  className = {squaresClassName} value={values[2]} onSquareClick={() => placePlayersMark(2)} squareColor = {squareColors[2]}/>
      </div>
      <div className = "board-row">
      <Square  className = {squaresClassName} value={values[3]} onSquareClick={() => placePlayersMark(3)} squareColor = {squareColors[3]}/>
      <Square  className = {squaresClassName} value={values[4]} onSquareClick={() => placePlayersMark(4)} squareColor = {squareColors[4]}/>
      <Square  className = {squaresClassName} value={values[5]} onSquareClick={() => placePlayersMark(5)} squareColor = {squareColors[5]}/>
      </div>
      <div className = "board-row">
      <Square  className = {squaresClassName} value={values[6]} onSquareClick={() => placePlayersMark(6)} squareColor = {squareColors[6]}/>
      <Square  className = {squaresClassName} value={values[7]} onSquareClick={() => placePlayersMark(7)} squareColor = {squareColors[7]}/>
      <Square  className = {squaresClassName} value={values[8]} onSquareClick={() => placePlayersMark(8)} squareColor = {squareColors[8]}/>
      </div>
      </div>
    )
  }

  