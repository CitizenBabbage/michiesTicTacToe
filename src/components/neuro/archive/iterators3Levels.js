// import { numerizeBoard} from "../../auxiliary/general/usefulFunctions";
// import { neuroChooseMove } from "../../auxiliary/choiceFunctions/neuroChooseMove3layers";
// import { checkConnections } from "../../auxiliary/testers/errorCheckers";
// import { squaredError } from "./errorFunctions";
// import { getCorrectArray } from "./minimaxHandling";
// import { calculateFinalLayerUpdate, calculateHiddenLayerUpdate } from "./updaters";

// // goes through each board state in the training set once
// // returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError]
// export function oneTrainingCycle(trainingSet, network, learningRate, sigma){
//     //console.log("starting oneTrainingCycle")
//     if (network.length !== 6) throw new Error(`Problem in oneTrainingCycle 1: net as input is wrong length! length = ${network.length}, should equal 6.}`)

//     let results, highestError = 0; 
//     checkConnections(network[0], "first layer of connections after start of function", "oneTrainingCycle") 
//     for (let i = 0; i < trainingSet.length; i++){
//         let board = trainingSet[i]; 
//         console.log(`oneTrainingCycle: the ${i}th training case of ${trainingSet.length} is `, board)
//         //board = numerizeBoard(board); 
//         console.log("oneTrainingCycle: board after numerization is ", board)

//         if (network.length !==6) throw new Error(`Problem in oneTrainingCycle 2: net in loop is wrong length at iteration ${i}! length = ${network.length}, should equal 6.`)

//         results = oneLearningIteration(board, network[0], network[1], network[2], network[3], network[4], network[5], learningRate, sigma) // returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError, rawErrors]
//         //console.log("results.length is ", results.length)
//         //console.log("in oneTrainingCycle, received results of type:", returnArrayOfTypesOf(results))
//         // checkArrayHasDefinedValues(results[5], "results[5]", "oneTrainingCycle test 1", [JSON.stringify(board)])
//         //console.log("oneTrainingCycle: results[5] is... ", results[5])
//         // checkArrayHasDefinedValues(results[5], "results[5]", "oneTrainingCycle test 2", [JSON.stringify(board)])
//         console.log("raw errors are ", results[7])
//         const errorOnRun = Math.sqrt(squaredError(results[7])); 
//         console.log("squared error is ", errorOnRun)

//         // checkforNonFalseyValueOtherThan0(errorOnRun, "errorOnRun", "oneTrainingCycle")
//         // checkConnections(results[0], `first layer of connections after results returned on iteration ${i}`, "oneTrainingCycle") 
//         // checkConnections(results[1], `second layer of connections after results returned on iteration ${i}`, "oneTrainingCycle") 
//         // checkArrayHasDefinedValues(results[2], `results[2] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
//         // checkArrayHasDefinedValues(results[3], `results[3]at iteration ${i}`, "oneTrainingCycle", ["n/a"])
//         network = [...results]; 
//         //console.log("before pops, net length is ", net.length)
//         network.pop();
//         network.pop(); // knock off the last two values to get the net
//         //console.log("after pops, net length is ", net.length)

//         if (network.length !== 6) throw new Error(`Problem in oneTrainingCycle 3: net as input is  wrong length! length = ${network.length}, should equal 6.`)

//         // checkConnections(net[0], `first layer of connections after net returned on iteration ${i}`, "oneTrainingCycle") 
//         // checkConnections(net[1], `second layer of connections after net returned on iteration ${i}`, "oneTrainingCycle") 
//         // checkArrayHasDefinedValues(net[2], `net[2] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
//         // checkArrayHasDefinedValues(net[3], `net[3] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
//         //console.log("in loop: average error on this run is ", errorOnRun/9)
//         if (errorOnRun > highestError) highestError = errorOnRun 
//         console.log("highest error is ", highestError)

//         }
//     // the final net is the first four values of results, but the last value must be changed to the running error, not the error on the last run
//     //const averageError = runningError/(9*trainingSet.length); //average error per output unit
//     results[4] = highestError; 
//     //console.log("Highest error is ", highestError)
//     //console.log("ending oneTrainingCycle")
//     return results; 
// }

// // returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError, rawErrors]
// export function oneLearningIteration(board, firstConnections, middleConnections, finalConnections, firstBiases, middleBiases, finalBiases, learningRate, sigma){
//     console.log("oneLearningIteration: board at input is ", board)
//     const correctArray = getCorrectArray(board);   // get correct array while board is still Xs and Os
//     console.log("oneLearningIteration: correctArray is ", correctArray)
      
//     board = numerizeBoard(board); // now change board to numbers for neural net
    
//     const network = [firstConnections, middleConnections, finalConnections, firstBiases, middleBiases, finalBiases]; 
//     const [unused, hiddenSums1, hiddenValues1, hiddenSums2, hiddenValues2, outputSums, outputValues] = neuroChooseMove(board, network); 

    


//     const [newWeights3, newBiases3, squrdError, finalErrors, rawErrors] = calculateFinalLayerUpdate(correctArray, hiddenValues2, outputSums, outputValues, finalConnections, finalBiases, learningRate, sigma, board) // returns [newWeights, newBiases, squrdError, finalErrors, rawErrors] 
//     console.log("oneLearningIteration, rawErrors are: ", rawErrors)
//     let output; 
//     if (squrdError < sigma) {
//         output = [firstConnections, middleConnections, finalConnections, firstBiases, middleBiases, finalBiases, squrdError,rawErrors]; 
//     }
//     else {
//         const [newWeights2,newBiases2] = calculateHiddenLayerUpdate(hiddenSums2, middleConnections, middleBiases, hiddenValues1, learningRate, finalErrors);

//         const [newWeights1,newBiases1] = calculateHiddenLayerUpdate(hiddenSums1, firstConnections, firstBiases, board, learningRate, finalErrors);
//         output = [newWeights1,newWeights2,newWeights3,newBiases1,newBiases2,newBiases3,squrdError, rawErrors]
//     }
    
//     return output;  
// }



















    
 







