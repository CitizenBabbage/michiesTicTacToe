import {areEquivalent, equivalenceScore, areIdentical, reverseTransformBoard, reflection, rotation, reverseRotation, reflectNumber, nextWheel} from "./usefulFunctions.js"
import {db} from './databaseFormatted.js' //assert { type: "json" };
//const boardStatesDB = require('./databaseFormatted.json');

import {corner, edge} from './globals.js'

let example = [
    'O', null, 'O',
    'X', null, 'X',
    'X', null, 'O'
  ]
const boardStatesDB = db; 
const dummyObject = {
    "id":-1,
    "state":[
       "Err",
       "Err",
       "Err",
       "Err",
       "Err",
       "Err",
       "Err",
       "Err",
       "Err"
    ],
    "turn":"Err",
    "response":[
        "Err",
        "Err",
        "Err",
        "Err",
        "Err",
        "Err",
        "Err",
        "Err",
        "Err"
    ],
    "transform":[
       NaN,
       NaN
    ]
 }

//console.log("object corresponding to ['X','X',null,'O','O',null,'X','O',null] is: ", getBoardObject(['X','X',null,'O','O',null,'X','O',null]))
//console.log("move chosen in response to ['X','X',null,'O','O',null,'X','O',null] is: ", chooseMove(['X','X',null,'O','O',null,'X','O',null]))

// takes board state, returns move chosen

export function chooseMove(board){
    console.log("chooseMove. Received board state is :", board)
    const obj = getBoardObject(board); 
    // console.log("object is:", obj); 
    if (obj) {return chooseMoveFromObject(obj)}
    else console.log(`Error: no object returned for board state ${board}`)

}

//console.log(chooseMove(example))
console.log(equivalenceScore(example, [
    'X', null, 'O',
    'X', null, 'X',
    'O', null, 'O'
  ]))

// db contains ARCHETYPAL board states---i.e. not every equivalent flip and rotation
// this function takes board state, and returns the archetype of which it is a flip/rotation
// changes transform, however, to represent the change needed to recover input board state 
export function getBoardArchetype(boardState){
    for (let i = 0; i < boardStatesDB.length; i++){
        if (areEquivalent(boardState, boardStatesDB[i].state)){
            //console.log(`BoardState[0] is ${boardState[0]} and boardStatesDB[i].state[8] is ${boardStatesDB[i].state[8]}`)

            //console.log(`type of BoardState is ${typeof boardState} and type of boardStatesDB[i].state is ${typeof boardStatesDB[i].state}`)
            //console.log(`BoardState is ${boardState} and boardStatesDB[i].state is ${boardStatesDB[i].state}`)
            let boardObject = boardStatesDB[i]; 
            boardObject.transform = equivalenceScore(boardState, boardStatesDB[i].state)
            //console.log("1. transform is: ", boardObject.transform)
            return boardObject; 
        }
    }
    return dummyObject; 
}

// this gets an archetypal board state + transform using getBoardArchetype and 
// returns an object with the board state and response array back-rotated and back-flipped
// according to the transform 
export function getBoardObject(boardState){
    let arche = getBoardArchetype(boardState) 
    console.log(`1. corresponding archetype to ${boardState} is: `, JSON.parse(JSON.stringify(arche)));
    console.log("2. transform is: ", JSON.parse(JSON.stringify(arche.transform)));
    console.log("3. arche.state BEFORE transform is: ", JSON.parse(JSON.stringify(arche.state)));
    console.log(`4. corresponding archetype to ${boardState} is: `, JSON.parse(JSON.stringify(arche)));
    arche.state = reverseTransformBoard(arche.state, arche.transform);
    console.log("5. arche.state AFTER transform is: ", JSON.parse(JSON.stringify(arche.state)));
    // console.log(`1. corresponding archetype to ${boardState} is: `, arche)
    // console.log("2. transform is: ", arche.transform)
    // console.log("3. arche.state BEFORE transform is: ", arche.state)
    // console.log(`4. corresponding archetype to ${boardState} is: `, arche)
    // arche.state = reverseTransformBoard(arche.state, arche.transform)
    // console.log("5. arche.state AFTER transform is: ", arche.state)

    if (!areIdentical(arche.state,boardState)){console.log(`Error: ${arche.state} not equal to ${boardState}`); return}
    arche.response = reverseTransformBoard(arche.response, arche.transform)
    return arche; 
}


// takes object, returns move chosen 

export function chooseMoveFromObject(object){
    let x = Math.random(); 
    // console.log("random is :", x)
    let probSum = 0; 
    for (let i = 0; i < object.response.length; i++){
        // console.log("probSum is now:", probSum)
        probSum += object.response[i]; 
        if (x < probSum){return i}
    }
    console.log(`Error: object scanned without probability satisfaction`)
}




//console.log("console log: reverse transformation is: ", reverseTransformation(2, [0,1]))






