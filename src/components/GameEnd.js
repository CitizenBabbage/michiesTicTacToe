import React from 'react';
import { useState, useEffect } from 'react';
import { calculateWinner } from '../auxiliary/checkWinner';

export default function GameEnd(props){
    const squares = props.squares; 
    const setIsCalculatingWinner = props.setIsCalculatingWinner; 
    const setWinner = props.setWinner; 
    const winner = props.winner; 
    const playersTurn = props.playersTurn; 
    const trainingMode = props.trainingMode; 
    const isCalculatingWinner = props.isCalculatingWinner
    const [toggle, setToggle] = useState(true); 
    


    useEffect(() => {
        //console.log("About to reset IsCalculatingWinner based on change in squares")
        setIsCalculatingWinner(true);
      }, [squares]);
  
    useEffect(()=>{
        const result = calculateWinner(squares);
        setToggle(!toggle); // this is just to trigger useEffect below
        setWinner(result); 
    },[isCalculatingWinner])

    useEffect(()=>{
        //console.log("About to reset IsCalculatingWinner based on change in toggle")
        setIsCalculatingWinner(false);
        },[toggle])



    
      if (!trainingMode) return (
        <div>
            {props.devMode? `boardstate is: ${squares}
            ` : ""}
            {winner === 'D'? "It is a draw!": winner? `${winner} is the winner!` : `Next player: ${playersTurn ? props.player : props.opponent}`} 
        </div>
      )
      else return (
        <div>
            {props.devMode? `boardstate is: ${squares}
            ` : ""}
        </div>
      )

}