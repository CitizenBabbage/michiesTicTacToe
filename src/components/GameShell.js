// This primarily handles the pre-game, wherein the player selects the piece they want to play, 
// and the learning algorithm, which triggers in reaction to the completion of a game. 

import React from 'react';
import { useState, useEffect} from 'react';
//import GameContainer from "./GameContainer"
import BoardContainer from './BoardContainer';
import {db} from '../auxiliary/databaseFormatted' //assert { type: "json" };
import { Button } from 'primereact/button';
import Updater from './Updater';
import { GameLog } from './GameLog.js';
import { isAnInteger } from '../auxiliary/usefulFunctions';




export default function GameShell() {
  const [player, setPlayer] = useState( null ); 
  const [opponent, setOpponent] = useState( null ); 
  const [promptText, setPromptText ] = useState( `Choose side, X or O` ); 
  const [buttonActivation, setButtonActivation] = useState( true ); 
  const [playersTurn, setPlayersTurn] = useState(  ); 
  const [winner, setWinner] = useState(); 
  const [database,setDatabase] = useState(db);                     // this is the main database that is updated as learning progresses
  const [gameLog, setGameLog] = useState([]);
  const [trainingMode, setTrainingMode] = useState(); 
  const [value, setValue] = useState("");
  const [trainingIterations, setTrainingIterations] = useState(0); 
  const [submissionError, setSubmissionError] = useState(""); 
  const [squares, setSquares] = useState(Array(9).fill(null));           // create the board with 9 empty slots
  
  //console.log("database initialized with length ", database.length)
  
  //useEffect(()=> {console.log("GameShell is responsive to changes in gameLog!")},[gameLog])


  function handleXClick () {
    setPlayer('X');
    setOpponent('O');  
    setPlayersTurn(true); 
    setPromptText('Player is X, Computer is O'); 
    setButtonActivation(false);
    setTrainingMode(false) ;
  }
  function handleOClick () {
    setPlayer('O');
    setOpponent('X');
    setPlayersTurn(false)
    setPromptText('Player is O, Computer is X'); 
    setButtonActivation(false); 
    setTrainingMode(false) ;
  }

  function handleSubmit (event) {
    event.preventDefault();
    if (isAnInteger(event.target.elements[0].value)){
      setTrainingIterations(event.target.elements[0].value); 
      setPlayer('O');
      setOpponent('X');
      setPlayersTurn(false)
      setButtonActivation(false);
      setTrainingMode(true) ; 
    }
    else setSubmissionError("Please enter an integer")
  }

  function handleChange(event) {
    setValue(event.target.value);
  };

  function reset () {
    setPlayer(null);
    setOpponent(null);
    setPromptText('Player is O, Computer is X'); 
    setButtonActivation(true);
    //setTrainingMode(false); 
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
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={value} onChange={handleChange} />
        </label>
      <input type="submit" value="Submit" />
      </form>
      <p>{submissionError}</p> 
      </div>
      )
    }
  else return (
      <div>
      <BoardContainer trainingIterations = {trainingIterations} squares = {squares} setSquares = {setSquares} trainingMode = {trainingMode}  setTrainingMode = {setTrainingMode} gameLog = {gameLog} setGameLog = {setGameLog} database = {database} winner = {winner} setWinner = {setWinner} setPlayersTurn = {setPlayersTurn} playersTurn = {playersTurn} reset = {reset} player = {player} opponent = {opponent} setOpponent = {setOpponent}></BoardContainer>
      <Updater setOpponent = {setOpponent} player = {player} database = {database} setDatabase = {setDatabase} winner = {winner} gameLog = {gameLog} trainingIterations = {trainingIterations} setTrainingIterations = {setTrainingIterations} setWinner = {setWinner}  setGameLog = {setGameLog} setSquares = {setSquares} /> 
      </div>
  )
}
