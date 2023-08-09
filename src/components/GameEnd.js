import React from 'react';
import { useState, useEffect, useCallback} from 'react';
import { calculateWinner } from '../auxiliary/checkWinner';

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
            //console.log("2. No winner discovered.")
        }
        setIsCalculatingWinner(false)
    },[props.isCalculatingWinner, winner])


 

    
    
      if (!trainingMode) return (
        <div>
            <p>{ resultText }</p> 
        </div>
      )

}