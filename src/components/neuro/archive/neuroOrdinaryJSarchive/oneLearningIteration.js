// NOTICE this is the old oneLearningIteration for the ordinary js version of the code. No longer in use. 


// import { neuroChooseMove } from "../../../auxiliary/choiceFunctions/neuroChooseMoveGeneral.js";

// import { getCorrectArray } from "../minimaxHandling.js";
// import { calculateFinalLayerUpdate, calculateHiddenLayerUpdate } from "./updaters.js";
// import { numerizeBoard } from "../neuroHelpers.js";



// // returns an array [newNet, crossEntropyErrors] 
// export function oneLearningIteration(board, net, learningRate, epsi){
    
//     checkNetData(net,"oneLearningIteration input")

//     //console.log("oneLearningIteration: board 1 is ", board)
//     const correctArray = getCorrectArray(board);
//     // board = numerizeBoard(board); 
//     //console.log("oneLearningIteration: board 2 is ", JSON.stringify(board))

//     // returns predictedValues chopped into one hots and softmaxed
//     const [unused, forwardPassData, predictedValues] = neuroChooseMove(board, net); // returns [0.recommended move, 1.hiddenSums arrays, 2.output values]
//     const arrayOfSums = forwardPassData[0]; const arrayOfValues = forwardPassData[1]; 
//     //console.log("oneLearningIteration: arrayOfSums are ", arrayOfSums)
//     //console.log("oneLearningIteration: arrayOfSums is ", arrayOfSums)

//     return comparePredictedToCorrect(correctArray, predictedValues, arrayOfSums, arrayOfValues, net, board, learningRate, epsi)
// }


// function comparePredictedToCorrect(correctArray, predictedValues, arrayOfSums, arrayOfValues, net, board, learningRate, epsi){
    
//     let newNet = net.map(() => []);
//     let crossEntropyErrors, dummyError, thisLayerSums, previousLayerValues, afferentConnections, afferentBiases, newWeights, newBiases, finalErrors;  

//     //using arrayOfSums +1 to control looping bc it = number of layers
//     const halfLength = arrayOfSums.length; 
//     for (let i = halfLength - 1; i > -1; i--){ 
//         // extract the sums, weights, biases from data inputs
//         previousLayerValues = i === 0? numerizeBoard(board): arrayOfValues[i-1]; //1st layer's values are just the board inputs
//         thisLayerSums = arrayOfSums[i]; 
//         //console.log("comparePredictedToCorrect: setting afferentConnections to net[i] = ", net[i])

//         afferentConnections = net[i]; 
//         afferentBiases = net[i + halfLength];
//         // and use these values to calculate updates
//         if (i === halfLength - 1){ // final layer
//             [newWeights, newBiases, dummyError, finalErrors, crossEntropyErrors] 
//                 = calculateFinalLayerUpdate(correctArray, previousLayerValues, thisLayerSums, predictedValues, afferentConnections, afferentBiases, learningRate, epsi, board) 
//             newNet[i] = newWeights; 
//             newNet[i+halfLength] = newBiases; 
//             }
//         else { // ordinary layer
//             //console.log("comparePredictedToCorrect: calling calculateHiddenLayerUpdate with afferentConnections : ", afferentConnections)

//             [newWeights, newBiases] = calculateHiddenLayerUpdate(thisLayerSums, afferentConnections, afferentBiases, previousLayerValues, learningRate, finalErrors);
//             newNet[i] = newWeights; newNet[i+halfLength] = newBiases; 
//         }
//     }
//     //console.log("exiting comparePredictedToCorrect")
//     return [newNet, crossEntropyErrors]; 
// }


