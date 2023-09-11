// import * as tf from '@tensorflow/tfjs';
// import { checkArrayHasDefinedValues, returnArrayOfTypesOf } from '../testers/errorCheckers.js';
// import { numerizeBoard } from '../general/usefulFunctions.js';
// import { makeBiases, makeNetwork } from '../general/usefulFunctions.js';

// // const connectionsInputToHidden = tf.zeros([9, 9]);
// // const connectionsHiddenToOutput = tf.zeros([9, 9]);

// // const practiceBoardState = tf.tensor1d([1, 0, -1, 0, 0.3, 0, 0, 0, 0]).reshape([1, 9]);
// // const matrixShape = [9, 9];

// // const result = practiceBoardState.matMul(connectionsInputToHidden)

// // result.print();

// // the input net should be an array with two items
// // each item is itself an array of arrays representing a matrix
// // returns [0.recommended move, 1.hiddenSums, 2.hiddenValues, 3.outputSums, 4.output values]
// export function neuroChooseMove(board, net){
//     console.log("received net types are: ", returnArrayOfTypesOf(net))
//     board = numerizeBoard(board); 
//     // turn board into vector
//     const inputVector = tf.tensor1d(board).reshape([1, 9]);
//     // turn connection arrays into matrices 
//     // console.log("net0 is ", net[0])
//     const connectionsInputToHidden =  tf.tensor2d(net[0])
//     // console.log("net1 is ", net[1])
//     const connectionsHidden1ToHidden2 = tf.tensor2d(net[1])
//     const connectionsHidden2ToOutput = tf.tensor2d(net[2])

//     const bias1 = tf.tensor1d(net[3]), bias2 = tf.tensor1d(net[4]),  bias3 = tf.tensor1d(net[5]); 
//     // run forward pass on inputVector
//     const outputAndForwardPassData = forwardPass(inputVector, connectionsInputToHidden, connectionsHidden1ToHidden2,connectionsHidden2ToOutput, bias1, bias2, bias3)
//     // return index of highest value from array (ties decided randomly)
//     console.log("neuroChooseMove: output array is", outputAndForwardPassData[5])
//     const highest = randomHighestNotOccupied(board, outputAndForwardPassData[5]) //outputAndForwardPassData[3] is the output array from forwardpass
//     console.log("neuroChooseMove: highest is ", highest)
//     return [highest, ...outputAndForwardPassData]; // the forward pass data is passed along for training purposes & for presentational data 
// }

// // function tester(){
// //     //const [net, setNet] = useState([makeNetwork(),makeNetwork(), makeNetwork(), makeBiases(), makeBiases(), makeBiases()])
// //     let board = ['O', undefined, undefined, undefined, undefined, 'X', undefined, 'X', undefined]
// //     board = numerizeBoard(board);
// //     const inputVector = tf.tensor1d(board).reshape([1, 9]);
// //     return forwardPass(inputVector, makeNetwork(), makeNetwork(),makeNetwork(), makeBiases(), makeBiases(), makeBiases())
// // }

// // console.log(returnArrayOfTypesOf(tester()))


// //returns an array of hiddenSums, hiddenValues ,outputSums and finally an array of the output values themselves  
// function forwardPass(inputTensor, connectionsInputToHidden, connectionsHidden1ToHidden2, connectionsHidden2ToOutput, bias1, bias2, bias3){
//     // console.log(`inputTensor has values ${inputTensor.dataSync()}`)
//     // console.log(`connectionsInputToHidden has values ${connectionsInputToHidden.dataSync()}`)

//     const hiddenSumsTensor1 = tf.add(inputTensor.matMul(connectionsInputToHidden), bias1); 
//     //console.log(`hiddenSumsTensor has values ${hiddenSumsTensor.dataSync()}`)
//     // console.log(`Handing some hidden values to reluOnTensor`)
//     const hiddenValuesTensor1 = tf.tensor1d(reLUonTensor(hiddenSumsTensor1)).reshape([1, 9]);

//     const hiddenSumsTensor2 = tf.add(hiddenValuesTensor1.matMul(connectionsHidden1ToHidden2), bias2); 
//     const hiddenValuesTensor2 = tf.tensor1d(reLUonTensor(hiddenSumsTensor2)).reshape([1, 9]);
    
//     // console.log("forwardPass: hiddenValuesTensor is: ", JSON.stringify(hiddenValuesTensor))
//     const outputSums = tf.add(hiddenValuesTensor2.matMul(connectionsHidden2ToOutput), bias3);
//     // console.log(`Giving reLU the following values as a tensor: `, outputSums.dataSync()) 
//     const outputArray = reLUonTensor(outputSums);
//     // console.log("forwardPass: outputArray is: ", JSON.stringify(outputArray))
//     //checkArrayHasDefinedValues(outputArray, 'outputArray', 'forwardPass',[inputTensor, connectionsInputToHidden, connectionsHiddenToOutput, bias1, bias2])

//     return [hiddenSumsTensor1.dataSync(),hiddenValuesTensor1.dataSync(),hiddenSumsTensor2.dataSync(), hiddenValuesTensor2.dataSync(), outputSums.dataSync(), outputArray ]; 
// }

// // // returns the index of the highest value from an array, deciding ties randomly. 
// // // start the indexList off with just 0 as a member
// // // if array[i] has a value equal to highestSoFar push i onto index list
// // // else if array[i] has a higher value than highestSoFar empty the indexList and write i
// // // return an index at random
// // function randomHighest(array){
// //     let highestSoFar = array[0]; 
// //     let indexList = [0]; 
// //     for (let i = 1; i < array.length; i++){
// //         if (array[i] === highestSoFar){
// //             indexList.push(i);
// //         }
// //         else if (array[i] > highestSoFar) {
// //             indexList = [i]; 
// //             highestSoFar = array[i]; 
// //         } 
// //     }
// //     return indexList[Math.random()*indexList.length]; 
// // }

// // looks through the currentBoard and an array of scores for potential moves
// // returns the highest scoring square that is still empty, randomizing ties
// function randomHighestNotOccupied(currentBoard, squareScores){
//     console.log("randomHighestNotOccupied: currentBoard is: ", currentBoard)
//     console.log("randomHighestNotOccupied: squareScores is: ", squareScores)
//     checkArrayHasDefinedValues(squareScores, 'squareScores', 'randomHighestNotOccupied',[currentBoard, squareScores])
//     let highestSoFar = 0; 
//     let indexList = []; 
//     for (let i = 0; i < currentBoard.length; i++){
//         if (currentBoard[i] < 3){continue} // 3 encodes that the square is empty, < 3 means it's taken. 
//         else if (squareScores[i] === highestSoFar){
//             indexList.push(i);
//         }
//         else if (squareScores[i] > highestSoFar) {
//             indexList = [i]; 
//             highestSoFar = squareScores[i]; 
//         } 
//     }
//     console.log("randomHighestNotOccupied: indexList is: ", indexList)

//     return indexList[Math.floor(Math.random()*indexList.length)]; 
// }

// // function clippedReLU(value) {
// //     return tf.minimum(tf.maximum(value, 0), 1);
// //   }

// // function clippedReLU(value) {
// //     return Math.min(Math.max(value, 0), 1);
// //   }

// // function clippedreLUonTensor(array){
// //     // let x = array.dataSync()
// //     // x = Array.from(x);
// //     return array.dataSync().map(item => clippedReLU(item))
// //   }

// function reLU(value) {
//     const output = Math.max(value, 0)
//     // console.log(`reLU receiving input ${value}, returning output ${output}`)
//     return output;
//   }

 

// function reLUonTensor(tensor){
//     //checkArrayHasDefinedValues(tensor.dataSync, 'array', 'reLUonTensor',[tensor])


//     const output = tensor.dataSync().map(item => reLU(item))
    
//     //checkArrayHasDefinedValues(output, 'output', 'reLUonTensor',[tensor])

//     return output; 
//   }



