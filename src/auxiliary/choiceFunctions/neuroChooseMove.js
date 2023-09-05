import * as tf from '@tensorflow/tfjs';
import { checkArrayHasDefinedValues } from '../testers/errorCheckers';
import { numerizeBoard } from '../general/usefulFunctions';

// const connectionsInputToHidden = tf.zeros([9, 9]);
// const connectionsHiddenToOutput = tf.zeros([9, 9]);

const practiceBoardState = tf.tensor1d([1, 0, -1, 0, 0.3, 0, 0, 0, 0]).reshape([1, 9]);
const matrixShape = [9, 9];

// const result = practiceBoardState.matMul(connectionsInputToHidden)

// result.print();

// the input net should be an array with two items
// each item is itself an array of arrays representing a matrix
export function neuroChooseMove(board, net){
    board = numerizeBoard(board); 
    // turn board into vector
    const inputVector = tf.tensor1d(board).reshape([1, 9]);
    // turn connection arrays into matrices 
    // console.log("net0 is ", net[0])
    const connectionsInputToHidden =  tf.tensor2d(net[0])
    // console.log("net1 is ", net[1])
    const connectionsHiddenToOutput = tf.tensor2d(net[1])
    const bias1 = tf.tensor1d(net[2]), bias2 = tf.tensor1d(net[3]); 
    // run forward pass on inputVector
    const outputAndForwardPassData = forwardPass(inputVector, connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2)
    // return index of highest value from array (ties decided randomly)
    const highest = randomHighestNotOccupied(board, outputAndForwardPassData[3]) //outputAndForwardPassData[0] is the output array from forwardpass
    return [highest, ...outputAndForwardPassData]; // the forward pass data is passed along for training purposes
}

//returns an array of hiddenSums, hiddenValues ,outputSums and finally an array of the output values themselves  
function forwardPass(inputTensor, connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2){
    // console.log(`inputTensor has values ${inputTensor.dataSync()}`)
    // console.log(`connectionsInputToHidden has values ${connectionsInputToHidden.dataSync()}`)

    const hiddenSumsTensor = tf.add(inputTensor.matMul(connectionsInputToHidden), bias1); 
    // console.log(`hiddenSumsTensor has values ${hiddenSumsTensor.dataSync()}`)
    // console.log(`Handing some hidden values to reluOnTensor`)
    const hiddenValuesTensor = tf.tensor1d(reLUonTensor(hiddenSumsTensor)).reshape([1, 9]);
    
    // console.log("forwardPass: hiddenValuesTensor is: ", JSON.stringify(hiddenValuesTensor))
    const outputSums = tf.add(hiddenValuesTensor.matMul(connectionsHiddenToOutput), bias2);
    // console.log(`Giving reLU the following values as a tensor: `, outputSums.dataSync()) 
    const outputArray = reLUonTensor(outputSums);
    // console.log("forwardPass: outputArray is: ", JSON.stringify(outputArray))
    checkArrayHasDefinedValues(outputArray, 'outputArray', 'forwardPass',[inputTensor, connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2])

    return [hiddenSumsTensor.dataSync(),hiddenValuesTensor.dataSync(),outputSums.dataSync(),outputArray ]; 
}

// returns the index of the highest value from an array, deciding ties randomly. 
// start the indexList off with just 0 as a member
// if array[i] has a value equal to highestSoFar push i onto index list
// else if array[i] has a higher value than highestSoFar empty the indexList and write i
// return an index at random
function randomHighest(array){
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
    return indexList[Math.random()*indexList.length]; 
}

// looks through the currentBoard and an array of scores for potential moves
// returns the highest scoring square that is still empty, randomizing ties
function randomHighestNotOccupied(currentBoard, squareScores){
    // console.log("randomHighestNotOccupied: currentBoard is: ", currentBoard)
    // console.log("randomHighestNotOccupied: squareScores is: ", squareScores)
    checkArrayHasDefinedValues(squareScores, 'squareScores', 'randomHighestNotOccupied',[currentBoard, squareScores])
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
    checkArrayHasDefinedValues(tensor.dataSync, 'array', 'reLUonTensor',[tensor])

    // let x = array.dataSync()
    // x = Array.from(x);
    const output = tensor.dataSync().map(item => reLU(item))
    // let array = tensor.dataSync(); 
    // console.log("array to be given to relu is: ", array)
    // let output = []; 
    // for (let i = 0; i < array.length; i++){
    //     console.log(`feeding value ${array[i]} to reLU, which is the ${i}th value of ${array}`)
    //     output.push(reLU_(array[i]))
    // }
    // console.log("reLUonTensor:output is", output)
    checkArrayHasDefinedValues(output, 'output', 'reLUonTensor',[tensor])

    return output; 
  }



