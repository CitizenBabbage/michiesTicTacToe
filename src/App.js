import React from 'react';
import { useState } from 'react';
import BoardContainer from "./components/BoardContainer"

import { Button } from 'primereact/button';


export default function App() {
  const [player, setPlayer] = useState( null )
  const [opponent, setOpponent] = useState( null )
  const [promptText, setPromptText ] = useState( `Choose side, X or O` )
  const [buttonActivation, setButtonActivation] = useState( true )
  function handleXClick () {
    setPlayer('X');
    setOpponent('O');  
    setPromptText('Player is X, Computer is O'); 
    setButtonActivation(false);
  }
  function handleOClick () {
    setPlayer('O');
    setOpponent('X');
    setPromptText('Choose side, X or O'); 
    setButtonActivation(false); 
  }

  function reset () {
    setPlayer(null);
    setOpponent(null);
    setPromptText('Player is O, Computer is X'); 
    setButtonActivation(true); 
  }
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
      <BoardContainer reset = {reset} player = {player} opponent = {opponent}></BoardContainer>
      </div>
  )
}



