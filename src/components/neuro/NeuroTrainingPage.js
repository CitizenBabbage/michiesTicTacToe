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
import { IdFacts } from '../presentational/IdFacts.js';

import shakinghead from '../../images/shakingHead.gif'
import neuroPortrait from '../../images/chosen/neuro3.gif'


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
    const [portrait, setPortrait] = useState(neuroPortrait); 

    const net = props.net; 
    const setNet = props.setNet;  
    const setBusy = props.setBusy;
    const busy = props.busy;
    const hourglassActive = props.hourglassActive



    useEffect(()=>{
      setPortrait(busy? shakinghead : neuroPortrait);
    },[busy])



    // this just sets the cursor to hourglass and prevents buttons switching. 
    useEffect(()=>{
      console.log(`neurolearning is ${neuroLearning}, busy is ${busy} but setting busy to true...`)
      if (neuroLearning) {
        setBusy(true); //
      }
    },[neuroLearning])

    // once the cursor is inhibited, learning can begin...
    useEffect(() => {
      console.log("hourglassActive is ", busy)
      let isMounted = true; // Flag to track mount status
  
      const trainAndSetNet = async () => {
        if (busy){
          console.log("starting train and set net")
          
          const dataset = getTrainingSet();
          if (!dataset) return;

          setTrainingSet(dataset); 

          const trainedModel = await dataFeeder(dataset, net);
          setBusy(false); 
          if (isMounted) { // if the component is still mounted...
              setNet(trainedModel); // update. 
              setNeuroLearning(false); 
          }
      };
    }; 
    setTimeout(() => {
      trainAndSetNet(); 
    }, 1000);
      
  
      return () => {
          isMounted = false; // Set to false when component unmounts
      };
  }, [busy]); //  
  
  
  
  
  
    
  // this just selects a percentage (percentTraining, or fraction) of all the board states to use as a training set. 
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
            <IdFacts name = {props.name} playStyle = {props.playStyle} blurb = {props.blurb} src = {portrait} trainingMode = { trainingMode }/>

            <PercentTrainingSetField setPercentTraining = {setPercentTraining} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <LearningRateField setLearningRate = {setLearningRate} learningRate = {learningRate} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <MaxCycleField setMaxCycle = {setMaxCycle} maxCycle = {maxCycle} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <SetSigmaField setSigma = {setSigma} sigma = {sigma} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            <StartNeuroLearningButton getTrainingSet = {getTrainingSet} setNeuroLearning = {setNeuroLearning}/>
            {trainingMode && <button className = 'retro-button' onClick = {returnToGame}> Game </button> }
            
            
      </div>
      <div>
        <DownloadError net = {net} trainingSet = {trainingSet}>
          {/* <NeuroUpdater trainingSet = {trainingSet} trainingMode = {trainingMode} devMode = {props.devMode}  database = {database} percentTraining = {percentTraining} db = {database} net = {net} setNet = {setNet} learningRate = {learningRate} maxCycle = {maxCycle} sigma = {sigma} neuroLearning = {neuroLearning} setNeuroLearning = {setNeuroLearning}/>  */}
          <NeuroComparison neuroMinimaxBoardText = {props.neuroMinimaxBoardText} neuroPredictionsBoardText = {props.neuroPredictionsBoardText} challengeBoardText = {props.challengeBoardText} trainingStates = {trainingSet} net = {net}/>
        </DownloadError>
      </div>
    </div>  
    )

}