// This primarily handles the pre-game, wherein the player selects the piece they want to play, 
// and the learning algorithm, which triggers in reaction to the completion of a game. 

import React from 'react';
import { useState, useEffect } from 'react';

import {db} from '../../auxiliary/boardStateDatabase/dataBeadsFormatted'

import { dataBaseDuplicator } from '../../auxiliary/general/usefulFunctions';
import { makeBiases, makeConnections, makeNetwork } from '../neuro/netBuilders';
import { checkNetData } from '../../auxiliary/testers/errorCheckers';

import { ChooseSide } from './ChooseSide';
import  PlayPage  from './PlayPage';
import MenaceUpdater from '../menace/MenaceUpdater';
import { NeuroTrainingPage } from '../neuro/NeuroTrainingPage';
import { EvolvoTrainingPage } from '../evolvo/evolvoTrainingPage';
import SoundComponent from '../presentational/soundFX/SoundFX';



export default function GameShell( props ) {
  //console.log("db[0] is ", db[0])
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
  const [soundEffect, setSoundEffect] = useState(""); 
  const [whoWon, setWhoWon] = useState(null) 
  const foe = props.foe; 
  const setFoe = props.setFoe; 
  // the net is set at this level so as to be available both for the training page and for the game itself
  
  useEffect(()=>{
    console.log("start of gameShell, soundEffect is ", props.soundEffect)
}, [])

  const [net, setNet] = useState(makeNetwork([27,32,36,3]))


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
      //else console.log("GameShell cleared on first render")
    }, [])
  }
  checkGameShell()

  function handleXClick () {
    setHumansLetter('X');
    setPlayersTurn(true); 
    setButtonActivation(false);
    setTrainingMode(false) ;
    setWhoWon(null)
  }
  function handleOClick () {
    setHumansLetter('O');
    setPlayersTurn(false)
    setButtonActivation(false); 
    setTrainingMode(false) ;
    setWhoWon(null)
  }

  function handleTrainingModeClick (){
    setSquares(Array(9).fill(null))
    setWinner(null); 
    setPlayersTurn(false)
    setButtonActivation(false); 
    setTrainingMode(true) ;
    setHumansLetter(' ') ; 
  }


  function reset () {
    setHumansLetter(null);
    setButtonActivation(true);
    setWhoWon(null);
  }

function returnToGame(){
  setTrainingMode(false);
  setHumansLetter(null);
  setButtonActivation(true);
  // setFoe('menace'); 
}

// function startTraining(){
//   setWinner(null); 
//   setPlayersTurn(false);
//   setHumansLetter(' ') ;
//   setWhoWon(null);  
//   setTrainingMode(true) ;
// }



 

 
  // if player is null, show the choose side options. Else display the game container. 
  if (humansLetter === null && !props.testMode){   
    return (
      <ChooseSide foe = {foe} promptText = {promptText} handleXClick = {handleXClick} handleOClick = {handleOClick} humansLetter = {humansLetter} buttonActivation = {buttonActivation} handleTrainingModeClick = {handleTrainingModeClick}/>
      )
    }
  else if (!trainingMode){
    return (
      <PlayPage
      handleTrainingModeClick = {handleTrainingModeClick}
      setWhoWon = {setWhoWon}
      whoWon = {whoWon}

      setSoundEffect = {setSoundEffect}
      soundEffect = {soundEffect}

        net = {net} 
        setNet = {setNet} 
        humansLetter = {humansLetter}
        setHumansLetter = {setHumansLetter}
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
        playStyle = {props.playStyle}
        blurb = {props.blurb} 
        src = {props.src}
      />    
    )
  }
  else if (foe === 'menace') return (
    <div> 
    <MenaceUpdater
        setSoundEffect = {setSoundEffect}
        soundEffect = {soundEffect}

        humansLetter = {humansLetter}
        playersTurn = {playersTurn}
        setPlayersTurn = {setPlayersTurn}
        setWhoWon = {setWhoWon}
        
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
        playStyle = {props.playStyle}
        blurb = {props.blurb} 
        src = {props.src}
        trainingSound = {props.trainingSound}
      />  
      </div>   
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
        playStyle = {props.playStyle}
        blurb = {props.blurb} 
        src = {props.src}
      />   
  )
  else if (foe === 'evolvo') return (
    <div> 
    <EvolvoTrainingPage
        setSoundEffect = {setSoundEffect}

        soundEffect = {soundEffect}
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
        playStyle = {props.playStyle}
        blurb = {props.blurb} 
        src = {props.src}
        trainingSound = {props.trainingSound}
      />  
      </div>   
  )
}
