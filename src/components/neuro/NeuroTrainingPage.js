import React from 'react';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react'; 


import BoardContainer from '../board/BoardContainer';
import GameEnd from '../gameEngine/GameEnd';
import GameLog from '../gameEngine/GameLog';
import Thinking from '../gameEngine/Thinking';
import NeuroUpdater from './NeuroUpdater';
import { IdFacts } from '../presentational/IdFacts';
import { TrainingIterationsField } from '../buttons/TrainingIterationsField';
import { NavigationButton } from '../buttons/NavigationButton';
import { PercentTrainingSetField } from '../buttons/PercentTrainingSetField';
import { LearningRateField } from '../buttons/learningRateField';
import { MaxCycleField } from '../buttons/maxCycleField';
import { SetSigmaField } from '../buttons/sigmaField';
import { StartNeuroLearningButton } from '../buttons/StartNeuroLearning';


export function NeuroTrainingPage (props) {
    const humansLetter = props.humansLetter;  
    const playersTurn = props.playersTurn; 
    const setPlayersTurn = props.setPlayersTurn; 
  
    const winner = props.winner; 
    const setWinner = props.setWinner;  
    const database = props.database;
    const setDatabase = props.setDatabase; 
    const isCalculatingWinner = props.isCalculatingWinner; 
    const setIsCalculatingWinner = props.setIsCalculatingWinner; 
  
    const gameLog = props.gameLog; 
    const setGameLog = props.setGameLog; 
    const trainingMode = props.trainingMode; 
    const setTrainingMode = props.setTrainingMode;
    const value = props.value; 
    const setValue = props.setValue; 
    const trainingIterations = props.trainingIterations; 
    const setTrainingIterations = props.setTrainingIterations
    const squares = props.squares; 
    const setSquares = props.setSquares; 
    const resigned = props.resigned; 
    const setResigned = props.setResigned; 
    const foe = props.foe; 
    const reset = props.reset; 
    const returnToGame = props.returnToGame; 

    const [percentTraining, setPercentTraining] = useState(0);
    const [learningRate, setLearningRate] = useState(1); 
    const [maxCycle, setMaxCycle] = useState(1); 
    const [sigma, setSigma] = useState(0.1)
    const [neuroLearning, setNeuroLearning] = useState(false); 

    const net = props.net; 
    const setNet = props.setNet;  

 
    return (
    <div className='page'> 
      <div className='gameshell'>
            <PercentTrainingSetField setPercentTraining = {setPercentTraining} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <LearningRateField setLearningRate = {setLearningRate} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <MaxCycleField setMaxCycle = {setMaxCycle} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <SetSigmaField setSigma = {setSigma} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <StartNeuroLearningButton setNeuroLearning = {setNeuroLearning}/>
            {trainingMode && <Button className = 'retro-button' onClick = {returnToGame}> Back To Game </Button> }
            
            
      </div>
      <div>
        <IdFacts name = {props.name} blurb = {props.blurb} src = {props.src} trainingMode = { trainingMode }/>
        <NeuroUpdater trainingMode = {trainingMode} devMode = {props.devMode}  database = {database} percentTraining = {percentTraining} db = {database} net = {net} setNet = {setNet} learningRate = {learningRate} maxCycle = {maxCycle} /> 
      </div>
    </div>  
    )

}