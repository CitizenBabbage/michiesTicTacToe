import * as tf from '@tensorflow/tfjs';

import { createModel } from './model.js';
import { whoseMove } from '../../../auxiliary/general/usefulFunctions.js';
import { minimaxChooseMove } from '../../../auxiliary/choiceFunctions/minimaxChooseMove.js';


// export async function dataFeeder(dataset, model, epochs = 1, batchSize = 32 ) {
//     const encodedData = ohEncodeBoards(dataset); //oh means one-hot
//     const xs = tf.tensor2d(encodedData, [encodedData.length, 27]);
//     console.log("Starting encoding of labels...")
//     const encodedLabels = getAllLabels(dataset); // get all right answers, i.e. ask minimax
//     console.log("Finished encoding of labels!")
//     const ys = tf.tensor(encodedLabels, [encodedLabels.length, 9, 4]);
//     let accuracy = 0; 

    
export async function dataFeeder(model, dataset, encodedLabels, epochs = 1, batchSize = 32 ) {
    console.log("encoded labels received are of type: ", (typeof encodedLabels))
    // console.log("encoded labels are", encodedLabels)

    const ys = tf.tensor(encodedLabels, [encodedLabels.length, 9, 4]);

    const encodedData = ohEncodeBoards(dataset); //oh means one-hot
    const xs = tf.tensor2d(encodedData, [encodedData.length, 27]);
    let accuracy = 0; 

    // Train the model
    // const epochs = 20;
    // const batchSize = 32;
    
    await model.fit(xs, ys, {
        epochs: epochs,
        batchSize: batchSize
    }).then(info => {
        const accuracyArray = info.history.acc; 
        accuracy = accuracyArray[accuracyArray.length -1]; 
        console.log('Accuracy history: ', accuracyArray);
        console.log('Final accuracy: ', accuracy);
    });
    // add validation check here
    console.log("returning model and accuracy ")

    return [model, accuracy] ;  
}


// set xs as one hot encoded threeples representing X, O, _
export function ohEncodeBoards(dataSet){ //oh means one-hot
    let encodedData = []; 
    for (let i = 0; i < dataSet.length; i++){
        encodedData[i] = ohEncodeSingleBoard(dataSet[i])
    }
    return encodedData
  }

export function ohEncodeSingleBoard(board){ //oh means one-hot
    return board.map(item => item === 'X'? [1,0,0]: item === 'O'? [0,1,0]: [0,0,1]).flat()
}







