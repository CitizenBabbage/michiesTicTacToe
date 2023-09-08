import { oneTrainingCycle, getTrainingSet, oneLearningIteration, convertMinimax, reluPrime, getDifferentials, getComparisonArraysAndForwardPassData, computeErrorForLastLayer, update, computeErrorForHiddenLayers } from "./updaterHelpers";
import React from 'react';
import { useState, useEffect, useRef} from 'react';
import { returnArrayOfTypesOf, checkConnections } from "../../auxiliary/testers/errorCheckers";
import { ErrorDisplay } from "../presentational/ErrorDisplay";

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
    const trainingSet = props.trainingSet; 

    // console.log(`NeuroUpdater: percentTraining is ${percentTraining}, net is of length ${net.length}, sigma is ${sigma}, learningRate is ${learningRate} and maxCycle is ${maxCycle}`)

    // useEffect(neuroLearn, [neuroLearning]) ;
    useEffect(neuroLearn, [trainingSet]) ; // when a new training set is created, get training! 

    useEffect(()=>{setNeuroLearning(false)}, [net]);

    useEffect(()=>{console.log("useEffect:first, first of net is: ", net[0][0]), [net]
})

    
    function neuroLearn(){
        console.log("neuro learning has begun")
        if (!neuroLearning) return; 
        // const trainingSet = getTrainingSet(percentTraining); 
        let newNet = net, results; 
        if (newNet.length > 4) throw new Error(`Problem in neuroLearn: net is too long! length = ${net.length}, should equal 4. net[4] is ${net[4]}`)

        checkConnections(newNet[0], "first layer of connections", neuroLearn)
        runToMaxCycle(trainingSet, newNet, results); 
    }

    function runToMaxCycle(trainingSet, newNet, results){
        if (newNet.length > 4) throw new Error(`Problem in runToMaxCycle: net as input is too long! length = ${newNet.length}, should equal 4. net[4] is ${newNet[4]}`)
        let err
        checkConnections(newNet[0], "first layer of connections", runToMaxCycle)
        for (let i = 0; i < maxCycle; i++){
            console.log("cycles remaining: ", maxCycle - i)
            if (newNet.length > 4) throw new Error(`Problem in runToMaxCycle loop at iteration ${i}: net to be passed to oneTrainingCycle is too long! length = ${newNet.length}, should equal 4. net[4] is ${newNet[4]}`)
            // console.log("runToMaxCycle 1: newNet length is ", newNet.length)
            results = oneTrainingCycle(trainingSet, newNet, learningRate, sigma); 
            // the above returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError]
            checkConnections(results[0], "first layer of connections from results", runToMaxCycle)
            err = results[4]; 
            // console.log("runToMaxCycle: Error is ", err)
            if (err < sigma) {
                console.log(`Error is ${err}, which is below sigma of ${sigma}. Stopping.`)
                break; 
            }
            newNet = results; 
            // console.log(returnArrayOfTypesOf(newNet))
            // console.log("runToMaxCycle 2: newNet length before pop is ", newNet.length)
            newNet.pop(); // but remove the error ...
            newNet.pop(); //... and the error array to get the net
            // console.log("runToMaxCycle 3: newNet length after pop is ", newNet.length)
            // if (i%5===0) setNet(newNet); 
        }
        setNet(newNet); 
        setError(err);
    }

    return (
        <div>
            <ErrorDisplay error = {error}/>
        </div>
    )
}
