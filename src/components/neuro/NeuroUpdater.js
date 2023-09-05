import { oneTrainingCycle, getTrainingSet, oneLearningIteration, convertMinimax, reluPrime, getDifferentials, getComparisonArraysAndForwardPassData, computeErrorForLastLayer, update, computeErrorForHiddenLayers } from "./updaterHelpers";
import React from 'react';
import { useState, useEffect, useRef} from 'react';
import { checkConnections } from "../../auxiliary/testers/errorCheckers";

export default function NeuroUpdater(props){
    const percentTraining = props.percentTraining
    const db = props.database
    const net = props.net
    const learningRate = props.learningRate
    const maxCycle = props.maxCycle
    const sigma = props.sigma; 
    const [error, setError] = useState(); 
    const setNet = props.setNet; 
    const neuroLearning = props.neuroLearning;
    const setNeuroLearning = props.setNeuroLearning;

    console.log(`NeuroUpdater: percentTraining is ${percentTraining}, net is of length ${net.length}, sigma is ${sigma}, learningRate is ${learningRate} and maxCycle is ${maxCycle}`)

    useEffect(neuroLearn, [neuroLearning]) ;
    useEffect(()=>{setNeuroLearning(false)}, [net]);


    
    function neuroLearn(){
        console.log("neuro learning has begun")
        if (!neuroLearning) return; 
        const trainingSet = getTrainingSet(percentTraining); 
        let newNet = net, results; 
        checkConnections(newNet[0], "first layer of connections", neuroLearn)
        runToMaxCycle(trainingSet, newNet, results); 
    }

    function runToMaxCycle(trainingSet, newNet, results){
        checkConnections(newNet[0], "first layer of connections", runToMaxCycle)
        for (let i = 0; i < maxCycle; i++){
            console.log("cycles remaining: ", maxCycle - i)
            results = oneTrainingCycle(trainingSet, newNet, learningRate, sigma); 
            // the above returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias,residualError]
            checkConnections(results[0], "first layer of connections from results", runToMaxCycle)
            let err = results[4]; 
            console.log("Error is ", err)
            if (err < sigma) {
                console.log(`Error is ${err}, which is below sigma of ${sigma}. Stopping.`)
                break; 
            }
            setError(err);
            newNet = results; 
            newNet.pop(); // but remove the error to get the net
        }
        setNet(newNet); 
    }

    return (
        <div>
            <p>Error = {error}</p> 
        </div>
    )
}
