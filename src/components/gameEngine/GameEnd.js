// import React from 'react';
// import { useState, useEffect } from 'react';
// import { checkWinner } from '../../auxiliary/engineHelpers/checkWinner.js';
// import { opposite } from '../../auxiliary/general/usefulFunctions.js';

// export default function GameEnd(props){
//     const squares = props.squares; 
//     const setIsCalculatingWinner = props.setIsCalculatingWinner; 
//     const setWinner = props.setWinner; 
//     const winner = props.winner; 
//     const playersTurn = props.playersTurn; 
//     const trainingMode = props.trainingMode; 
//     const isCalculatingWinner = props.isCalculatingWinner; 
//     const resigned = props.resigned; 
//     const setWhoWon = props.setWhoWon; 
//     const humansLetter = props.humansLetter; 
    
    
//     useEffect(() =>{
//         if (resigned){writeGameResults(opposite(resigned))}
//     }
//         ,[resigned]  //resigned takes values undefined, null, 'X' or 'O'
//         )

    
  
//     useEffect(() => {
//         console.log("IsCalculatingWinner set to true. Running fixwinner...")
//         fixWinner(); 
//     },[isCalculatingWinner])

//     function fixWinner() {
//         if (isCalculatingWinner){
//             checkWinner(squares).then(writeGameResults)
//             .catch(error => {
//                 console.error("Error from checkWinner:", error);
//             })
//         } 
//     }

//     function writeGameResults(results){
//         console.log("fixwinner calls writeGameResults. setting winner as ", results)

//         if (!winner){ // if the winner hasn't already been written
//             console.log("Resetting winner in writeGameResults to ", results)
//             setWinner(results);
//         }
//         console.log(`isCalculatingWinner is ${isCalculatingWinner}. setting isCalculatingWinner to false`)
//         setIsCalculatingWinner(false)
//         console.log("isCalculatingWinner set to false")
//     }

//     //decides which of human vs computer was the winner
//     useEffect(() => {
//         setWhoWon(winner === humansLetter? "human": ['X','O'].includes(winner)? "computer": "draw")
//         console.log("setWhoWon has been triggered")
//     },[winner])



    
//       if (!trainingMode) return (
//         <div>
//             {/* <p> {props.devMode? `boardstate is: ${squares}` : ""}</p> */}
//             <p> {winner === 'D'? "It is a draw!": winner? `${winner} is the winner!` : '\u00A0'} </p>
//         </div>
//       )
//       else return (
//         <div>
//             {/* <p>{props.devMode? `boardstate is: ${squares}` : ""}</p>  */}
//         </div>
//       )

// }