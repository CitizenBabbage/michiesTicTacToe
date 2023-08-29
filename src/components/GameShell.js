// This primarily handles the pre-game, wherein the player selects the piece they want to play, 
// and the learning algorithm, which triggers in reaction to the completion of a game. 

import React from 'react';
import { useState, useEffect } from 'react';
import BoardContainer from './BoardContainer';
import GameEnd from './GameEnd';
import GameLog from './GameLog';
import Thinking from './Thinking';
import {db} from '../auxiliary/boardStateDatabase/dataBeadsFormatted'
import { Button } from 'primereact/button';
import Updater from './Updater';
import { isAnInteger, dataBaseDuplicator } from '../auxiliary/general/usefulFunctions';



export default function GameShell( props ) {
  console.log("db[0] is ", db[0])
  const [humansLetter, setHumansLetter] = useState( null ); 
  //const [opponent, setOpponent] = useState( null ); 
  const [promptText, setPromptText ] = useState( `Choose side, X or O` ); 
  const [buttonActivation, setButtonActivation] = useState( true ); 
  const playersTurn = props.playersTurn; 
  const setPlayersTurn = props.setPlayersTurn; 

  const [winner, setWinner] = useState(); 
  const [database,setDatabase] = useState(dataBaseDuplicator(db));                     // this is the main database that is updated as learning progresses
  const [isCalculatingWinner, setIsCalculatingWinner] = useState(false); 

  const [gameLog, setGameLog] = useState([Array(9).fill(null)]);
  const [trainingMode, setTrainingMode] = useState(); 
  const [value, setValue] = useState("");
  const [trainingIterations, setTrainingIterations] = useState(0); 
  const [submissionError, setSubmissionError] = useState(""); 
  const [squares, setSquares] = useState(Array(9).fill(null));           // create the board with 9 empty slots
  const [resigned, setResigned] = useState(null); 
  const foe = props.foe; 
  
  
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
    setHumansLetter('X');
    setPlayersTurn(true); 
    setButtonActivation(false);
    setTrainingMode(false) ;
  }
  function handleOClick () {
    setHumansLetter('O');
    setPlayersTurn(false)
    setButtonActivation(false); 
    setTrainingMode(false) ;
  }

  function handleSubmit (event) {
    event.preventDefault();
    if (isAnInteger(event.target.elements[0].value)){
      setTrainingIterations(event.target.elements[0].value); 
      setHumansLetter('O'); 
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
    setHumansLetter(null);
    setButtonActivation(true);
  }




 

 
  // if player is null, show the choose side options. Else display the game container. 
  if (humansLetter === null && !props.testMode){   //CHANGE HERE
    return (
      <div className="gameshell"> 
      <p>{ promptText }</p>
      <Button 
        disabled = { !buttonActivation } 
        onClick = { handleXClick }
        className={`player-button ${humansLetter === 'X' ? 'active' : ''}`}>
        X
      </Button>
      <Button 
        disabled = { !buttonActivation }
        onClick = { handleOClick }
        className={`player-button ${humansLetter === 'O' ? 'active' : ''}`}>
        O
      </Button>
        <div>
        {foe === "menace" && (
          <form onSubmit={handleSubmit}>
            <label>
              Training Iterations:
              <input type="number" value={value} onChange={handleChange} />
            </label>
          <input type="submit" value="Submit" />
          </form>
        )}
        </div>
      </div>
      )
    }
  else return (
      <div className='gameshell'>
      <BoardContainer devMode = {props.devMode} testMode = { props.testMode} computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } setFoe = { props.setFoe } foe = {foe} trainingIterations = {trainingIterations} setResigned = {setResigned} humansLetter = {humansLetter} squares = {squares} setSquares = {setSquares} trainingMode = {trainingMode}  setTrainingMode = {setTrainingMode} gameLog = {gameLog} setGameLog = {setGameLog} database = {database} winner = {winner} setWinner = {setWinner} setPlayersTurn = {setPlayersTurn} playersTurn = {playersTurn} reset = {reset} ></BoardContainer>
      <p>{submissionError} </p>
      <Updater trainingMode = {trainingMode} devMode = {props.devMode}  database = {database} setDatabase = {setDatabase} winner = {winner} gameLog = {gameLog} trainingIterations = {trainingIterations} setTrainingIterations = {setTrainingIterations} setWinner = {setWinner}  setGameLog = {setGameLog} setSquares = {setSquares} /> 
      <Thinking devMode = {props.devMode} testMode = { props.testMode } computerOff = { props.computerOff } setComputerOff = { props.setComputerOff } trainingIterations = {trainingIterations} setSquares = {setSquares} setFoe = { props.setFoe } foe = {props.foe} database = {database} trainingMode = {trainingMode} setTrainingMode = {setTrainingMode} playersTurn = { playersTurn } setPlayersTurn = {setPlayersTurn} setIsCalculatingWinner = { setIsCalculatingWinner } isCalculatingWinner = {isCalculatingWinner} opponent ={ props.opponent } setOpponent = { props.setOpponent } squares = { squares }  winner = { winner }/>   
      <GameLog devMode = {props.devMode} trainingMode = {trainingMode} winner = {winner} gameLog = {gameLog} setGameLog = {setGameLog} squares = {squares}/> 
      <GameEnd devMode = {props.devMode} resigned = { resigned } isCalculatingWinner = {isCalculatingWinner} setIsCalculatingWinner = {setIsCalculatingWinner} squares = {squares} winner = {winner} setWinner = {setWinner} playersTurn = { playersTurn }/>
      </div>
  )
}
