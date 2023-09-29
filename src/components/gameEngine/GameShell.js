// This primarily handles the pre-game, wherein the player selects the piece they want to play, 
// and the learning algorithm, which triggers in reaction to the completion of a game. 
// But because this is the most immediate parent of both play and training elements, values 
// that need to be defined for both are defined here. 

import React from 'react';
import { useState, useEffect } from 'react';

import {db} from '../../auxiliary/boardStateDatabase/dataBeadsFormatted.js'

import { dataBaseDuplicator } from '../../auxiliary/general/usefulFunctions.js';
import { makeNetwork } from '../neuro/netBuilders.js'; // 
import createGenepool from '../../auxiliary/geneticAlgo/createGenepool.js'
import { ChooseSide } from './ChooseSide.js';
import  PlayPage  from './PlayPage.js';
import MenaceUpdater from '../menace/MenaceUpdater.js';
import { NeuroTrainingPage } from '../neuro/NeuroTrainingPage.js';
import { EvolvoUpdater } from '../evolvo/evolvoUpdater.js';
import SoundComponent from '../presentational/sound/SoundFX.js';
import { createModel } from '../neuro/neuroTFmodel/model.js';
import { NameManager } from '../../auxiliary/geneticAlgo/nameManager.js';


export default function GameShell( props ) {
  const [humansLetter, setHumansLetter] = useState( null ); 
  const [promptText, setPromptText ] = useState( `Choose side, X or O` ); 
  const [buttonActivation, setButtonActivation] = useState( true ); 

  const [winner, setWinner] = useState(); 
  const [database,setDatabase] = useState(dataBaseDuplicator(db));                     // this is the main database that is updated as learning progresses
  const [isCalculatingWinner, setIsCalculatingWinner] = useState(false); 
  const [computerOff, setComputerOff] = useState(true); 
  const [gameLog, setGameLog] = useState([Array(9).fill(null)]);
  const [trainingMode, setTrainingMode] = useState(); 
  const [value, setValue] = useState("");
  const [trainingIterations, setTrainingIterations] = useState(0); 
  const [squares, setSquares] = useState(Array(9).fill(null));           // create the board with 9 empty slots
  const [resigned, setResigned] = useState(null); // takes X or O as value
  const [soundEffect, setSoundEffect] = useState(""); 
  const [whoWon, setWhoWon] = useState(null)  // used for NL report 
  const [generations, setGenerations] = useState(0); 
  const [controllingGenome, setControllingGenome] = useState(); 
  const foe = props.foe; 
  const setFoe = props.setFoe; 

  const [nameManager, setNameManager] = useState();
  const [genepool, setGenepool] = useState();

  const [ranking, setRanking] = useState(() => {
    const [gp, nm] = createGenepool(100, 26); 
    setNameManager(nm); 
    setGenepool(gp)
    return gp;
  });
  
   
  // the net is set at this level so as to be available both for the training page and for the game itself
  //const [net, setNet] = useState(makeNetwork([27,32,36,5])) //
  const [net, setNet] = useState(createModel([128, 64]));

  


  useEffect(()=>{
    console.log("start of gameShell, soundEffect is ", props.soundEffect)
  }, [])

  //decides which of human vs computer was the winner
  useEffect(() => {
    if (winner) setWhoWon(winner === humansLetter? "human": ['X','O'].includes(winner)? "computer": "draw")
    console.log("setWhoWon has been triggered")
},[winner])



  function handleXClick () {
    setHumansLetter('X');
    setComputerOff(true); 
    setButtonActivation(false);
    setTrainingMode(false) ;
    setWhoWon(null)
  }
  function handleOClick () {
    setHumansLetter('O');
    setComputerOff(false)
    setButtonActivation(false); 
    setTrainingMode(false) ;
    setWhoWon(null)
  }

  function handleTrainingModeClick (){
    console.log("handleTrainingModeClick... responds")
    setSquares(Array(9).fill(null))
    setWinner(null); 
    setComputerOff(false)
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

 
  // if player is null, show the choose side options. Else display the game container. 
  if (humansLetter === null){   
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
      setComputerOff = {setComputerOff}
      computerOff = {computerOff}

      setSoundEffect = {setSoundEffect}
      soundEffect = {soundEffect}

        net = {net} 
        setNet = {setNet} 
        humansLetter = {humansLetter}
        setHumansLetter = {setHumansLetter}
        xsTurn={props.xsTurn} 
        setXsTurn={props.setXsTurn}

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

        ranking = {ranking}
        controllingGenome = {controllingGenome}
        setControllingGenome = {setControllingGenome}
      />    
    )
  }
  else if (foe === 'menace') return (
    <div> 
    <MenaceUpdater
        setSoundEffect = {setSoundEffect}
        soundEffect = {soundEffect}

        humansLetter = {humansLetter}
        xsTurn={props.xsTurn} 
        setXsTurn={props.setXsTurn}
        setWhoWon = {setWhoWon}

        setComputerOff = {setComputerOff}
        computerOff = {computerOff}
        
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
    <EvolvoUpdater
        setSoundEffect = {setSoundEffect}

        soundEffect = {soundEffect}
        humansLetter = {humansLetter}
        xsTurn={props.xsTurn} 
        setXsTurn={props.setXsTurn}

        winner = {winner}
        setWinner = {setWinner}
        database = {database}
        setDatabase = {setDatabase}
        isCalculatingWinner = {isCalculatingWinner}
        setIsCalculatingWinner = {setIsCalculatingWinner}


        generations = {generations} 
        setGenerations = {setGenerations} 
        genepool = {genepool} 
        setGenepool = {setGenepool}
        ranking = {ranking}
        setRanking = {setRanking}

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
