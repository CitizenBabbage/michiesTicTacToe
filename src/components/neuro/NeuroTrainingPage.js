import React from 'react';
// import { Button } from 'primereact/button';
import { useRef, useEffect, useState } from 'react'; 




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
import { labelPrepper } from './neuroTFmodel/labelPrepper.js';
import { GetTrainingSet } from './GetTrainingSet.js';


import shakinghead from '../../images/shakingHead.gif'
import neuroPortrait from '../../images/chosen/neuro3.gif'
import { evaluateModel } from './neuroTFmodel/evaluateModel.js';


//import { getTrainingSet } from './debuggingData/dummyInputs'; //DELETE AFTER DEBUGGING

export function NeuroTrainingPage (props) {
      
    const database = props.database;
    
  
    
    const trainingMode = props.trainingMode; 
    const value = props.value; // get rid? 
    const setValue = props.setValue; // get rid? 
    const returnToGame = props.returnToGame; 

    const [percentTraining, setPercentTraining] = useState(20);
    const [learningRate, setLearningRate] = useState(0.0001); 
    const [maxCycle, setMaxCycle] = useState(2); 
    const [sigma, setSigma] = useState(0.1)
    const [neuroLearning, setNeuroLearning] = useState(false); 
    const [portrait, setPortrait] = useState(neuroPortrait); 
    const [trainingSet, setTrainingSet] = useState(); 
    const [validationSet, setValidationSet] = useState(); 
    const [validationLabels, setValidationLabels] = useState();

    const [labels, setLabels] = useState(); 
    const [accuracy, setAccuracy] = useState(0); 
    const [validity, setValidity] = useState(0); 
    const [epochsRemaining, setEpochsRemaining] = useState(0); 
    const [cycleToggle, setCycleToggle] = useState(true); // toggling this restarts the next epoch

    const epochsLastValue = useRef(0); 

    const net = props.net; 
    const setNet = props.setNet;  
    const setBusy = props.setBusy;
    const busy = props.busy;


    // for debugging only. remove. 
    useEffect(()=>{
      if (validationSet) console.log("validationSet is set. Length is : ", validationSet.length)

      else console.log("validationSet has changed but is undefined!")
    },[validationSet])





    useEffect(()=>{
      console.log("epochsRemaining is : ", epochsRemaining)
    },[epochsRemaining])


    useEffect(()=>{
      if (trainingSet && !labels) setLabels(labelPrepper(trainingSet))
    },[trainingSet])


    useEffect(()=>{
      setPortrait(busy? shakinghead : neuroPortrait);
    },[busy])


    // this just sets the cursor to hourglass and prevents buttons switching. 
    useEffect(()=>{
      if (epochsRemaining > 0) {
        setBusy(true); //
        if (!trainingSet) {
          console.log("training set not set. Canceling while we wait for that...")
          return; 
        }
        setCycleToggle(prevValue => !prevValue); 
      }
      // else {
      //   // setBusy(false); // get rid of this when validate is defined
      // };
    },[epochsRemaining, trainingSet])


    useEffect(() => {
      async function checkForValidation(){
        if (epochsRemaining === epochsLastValue.current - 1){// if epochs have just decremented...
          if (epochsRemaining === 0){ /// ... to zero
            setValidity(await validate()); 
          }
        }
      }
      console.log("epochsRemaining has changed...")
      console.log(`epochsRemaining is ${epochsRemaining}; epochsLastValue is ${epochsLastValue.current}`)
      checkForValidation()
      epochsLastValue.current = epochsRemaining; 
    },[epochsRemaining])


    useEffect(()=>{
      console.log("Validity has changed. Unbusying...")
      setBusy(false); 
    },[validity])


    // 
    useEffect(() => {
      let isMounted = true; // Flag to track mount status
      const trainAndSetNet = async () => {
        if (busy){
          console.log("train and set net, epochsRemaining = ", epochsRemaining)
          
          // const dataset = getTrainingSet();
          if (!net || !trainingSet || !labels) return; // set busy to false? 

          // setTrainingSet(dataset); 
          // if (!labels) setLabels(labelPrepper(dataset)); // gets the correct minimax scores for the training set
          const trainedModel = await dataFeeder(net, trainingSet, labels); // dataFeeder returns a pair [newModel, accuracy] 
          if (isMounted) { // if the component is still mounted...
              setNet(trainedModel[0]); // update. 
              setNeuroLearning(false); 
              setAccuracy(trainedModel[1])
              setEpochsRemaining(prevValue => prevValue -1); 
          }
      };
    }; 
    setTimeout(() => {
      trainAndSetNet(); 
    }, 1000);
    

    return () => {
        isMounted = false; // Set to false when component unmounts
    };
  }, [cycleToggle]); //  


  async function validate(){
    const x = await evaluateModel(net, validationSet, validationLabels); 
    if (busy) setBusy(false); 
    return x; 
  }
  
  
  
  
  
    
  

      
      
    

 
    return (
    <div className='page'> 
      <div className='gameshell'>
            <IdFacts name = {props.name} playStyle = {props.playStyle} blurb = {props.blurb} src = {portrait} trainingMode = { trainingMode }/>

            {/* <PercentTrainingSetField setPercentTraining = {setPercentTraining} trainingMode = { trainingMode } value = {value} setValue = {setValue}/> */}
            {/* <LearningRateField setLearningRate = {setLearningRate} learningRate = {learningRate} trainingMode = { trainingMode } value = {value} setValue = {setValue}/> */}
            <MaxCycleField className='text-field' trainingSet = {trainingSet} epochsRemaining = {epochsRemaining} setEpochsRemaining = {setEpochsRemaining} maxCycle = {maxCycle} trainingMode = { trainingMode } value = {value} setValue = {setValue}/>
            {/* <SetSigmaField setSigma = {setSigma} sigma = {sigma} trainingMode = { trainingMode } value = {value} setValue = {setValue}/> */}
            {/* <StartNeuroLearningButton setEpochsRemaining = {setEpochsRemaining} trainingSet = {trainingSet} setTrainingSet = {setTrainingSet} setNeuroLearning = {setNeuroLearning}/> */}
            {trainingMode && <button className = 'retro-button' onClick = {returnToGame}> Game </button> }
            <GetTrainingSet trainingSet = {trainingSet} setTrainingSet = {setTrainingSet} setValidationSet = {setValidationSet} setValidationLabels = {setValidationLabels} busy = {busy} />
            
      </div>
      <div>
          {/* <NeuroUpdater trainingSet = {trainingSet} trainingMode = {trainingMode} devMode = {props.devMode}  database = {database} percentTraining = {percentTraining} db = {database} net = {net} setNet = {setNet} learningRate = {learningRate} maxCycle = {maxCycle} sigma = {sigma} neuroLearning = {neuroLearning} setNeuroLearning = {setNeuroLearning}/>  */}
          <NeuroComparison neuroMinimaxBoardText = {props.neuroMinimaxBoardText} neuroPredictionsBoardText = {props.neuroPredictionsBoardText} challengeBoardText = {props.challengeBoardText} trainingStates = {trainingSet} net = {net}/>
          <p>Accuracy: </p>
          <p>On Practiced: {Math.round(accuracy*100)}%</p>
          <p>On Unseen Sample: {validity}%</p>
      </div>
    </div>  
    )

}