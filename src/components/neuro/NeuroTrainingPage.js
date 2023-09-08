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
import { generateGoodBoardStates } from '../../auxiliary/boardStateDatabase/makeBeadAuxilliaries';
import NeuroComparison from '../presentational/neuroComparison';


export function NeuroTrainingPage (props) {
      
    const database = props.database;
    
  
    
    const trainingMode = props.trainingMode; 
    const value = props.value; 
    const setValue = props.setValue; 
    const returnToGame = props.returnToGame; 

    const [percentTraining, setPercentTraining] = useState(20);
    const [learningRate, setLearningRate] = useState(0.001); 
    const [maxCycle, setMaxCycle] = useState(2); 
    const [sigma, setSigma] = useState(0.1)
    const [neuroLearning, setNeuroLearning] = useState(false); 
    const [trainingSet, setTrainingSet] = useState([[null, null, null, null, null, null, null, null, null]]); 

    const net = props.net; 
    const setNet = props.setNet;  

    useEffect(getTrainingSet, [neuroLearning]) // the change in this should trigger the useEffect in NeuroUpdater.js

    function getTrainingSet(){
      const fraction = percentTraining/100; 
      const goodStates = generateGoodBoardStates(9);
      let trainingSet = [goodStates[0]]; 
      for (let i = 1; i < goodStates.length; i++){
          const rando = Math.random(); 
          if (rando < fraction) {
              trainingSet.push(goodStates[i]); 
          }
      }
      setTrainingSet(trainingSet)
      //return trainingSet; 
      }

 
    return (
    <div className='page'> 
      <div className='gameshell'>
            <PercentTrainingSetField setPercentTraining = {setPercentTraining} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <LearningRateField setLearningRate = {setLearningRate} learningRate = {learningRate} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <MaxCycleField setMaxCycle = {setMaxCycle} maxCycle = {maxCycle} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <SetSigmaField setSigma = {setSigma} sigma = {sigma} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <StartNeuroLearningButton getTrainingSet = {getTrainingSet} setNeuroLearning = {setNeuroLearning}/>
            {trainingMode && <Button className = 'retro-button' onClick = {returnToGame}> Back To Game </Button> }
            
            
      </div>
      <div>
        <NeuroUpdater trainingSet = {trainingSet} trainingMode = {trainingMode} devMode = {props.devMode}  database = {database} percentTraining = {percentTraining} db = {database} net = {net} setNet = {setNet} learningRate = {learningRate} maxCycle = {maxCycle} sigma = {sigma} neuroLearning = {neuroLearning} setNeuroLearning = {setNeuroLearning}/> 
        <NeuroComparison trainingStates = {trainingSet} net = {net}/>
      </div>
    </div>  
    )

}