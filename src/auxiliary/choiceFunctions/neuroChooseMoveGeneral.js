import * as tf from '@tensorflow/tfjs';
import { checkTensor, checkNetData, checkArrayHasDefinedValues, check9ArrayBundle, checkConnections } from '../testers/errorCheckers.js';
import { numerizeBoard, cutIntoOneHots } from '../../components/neuro/neuroHelpers.js';


const practiceBoardState = tf.tensor1d([1, 0, -1, 0, 0.3, 0, 0, 0, 0]).reshape([1, 9]);
const matrixShape = [9, 9];


// returns [0.recommended move, 1.[hiddenSums, hiddenValues], 2.output values]
export function neuroChooseMove(board, net){
    const boardvector = numerizeBoard(board);     // turn board into vector
    const inputVector = tf.tensor1d(boardvector).reshape([1, 27]);
    const netAsArrayOfTensors = prepareNet(net); // returns [connections0to1, connections1to2 ... bias0to1, bias1to2...]
    const sumsAndOutput = forwardPass(inputVector, netAsArrayOfTensors)
    const softMaxedScores = applySoftMaxToAll(cutIntoOneHots(sumsAndOutput[1],4))
    const move = getRecommended(board, softMaxedScores)// return index of highest value from array (ties decided randomly)
    return [move, sumsAndOutput[0], softMaxedScores]; // the forward pass data (middle) is passed along for training purposes & for presentational data 
}

function getRecommended(board, softMaxedOneHots){
    const outputArray = reduceAllOneHotsToScores(softMaxedOneHots); 
    const highest = randomHighestNotOccupied(board, outputArray) 
    return highest; 
}


function prepareNet(net){
    let newNet = []
    const midwayPoint = net.length/2; //this marks when the connections data stops and bias data begins
    for (let i = 0; i < net.length; i++){
        if (i < midwayPoint) {
            newNet[i] = tf.tensor2d(net[i])             // turn connection arrays into 2d tensors 
        }
        else {
            newNet[i] = tf.tensor1d(net[i])            // turn bias arrays into 2d tensors 
        }
    }
    return newNet; 
}



//returns an array [[sumsRecord,valuesRecord], outputs]
function forwardPass(inputTensor, netAsArrayOfTensors){
    const halfNetArrayLength = netAsArrayOfTensors.length/2
    let inputsForNextLayer = inputTensor; let sumsTensor; 
    let sumsRecord = [], valuesRecord = []; // need these for backprop
    for (let i = 0; i < halfNetArrayLength; i++){ // loop through 1st half of net = connections
        sumsTensor = tf.add(inputsForNextLayer.matMul(netAsArrayOfTensors[i]), netAsArrayOfTensors[i+halfNetArrayLength]).mul(100).round().div(100); // first argument is the weights, second is the corresponding bias 
        sumsRecord.push(sumsTensor.dataSync())
        inputsForNextLayer = sumsTensor.relu(); 
        valuesRecord.push(inputsForNextLayer.dataSync()); 
    }
    return [[sumsRecord,valuesRecord], sumsTensor.dataSync()]; // output the sums for last layer, without relu, to apply softmax instead
}

// this is to be applied to each four-digit output
// returns an array of equal size, replacing raw outputs with probabilities
function applySoftmax(array){
    console.log("applySoftmax: array upon receipt is: ", JSON.stringify(array))
    let softMaxArray = []; 
    array = [...array]
    const sumOfExponentials = array.reduce((accumulator, current) => accumulator + Math.exp(current), 0);
    for (let j = 0; j < array.length; j++){
        softMaxArray[j] = Math.exp(array[j]) / sumOfExponentials
    }   
    return softMaxArray; 
}


function applySoftMaxToAll(arrayOfArrays){
    let outputArray = []; 
    for (let i = 0; i < arrayOfArrays.length; i++){
        outputArray[i] = applySoftmax(arrayOfArrays[i])
    }
    return outputArray; 
}

// this takes a one-hot encoding of probabilities (i.e. post-softmax) and produces a score for that move
// by multiplying the probability of a win by 6, the probability of a draw by 2, 
// the probability of a loss by 1 (since at least a losing move is a possible move) and adding them together.  
function reduceOneHotEncodingToScore(arrayOf4){
    return (3*arrayOf4[0])+(2*arrayOf4[1])+ arrayOf4[2]; 
}



function reduceAllOneHotsToScores(arrayOfArrays){
    let outputArray = []; 
    for (let i = 0; i < arrayOfArrays.length; i++){
        outputArray[i] = reduceOneHotEncodingToScore(arrayOfArrays[i])
    }
    return outputArray; 
}



// looks through the currentBoard and an array of scores for potential moves
// returns the highest scoring square that is still empty, randomizing ties
function randomHighestNotOccupied(currentBoard, squareScores){
    let highestSoFar = 0; 
    let indexList = []; 
    for (let i = 0; i < currentBoard.length; i++){
        if (currentBoard[i]){continue}
        else if (squareScores[i] === highestSoFar){
            indexList.push(i);
        }
        else if (squareScores[i] > highestSoFar) {
            indexList = [i]; 
            highestSoFar = squareScores[i]; 
        } 
    }
    // console.log("randomHighestNotOccupied: indexList is: ", indexList)

    return indexList[Math.floor(Math.random()*indexList.length)]; 
}


function reLU(value) {
    const output = Math.max(value, 0)
    return output;
  }

 

function reLUonTensor(tensor){
    const output = tensor.dataSync().map(item => reLU(item))
    return output; 
  }



