// NOTICE this is the old updater for the ordinary js version of the code. No longer in use. 

// import { oneTrainingCycle } from '../archive/iteratorsGeneral.js';
// import React from 'react';
// import { useState, useEffect, useRef} from 'react';
// import { returnArrayOfTypesOf, checkConnections, checkNetData } from "../../../auxiliary/testers/errorCheckers.js";
// import { dataBaseDuplicator } from '../../../auxiliary/general/usefulFunctions.js';
// import TrainingCycler from './TrainingCycler.js';

// export default function NeuroUpdater(props){
//     const percentTraining = props.percentTraining
//     const db = props.database
//     const net = props.net
//     const learningRate = props.learningRate
//     const maxCycle = props.maxCycle
//     const sigma = props.sigma; 
//     const [error, setError] = useState(); 
//     const setNet = props.setNet; 
//     const neuroLearning = props.neuroLearning;
//     const setNeuroLearning = props.setNeuroLearning;
//     const trainingSet = props.trainingSet; 
//     const [cycleCount, setCycleCount] = useState(0); 


//     // console.log(`NeuroUpdater: percentTraining is ${percentTraining}, net is of length ${net.length}, sigma is ${sigma}, learningRate is ${learningRate} and maxCycle is ${maxCycle}`)

//     // useEffect(neuroLearn, [neuroLearning]) ;
//     useEffect(neuroLearn, [trainingSet]) ; // when a new training set is created, get training! 

//     useEffect(()=>{setNeuroLearning(false)}, [net]);

//     useEffect(()=>{console.log("useEffect: first of net is: ", net[0][0]), [net]
// })

    
//     function neuroLearn(){
//         //console.log("neuro learning has begun")
//         if (!neuroLearning) return; 
//         // const trainingSet = getTrainingSet(percentTraining); 
//         let newNet = dataBaseDuplicator(net); 

//         checkConnections(newNet[0], "first layer of connections", neuroLearn)
//         //runToMaxCycle(trainingSet, newNet); 
//         //console.log("setting cycle count")
//         setCycleCount(maxCycle);
//         //console.log("cycle count set") 
//     }

//     // function runToMaxCycle(trainingSet, newNet){
//     //     let err; 
//     //     // let worstErrorThisCycle = 0
//     //     //checkConnections(newNet[0], "first layer of connections", runToMaxCycle)
//     //     for (let i = 0; i < maxCycle; i++){
//     //         console.log("cycles remaining: ", maxCycle - i)
//     //         // if (newNet.length !== 6) throw new Error(`Problem in runToMaxCycle loop at iteration ${i}: net to be passed to oneTrainingCycle is wrong length! length = ${newNet.length}, should equal 6. `)
//     //         // console.log("runToMaxCycle 1: newNet length is ", newNet.length)
//     //         const [returnedNetwork, residualError, rawErrors] = oneTrainingCycle(trainingSet, newNet, learningRate, sigma); 
//     //         const [hiddenLayerWeights1, finalLayerWeights, hiddenLayerBias1, finalLayerBias] = returnedNetwork; 
//     //         // checkConnections(hiddenLayerWeights, "first layer of connections from results", runToMaxCycle)
//     //         // console.log("runToMaxCycle: Error is ", err)
//     //         if (residualError < sigma) {
//     //             console.log(`Error is ${residualError}, which is below sigma of ${sigma}. Stopping.`)
//     //             break; 
//     //         }
//     //         newNet = returnedNetwork; // don't assume this step is eliminable
//     //         err = residualError;  
//     //     }
//     //     checkNetData(newNet, "newNet, before net is set in state")
//     //     console.log("checknet passed!")
//     //     setNet(newNet); 
//     //     setError(err);
//     // }

//     return (
//         <div>
//             <TrainingCycler cycleCount = {cycleCount} setCycleCount = {setCycleCount} trainingSet = {trainingSet} learningRate = {learningRate} sigma = {sigma} error = {error} maxCycle = {maxCycle} setError = {setError} net = {net} setNet = {setNet}/>
//         </div>
//     )
// }
