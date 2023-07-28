// This primarily handles the pre-game, wherein the player selects the piece they want to play. 

import React from 'react';
import { useState } from 'react';
//import GameContainer from "./GameContainer"
import BoardContainer from './BoardContainer';

import { Button } from 'primereact/button';


export default function GameShell() {
  const [player, setPlayer] = useState( null ); 
  const [opponent, setOpponent] = useState( null ); 
  const [promptText, setPromptText ] = useState( `Choose side, X or O` ); 
  const [buttonActivation, setButtonActivation] = useState( true ); 
  const [playersTurn, setPlayersTurn] = useState(  ); 

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

  // function learn(winner){
  //   let gameRes = gameResult(winner); 
  //   useEffect(()=>{
  //     let newDB = updateDB(gameLog, gameRes); // returns new DB, with modifications for learning
  //     setDatabase(newDB);
  //     console.log("via BoardContainer/learn, database is now:", database)
  //   },[])    
  // }

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
      <BoardContainer setPlayersTurn = {setPlayersTurn} playersTurn = {playersTurn} reset = {reset} player = {player} opponent = {opponent}></BoardContainer>
      </div>
  )
}
