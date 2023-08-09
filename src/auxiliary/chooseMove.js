import {areEquivalent, equivalenceScore, areIdentical, reverseTransformBoard, reflection, rotation, reverseRotation, reflectNumber, nextWheel} from "./usefulFunctions.js"
import {db} from './databaseFormatted.js' //assert { type: "json" };
//const boardStatesDB = require('./databaseFormatted.json');
import { calculateWinner } from "./checkWinner.js";
import {corner, edge} from './globals.js'

const boardStatesDB = db; 

//For testing
let example = [
    'O', null, 'O',
    'X', null, 'X',
    'X', null, 'O'
  ]
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

export function chooseMove(board, dbase){
    console.log("1. board is ", board)
    let whoseTurn = whoseMove(board); 
    console.log("global turn is set to ", whoseTurn)
    return [minimaxChooseMove(board, whoseTurn),["n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a"]]; 
}

function mediocrePlayer(board, turn){
    let chosenMove = null; 
    let bestScore = -100; 
    let whoseTurn = whoseMove(board); 
    for (let i = 0; i < board.length; i++){
        let tempboard = [...board]; 
        if (tempboard[i] !== undefined && tempboard[i] !== null) continue; 
        tempboard[i] = whoseTurn; // place whoever's turn it is into empty slot
        let winner = calculateWinner(tempboard)
        if (winner === turn){ // if this is a winning position for the player evaluating the series of plays
            if (bestScore < 10){
                chosenMove = i; 
                bestScore = 10
            }
        }
        else if (["X","O"].includes(winner)){ // otherwise if there's a winner defined, it's the other guy
            if (bestScore < -10){
                chosenMove = i; 
                bestScore = -10
                }
            }
        else if (winner === "D"){
            if (bestScore < 0){
                chosenMove = i; 
                bestScore = 0
                }
            }
        else {
            let mr = minimaxRecurse(tempboard); 
            if (bestScore < mr[1]){
                chosenMove = mr[0]; 
                bestScore = mr[1]
                }
            }
        }
    return [chosenMove,bestScore]
    }

function minimaxChooseMove(board, whoseTurn){
    return minimaxRecurse(board,whoseTurn)[0]
}
function minimaxRecurse(board, turn){
    
    let moveArray = [null,null,null,null,null,null,null,null,null]
    let whoseTurn = whoseMove(board); 
    //console.log(`local turn for ${board} is set to `, whoseTurn)
    for (let i = 0; i < board.length; i++){
        let tempboard = [...board]; 
        
        if (tempboard[i] !== undefined && tempboard[i] !== null) continue; 
        tempboard[i] = whoseTurn; // place whoever's turn it is into empty slot
        let winner = calculateWinner(tempboard)
        //console.log(`for board ${tempboard} we have winner ${winner} and last turn ${turn}`)
        if (winner === turn){ // if this is a winning position for the player evaluating the series of plays
            moveArray[i] = 10; 
            }
        else if (["X","O"].includes(winner)){ // otherwise if there's a winner defined, it's the other guy
            moveArray[i] = -10; 
        }
        else if (winner === "D"){
            moveArray[i] = 0; 
            }
        else {
            let mr = minimaxRecurse(tempboard, turn); 
            moveArray[i] = mr[1]; 
            }
        }
        //console.log(` moveArray for ${board} when it's ${whoseTurn}'s turn is `, moveArray)
        let moveAndAssociatedScore = getMoveAndAssociatedScore(board, moveArray, turn, whoseTurn)
        return moveAndAssociatedScore
    }

    function getMoveAndAssociatedScore(board, moveArray, turn, whoseTurn){
        let recommendedMove = 0, highestSoFar = -11, lowestSoFar = 11, recommendedMoveScore = -1; 
        // console.log("getMoveAndAssociatedScore, received board ", board) 
        // console.log("getMoveAndAssociatedScore, received moveArray ", moveArray) 
        if (whoseTurn === turn){
            for (let i = 0; i < moveArray.length; i++){
                if (moveArray[i] === null) continue; 
                if (moveArray[i] > highestSoFar){
                    highestSoFar = moveArray[i]; 
                    recommendedMove = i; 
                    recommendedMoveScore = highestSoFar; 
                }
                //if (moveArray[i] === 10){console.log(`It's my (${turn}'s) turn, and moving to position ${i} on board ${board} leads to a winning position for me`)}
            }
        }
        else {
            for (let i = 0; i < moveArray.length; i++){
                if (moveArray[i] === null) continue; 
                if (moveArray[i] < lowestSoFar){
                    lowestSoFar = moveArray[i];
                    recommendedMove = i; 
                    recommendedMoveScore = lowestSoFar; 
                }
                //if (moveArray[i] === -10){console.log(`Its my opponent's turn, and moving to position ${i} on board ${board} leads to a losing position for me, ${turn}`)}
            }
        }
        console.log("getMoveAndAssociatedScore, recommending move ", recommendedMove) 
        return [recommendedMove, recommendedMoveScore]
    
    }
   
function whoseMove(board){
    let xes = 0; 
    let oes = 0; 
    for (let i = 0; i < board.length; i++){
        if (board[i] === "X"){xes+=1}
        else if (board[i] === "O"){oes+=1}
        else continue; 
    }
    if (oes === xes) return "X"; 
    else return "O"; 
}

export function menaceChooseMove(board, dbase){
    testForChangeInFirstObjectInDataBase(dbase); // just a test to make sure learning is updating
    const obj = getBoardObject(board, dbase); 
    if (obj) {return [chooseMoveFromObject(obj),obj.response]}
    else console.log(`Error: no object returned for board state ${board}`)

}

// just a test that helps make sure the database is updating
function testForChangeInFirstObjectInDataBase(dbase){
    if (areIdentical(dbase[0].response, [
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111
     ])){console.log("WARNING: First board state unchanged in database")}
}

//console.log(chooseMove(example))
// console.log(equivalenceScore(example, [
//     'X', null, 'O',
//     'X', null, 'X',
//     'O', null, 'O'
//   ]))

// db contains ARCHETYPAL board states---i.e. not every equivalent flip and rotation
// this function takes board state, and returns the archetype of which it is a flip/rotation
// changes transform, however, to represent the change needed to recover input board state 
export function getBoardArchetype(boardState, dbase){
    for (let i = 0; i < dbase.length; i++){
        if (areEquivalent(boardState, dbase[i].state)){
            //console.log(`BoardState[0] is ${boardState[0]} and boardStatesDB[i].state[8] is ${boardStatesDB[i].state[8]}`)

            //console.log(`type of BoardState is ${typeof boardState} and type of boardStatesDB[i].state is ${typeof boardStatesDB[i].state}`)
            //console.log(`BoardState is ${boardState} and boardStatesDB[i].state is ${boardStatesDB[i].state}`)
            let boardObject = dbase[i]; 
            boardObject.transform = equivalenceScore(boardState, dbase[i].state)
            //console.log("1. transform is: ", boardObject.transform)
            return boardObject; 
        }
    }
    return dummyObject; 
}

// this gets an archetypal board state + transform using getBoardArchetype and 
// returns an object with the board state and response array back-rotated and back-flipped
// according to the transform 
export function getBoardObject(boardState, dbase){
    let arche = getBoardArchetype(boardState, dbase) 
    // console.log(`1. corresponding archetype to ${boardState} is: `, JSON.parse(JSON.stringify(arche)));
    // console.log("2. transform is: ", JSON.parse(JSON.stringify(arche.transform)));
    // console.log("3. arche.state BEFORE transform is: ", JSON.parse(JSON.stringify(arche.state)));
    // console.log(`4. corresponding archetype to ${boardState} is: `, JSON.parse(JSON.stringify(arche)));
    arche.state = reverseTransformBoard(arche.state, arche.transform);
    // console.log(arche.state);
    // console.log("5. arche.state AFTER transform is: ", JSON.parse(JSON.stringify(arche.state)));
    if (!areIdentical(arche.state,boardState)){console.log(`Error: ${arche.state} not equal to ${boardState}`); return}
    arche.response = reverseTransformBoard(arche.response, arche.transform)
    return arche; 
}

// takes object, returns move chosen 

export function chooseMoveFromObject(object){
    let rand = Math.random(); 
    let probSum = 0; 
    for (let i = 0; i < object.response.length; i++){
        // console.log("probSum is now:", probSum)
        probSum += object.response[i]; // add the first probability in the response array to probsum
        if (rand < probSum){return i} // if rand is less than that, that's the move
    }
    console.log(`Error: object scanned without probability satisfaction`)
}




//console.log("console log: reverse transformation is: ", reverseTransformation(2, [0,1]))

// console.log(chooseMove(['X', 'X', null, 'X', 'X', 'O', null, 'O', 'O']))

// console.log(equivalenceScore(['X', 'X', null, 'X', 'X', 'O', null, 'O', 'O'], [null, 'X', 'X', 'O', 'X', 'X', 'O', 'O', null]))


