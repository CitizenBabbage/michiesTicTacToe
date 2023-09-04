import * as tf from '@tensorflow/tfjs';

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
    const connectionsInputToHidden =  tf.tensor2d(net[0],matrixShape)
    const connectionsHiddenToOutput = tf.tensor2d(net[1],matrixShape)
    const bias1 = tf.tensor1d(net[2]), bias2 = tf.tensor1d(net[3]); 
    // run forward pass on inputVector
    const outputAndForwardPassData = forwardPass(inputVector, connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2)
    // return index of highest value from array (ties decided randomly)
    const highest = randomHighestNotOccupied(board, outputAndForwardPassData[3]) //outputAndForwardPassData[0] is the output array from forwardpass
    return [highest, ...outputAndForwardPassData]; // the forward pass data is passed along for training purposes
}

function forwardPass(inputTensor, connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2){
    const hiddenSumsTensor = tf.add(inputTensor.matMul(connectionsInputToHidden), bias1); 
    const hiddenValuesTensor = tf.tensor1d(reLUonTensor(hiddenSumsTensor)).reshape([1, 9]);
    
    console.log("forwardPass: hiddenValuesTensor is: ", JSON.stringify(hiddenValuesTensor))
    const outputSums = tf.add(hiddenValuesTensor.matMul(connectionsHiddenToOutput), bias2); 
    const outputArray = reLUonTensor(outputSums);
    console.log("forwardPass: outputArray is: ", JSON.stringify(outputArray))

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
    console.log("randomHighestNotOccupied: currentBoard is: ", currentBoard)
    console.log("randomHighestNotOccupied: squareScores is: ", squareScores)

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
    console.log("randomHighestNotOccupied: indexList is: ", indexList)

    return indexList[Math.floor(Math.random()*indexList.length)]; 
}

// function clippedReLU(value) {
//     return tf.minimum(tf.maximum(value, 0), 1);
//   }

function clippedReLU(value) {
    return Math.min(Math.max(value, 0), 1);
  }

function clippedreLUonTensor(array){
    // let x = array.dataSync()
    // x = Array.from(x);
    return array.dataSync().map(item => clippedReLU(item))
  }

function reLU(value) {
    return Math.max(value, 0);
  }

function reLUonTensor(array){
    // let x = array.dataSync()
    // x = Array.from(x);
    return array.dataSync().map(item => reLU(item))
  }

function numerizeBoard(board){
    let numberBoard = []; 
    for (let i = 0; i < board.length; i++){
        if (board[i] === 'X'){numberBoard[i] = 1}
        else if (board[i] === 'O'){numberBoard[i] = -1}
        else numberBoard[i] = 0; 
    }
    return numberBoard; 
}

console.log(clippedreLUonTensor(practiceBoardState))