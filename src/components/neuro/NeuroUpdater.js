import { oneTrainingCycle, getTrainingSet, oneLearningIteration, convertMinimax, reluPrime, getDifferentials, getComparisonArraysAndForwardPassData, computeErrorForLastLayer, update, computeErrorForHiddenLayers } from "./updaterHelpers";
import React from 'react';
import { useState, useEffect, useRef} from 'react';

export default function NeuroUpdater(props){
    const percentTraining = props.percentTraining
    const db = props.database
    const net = props.net
    const learningRate = props.learningRate
    const maxCycle = props.maxCycle
    const sigma = props.sigma; 
    const setNet = props.setNet; 
    const [neuroLearning, setNeuroLearning] = useState(false); 


    // useEffect(()=> {
    //     console.log("NeuroUpdater: received net is ", JSON.stringify(net))
    //     console.log("NeuroUpdater: received net has length ", net.length)
    // },)

    useEffect(neuroLearn, [neuroLearning]) 

    function neuroLearn(){
        if (!neuroLearning) return; 
        const trainingSet = getTrainingSet(percentTraining); 
        let newNet = net, results; 
        for (let i = 0; i < maxCycle; i++){
            results = oneTrainingCycle(trainingSet, newNet, learningRate); 
            // the above returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias,residualError]
            let error = results[4]
            if (error < sigma) break; 
            newNet = results; 
            newNet.pop(); // but remove the error to get the net
        }
        setNeuroLearning(false);
        setNet(newNet); 

    }

    return <div></div>
}
