import {containsXline, containsOline, xCounter, oCounter} from "./usefulFunctions.js"
import {corner, edge, lines} from './globals.js'
import {areEquivalent} from './usefulFunctions.js'

//////////////FUNCTIONS//////////////

////F0////


// calculates all good board states, then iterates through the list creating an object for each, 
// returns array of objects 
export function createAllBoardStateObjects(num){
    const allBoards = generateGoodBoardStates(num);
    return allBoards.map((item,index) => buildObject(item,index))
}


//this reduces the options on the first move to the three equivalent options, 
//play centre, play corner, play side, which greatly reduces the learning space
function reduceOptionsOnFirstMove(database){
    database[0].response = [0.333,0.333,0,0,0.334,0,0,0,0]
    for (let i = 0; i < database.length; i++){
        if (containsOneXOrNothing(database[i].state)){
            let cornersUsed = 0; 
            let edgesUsed = 0;
            let probability = 0.3333333
            if (database[i].state[4] === 'X') {//if the opening move was x to centre
                probability = 0.5  // there are only two moves left (edge and corner) which should get a 50/50 probability
            }
            for (j = 0; j < database[i].state.length; j++){
                if (database[i].state[j] !== 'X'){ // if the square is empty...
                    if (corner.includes(j) && cornersUsed === 0){ // if it's a corner and you haven't yet assigned a nonzero probabiity to a corner
                        cornersUsed = 1; 
                        database[i].response[j] = probability; 
                    }
                    else if (edge.includes(j) && edgesUsed === 0) { // if it's an edge and you haven't yet assigned a nonzero probabiity to an edge
                        edgesUsed = 1; 
                        database[i].response[j] = probability; 
                    }
                    else if (j === 4){ // if it's the centre square then (since we've checked it's blank...) 
                        database[i].response[j] = 0.3333334; 
                    }
                    }
                else database[i].response[j] = 0; // 0 probability if the square is taken. 
               
                }
            }
        }
        return database; 
}

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

function buildObject(board,id){
    return {
        id: id,
        state: board,
        turn: calculateTurn(board),
        response: initializeProbabilityArray(board),
        transform: [0,0]
    }
}

//takes a board state as input and returns whose turn it is to play
function calculateTurn(board){
    return xCounter(board) > oCounter(board)? 'O' : 'X';
}

// calculates n = the number of empty squares, then builds an array
// for each element in the array, if the input array is full at that location
// it writes 0 to the new array. Else it writes 1/n. 
function initializeProbabilityArray(array){
    let emptySquares = array.length - countFilledSquares(array); 
    return array.map((item, index) => {return array[index]? 0: 1/emptySquares})
}

// counts the squares that are filled. 
function countFilledSquares(array){
    return array.reduce((count,item) => {return item? count+1 : count },0)
}


////F1////


function generateGoodBoardStates(num){
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




///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////COMMENTED OUT////////////////////


// function checkRotationalID0(board1, board2){
//     for (let i = 0; i<board1.length; i++){
//         if (board1[i] === board2[i]) continue
//         else return false; 
//     }
//     return true; 
// }

// function checkRotationalIdentity(board1, board2){
//     // if (checkRotationalID0(board1, board2)){return checkRotationalID0(board1, board2)}
//     // else 
//     if (checkRotationalID(board1, board2,1)){return checkRotationalID0(board1, board2,1)}
//     else if (checkRotationalID(board1, board2,2)){return checkRotationalID0(board1, board2,2)}
//     else return checkRotationalID0(board1, board2,3)
// }







// // checks if a given board state is a rotational variant of any board state in array
// function isRotationOfBoardOnList(board, arrayOfBoards){
//     for (let i = 0; i < arrayOfBoards.length; i++){
//         if (areRotationalVariants(board,i)){return true}
//     }
//     return false; 
// }


// function arrayEquals(array1,array2){
//     return array1.every((element, index) => element === array2[index])
// }


//since x goes first, you can't have a win for X with an equal number of Os
// // this checks for that, to facilitate removal
// function removeXwinPlusEqualOs(boardStates){
//     let newArray = []; 
//     for (let i = 0; i < boardStates.length; i++){
//         if (containsXwinPlusEqualOs(boardStates[i])){continue}
//         else newArray = [...newArray, boardStates[i]]
//     }
//     return newArray; 
// }



// function containsMember(arrayOfArrays, member) {
//     return arrayOfArrays.some((array) => {
//       return arrayEquals(array,member)
//     });
//   }

//console.log(containsXLineAndOLine(['O','O','O','X','X','X','O','X','X']))


// console.log("['O','O','O','X','X','X','O','X','X'] is legal: ", isLegal(['O','O','O','X','X','X','O','X','X']))
// console.log("['O','O','O','X','X','X','X','X','X'] is legal: ", isLegal(['O','O','O','X','X','X','X','X','X']))
// console.log("['O','O','O','O','O','X','X','X','X'] is legal: ", isLegal(['O','O','O','O','O','X','X','X','X']))
// console.log("['O','O','O','O','O','O','X','X','X'] is legal: ", isLegal(['O','O','O','O','O','O','X','X','X']))



// function checkMembers(array){
//     for (let i = 0; i < array.length; i++){
//         if (Array.isArray(array[i]) && ((array[i][0]==='X')||(array[i][0]==='O')||(array[i][0]===undefined))){continue}
//         else {
//             console.log(`found a bad one at position ${i}, namely: `, array[i])
//         return false
//         }
//     }
//     return true
// }

//console.log(removeBadDuplicates([['O','O','O','X','O','X','O','X','X'],['O','O','O','X','X','X','O','X','X']]))

