// This primarily handles the pre-game, wherein the player selects the piece they want to play, 
// and the learning algorithm, which triggers in reaction to the completion of a game. 

import React from 'react';
import { useState, useEffect } from 'react';

import {db} from '../../auxiliary/boardStateDatabase/dataBeadsFormatted'

import { dataBaseDuplicator } from '../../auxiliary/general/usefulFunctions';
import { makeBiases, makeConnections } from '../neuro/netBuilders';
import { checkNetData } from '../../auxiliary/testers/errorCheckers';

import { ChooseSide } from './ChooseSide';
import  PlayPage  from './PlayPage';
import { MenaceTrainingPage } from '../menace/MenaceTrainingPage';
import { NeuroTrainingPage } from '../neuro/NeuroTrainingPage';



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
  const [squares, setSquares] = useState(Array(9).fill(null));           // create the board with 9 empty slots
  const [resigned, setResigned] = useState(null); 
  const foe = props.foe; 
  const setFoe = props.setFoe; 
  // the net is set at this level so as to be available both for the training page and for the game itself
  


  const [net, setNet] = useState(makeNetwork(3))

  function makeNetwork(size){
    let connectionArray = []; 
    let biasesArray = []; 
    for (let i = 0; i < size; i++){
      connectionArray.push(makeConnections());
      biasesArray.push(makeBiases());
    }
    return [...connectionArray,...biasesArray]; 
  }

  useEffect(
    () => {
      checkNetData(net, "useEffect net checker")
    },
    [net]
  )
   
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

  function handleTrainingModeClick (){
    setPlayersTurn(false)
    setButtonActivation(false); 
    setTrainingMode(true) ;
    setHumansLetter(' ') ; 
  }


  function reset () {
    setHumansLetter(null);
    setButtonActivation(true);
  }

function returnToGame(){
  setTrainingMode(false);
  setHumansLetter(null);
  setButtonActivation(true);
  // setFoe('menace'); 
}




 

 
  // if player is null, show the choose side options. Else display the game container. 
  if (humansLetter === null && !props.testMode){   
    return (
      <ChooseSide foe = {foe} promptText = {promptText} handleXClick = {handleXClick} handleOClick = {handleOClick} humansLetter = {humansLetter} buttonActivation = {buttonActivation} handleTrainingModeClick = {handleTrainingModeClick}/>
      )
    }
  else if (!trainingMode){
    return (
      <PlayPage
        net = {net} 
        setNet = {setNet} 
        humansLetter = {humansLetter}
        playersTurn = {playersTurn}
        setPlayersTurn = {setPlayersTurn}

        winner = {winner}
        setWinner = {setWinner}
        database = {database}
        setDatabase = {setDatabase}
        isCalculatingWinner = {isCalculatingWinner}
        setIsCalculatingWinner = {setIsCalculatingWinner}

        gameLog = {gameLog}
        setGameLog = {setGameLog}
        trainingMode = {trainingMode}
        setTrainingMode = {setTrainingMode}
        value = {value}
        setValue = {setValue}
        trainingIterations = {trainingIterations}
        setTrainingIterations = {setTrainingIterations}
        squares = {squares}
        setSquares = {setSquares}
        resigned = {resigned}
        setResigned = {setResigned}
        foe = {foe}
        setFoe = {props.setFoe}
        reset = {reset}
        returnToGame = {returnToGame} 
        name = {props.name} 
        blurb = {props.blurb} 
        src = {props.src}
      />    
    )
  }
  else if (foe === 'menace') return (
    <MenaceTrainingPage
        humansLetter = {humansLetter}
        playersTurn = {playersTurn}
        setPlayersTurn = {setPlayersTurn}

        winner = {winner}
        setWinner = {setWinner}
        database = {database}
        setDatabase = {setDatabase}
        isCalculatingWinner = {isCalculatingWinner}
        setIsCalculatingWinner = {setIsCalculatingWinner}

        gameLog = {gameLog}
        setGameLog = {setGameLog}
        trainingMode = {trainingMode}
        setTrainingMode = {setTrainingMode}
        value = {value}
        setValue = {setValue}
        trainingIterations = {trainingIterations}
        setTrainingIterations = {setTrainingIterations}
        squares = {squares}
        setSquares = {setSquares}
        resigned = {resigned}
        setResigned = {setResigned}
        foe = {foe}
        setFoe = {props.setFoe}
        reset = {reset}
        returnToGame = {returnToGame} 
        name = {props.name} 
        blurb = {props.blurb} 
        src = {props.src}
      />    
  )

  else if (foe === 'Neuro') return (
    <NeuroTrainingPage
        net = {net} 
        setNet = {setNet} 
        humansLetter = {humansLetter}

        database = {database}
        setDatabase = {setDatabase}

        trainingMode = {trainingMode}
        setTrainingMode = {setTrainingMode}
        value = {value}
        setValue = {setValue}
        
        squares = {squares}
        setSquares = {setSquares}
        
        reset = {reset}
        returnToGame = {returnToGame} 
        name = {props.name} 
        blurb = {props.blurb} 
        src = {props.src}
      />    
  )
}
