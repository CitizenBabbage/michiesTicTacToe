import {containsXline, containsOline, xCounter, oCounter} from "../general/usefulFunctions.js"
import {areEquivalent} from '../general/usefulFunctions.js'

//////////////FUNCTIONS//////////////

////F0////


// calculates all good board states, then iterates through the list creating an object for each, 
// returns array of objects 

export function createAllBeadStateObjects(num){
    const allBoards = generateGoodBoardStates(num);
    let database = allBoards.map((item,index) => buildBeadObject(item,index))
    database = reduceOptionsOnFirstMove(database)
    return database
}



//this cycles through database looking for objects with no more than one move played (which must be X) 
// when found it calls the function reducing the options on the response array  
function reduceOptionsOnFirstMove(database){
    for (let i = 0; i < database.length; i++){
        if (containsOneXOrNothing(database[i].state)){
            database[i] = reduceOptions(database[i])
        }
    }
    return database; 
}

// takes an object that should have no more than one move played
// and reduces the options on the first move to eliminate equivalent options, 
// This greatly reduces the learning space
function reduceOptions(object){
        let newResponseArray = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]; 
        let xFound = false; 
        if (object.state[4] === 'X') { //if the opening move was x to centre
            newResponseArray[0] = 4; 
            newResponseArray[1] = 4;  // there are only two moves left (edge and corner) which should get a 50/50 probability
            xFound = true; 
        }
        else for (let j = 0; j < object.state.length; j++){ //else find where the X was put
            if (object.state[j] === 'X'){
                newResponseArray[4] = 4; 
                newResponseArray[oppositeCorner(j)] = 4; 
                newResponseArray[adjacentCorner(j)] = 4; 
                newResponseArray[oppositeEdge(j)] = 4; 
                newResponseArray[adjacentEdge(j)] = 4; 
                xFound = true; 
                break; 
            }
        }
        if (!xFound) newResponseArray = [ 4, 4, 0, 0, 4, 0, 0, 0, 0]
        object.response = newResponseArray; 
        return object; 
    }
    

function oppositeCorner(num){
    switch(num) {
        case 0:
            return 8
        case 1:
            return 8;
        case 2:
            return 6; 
        case 3:
            return 2;  
        case 5:
            return 6;
        case 6:
            return 2;
        case 7:
            return 0;
        case 8:
            return 0; 
        default:
            console.error("Error in oppositeCorner, must receive input 0 through 3 or 5 through 8")
    }
}

function adjacentCorner(num){
    switch(num) {
        case 0:
            return 2;
        case 1:
            return 2;
        case 2:
            return 8; 
        case 3:
            return 0;  
        case 5:
            return 8;
        case 6:
            return 0;
        case 7:
            return 6;
        case 8:
            return 6; 
        default:
            console.error("Error in adjacentCorner, must receive input 0 through 3 or 5 through 8")
    }
}


function oppositeEdge(num){
    switch(num) {
        case 0:
            return 5;
        case 1:
            return 7;
        case 2:
            return 7; 
        case 3:
            return 5;  
        case 5:
            return 3;
        case 6:
            return 1;
        case 7:
            return 1;
        case 8:
            return 3; 
        default:
            console.error("Error in oppositeEdge, must receive input 0 through 3 or 5 through 8")
    }
}

function adjacentEdge(num){
    switch(num) {
        case 0:
            return 1;
        case 1:
            return 5;
        case 2:
            return 5; 
        case 3:
            return 1;  
        case 5:
            return 7;
        case 6:
            return 3;
        case 7:
            return 3;
        case 8:
            return 7; 
        default:
            console.error("Error in adjacentEdge, must receive input 0 through 3 or 5 through 8")
    }
}


// function setProbability( array ){
//     let oppositeCorners = 0, adjacentCorners = 0, oppositeEdges = 0, adjacentEdges = 0; 
//     if (database[i].state[4] === 'X') {//if the opening move was x to centre
//         return 0.5  // there are only two moves left (edge and corner) which should get a 50/50 probability
//     }
//     else return 0.2; // else there are five genuinely distinct moves
// }
    

function containsOneXOrNothing(array){
    let takenSquares = 0; 
    let xes = 0; 
    for (let i = 0; i < array.length; i++){
        if (array[i]==='X'){
            takenSquares += 1; 
            xes += 1;
        }
        else if (array[i]==='O'){
            takenSquares += 1; 
        }
    }
    if (xes === takenSquares) return true
    else return false
}


// takes a board state and number as input and returns an object, with properties: 
        // id: a number
		// state: an array of nine elements. 
		// turn: either "X" or "O".  
		// response: an array of length 9


function buildBeadObject(board,id){
    return {
        id: id,
        state: board,
        turn: calculateTurn(board),
        response: initializeBeadArray(board),
        transform: [0,0]
    }
}

//takes a board state as input and returns whose turn it is to play
function calculateTurn(board){
    return xCounter(board) > oCounter(board)? 'O' : 'X';
}

// puts a number of beads in the response array proportional to the stage in the game
// Early board states get 4 beads per empty square. Later boards 3, 2 and finally 1. 
// This means losing moves in the end stages are more heavily penalized. 
// This models Michie's system. 

function initializeBeadArray(array){
    let filledSquares = countFilledSquares(array);
    if (filledSquares > 7){ // this is a forced move, but to keep a consistent algo, I just give it 100 beads. 
        return array.map((item, index) => {return array[index]? 0: 100})
    }
    else if (filledSquares > 5){ // 6 or 7 squares filled
        return array.map((item, index) => {return array[index]? 0: 1})
    }
    else if (filledSquares > 3){ // 4 or 5 squares filled
        return array.map((item, index) => {return array[index]? 0: 2})
    }
    else if (filledSquares > 1){ // 2 or 3 squares filled 
        return array.map((item, index) => {return array[index]? 0: 3})
    }
    else { // 0 or 1 squares filled 
        return array.map((item, index) => {return array[index]? 0: 4})
    }
}

// counts the squares that are filled. 
function countFilledSquares(array){
    return array.reduce((count,item) => {return item? count+1 : count },0)
}


////F1////


export function generateGoodBoardStates(num){
    const allBoardStates = generateAllBoards(num); 
    let legalStates = removeNumericallyIllegalBoards(allBoardStates);
    let newLegalStates = removeUnreachables(legalStates); 
    newLegalStates = removeFullBoardStates(newLegalStates); 
    return removeEquivalents(newLegalStates)
}

// these may be legal but they do not present an opportunity for a move, and hence do not belong
// n our database
export function removeFullBoardStates(db){
    return db.filter((item) => item.includes(undefined))
}


////F1.1 generateAllBoards////


export function generateAllBoards(num) {
    if (num === 0){return [[]]}
    else {
        let boards = generateAllBoards(num-1)
        let first = boards.map((i) => [undefined,...i])
        let second = boards.map((i) => ['X',...i])
        let third = boards.map((i) => ['O',...i])
        return [...first, ...second, ...third]
        }
    }





////F1.2 removeNumericallyIllegalBoards////

    // because X goes first and they otherwise take turns...
    // a board is numerically legal iff the number of X's is either equal to or one greater 
    // than the number of Os 


export function removeNumericallyIllegalBoards(arrayOfArrays){
    for (let i = 0; i < arrayOfArrays.length; i++){
        return arrayOfArrays.filter((i) => isNumericallyLegal(i) )
    }
}




//F1.2.1 isNumericallyLegal //


function isNumericallyLegal(board) {
    const xsum = xCounter(board);
    const osum = oCounter(board);
    if (xsum > osum + 1) {
        return false}
    else if (osum > xsum) {
        return false}
    else return true; 
}




////F1.3 removeUnreachables////

//A board state is unreachable if the game would halt before reaching it


export function removeUnreachables(arrayOfArrays){
    return arrayOfArrays.filter((item) => !containsXLineAndOLine(item) && !containsXwinPlusEqualOs(item) && !containsOwinPlusOneExtraX(item))
}




//F1.3.1 containsXLineAndOLine //

// detects an unreachable type of board state.
// returns true if given board state has a line of X's and a line of O's


function containsXLineAndOLine(boardState){
  return containsXline(boardState) && containsOline(boardState); 
}




//F1.3.2 containsXwinPlusEqualOs //

// detects an unreachable type of board state.
// The game halts when X wins, so O has no opportunity to catch up numerically


function containsXwinPlusEqualOs(boardState){
    const osum = oCounter(boardState);
    const xsum = xCounter(boardState);
    return containsXline(boardState) && xsum === osum; 
}




//F1.3.3 containsOwinPlusOneExtraX //

// The game halts when O wins, so X has no opportunity to move ahead numerically


function containsOwinPlusOneExtraX(boardState){
    const osum = oCounter(boardState);
    const xsum = xCounter(boardState);
    return containsOline(boardState) && xsum === osum +1; 
}








////F1.4 removeEquivalents////

//Equivalent board states are identical under reflection and/or rotation

//F1.4.1 removeEquivalents//

function removeEquivalents(arrayOfBoards){
    let newArray = []; 
    for (let i = 0; i < arrayOfBoards.length; i++){
        if (isEquivalentToBoardOnList(arrayOfBoards[i],newArray)){
            continue; 
        }
        else newArray = [...newArray,arrayOfBoards[i]]
    }
    return newArray; 
}



//F1.4.1.1 isEquivalentToBoardOnList//
function isEquivalentToBoardOnList(board, arrayOfBoards){
    for (let i = 0; i < arrayOfBoards.length; i++){
        if (areEquivalent(board,arrayOfBoards[i])){return true}
    }
    return false
}



