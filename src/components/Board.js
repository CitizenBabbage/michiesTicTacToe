import React from 'react';
import Square from "./SquareComponent" 
import {useState} from 'react';

export default function Board( props ) {
    const handleClick = props.handleClick; 
    const squares = props.squares; 
    const squaresClassName = props.squaresClassName; 
    const trainingMode = props.trainingMode; 
    const trainingIterations = props.trainingIterations; 
    let trainingsquares = Array(9).fill(null); 


    //console.log("in Board.js, squares is : ", squares)
    if (!Array.isArray(props.squares)) {
      //console.log("debug = ", props.debug)
      return null; // or return a loading spinner, error message, etc.
    }

    if (trainingMode) {
      if (trainingIterations % 100 === 0) {trainingsquares = squares}
      else trainingsquares = Array(9).fill("Z"); 
    }
    
    if (!trainingMode) return (
      
      <div>
      <div className = "board-row">
      <Square className = {squaresClassName} value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square className = {squaresClassName} value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square className = {squaresClassName} value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className = "board-row">
      <Square className = {squaresClassName} value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square className = {squaresClassName} value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square className = {squaresClassName} value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className = "board-row">
      <Square className = {squaresClassName} value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square className = {squaresClassName} value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square className = {squaresClassName} value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      </div>
    )
    
    else  return (
      
      <div>
      {/* <div className = "board-row">
      <Square className = {squaresClassName} value={trainingsquares[0]} />
      <Square className = {squaresClassName} value={trainingsquares[1]} />
      <Square className = {squaresClassName} value={trainingsquares[2]} />
      </div>
      <div className = "board-row">
      <Square className = {squaresClassName} value={trainingsquares[3]} />
      <Square className = {squaresClassName} value={trainingsquares[4]} />
      <Square className = {squaresClassName} value={trainingsquares[5]} />
      </div>
      <div className = "board-row">
      <Square className = {squaresClassName} value={trainingsquares[6]} />
      <Square className = {squaresClassName} value={trainingsquares[7]} />
      <Square className = {squaresClassName} value={trainingsquares[8]} />
      </div> */}
      <div className = "board-row">
      <Square className = {squaresClassName}  />
      <Square className = {squaresClassName}  />
      <Square className = {squaresClassName}  />
      </div>
      <div className = "board-row">
      <Square className = {squaresClassName}  />
      <Square className = {squaresClassName}  />
      <Square className = {squaresClassName}  />
      </div>
      <div className = "board-row">
      <Square className = {squaresClassName}  />
      <Square className = {squaresClassName}  />
      <Square className = {squaresClassName}  />
      </div>
      </div>
    )
  }

  