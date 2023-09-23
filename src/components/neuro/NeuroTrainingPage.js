import React from 'react';
// import { Button } from 'primereact/button';
import { useEffect, useState } from 'react'; 



//import NeuroUpdater from './neuroOrdinaryJSarchive/NeuroUpdater.js';

import { PercentTrainingSetField } from '../buttons/PercentTrainingSetField.js';
import { LearningRateField } from '../buttons/learningRateField.js';
import { MaxCycleField } from '../buttons/maxCycleField.js';
import { SetSigmaField } from '../buttons/sigmaField.js';
import { StartNeuroLearningButton } from '../buttons/StartNeuroLearning.js';
import { generateGoodBoardStates } from '../../auxiliary/boardStateDatabase/makeBeadAuxilliaries.js';
import { DownloadError } from '../errorHandling/DownloadError.js';
import { dataFeeder } from './neuroTFmodel/datafeeder.js';
import NeuroComparison from '../presentational/neuroComparison.js'

//import { getTrainingSet } from './debuggingData/dummyInputs'; //DELETE AFTER DEBUGGING

export function NeuroTrainingPage (props) {
      
    const database = props.database;
    
  
    
    const trainingMode = props.trainingMode; 
    const value = props.value; 
    const setValue = props.setValue; 
    const returnToGame = props.returnToGame; 

    const [percentTraining, setPercentTraining] = useState(20);
    const [learningRate, setLearningRate] = useState(0.0001); 
    const [maxCycle, setMaxCycle] = useState(2); 
    const [sigma, setSigma] = useState(0.1)
    const [neuroLearning, setNeuroLearning] = useState(false); 
    const [trainingSet, setTrainingSet] = useState([]); 

    const net = props.net; 
    const setNet = props.setNet;  


    // useEffect(() => {
    //   const x = getTrainingSet(); 
    //   setTrainingSet(x); 
    // }, [neuroLearning]) // the change in this should trigger the useEffect in NeuroUpdater.js

    useEffect(() => {
      const trainAndSetNet = async () => {
          const dataset = getTrainingSet();
          if (!dataset) return;
          setTrainingSet(dataset); 
          const trainedModel = await dataFeeder(dataset, net);
          setNet(trainedModel);
      };
      
      trainAndSetNet();
  }, [neuroLearning]);

    

    function getTrainingSet(){
      if (!neuroLearning) return; 
      const fraction = percentTraining/100; 
      const goodStates = generateGoodBoardStates(9);
      let newTrainingSet = [goodStates[0]]; 
      for (let i = 1; i < goodStates.length; i++){
          const rando = Math.random(); 
          if (rando < fraction) {
            newTrainingSet.push(goodStates[i]); 
          }
      }
      return newTrainingSet; 
      }

      

    

 
    return (
    <div className='page'> 
      <div className='gameshell'>
            <PercentTrainingSetField setPercentTraining = {setPercentTraining} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <LearningRateField setLearningRate = {setLearningRate} learningRate = {learningRate} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <MaxCycleField setMaxCycle = {setMaxCycle} maxCycle = {maxCycle} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <SetSigmaField setSigma = {setSigma} sigma = {sigma} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <StartNeuroLearningButton getTrainingSet = {getTrainingSet} setNeuroLearning = {setNeuroLearning}/>
            {trainingMode && <button className = 'retro-button' onClick = {returnToGame}> Back To Game </button> }
            
            
      </div>
      <div>
        <DownloadError net = {net} trainingSet = {trainingSet}>
          {/* <NeuroUpdater trainingSet = {trainingSet} trainingMode = {trainingMode} devMode = {props.devMode}  database = {database} percentTraining = {percentTraining} db = {database} net = {net} setNet = {setNet} learningRate = {learningRate} maxCycle = {maxCycle} sigma = {sigma} neuroLearning = {neuroLearning} setNeuroLearning = {setNeuroLearning}/>  */}
          <NeuroComparison trainingStates = {trainingSet} net = {net}/>
        </DownloadError>
      </div>
    </div>  
    )

}