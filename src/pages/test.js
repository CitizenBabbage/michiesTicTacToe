// import GameShell from "../components/gameEngine/GameShell.js"
// import React, { useState } from 'react';



// export default function Test( props ) {

//   const [foe, setFoe] = useState("")
//   const menuOptions = ["menace","minimax","huris","evolvo"]
//   const [trainingSquares, setTrainingSquares] = useState(Array(9).fill(null))
//   const [computerOff, setComputerOff] = useState(true); 
//   const setPlayersTurn = props.setPlayersTurn;


//   function handleClick(){
//     setPlayersTurn(false); 
//     setComputerOff(false); 
//   }
  
//   return (
//       <div>
//       <DropdownMenu devMode = {props.devMode} setFoe = { setFoe } menuOptions = { menuOptions } dropdownText = {"Choose Opponent"} />
//       { foe && <p>Opponent set to {foe}</p> } 
//       { foe && <button onClick={handleClick}> Start </button> }
//       <GameShell devMode = {props.devMode} computerOff = { computerOff } setComputerOff = { setComputerOff } playersTurn = {props.playersTurn} setPlayersTurn = {props.setPlayersTurn} foe = { foe } winner = {undefined} squaresClassName = {"mainBoardButton"} values = { trainingSquares } setSquares = {setTrainingSquares} ></GameShell> 
//       </div>
//   )
// }