// import {areEquivalent, equivalenceScore, areIdentical, reverseTransformBoard} from "../../general/usefulFunctions.js"
// import { checkSum, checkDbase, checkArchetype } from "../../testers/errorCheckers.js";


// //this choosemove function works by: 
// //  1. Finding the object in the database (the "archetype") that is the equivalent of the boardstate presented. 
// //  2. recording the rotation and flip needed to get from the board state to the archetype as "transform" 
// //  3. Getting the response array from the archetype
// //  4. applying the reverse of the transform to the response array to get the applicable response array. 

// export function menaceChooseMove(board, dbase){
//     // ///////////tests///////////////
//     // checkDbase(dbase,"menaceChooseMove")
//     // testForChangeInFirstObjectInDataBase(dbase); // just a test to make sure learning is updating
//     // ///////////code///////////////
//     let arche = JSON.parse(JSON.stringify(getBoardArchetype(board, dbase))) // returns an object from database with learned response array and transform set to indicate rotation/flip required
//     //checkArchetype(arche)
//     const probabilityArray = getProbabilityArray(board, arche); // reverses the transformation needed to find the archetype on the response array, to yield a probability array for the initial board state
//     //checkSum(obj.response, "menaceChooseMove");  
//     if (probabilityArray) {return [chooseMoveFromProbabilityArray(probabilityArray),probabilityArray]} //return the chosen move and the response array that led to it. 
//     else throw new Error(`Error in menaceChooseMove: no array returned for board state ${board}`)

// }



// // just a test that helps make sure the database is updating
// function testForChangeInFirstObjectInDataBase(dbase){
//     if (areIdentical(dbase[0].response, [
//         0.1111111111111111,
//         0.1111111111111111,
//         0.1111111111111111,
//         0.1111111111111111,
//         0.1111111111111111,
//         0.1111111111111111,
//         0.1111111111111111,
//         0.1111111111111111,
//         0.1111111111111111
//      ])){console.log("WARNING: First board state unchanged in database")}
// }

// //console.log(chooseMove(example))
// // console.log(equivalenceScore(example, [
// //     'X', null, 'O',
// //     'X', null, 'X',
// //     'O', null, 'O'
// //   ]))

// // db contains ARCHETYPAL board states---i.e. not every equivalent flip and rotation
// // this function takes board state, and returns the archetype of which it is a flip/rotation
// // changes transform, however, to represent the change needed to recover input board state 
// export function getBoardArchetype(boardState, dbase){
//     for (let i = 0; i < dbase.length; i++){
//         if (areEquivalent(boardState, dbase[i].state)){
//             let boardObject = dbase[i]; 
//             boardObject.transform = equivalenceScore(boardState, dbase[i].state)
//             return boardObject; 
//         }
//     }
//     return dummyObject; //if all else fails, return something
// }


// // returns an array of probabilities from the response array of the archetype,
// // back-rotated and back-flipped according to the transform 

// export function getProbabilityArray(boardState, arche){ 
//     checkTransformReversesState(boardState,arche.state, arche.transform,"menaceChooseMove/getProbabilityArray")
//     const probabilityArray = reverseTransformBoard(arche.response, arche.transform)
//     return probabilityArray; 
// }

// function checkTransformReversesState(boardState, archetypeState, transform, funcName){
//     const reverseTransformedArcheState = reverseTransformBoard(archetypeState,transform); 
//     if (!areIdentical(reverseTransformedArcheState,boardState)) new Error(`in ${funcName}: ${reverseTransformedArcheState} not equal to ${boardState}`)
// }





// // takes object, returns move chosen 

// export function chooseMoveFromProbabilityArray(probabilityArray){
//     checkSum(probabilityArray, "chooseMoveFromProbabilityArray"); 
//     let rand = Math.random(); 
//     let probSum = 0; 
//     for (let i = 0; i < probabilityArray.length; i++){
//         probSum += probabilityArray[i]; // add the first probability in the array to probsum
//         if (rand < probSum){return i} // if rand is less than that, that's the move
//     }
//     throw new Error(`Error in menaceChooseMove/chooseMoveFromProbabilityArray: object scanned without probability satisfaction`)
// }





// //console.log("console log: reverse transformation is: ", reverseTransformation(2, [0,1]))

// // console.log(chooseMove(['X', 'X', null, 'X', 'X', 'O', null, 'O', 'O']))

// // console.log(equivalenceScore(['X', 'X', null, 'X', 'X', 'O', null, 'O', 'O'], [null, 'X', 'X', 'O', 'X', 'X', 'O', 'O', null]))

// const dummyObject = {
//     "id":-1,
//     "state":[
//        "DummyState",
//        "DummyState",
//        "DummyState",
//        "DummyState",
//        "DummyState",
//        "DummyState",
//        "DummyState",
//        "DummyState",
//        "DummyState"
//     ],
//     "turn":"DummyTurn",
//     "response":[
//         "DummyResponse",
//         "DummyResponse",
//         "DummyResponse",
//         "DummyResponse",
//         "DummyResponse",
//         "DummyResponse",
//         "DummyResponse",
//         "DummyResponse",
//         "DummyResponse"
//     ],
//     "transform":[
//        NaN,
//        NaN
//     ]
//  }
