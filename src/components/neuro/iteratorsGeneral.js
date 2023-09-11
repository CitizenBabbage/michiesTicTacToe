import { whoseMove , numerizeBoard} from "../../auxiliary/general/usefulFunctions";
import { neuroChooseMove } from "../../auxiliary/choiceFunctions/neuroChooseMoveGeneral";
import { minimaxRecurse } from "../../auxiliary/choiceFunctions/minimaxChooseMove";
import { db } from "../../auxiliary/boardStateDatabase/dataBeadsFormatted";
import { check9ArrayBundle, returnArrayOfTypesOf, checkArrayHasDefinedValues, checkArrayOfArrays ,checkArray, checkforNonFalseyValueOtherThan0, checkConnections, checkNetData } from "../../auxiliary/testers/errorCheckers";
import { generateGoodBoardStates } from "../../auxiliary/boardStateDatabase/makeBeadAuxilliaries";
import { squaredError } from "./errorFunctions";
import { getCorrectArray } from "./minimaxHandling";
import { calculateFinalLayerUpdate, calculateHiddenLayerUpdate } from "./updaters";
import { makeBiases } from "./netBuilders";

import { oneLearningIteration } from "./oneLearningIteration";


// goes through each board state in the training set once
// returns an array of arrays [[hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias] residualError]
export function oneTrainingCycle(trainingSet, net, learningRate, sigma){
    //console.log("starting oneTrainingCycle")

    let results, highestError = 0; 
    checkConnections(net[0], "first layer of connections after start of function", "oneTrainingCycle") 
    for (let i = 0; i < trainingSet.length; i++){
        let board = trainingSet[i]; 
        board = numerizeBoard(board); 


        results = oneLearningIteration(board, net, learningRate, sigma) // returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError, rawErrors]
        const errorOnRun = Math.sqrt(squaredError(results[2])); 
        net = results[0]; // copy this so that we can recycle the net while keeping the additional data in results
        console.log("net before pops is ", returnArrayOfTypesOf(net))

        checkNetData(net, "oneTrainingCycle, after net extracted from results")

        //console.log("after pops, net length is ", net.length)


        // checkConnections(net[0], `first layer of connections after net returned on iteration ${i}`, "oneTrainingCycle") 
        // checkConnections(net[1], `second layer of connections after net returned on iteration ${i}`, "oneTrainingCycle") 
        // checkArrayHasDefinedValues(net[2], `net[2] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
        // checkArrayHasDefinedValues(net[3], `net[3] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
        //console.log("in loop: average error on this run is ", errorOnRun/9)
        if (errorOnRun > highestError) highestError = errorOnRun 
        }
    // the final net is the first four values of results, but the last value must be changed to the running error, not the error on the last run
    //const averageError = runningError/(9*trainingSet.length); //average error per output unit
    results[1] = highestError; 
    //console.log("Highest error is ", highestError)
    //console.log("ending oneTrainingCycle")
    return results; 
}

// returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError, rawErrors]
// export function oneLearningIteration(board, [firstConnections, finalConnections, firstBiases, finalBiases], learningRate, sigma){
//     const net = [firstConnections, finalConnections, firstBiases, finalBiases]; 
//     //console.log("starting oneLearningIteration")
//     const [unused, [arrayOfHiddenSums,arrayOfValues], outputValues] = neuroChooseMove(board, net); // returns [0.recommended move, 1.hiddenSums arrays, 2.output values]
//     const hiddenSums = arrayOfHiddenSums[0]; 
//     const hiddenValues = makeBiases(); //DUMMY VALUES
//     const outputSums = makeBiases(); //DUMMY VALUES
//     //console.log("oneLearningIteration: Output from neuroChooseMove is: ", outputValues)
     
//     const correctArray = getCorrectArray(board); 

//     // const data = getComparisonArraysAndForwardPassData(board,net); // returns [0. minimaxArray, 1.recommended move, 2.hiddenSums, 3.hiddenValues, 4.outputSums, 5.output values]

//     const [newWeights, newBiases, highestError, finalErrors, rawErrors] = calculateFinalLayerUpdate(correctArray, hiddenValues, outputSums, outputValues, finalConnections, finalBiases, learningRate, sigma, board) 
//     // returns [newWeights, newBiases, squrdError, finalErrors, rawErrors] 
//     checkNetData([newWeights, newBiases], "oneLearningIteration on newWeights")

//     check9ArrayBundle(hiddenSums, "hiddenSums", "oneLearningIteration", ["n/a"])
//     const hiddenWeights = calculateHiddenLayerUpdate(hiddenSums, firstConnections, firstBiases, board, learningRate, finalErrors);
//     // returns [newWeights, newBiases]
//     checkNetData(hiddenWeights, "oneLearningIteration on hiddenweights")
    
//     //console.log("ending oneLearningIteration")
//     return [[hiddenWeights[0],newWeights,hiddenWeights[1],newBiases],highestError, rawErrors]; 
// }












    
 







