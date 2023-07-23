//this is a small info window that says that the computer is thinking. 
// an appropriate delay is built in here. 

import React from 'react';
import { useEffect, useRef } from 'react'
import { chooseMove } from "../auxiliary/chooseMove.js"



export default function Thinking( props ) {

    // the purpose of this is just to create a small delay so that the computer appears to be thinking
    // without it the computer tends to respond simultaneously with the player's move, which is unnatural

    const getChoice = props.getChoice; 
    const board = props.squares; 
    const playersTurn = props.playersTurn; 
    const calculateWinner = props.calculateWinner; 
    
    let thinkingWord = ""; 

// whenever playersTurn changes value, ask the computer to check whether it needs to take a turn
    // useEffect(() => {
    //         console.log(`players turn change detected to ${playersTurn}`)
    //         if (!playersTurn){
    //             thinkingWord = "Thinking..."
    //             getChoice(computerPlay())  // computerPlay returns a new boardstate reflecting new move, to be passed up to getChoice in BoardContainer
    //         }
    //         else thinkingWord = ""
    //     }, [board]);

    useEffect(() => {
        // Whenever playersTurn changes value, ask the computer to check whether it needs to take a turn
        console.log(`props.playersTurn change detected:`, props.playersTurn);
        if (!playersTurn) {
            thinkingWord = "Thinking..."; 
            computerPlay().then(resolvedSquares => getChoice(resolvedSquares)); // make sure computerPlay resolves before passing it to getChoice

            //getChoice(computerPlay());
        } else {
            thinkingWord = "";
        }
      }, [playersTurn]);

    // // //this governs the writing of the computer's symbol (X or O) onto the board array 
    // // const checkIfComputerShouldPlay = async () => {
    // //   console.log(`props.opponent is `,props.opponent)
    // //   if (!playersTurn){computerPlay()}
    // // }
    
    

    // async function computerPlay(){
    //     const nextSquares = board.slice();                            // create duplicate board in memory
    //     if (calculateWinner(nextSquares)) return;                     // if player has just won, stop
    //     if (nextSquares.includes(null)) {                             // if there are any empty squares left
    //       let nextSquareToMoveTo = await delayAndChoose(nextSquares)  // pick the next square to move to
    //       console.log("nextSquareToMoveTo is", nextSquareToMoveTo)    // 
    //       nextSquares[nextSquareToMoveTo] = props.opponent            // set the board square to X or O, as appropriate
    //       // setGameLog([...gameLog,[squares,nextSquareToMoveTo]])    // 
    //       return nextSquares; 
    //     }
    //   }

      function computerPlay() {
        let nextSquares = props.squares.slice(); // create duplicate board in memory
        if (calculateWinner(nextSquares)) return Promise.resolve(); // if player has just won, stop
        if (nextSquares.includes(null)) {// if there are any empty squares left
          return delayAndChoose(nextSquares).then(nextSquareToMoveTo => {
            console.log("nextSquareToMoveTo is", nextSquareToMoveTo);
            nextSquares[nextSquareToMoveTo] = props.opponent; // set the board square to X or O, as appropriate
            console.log("computerPlay: nextSquares is : ", nextSquares)
            return nextSquares; 
          });
        }
        return Promise.resolve(); // You might want to handle this situation differently
    }
  

 
    
    function delay(delay) {
        return new Promise((resolve) => {
        setTimeout(() => {resolve()}, delay);
        });
    }


    function delayAndChoose(board) {
        return new Promise((resolve, reject) => {
            delay(3000)
            .then(() => {
                const choice = chooseMove(board); 
                console.log("delayAndChoose, selected move is :", choice)
                //setPlayersTurn(true);                                 //it's Player's turn again
                resolve(choice);
            })
            .catch((error) => {
                console.error("Error in delayAndChoose:", error);
                reject(error);
            });
        });
    }
    return (
        <div>
            <p>{thinkingWord}</p>
        </div>
      
    )
  }