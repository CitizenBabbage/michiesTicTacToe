// // This primarily handles the pre-game, wherein the player selects the piece they want to play. 

// import React from 'react';
// import { useState } from 'react';
// import GameContainer from "./archiveGameContainer"
// import GameOver from "./GameOver.js"
// import { Button } from 'primereact/button';


// export default function Shell() {
//   const [player, setPlayer] = useState( null )
//   const [opponent, setOpponent] = useState( null )
//   const [promptText, setPromptText ] = useState( `Choose side, X or O` )
//   const [buttonActivation, setButtonActivation] = useState( true )
//   const dbs = props.dbs, setDBS = props.setDBS; 

//   function handleXClick () {
//     setPlayer('X');
//     setOpponent('O');  
//     setPromptText('Player is X, Computer is O'); 
//     setButtonActivation(false);
//   }

//   function handleOClick () {
//     setPlayer('O');
//     setOpponent('X');
//     setPromptText('Choose side, X or O'); 
//     setButtonActivation(false); 
//   }

//   function reset () {
//     setPlayer(null);
//     setOpponent(null);
//     setPromptText('Player is O, Computer is X'); 
//     setButtonActivation(true); 
//   }

//   const [calculateWinner, setCalculateWinner] = useState()
  
//   function reportCalculateWinner(value) {
//     setCalculateWinner(value)
//   }
  

//   const [nextSquares, setNextSquares] = useState()
  
//   function reportNextSquares(value) {
//     setNextSquares(value)
//   }


//   const [playersTurn, setPlayersTurn] = useState()
  
//   function reportPlayersTurn(value) {
//     setPlayersTurn(value)
//   }

  
//   if (player === null){
//     return (
//       <div className="app"> 
//       <p>{ promptText }</p>
//       <Button 
//         disabled = { !buttonActivation } 
//         onClick = { handleXClick }
//         className={`player-button ${player === 'X' ? 'active' : ''}`}>
//         X
//       </Button>
//       <Button 
//         disabled = { !buttonActivation }
//         onClick = { handleOClick }
//         className={`player-button ${player === 'O' ? 'active' : ''}`}>
//         O
//       </Button>
//       </div>
//       )
//     }
//   else return (
//       <div>
//       <GameContainer reportPlayersTurn = {reportPlayersTurn} calculateWinner = {calculateWinner} reportNextSquares = {reportNextSquares} reset = {reset} player = {player} opponent = {opponent}></GameContainer>
//       <GameOver playersTurn = { playersTurn } reportCalculateWinner = {reportCalculateWinner} nextSquares = { nextSquares }/>
      
//       </div>
//   )
// }
