// This primarily handles the pre-game, wherein the player selects the piece they want to play, 
// and the learning algorithm, which triggers in reaction to the completion of a game. 

import React from 'react';
import { useState, useEffect } from 'react';
import BoardContainer from '../board/BoardContainer';
import GameEnd from './GameEnd';
import GameLog from './GameLog';
import Thinking from './Thinking';
import {db} from '../../auxiliary/boardStateDatabase/dataBeadsFormatted'
import { Button } from 'primereact/button';
import MenaceUpdater from '../menace/MenaceUpdater';
import { dataBaseDuplicator } from '../../auxiliary/general/usefulFunctions';
import { IdFacts } from '../presentational/IdFacts';
import { TrainingIterationsField } from '../buttons/TrainingIterationsField';
import { NavigationButton } from '../buttons/NavigationButton';
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
  // the following are arbitrary starting values for the net
  const connections1 = [
    [
      -0.9816088841335056,
      -0.5186528158460277,
      -0.8713539166300495,
      0.24414439638677887,
      -0.6314284148882017,
      0.3419840957665097,
      0.9009294623885564,
      -0.7258742928275692,
      -0.6359724130341693
    ],
    [
      -0.21722346915862834,
      0.3557420215719631,
      0.3789149491331627,
      -0.4695980408460534,
      0.9228689168191533,
      0.9672496093265361,
      -0.1592702012696654,
      0.8258132652305936,
      -0.4397867304678107
    ],
    [
      0.05257286905032088,
      -0.80569816475565,
      0.5342753365558122,
      0.4877349572117611,
      0.6297711333527571,
      0.09867589322714232,
      -0.6685700685221099,
      0.14295786719891934,
      -0.7428194559210712
    ],
    [
      -0.9770551017920674,
      -0.5477226299291276,
      -0.5587168136432505,
      -0.07590479128751748,
      -0.04178469354662773,
      -0.6744421441366066,
      -0.3398574489052961,
      0.6878611546149522,
      -0.9372250718808313
    ],
    [
      -0.6959701938397536,
      -0.3666524729052718,
      -0.12670649931718025,
      0.5990017315118381,
      0.6555367262100298,
      0.4833170273029528,
      0.7607648894545873,
      -0.9071468021113942,
      -0.23409124792628888
    ],
    [
      -0.9298962225893301,
      -0.01605426978388813,
      -0.884257417517101,
      -0.9928028786508412,
      -0.01777432627302722,
      -0.5851877746944376,
      -0.8383339772352087,
      -0.850663436866111,
      -0.10594627259399836
    ],
    [
      -0.37126091217929313,
      0.4102334119549109,
      -0.911242158851244,
      0.11694927052471948,
      0.4627595825550812,
      0.7500707065076282,
      -0.8986423790645455,
      0.21777473539110526,
      -0.23928505954540258
    ],
    [
      0.1887042909437311,
      0.6335111314828021,
      0.755747623094791,
      0.2242782682977289,
      0.08218657508588745,
      -0.30004701243496545,
      -0.16878951968546008,
      -0.5829122909762812,
      0.25861953568240703
    ],
    [
      0.5301305098937512,
      0.9433179717628482,
      -0.541548791888296,
      0.33249600445775584,
      -0.8261677188016481,
      -0.5923036862338731,
      0.9753603067685748,
      0.12683622742689682,
      0.8849501861461138
    ]
  ]
  const connections2 = [
    [
      0.3940039663285928,
      0.11517733772620331,
      0.6721897156833514,
      0.932201857221509,
      0.7003130785312821,
      -0.7388517831489887,
      -0.3381963615200332,
      -0.15230967215039293,
      0.47439638621746116
    ],
    [
      0.19703358445277908,
      0.9576448688713552,
      0.1136533584669297,
      -0.6931544989849967,
      -0.844058043249277,
      -0.3338235545165882,
      -0.4267752322387903,
      0.8903115822192575,
      0.5744275535763892
    ],
    [
      -0.3491105151769711,
      0.24721253881268979,
      0.9139227905479557,
      0.04844587719510085,
      -0.7285108982478692,
      -0.39293622155285024,
      0.5488691044096443,
      0.5180966305572219,
      0.3606271011513651
    ],
    [
      0.6793189552469994,
      -0.9332837805060565,
      0.5466124275280362,
      0.293669505282222,
      -0.9296138703371664,
      -0.9930492630082364,
      -0.1923636077817683,
      0.15147413898696227,
      -0.6860406763836524
    ],
    [
      0.3496924597687392,
      -0.6551776162242928,
      0.6369906022585357,
      0.5942831776371671,
      0.14586629649954785,
      -0.13048957571253594,
      0.9782959844386625,
      0.10721472035507018,
      -0.09101220333998117
    ],
    [
      0.6265347810740407,
      -0.39588062601679264,
      0.8393974003950189,
      -0.7983296650284497,
      0.8507131403700499,
      0.16296412852993591,
      0.6562686102321322,
      -0.7552492450598147,
      0.33336911251163426
    ],
    [
      -0.8741349109503096,
      0.7851436252642023,
      0.4582530502842157,
      0.6325162947651881,
      0.9855808644821407,
      -0.44898456110553675,
      -0.8753542830382222,
      -0.00503179158019762,
      -0.6583516178735338
    ],
    [
      -0.9980308154197759,
      0.7293399435190222,
      -0.005059645981711602,
      0.42153697867846085,
      -0.8086678027897809,
      0.4491336323921147,
      0.7543828837940503,
      -0.02854015834391066,
      0.9867339040314094
    ],
    [
      0.5720993968007662,
      -0.5560744449233541,
      0.6598314079523999,
      -0.5434431850977868,
      -0.3576243739581648,
      0.9904369920000047,
      0.5311497356691346,
      0.023317593528796365,
      0.49137472606075216
    ]
  ]
  const bias1 = [0.4, 0.2, 0.3, 0.1, 0, -0.2, -0.1, -0.2, 0]
  const bias2 = [0.4, 0.2, 0.3, 0.1, 0, -0.2, -0.1, -0.2, 1]
  const [net, setNet] = useState([connections1,connections2, bias1, bias2])

  
  
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
