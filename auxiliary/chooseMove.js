import {areEquivalent, equivalenceScore, areIdentical, transformBoard, reflection, rotation, reverseRotation, reflectNumber, nextWheel} from "./usefulFunctions.js"
import boardStatesDB from './databaseFormatted.json' assert { type: "json" };
//const boardStatesDB = require('./databaseFormatted.json');

import {corner, edge} from './globals.js'

//console.log("object corresponding to ['X','X',null,'O','O',null,'X','O',null] is: ", getBoardObject(['X','X',null,'O','O',null,'X','O',null]))
//console.log("move chosen in response to ['X','X',null,'O','O',null,'X','O',null] is: ", chooseMove(['X','X',null,'O','O',null,'X','O',null]))

// takes board state, returns move chosen

export function chooseMove(board){
    const obj = getBoardObject(board); 
    console.log("object is:", obj); 
    return chooseMoveFromObject(obj); 
}

console.log(chooseMove(['X',null,null,null,null,null,null,null,null]))

// db contains ARCHETYPAL board states---i.e. not every equivalent flip and rotation
// this function takes board state, and returns the archetype of which it is a flip/rotation
// changes transform, however, to represent the change needed to recover input board state 
export function getBoardArchetype(boardState){
    for (let i = 0; i < boardStatesDB.length; i++){
        if (areEquivalent(boardState, boardStatesDB[i].state)){
            console.log(`BoardState is ${boardState} and boardStatesDB[i].state is ${boardStatesDB[i].state}`)
            let boardObject = boardStatesDB[i]; 
            boardObject.transform = equivalenceScore(boardState, boardStatesDB[i])
            console.log("1. transform is: ", boardObject.transform)
            return boardObject; 
        }
    }
}

// this gets an archetypal board state + transform using getBoardArchetype and 
// returns an object with the board state and response array back-rotated and back-flipped
// according to the transform 
export function getBoardObject(boardState){
    let arche = getBoardArchetype(boardState) 
    console.log("2. transform is: ", arche.transform)

    arche.state = transformBoard(arche.state, arche.transform)
    if (!areIdentical(arche.state,boardState)){console.log(`Error: ${arche.state} not equal to ${boardState}`); return}
    arche.response = transformBoard(arche.response, arche.transform)
    return arche; 
}

// takes object, returns move chosen 

export function chooseMoveFromObject(object){
    let x = Math.random(); 
    console.log("random is :", x)
    let probSum = 0; 
    for (let i = 0; i < object.response.length; i++){
        console.log("probSum is now:", probSum)
        probSum += object.response[i]; 
        if (x < probSum){return i}
    }
    console.log(`Error: object scanned without probability satisfaction`)
}


// takes number of square and transformation that resulted in that square
//, and returns the number of the square under the reverse of that transformation

export function reverseTransformation(number, transformation){
    let index; 
    number = reverseRotation(number,transformation[1]); 
    if (transformation[0]===1){number = reflectNumber(number)}; 
    //console.log("number after flip (if any) equals: ", number)
    return number
}

//console.log("console log: reverse transformation is: ", reverseTransformation(2, [0,1]))






