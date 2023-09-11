// import { whoseMove , numerizeBoard} from "../../auxiliary/general/usefulFunctions";
// import { neuroChooseMove } from "../../auxiliary/choiceFunctions/neuroChooseMove";
// import { minimaxRecurse } from "../../auxiliary/choiceFunctions/minimaxChooseMove";
// import { db } from "../../auxiliary/boardStateDatabase/dataBeadsFormatted";
// import { returnArrayOfTypesOf, checkArrayHasDefinedValues, checkArrayOfArrays ,checkArray, checkforNonFalseyValueOtherThan0, checkConnections } from "../../auxiliary/testers/errorCheckers";
// import { generateGoodBoardStates } from "../../auxiliary/boardStateDatabase/makeBeadAuxilliaries";
// import { squaredError } from "./errorFunctions";
// import { getCorrectArray } from "./minimaxHandling";
// import { calculateFinalLayerUpdate, calculateHiddenLayerUpdate } from "./updaters";

// // goes through each board state in the training set once
// // returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError]
// export function oneTrainingCycle(trainingSet, net, learningRate, sigma){
//     //console.log("starting oneTrainingCycle")
//     if (net.length > 4) throw new Error(`Problem in oneTrainingCycle 1: net as input is too long! length = ${net.length}, should equal 4. net[4] is ${net[4]}`)

//     let results, highestError = 0; 
//     checkConnections(net[0], "first layer of connections after start of function", "oneTrainingCycle") 
//     for (let i = 0; i < trainingSet.length; i++){
//         let board = trainingSet[i]; 
//         board = numerizeBoard(board); 

//         if (net.length > 4) throw new Error(`Problem in oneTrainingCycle 2: net in loop is too long at iteration ${i}! length = ${net.length}, should equal 4. net[4] is ${net[4]}`)

//         results = oneLearningIteration(board, net[0], net[1], net[2], net[3], learningRate, sigma) // returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError, rawErrors]
//         //console.log("results.length is ", results.length)
//         //console.log("in oneTrainingCycle, received results of type:", returnArrayOfTypesOf(results))
//         // checkArrayHasDefinedValues(results[5], "results[5]", "oneTrainingCycle test 1", [JSON.stringify(board)])
//         //console.log("oneTrainingCycle: results[5] is... ", results[5])
//         // checkArrayHasDefinedValues(results[5], "results[5]", "oneTrainingCycle test 2", [JSON.stringify(board)])
//         const errorOnRun = Math.sqrt(squaredError(results[5])); 
//         // checkforNonFalseyValueOtherThan0(errorOnRun, "errorOnRun", "oneTrainingCycle")
//         // checkConnections(results[0], `first layer of connections after results returned on iteration ${i}`, "oneTrainingCycle") 
//         // checkConnections(results[1], `second layer of connections after results returned on iteration ${i}`, "oneTrainingCycle") 
//         // checkArrayHasDefinedValues(results[2], `results[2] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
//         // checkArrayHasDefinedValues(results[3], `results[3]at iteration ${i}`, "oneTrainingCycle", ["n/a"])
//         net = [...results]; 
//         //console.log("before pops, net length is ", net.length)
//         net.pop();
//         net.pop(); // knock off the last two values to get the net
//         //console.log("after pops, net length is ", net.length)

//         if (net.length > 4) throw new Error(`Problem in oneTrainingCycle 3: net as input is too long! length = ${net.length}, should equal 4. net[4] is ${net[4]}`)

//         // checkConnections(net[0], `first layer of connections after net returned on iteration ${i}`, "oneTrainingCycle") 
//         // checkConnections(net[1], `second layer of connections after net returned on iteration ${i}`, "oneTrainingCycle") 
//         // checkArrayHasDefinedValues(net[2], `net[2] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
//         // checkArrayHasDefinedValues(net[3], `net[3] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
//         //console.log("in loop: average error on this run is ", errorOnRun/9)
//         if (errorOnRun > highestError) highestError = errorOnRun 
//         }
//     // the final net is the first four values of results, but the last value must be changed to the running error, not the error on the last run
//     //const averageError = runningError/(9*trainingSet.length); //average error per output unit
//     results[4] = highestError; 
//     //console.log("Highest error is ", highestError)
//     //console.log("ending oneTrainingCycle")
//     return results; 
// }

// // returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError, rawErrors]
// export function oneLearningIteration(board, firstConnections, finalConnections, firstBiases, finalBiases, learningRate, sigma){
//     const net = [firstConnections, finalConnections, firstBiases, finalBiases]; 
//     //console.log("starting oneLearningIteration")
//     // const predictionData = neuroChooseMove(board, net); // returns [0.recommended move, 1.hiddenSums, 2.hiddenValues, 3.outputSums, 4.output values]
//     const [unused, hiddenSums, hiddenValues, outputSums, outputValues] = neuroChooseMove(board, net); // returns [0.recommended move, 1.hiddenSums, 2.hiddenValues, 3.outputSums, 4.output values]
//     //console.log("oneLearningIteration: Output from neuroChooseMove is: ", outputValues)
     
//     const correctArray = getCorrectArray(board); 

//     // const data = getComparisonArraysAndForwardPassData(board,net); // returns [0. minimaxArray, 1.recommended move, 2.hiddenSums, 3.hiddenValues, 4.outputSums, 5.output values]

//     const [newWeights, newBiases, squrdError, finalErrors, rawErrors] = calculateFinalLayerUpdate(correctArray, hiddenValues, outputSums, outputValues, finalConnections, finalBiases, learningRate, sigma, board) // returns [newWeights, newBiases, squrdError, finalErrors, rawErrors] 
    
//     let output; 
//     if (squrdError < sigma) {
//         //checkArrayHasDefinedValues(rawErrors, "rawErrors", "oneLearningIteration test 1", [JSON.stringify(board)])
//         output = [firstConnections, finalConnections, firstBiases, finalBiases, squrdError,rawErrors]; 
//     }
//     else {
//         const hiddenWeights = calculateHiddenLayerUpdate(hiddenSums, firstConnections, firstBiases, board, learningRate, finalErrors);
//         output = [hiddenWeights[0],newWeights,hiddenWeights[1],newBiases,squrdError, rawErrors]
//     }
    
//     //console.log("ending oneLearningIteration")
//     return output;  
// }



















    
 







