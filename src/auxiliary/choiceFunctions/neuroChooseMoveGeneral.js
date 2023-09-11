import * as tf from '@tensorflow/tfjs';
import { checkNetData, checkArrayHasDefinedValues, check9ArrayBundle, checkConnections } from '../testers/errorCheckers';
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
    // turn board into vector
    const inputVector = tf.tensor1d(board).reshape([1, 9]);
    // turn net into array of tensors
    // const [connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2] = prepareNet(net); 
    const netAsArrayOfTensors = prepareNet(net); // returns [connections0to1, connections1to2 ... bias0to1, bias0to2...]


    // run forward pass on inputVector
    const sumsAndOutput = forwardPass(inputVector, netAsArrayOfTensors)
    // return index of highest value from array (ties decided randomly)
    const highest = randomHighest(board, sumsAndOutput[1]) //sumsAndOutput[1] is the output array from forwardpass

    return [highest, ...sumsAndOutput]; // the forward pass data is passed along for training purposes & for presentational data 
}


function prepareNet(net){
    console.log("prepareNet, net is", net)
    checkNetData(net,"prepareNet")
    let newNet = []
    const midwayPoint = net.length/2; //this marks when the connections data stops and bias data begins
    for (let i = 0; i < net.length; i++){
        if (i < midwayPoint) {
            // turn connection arrays into 2d tensors 
            newNet[i] = tf.tensor2d(net[i])
        }
        else {
            // turn bias arrays into 2d tensors 
            console.log(`net[${i}], net is`, net[i]);
            newNet[i] = tf.tensor1d(net[i])
        }
    }



    // const connectionsInputToHidden =  tf.tensor2d(net[0])
    // const connectionsHiddenToOutput = tf.tensor2d(net[1])
    // // turn bias arrays into 1d tensors 
    // const bias1 = tf.tensor1d(net[2]), bias2 = tf.tensor1d(net[3]); 
    // // returns array of tensors
    // return [connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2]
    console.log("the length of NewNet is : ", newNet)
    return newNet; 
}



//returns an array [[sumsRecord,valuesRecord], outputs]
//function forwardPass(inputTensor, [connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2]){
function forwardPass(inputTensor, netAsArrayOfTensors){

    // console.log(`inputTensor has values ${inputTensor.dataSync()}`)
    // console.log(`connectionsInputToHidden has values ${connectionsInputToHidden.dataSync()}`)
    const halfNetArrayLength = netAsArrayOfTensors.length/2
    let inputsForNextLayer = inputTensor; 
    let sumsRecord = [], valuesRecord = []; // need these for backprop
    for (let i = 0; i < halfNetArrayLength; i++){
        const sumsTensor = tf.add(inputsForNextLayer.matMul(netAsArrayOfTensors[i]), netAsArrayOfTensors[i+halfNetArrayLength]); // first argument is the weights, second is the corresponding bias 
        sumsRecord.push(sumsTensor.dataSync())
        inputsForNextLayer = tf.tensor1d(reLUonTensor(sumsTensor)).reshape([1, 9]);
        valuesRecord.push(inputsForNextLayer.dataSync()); 
    }
    return [[sumsRecord,valuesRecord], inputsForNextLayer.dataSync()]; // last value of inputsForNextLayer is output of net (as if to pass to next layer... but there is none)
    // const hiddenSumsTensor = tf.add(inputTensor.matMul(connectionsInputToHidden), bias1); 
    // //console.log(`hiddenSumsTensor has values ${hiddenSumsTensor.dataSync()}`)
    // // console.log(`Handing some hidden values to reluOnTensor`)
    // const hiddenValuesTensor = tf.tensor1d(reLUonTensor(hiddenSumsTensor)).reshape([1, 9]);
    
    // // console.log("forwardPass: hiddenValuesTensor is: ", JSON.stringify(hiddenValuesTensor))
    // const outputSums = tf.add(hiddenValuesTensor.matMul(connectionsHiddenToOutput), bias2);
    // // console.log(`Giving reLU the following values as a tensor: `, outputSums.dataSync()) 
    // const outputArray = reLUonTensor(outputSums);
    // // console.log("forwardPass: outputArray is: ", JSON.stringify(outputArray))
    // //checkArrayHasDefinedValues(outputArray, 'outputArray', 'forwardPass',[inputTensor, connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2])

    //return [hiddenSumsTensor.dataSync(),hiddenValuesTensor.dataSync(),outputSums.dataSync(),outputArray ]; 
}

// returns the index of the highest value from an array, deciding ties randomly. 
// start the indexList off with just 0 as a member
// if array[i] has a value equal to highestSoFar push i onto index list
// else if array[i] has a higher value than highestSoFar empty the indexList and write i
// return an index at random
function randomHighest(array){
    console.log("randomHighest: recieving: ", array)
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
    console.log("randomHighest: indexList is ", indexList)

    console.log("randomHighest: returning: ", indexList[Math.floor(Math.random()*indexList.length)])

    return indexList[Math.floor(Math.random()*indexList.length)]; 
}

// looks through the currentBoard and an array of scores for potential moves
// returns the highest scoring square that is still empty, randomizing ties
function randomHighestNotOccupied(currentBoard, squareScores){
    // console.log("randomHighestNotOccupied: currentBoard is: ", currentBoard)
    // console.log("randomHighestNotOccupied: squareScores is: ", squareScores)
    //checkArrayHasDefinedValues(squareScores, 'squareScores', 'randomHighestNotOccupied',[currentBoard, squareScores])
    console.log("randomHighestNotOccupied: board received is ", currentBoard); 
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



