import React from 'react';
import { useState, useEffect } from 'react';
import { checkWinner } from '../auxiliary/engineHelpers/checkWinner';
import { opposite } from '../auxiliary/general/usefulFunctions';

export default function GameEnd(props){
    const squares = props.squares; 
    const setIsCalculatingWinner = props.setIsCalculatingWinner; 
    const setWinner = props.setWinner; 
    const winner = props.winner; 
    const playersTurn = props.playersTurn; 
    const trainingMode = props.trainingMode; 
    const isCalculatingWinner = props.isCalculatingWinner; 
    const resigned = props.resigned; 
    
    // console.log(checkWinner(squares))
    // console.log(checkWinner(squares).then(writeGameResults))

    useEffect(() =>{
        if (resigned){writeGameResults(opposite(resigned))}
    }
        ,[resigned]//resigned takes values undefined, null, 'X' or 'O'
        )

    useEffect(checkForEmptySquares, [squares]);

    // this is called if there is a change in squares. To avoid triggering at the beginning,
    // when squares is changed to all blank, it checks to see that at least one square is occupied, 
    // before setting isCalculatingWinner to true.   
    function checkForEmptySquares(){
        if (squares.some(value => value !== null)){setIsCalculatingWinner(true);}
    }
  
    useEffect(fixWinner,[isCalculatingWinner])

    function fixWinner() {
        if (isCalculatingWinner){
            checkWinner(squares).then(writeGameResults)
            .catch(error => {
                console.error("Error from checkWinner:", error);
            })
        } 
    }

    function writeGameResults(results){
        if (!winner){ // if the winner hasn't already been written
            console.log("Resetting winner in writeGameResults to ", results)
            setWinner(results);
            
        }
        setIsCalculatingWinner(false)
    }



    
      if (!trainingMode) return (
        <div>
            <p> {props.devMode? `boardstate is: ${squares}` : ""}</p>
            <p> {winner === 'D'? "It is a draw!": winner? `${winner} is the winner!` : `Next player: ${playersTurn ? props.player : props.opponent}`} </p>
        </div>
      )
      else return (
        <div>
            <p>{props.devMode? `boardstate is: ${squares}` : ""}</p> 
        </div>
      )

}