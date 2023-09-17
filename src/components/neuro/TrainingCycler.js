import { oneTrainingCycle } from './iteratorsGeneral';
import React from 'react';
import { useState, useEffect, useRef} from 'react';
import { returnArrayOfTypesOf, checkConnections, checkNetData } from "../../auxiliary/testers/errorCheckers";
import { ErrorDisplay } from "../presentational/ErrorDisplay";
import { dataBaseDuplicator } from '../../auxiliary/general/usefulFunctions';
import { oneLearningIteration } from './oneLearningIteration';
import { squaredError } from './errorFunctions';

// currently you're thinking of this as being once per cycle, i.e. only twice when maxcycle is set to 2. 
// but don't you want it to be once every learning iteration? 

export default function TrainingCycler(props){
    const maxCycle = props.maxCycle; 
    const error = props.error; 
    const setError = props.setError; 
    const net = props.net; 
    const setNet = props.setNet; 
    const sigma = props.sigma; 
    const learningRate = props.learningRate; 
    const trainingSet = props.trainingSet; 
    const cycleCount = props.cycleCount; 
    const setCycleCount = props.setCycleCount; 


    const [errorArray, setErrorArray] = useState([])
    const [trainingCounter, setTrainingCounter] = useState(0) // trainingCounter keeps track of the cases left to try out in the training set 
    
    // setting cycleCount to some nonzero number launches the process, and dropping the cycleCount by 1 repeats it
    useEffect(
        nTrainingCycles, [cycleCount]
    )

    useEffect(
        setNewNetAndError, [trainingCounter]
    )

    // during learning, the program cycles through the training set n times, this counts down n and implements that
    function nTrainingCycles(){
        if (cycleCount < 1) return;
        // set a counter equal to the size of the training set 
        setTrainingCounter(trainingSet.length); 
        setNewNetAndError(); 
    }

    // for each cycle, the program must go through each case in the training set, this counts through that
    function setNewNetAndError(){
        if (trainingCounter < 1) {
            if (cycleCount > 0) decreaseCycleCount(); 
            return; 
        }
        const board = trainingSet[trainingCounter -1]
        console.log("setNewNetAndError, trainingCounter is: ", trainingCounter)

        console.log("setNewNetAndError, trainingSet[0] is: ", trainingSet[0])

        console.log("setNewNetAndError, board is: ", board)
        const updateData = oneLearningIteration(board, net, learningRate, sigma)    //returns [newNet, highestError, rawErrors]
        setNet(updateData[0])
        setError(updateData[1])
        setErrorArray(updateData[2])
        decreaseTrainingCount(); 
     }

    function decreaseCycleCount(){
        setCycleCount(prevIteration => prevIteration > 0 ? prevIteration - 1 : prevIteration)
    }

    function decreaseTrainingCount(){
        setTrainingCounter(prevIteration => prevIteration > 0 ? prevIteration - 1 : prevIteration)
    }

    // goes through each board state in the training set once
    // returns an array of arrays [[hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias] residualError]
    // function oneTrainingCycle(trainingSet, net, learningRate, sigma){
    //     let results, highestError = 0; 
    //     checkConnections(net[0], "first layer of connections after start of function", "oneTrainingCycle") 
    //     for (let i = 0; i < trainingSet.length; i++){
    //         let board = trainingSet[i]; 
    //         results = oneLearningIteration(board, net, learningRate, sigma) // returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError, rawErrors]
    //         const errorOnRun = Math.sqrt(squaredError(results[2])); 
    //         net = results[0]; // copy this so that we can recycle the net while keeping the additional data in results
            
    //         if (errorOnRun > highestError) highestError = errorOnRun 
    //         }
        
    //     results[1] = highestError; 
    //     return results; 
    // }

    return (
        <div>
            <ErrorDisplay error = {error} />
            {/* <NeuroComparison /> */}
        </div>
    )
}
