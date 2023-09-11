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



// returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError, rawErrors]
export function oneLearningIteration(board, net, learningRate, sigma){
    const correctArray = getCorrectArray(board);
    let thisLayerSums, thisLayerValues, previousLayerValues, afferentConnections, afferentBiases, newWeights, newBiases, highestError, finalErrors, rawErrors;  
    const [unused, [arrayOfSums, arrayOfValues], outputValues] = neuroChooseMove(board, net); // returns [0.recommended move, 1.hiddenSums arrays, 2.output values]
    let newNet = net.map(() => []);
    
    //using arrayOfSums +1 to control looping bc it = number of layers
    const halfLength = arrayOfSums.length; 
    //the input layer counts as layer -1
    for (let i = halfLength - 1; i > -1; i--){ 
        
        previousLayerValues = i === 0? board: arrayOfValues[i-1]; 
        thisLayerSums = arrayOfSums[i]; 
        thisLayerValues = arrayOfValues[i];
        afferentConnections = net[i]; 
        afferentBiases = net[i + halfLength];
        

        if (i === halfLength - 1){ // final layer
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
