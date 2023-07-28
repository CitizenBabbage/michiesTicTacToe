// This primarily handles the pre-game, wherein the player selects the piece they want to play, 
// and the learning algorithm, which triggers in reaction to the completion of a game. 

import React from 'react';
import { useState, useEffect} from 'react';
//import GameContainer from "./GameContainer"
import BoardContainer from './BoardContainer';
import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import { Button } from 'primereact/button';
import Updater from './Updater';
import { GameLog } from './GameLog.js';




export default function GameShell() {
  const [player, setPlayer] = useState( null ); 
  const [opponent, setOpponent] = useState( null ); 
  const [promptText, setPromptText ] = useState( `Choose side, X or O` ); 
  const [buttonActivation, setButtonActivation] = useState( true ); 
  const [playersTurn, setPlayersTurn] = useState(  ); 
  const [winner, setWinner] = useState(); 
  const [database,setDatabase] = useState(db);                     // this is the main database that is updated as learning progresses
  const [gameLog, setGameLog] = useState([]);
  console.log("database initialized with length ", database.length)
  
  useEffect(()=> {console.log("GameShell is responsive to changes in gameLog!")},[gameLog])


  function handleXClick () {
    setPlayer('X');
    setOpponent('O');  
    setPlayersTurn(true); 
    setPromptText('Player is X, Computer is O'); 
    setButtonActivation(false);
  }
  function handleOClick () {
    setPlayer('O');
    setOpponent('X');
    setPlayersTurn(false)
    setPromptText('Choose side, X or O'); 
    setButtonActivation(false); 
  }

  function reset () {
    setPlayer(null);
    setOpponent(null);
    setPromptText('Player is O, Computer is X'); 
    setButtonActivation(true); 
  }

 

 

  // if player is null, show the choose side options. Else display the game container. 
  if (player === null){
    return (
      <div className="app"> 
      <p>{ promptText }</p>
      <Button 
        disabled = { !buttonActivation } 
        onClick = { handleXClick }
        className={`player-button ${player === 'X' ? 'active' : ''}`}>
        X
      </Button>
      <Button 
        disabled = { !buttonActivation }
        onClick = { handleOClick }
        className={`player-button ${player === 'O' ? 'active' : ''}`}>
        O
      </Button>
      </div>
      )
    }
  else return (
      <div>
      <BoardContainer gameLog = {gameLog} setGameLog = {setGameLog} db = {db} winner = {winner} setWinner = {setWinner} setPlayersTurn = {setPlayersTurn} playersTurn = {playersTurn} reset = {reset} player = {player} opponent = {opponent}></BoardContainer>
      <Updater player = {player} database = {database} setDatabase = {setDatabase} winner = {winner} gameLog = {gameLog}/> 
      </div>
  )
}
