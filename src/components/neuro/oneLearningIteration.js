import { whoseMove } from "../../auxiliary/general/usefulFunctions";
import { neuroChooseMove } from "../../auxiliary/choiceFunctions/neuroChooseMoveGeneral";
import { minimaxRecurse } from "../../auxiliary/choiceFunctions/minimaxChooseMove";
import { db } from "../../auxiliary/boardStateDatabase/dataBeadsFormatted";
import { check9ArrayBundle, returnArrayOfTypesOf, checkArrayHasDefinedValues, checkArrayOfArrays ,checkArray, checkforNonFalseyValueOtherThan0, checkConnections, checkNetData } from "../../auxiliary/testers/errorCheckers";
import { generateGoodBoardStates } from "../../auxiliary/boardStateDatabase/makeBeadAuxilliaries";
import { squaredError } from "./errorFunctions";
import { getCorrectArray } from "./minimaxHandling";
import { calculateFinalLayerUpdate, calculateHiddenLayerUpdate } from "./updaters";
import { makeBiases } from "./netBuilders";
import { numerizeBoard } from "../../auxiliary/choiceFunctions/neuroChooseMoveHelpers";



// returns an array [newNet, highestError, rawErrors]
export function oneLearningIteration(board, net, learningRate, sigma){
    //console.log("board is ", board)
    const correctArray = getCorrectArray(board);
    board = numerizeBoard(board); 

    let thisLayerSums, thisLayerValues, previousLayerValues, afferentConnections, afferentBiases, newWeights, newBiases, highestError, finalErrors, rawErrors;  
    
    const [unused, [arrayOfSums, arrayOfValues], outputValues] = neuroChooseMove(board, net); // returns [0.recommended move, 1.hiddenSums arrays, 2.output values]
    //console.log("oneLearningIteration: arrayOfSums are ", arrayOfSums)
    
    let newNet = net.map(() => []);
    
    //using arrayOfSums +1 to control looping bc it = number of layers
    const halfLength = arrayOfSums.length; 
    for (let i = halfLength - 1; i > -1; i--){ 
        
        previousLayerValues = i === 0? board: arrayOfValues[i-1]; 
        thisLayerSums = arrayOfSums[i]; 
        //console.log("oneLearningIteration: 1. thisLayerSums are ", thisLayerSums)
        thisLayerValues = arrayOfValues[i];
        afferentConnections = net[i]; 
        afferentBiases = net[i + halfLength];
        
       // minimaxArray, hiddenValues, outputSums, outputValues, secondWeights, secondBias, learningRate, sigma, board
        if (i === halfLength - 1){ // final layer
            //console.log("oneLearningIteration: 2. thisLayerSums are ", thisLayerSums);
            [newWeights, newBiases, highestError, finalErrors, rawErrors] 
                = calculateFinalLayerUpdate(correctArray, previousLayerValues, thisLayerSums, thisLayerValues, afferentConnections, afferentBiases, learningRate, sigma, board) 
            newNet[i] = newWeights; newNet[i+halfLength] = newBiases; 
            }
        else {
            [newWeights, newBiases] = calculateHiddenLayerUpdate(thisLayerSums, afferentConnections, afferentBiases, previousLayerValues, learningRate, finalErrors);
            newNet[i] = newWeights; newNet[i+halfLength] = newBiases; 
        }
    }
         
    return [newNet, highestError, rawErrors]; 
}
