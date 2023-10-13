import * as tf from '@tensorflow/tfjs';

import { createModel } from './model.js';
import { whoseMove } from '../../../auxiliary/general/usefulFunctions.js';
import { minimaxChooseMove } from '../../../auxiliary/choiceFunctions/minimaxChooseMove.js';

export function labelPrepper(dataset) { // takes a training set as input
    
    // const encodedData = ohEncodeBoards(dataset); //oh means one-hot
    // const xs = tf.tensor2d(encodedData, [encodedData.length, 27]);
    console.log("Starting encoding of labels...")
    const encodedLabels = getAllLabels(dataset); // get all right answers, i.e. ask minimax then oh encode
    console.log("Finished encoding of labels!")
    return encodedLabels; 
}



// set xs as one hot encoded threeples representing X, O, _
// function ohEncodeBoards(dataSet){
//     let encodedData = []; 
//     for (let i = 0; i < dataSet.length; i++){
//         encodedData[i] = ohEncodeSingleBoard(dataSet[i])
//     }
//     return encodedData
//   }




// set ys as one hot encoded fourples representing win, draw, loss, impossible

function convertMinimax(array) {
    return array.map(item => {
        switch(item) {
            case 3:
                return [1, 0, 0, 0];
            case 2:
                return [0, 1, 0, 0];
            case 1:
                return [0, 0, 1, 0];
            default:
                return [0, 0, 0, 1];
        }
});
}

function getAllLabels(dataset){
    let oneHotDataSet = []; 
    for (let i = 0; i < dataset.length; i++){
        const whoseTurn = whoseMove(dataset[i]); 
        const minimaxArray = minimaxChooseMove(dataset[i], whoseTurn)[2];
        const oneHotArray = convertMinimax(minimaxArray).flat(); 
        oneHotDataSet.push(oneHotArray)
    }
    //console.log("oneHotDataSet[0] is : ", oneHotDataSet[0])
    return oneHotDataSet; 
} 




