import * as tf from '@tensorflow/tfjs';
import { checkTensor, checkNetData, checkArrayHasDefinedValues, check9ArrayBundle, checkConnections } from '../testers/errorCheckers';
import { numerizeBoard } from '../general/usefulFunctions';

// const connectionsInputToHidden = tf.zeros([9, 9]);
// const connectionsHiddenToOutput = tf.zeros([9, 9]);

const practiceBoardState = tf.tensor1d([1, 0, -1, 0, 0.3, 0, 0, 0, 0]).reshape([1, 9]);
const matrixShape = [9, 9];

// const result = practiceBoardState.matMul(connectionsInputToHidden)

// result.print();

// the input net should be an array with two items
// each item is itself an array of arrays representing a matrix
// returns [0.recommended move, 1.[hiddenSums, hiddenValues], 2.output values]
export function neuroChooseMove(board, net){
    checkNetData(net,"neuroChooseMove input")
    board = numerizeBoard(board); 
    //console.log("neuroChooseMove: numerized board is: ", board)
    // turn board into vector
    console.log("board is ", JSON.stringify(board))
    const inputVector = tf.tensor1d(board).reshape([1, 9]);
    checkTensor(inputVector, "inputVector", "neuroChooseMove, after creation")

    //console.log("neuroChooseMove: inputVector tensor is... ");
    //inputVector.print()
    // turn net into array of tensors
    // const [connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2] = prepareNet(net); 
    const netAsArrayOfTensors = prepareNet(net); // returns [connections0to1, connections1to2 ... bias0to1, bias0to2...]
    //console.log("neuroChooseMove: netAsArrayOfTensors is ", netAsArrayOfTensors)

    // run forward pass on inputVector
    const sumsAndOutput = forwardPass(inputVector, netAsArrayOfTensors)
    // return index of highest value from array (ties decided randomly)
    const highest = randomHighest(board, sumsAndOutput[1]) //sumsAndOutput[1] is the output array from forwardpass
    console.log(sumsAndOutput[1])
    return [highest, ...sumsAndOutput]; // the forward pass data is passed along for training purposes & for presentational data 
}


function prepareNet(net){
    //console.log("prepareNet, net is", net)
    checkNetData(net,"prepareNet")
    //console.log(`prepareNet: net received with length ${net.length}`)
    if(net.length < 8){console.log("WARNING: net length is less than 8 upon receipt in prepareNet. Are you still using nets with depth 4?")}
    let newNet = []
    const midwayPoint = net.length/2; //this marks when the connections data stops and bias data begins
    for (let i = 0; i < net.length; i++){
        if (i < midwayPoint) {
            // turn connection arrays into 2d tensors 
            newNet[i] = tf.tensor2d(net[i])
            checkTensor(newNet[i], "newNet[i]", "prepareNet, first if clause")
        }
        else {
            // turn bias arrays into 2d tensors 
            //console.log(`net[${i}], net is`, net[i]);
            newNet[i] = tf.tensor1d(net[i])
            checkTensor(newNet[i], "newNet[i]", "prepareNet, else clause")

        }
    }

    return newNet; 
}



//returns an array [[sumsRecord,valuesRecord], outputs]
//function forwardPass(inputTensor, [connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2]){
function forwardPass(inputTensor, netAsArrayOfTensors){
    checkTensor(inputTensor, "inputTensor on start of function", "forwardPass")
    const halfNetArrayLength = netAsArrayOfTensors.length/2
    checkTensor(inputTensor, `inputTensor`, "forwardPass")
    let inputsForNextLayer = inputTensor; 
    let sumsRecord = [], valuesRecord = []; // need these for backprop
    for (let i = 0; i < halfNetArrayLength; i++){
        checkTensor(inputsForNextLayer, `inputsForNextLayer on iteration ${i} prior to calculation of sumsTensor`, "forwardPass")
        checkTensor(netAsArrayOfTensors[i], `netAsArrayOfTensors[${i}]`, "forwardPass")
        checkTensor(netAsArrayOfTensors[i+halfNetArrayLength], `netAsArrayOfTensors[${i}+halfNetArrayLength]`, "forwardPass")
        const sumsTensor = tf.add(inputsForNextLayer.matMul(netAsArrayOfTensors[i]), netAsArrayOfTensors[i+halfNetArrayLength]).mul(100).round().div(100); // first argument is the weights, second is the corresponding bias 
        //checkTensor(sumsTensor, `sumsTensor on iteration ${i}`, "forwardPass")
        sumsRecord.push(sumsTensor.dataSync())
        // inputsForNextLayer = tf.tensor1d(reLUonTensor(sumsTensor)).reshape([1, 9]);
        checkTensor(inputsForNextLayer, `inputsForNextLayer on iteration ${i} prior to relu`, "forwardPass")
        inputsForNextLayer = sumsTensor.relu(); 
        checkTensor(inputsForNextLayer, `inputsForNextLayer on iteration ${i} after relu`, "forwardPass", sumsTensor)

        valuesRecord.push(inputsForNextLayer.dataSync()); 
    }
    return [[sumsRecord,valuesRecord], inputsForNextLayer.dataSync()]; // last value of inputsForNextLayer is output of net (as if to pass to next layer... but there is none)
    
}

// returns the index of the highest value from an array, deciding ties randomly. 
// start the indexList off with just 0 as a member
// if array[i] has a value equal to highestSoFar push i onto index list
// else if array[i] has a higher value than highestSoFar empty the indexList and write i
// return an index at random
function randomHighest(array){
    //console.log("randomHighest: recieving: ", array)
    let highestSoFar = array[0]; 
    let indexList = [0]; 
    for (let i = 1; i < array.length; i++){
        if (array[i] === highestSoFar){
        
            indexList.push(i);
        }
        else if (array[i] > highestSoFar) {
            indexList = [i]; 
            highestSoFar = array[i]; 
        } 
    }
    //console.log("randomHighest: indexList is ", indexList)

    //console.log("randomHighest: returning: ", indexList[Math.floor(Math.random()*indexList.length)])

    return indexList[Math.floor(Math.random()*indexList.length)]; 
}

// looks through the currentBoard and an array of scores for potential moves
// returns the highest scoring square that is still empty, randomizing ties
function randomHighestNotOccupied(currentBoard, squareScores){
    // console.log("randomHighestNotOccupied: currentBoard is: ", currentBoard)
    // console.log("randomHighestNotOccupied: squareScores is: ", squareScores)
    //checkArrayHasDefinedValues(squareScores, 'squareScores', 'randomHighestNotOccupied',[currentBoard, squareScores])
    //console.log("randomHighestNotOccupied: board received is ", currentBoard); 
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

// function clippedReLU(value) {
//     return tf.minimum(tf.maximum(value, 0), 1);
//   }

// function clippedReLU(value) {
//     return Math.min(Math.max(value, 0), 1);
//   }

// function clippedreLUonTensor(array){
//     // let x = array.dataSync()
//     // x = Array.from(x);
//     return array.dataSync().map(item => clippedReLU(item))
//   }

function reLU(value) {
    const output = Math.max(value, 0)
    // console.log(`reLU receiving input ${value}, returning output ${output}`)
    return output;
  }

 

function reLUonTensor(tensor){
    //checkArrayHasDefinedValues(tensor.dataSync, 'array', 'reLUonTensor',[tensor])


    const output = tensor.dataSync().map(item => reLU(item))
    
    //checkArrayHasDefinedValues(output, 'output', 'reLUonTensor',[tensor])

    return output; 
  }



