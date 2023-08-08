import React from 'react';
import { useState, useEffect, useCallback} from 'react';

export default function GameEnd(props){

    const squares = props.squares; 
    const setIsCalculatingWinner = props.setIsCalculatingWinner; 
    const setWinner = props.setWinner; 
    const winner = props.winner; 
    const playersTurn = props.playersTurn; 
    const [resultText, setResultText] = useState('')
    const trainingMode = props.trainingMode; 


    useEffect(() => {
        //console.log("useEffect GameEnd1 triggered by change in playersTurn or squares")
        setIsCalculatingWinner(true);
      }, [squares]);
  

    //   // checks for result and displays it, else returns values needed to start next turn
    // function checkStatus(boardState, playersTurn){
    //     //console.log("checkStatus called in GameEnd")
    //     setIsCalculatingWinner(true);
    //   }

    useEffect(()=>{
        //console.log("GameEnd/useEffect2: isCalculatingWinner is", props.isCalculatingWinner)
        const result = calculateWinner(squares);
        if (result === 'X') {
            //console.log("X IS THE WINNER")
            setWinner('X'); 
            setResultText("X is the winner")
        } 
        else if (result === 'O') {
            setWinner('O');
            setResultText("O is the winner");
        }
        else if (result === 'D') {
            setWinner('D');
            setResultText("It's a draw!")}
        else if (props.player) {
            //console.log("1. No winner discovered.")
            setResultText("Next player: " + (playersTurn ? props.player : props.opponent));
        }
        else {
            console.log("2. No winner discovered.")
        }
        setIsCalculatingWinner(false)
    },[props.isCalculatingWinner, winner])


 

    function calculateWinner(squares) { 
        if (!squares) {
          return null;
        }
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
      if (!trainingMode) return (
        <div>
            <p>{ resultText }</p> 
        </div>
      )

}