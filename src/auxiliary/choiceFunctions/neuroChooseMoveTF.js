import * as tf from '@tensorflow/tfjs';
import { ohEncodeSingleBoard } from "../../components/neuro/neuroTFmodel/datafeeder.js";


// returns [0.recommended move, 1.[hiddenSums, hiddenValues], 2.output values]
export function neuroChooseMove(board, model){
    const boardvector = ohEncodeSingleBoard(board);    // turn board into vector
    const inputVector = tf.tensor1d(boardvector).reshape([1, 27]);
    // console.log("inputVector.shape is ", inputVector.shape)
    const prediction = model.predict(inputVector); // returns a tensor with shape [9,4]
    const predictionArray = prediction.arraySync();
    // console.log("neuroChooseMove: predictionArray is : ", predictionArray)
    const moveAndArray = getRecommended(board, predictionArray)// return index of highest value from array (ties decided randomly)
    return moveAndArray; 
}

//expects an array of shape 9,4
function getRecommended(board, softMaxedOneHots){
    // console.log("getRecommended: softMaxedOneHots.length is : ", softMaxedOneHots.length)
    const outputArray = reduceAllOneHotsToScores(softMaxedOneHots); 
    // console.log("getRecommended: outputArray is : ", outputArray)
    const highest = randomHighestNotOccupied(board, outputArray) 
    return [highest, outputArray]; 
}

// this takes a one-hot encoding of probabilities (i.e. post-softmax) and produces a score for that move
// by multiplying the probability of a win by 3, the probability of a draw by 2, 
// the probability of a loss by 1 (since at least a losing move is a possible move) and adding them together.  
function reduceOneHotEncodingToScore(arrayOf4){
    // console.log("reduceOneHotEncodingToScore: arrayOf4 is : ", arrayOf4)

    return (3*arrayOf4[0])+(2*arrayOf4[1])+ arrayOf4[2]; 
}



function reduceAllOneHotsToScores([arrayOfArrays]){
    let outputArray = []; 
    // console.log("reduceAllOneHotsToScores: arrayOfArrays.length is : ", arrayOfArrays.length)
    for (let i = 0; i < arrayOfArrays.length; i++){
        // console.log("reduceAllOneHotsToScores: arrayOfArrays[i] is : ", arrayOfArrays[i])

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

