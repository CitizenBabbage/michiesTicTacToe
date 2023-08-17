// This primarily handles the pre-game, wherein the player selects the piece they want to play, 
// and the learning algorithm, which triggers in reaction to the completion of a game. 

import React from 'react';
import { useState, useEffect } from 'react';
import BoardContainer from './BoardContainer';
import {db} from '../auxiliary/databaseFormatted' //assert { type: "json" };
import { Button } from 'primereact/button';
import Updater from './Updater';
import { isAnInteger, dataBaseDuplicator } from '../auxiliary/usefulFunctions';
import { checkDbase } from '../auxiliary/errorCheckers';




export default function GameShell( props ) {

  const [letterToPlay, setletterToPlay] = useState( null ); 
  const [opponent, setOpponent] = useState( null ); 
  const [promptText, setPromptText ] = useState( `Choose side, X or O` ); 
  const [buttonActivation, setButtonActivation] = useState( true ); 
  const [playersTurn, setPlayersTurn] = useState(  ); 
  const [winner, setWinner] = useState(); 
  const [database,setDatabase] = useState(dataBaseDuplicator(db));                     // this is the main database that is updated as learning progresses
  //const [database,setDatabase] = useState(db);                     // this is the main database that is updated as learning progresses

  const [gameLog, setGameLog] = useState([]);
  const [trainingMode, setTrainingMode] = useState(); 
  const [value, setValue] = useState("");
  const [trainingIterations, setTrainingIterations] = useState(0); 
  const [submissionError, setSubmissionError] = useState(""); 
  const [squares, setSquares] = useState(Array(9).fill(null));           // create the board with 9 empty slots
  const foe = props.foe; 
  checkDbase(db, "GameShell---db")
  checkDbase(database, "GameShell---database")
  
  function checkGameShell(){
    useEffect(() => {
      let dbResponse = JSON.stringify(db[0].response)
      let databaseResponse = JSON.stringify(database[0].response)
      if (dbResponse !== databaseResponse){
        throw new Error(`GameShell: db[0].response is ${dbResponse} but database[0].response is ${databaseResponse}`)
      }
      else console.log("GameShell cleared on first render")
    }, [])
  }
  checkGameShell()

  function handleXClick () {
    console.log("X selected!")
    setletterToPlay('X');
    console.log("setletterToPlay as X completed")
    setOpponent('O');  
    console.log("setOpponent as O completed")
    setPlayersTurn(true); 
    console.log("setPlayersTurn as true completed")
    setPromptText('Player is X, Computer is O'); 
    console.log("setPromptText completed")
    setButtonActivation(false);
    console.log("setButtonActivation as false completed")
    setTrainingMode(false) ;
    console.log("setTrainingMode as false completed")
  }
  function handleOClick () {
    setletterToPlay('O');
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
      setletterToPlay('O'); //not sure which way round these two should be
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
    setletterToPlay(null);
    setOpponent(null);
    //setPromptText('Player is O, Computer is X'); 
    setButtonActivation(true);
    //setTrainingMode(false); 
  }




 

 
  checkDbase(database, "2. GameShell---database")
  // if player is null, show the choose side options. Else display the game container. 
  if (letterToPlay === null){
    return (
      <div className="app"> 
      <p>{ promptText }</p>
      <Button 
        disabled = { !buttonActivation } 
        onClick = { handleXClick }
        className={`player-button ${letterToPlay === 'X' ? 'active' : ''}`}>
        X
      </Button>
      <Button 
        disabled = { !buttonActivation }
        onClick = { handleOClick }
        className={`player-button ${letterToPlay === 'O' ? 'active' : ''}`}>
        O
      </Button>
      <form onSubmit={handleSubmit}>
        <label>
          Training Iterations:
          <input type="number" value={value} onChange={handleChange} />
        </label>
      <input type="submit" value="Submit" />
      </form>
      <p>{submissionError}</p> 
      </div>
      )
    }
  else return (
      <div>
      <BoardContainer trainingIterations = {trainingIterations} devMode = {props.devMode} setFoe = { props.setFoe } foe = {foe} trainingIterations = {trainingIterations} squares = {squares} setSquares = {setSquares} trainingMode = {trainingMode}  setTrainingMode = {setTrainingMode} gameLog = {gameLog} setGameLog = {setGameLog} database = {database} winner = {winner} setWinner = {setWinner} setPlayersTurn = {setPlayersTurn} playersTurn = {playersTurn} reset = {reset} ></BoardContainer>
      <Updater trainingMode = {trainingMode} devMode = {props.devMode}  database = {database} setDatabase = {setDatabase} winner = {winner} gameLog = {gameLog} trainingIterations = {trainingIterations} setTrainingIterations = {setTrainingIterations} setWinner = {setWinner}  setGameLog = {setGameLog} setSquares = {setSquares} /> 
      </div>
  )
}
