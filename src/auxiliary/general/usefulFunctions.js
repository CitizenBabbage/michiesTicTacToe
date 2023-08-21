import {corner, edge, lines, reverseCorner, reverseEdge} from './globals.js'
import { checkNormalized } from '../testers/errorCheckers.js';

//////////////AUXILIARY FUNCTIONS////////////

//containsXline //
export function containsXline (boardState){
    let winningLines = []; 
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            winningLines = [...winningLines, boardState[a]];
            }
        if (winningLines.includes('X')){return true}
            }
      return false
    }


//containsOline //
export function containsOline (boardState){
    let winningLines = []; 
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            winningLines = [...winningLines, boardState[a]];
            }
        if (winningLines.includes('O')){return true}
        }
    return false
    }


//ocounter //
export function oCounter (boardState){
    return boardState.reduce((accumulator, currentValue) => {
        return currentValue === 'O'? accumulator + 1: accumulator}, 0);
    }
  
    
//xcounter //
export function xCounter (boardState){
    return boardState.reduce((accumulator, currentValue) => {
        return currentValue === 'X'? accumulator + 1: accumulator}, 0);
    }

export function arrayEquals(array1,array2){
    return array1.every((element, index) => element === array2[index])
    }


//F1.4.1.1.1 areEquivalent//
export function areEquivalent(board1, board2){
    if (areIdentical(board1, board2)){return true}; 
    if (areRotationalVariants(board1, board2)){return true}; 
    const refl = reflection(board1); 
    if (areIdentical(refl, board2)){return true}; 
    if (areRotationalVariants(refl, board2)){return true}
}

// returns a score that logs and thus helps reverse a transformation. 
// the score is a two element array. If the first number is 1 this means that the transformation involves a reflection
// the second number says how many 90 degree rotations the board must undergo
export function equivalenceScore(board1, board2){
    //console.log(`Board1 is ${board1} and board2 is ${board2}`)
    for (let i = 0; i < 4; i++){
        if (checkRotationalID(board2, board1, i)){return [0,i]}
    }
    const refl = reflection(board1); 
    for (let i = 0; i < 4; i++){
        if (checkRotationalID(refl, board2, i)){return [1,i]}
    }
    return ['error','error']
}

//console.log(equivalenceScore(['X',null, null,null, null,null, null,null, null,],[null, null,null, null,null, null,null, null,'X']))


//F1.4.1.1.1.1 areIdentical//

export function areIdentical(board1,board2){
    for (let i = 0; i < board1.length; i++){
        if (equals(board1[i],board2[i])) {continue}
        else return false;
    }
    return true;
}

export function areExactlyTheSame(item1,item2){
    const string1 = JSON.stringify(item1)
    const string2 = JSON.stringify(item2)
    if (string1 === string2) return true
    else return false;
}

function equals(x,y){
    if (x === y) {return true}
    else if (x === null && y === undefined){return true}
    else if (y === null && x === undefined){return true}
    else return false;
}

//F1.4.1.1.1.2 areRotationalVariants//
export function areRotationalVariants(board1, board2) {
    if (checkRotationalID(board1, board2, 1) ||
        checkRotationalID(board1, board2, 2) ||
        checkRotationalID(board1, board2, 3) ) 
        return true
    else return false; 
}

export function rotation(square, numOf90DegreeTurns){
    if (edge.includes(square)){return edge[(edge.indexOf(square) + numOf90DegreeTurns)%4]}
    else if (corner.includes(square)){return corner[(corner.indexOf(square) + numOf90DegreeTurns)%4]}
    else return square; //center square 
}

/// given a square number and a number of 90 degree turns, returns the square number reached by rotating ccw
export function reverseRotation(square, numOf90DegreeTurns){
    if (reverseEdge.includes(square)){return reverseEdge[(reverseEdge.indexOf(square) + numOf90DegreeTurns)%4]}
    else if (reverseCorner.includes(square)){return reverseCorner[(reverseCorner.indexOf(square) + numOf90DegreeTurns)%4]}
    else return square; //center square 
}


export function transformation(number, transformation){
    //let index; 
    if (transformation[0]===1){number = reflectNumber(number)}; 
    //console.log("number after flip (if any) equals: ", number)
    return rotation(number,transformation[1]); 
}

// takes number of square and transformation that resulted in that square
// and returns the number of the square under the reverse of that transformation

export function reverseTransformation(number, transformation){
    //let index; 
    number = reverseRotation(number,transformation[1]); 
    if (transformation[0]===1){number = reflectNumber(number)}; 
    //console.log("number after flip (if any) equals: ", number)
    return number
}

// Returns an array representing the board state transformed
export function transformBoard(boardState, transform){
    // console.log("board state is ", boardState)
    // console.log("3. transform is ", transform)
    let newBoard = boardState.map((item, index) => boardState[transformation(index,transform)])
    //console.log("transformBoard: newBoard is ", newBoard)
    return newBoard
    //console.log("newBoard is ", newBoard)
}

// Returns an array representing the board state (reverse) transformed
export function reverseTransformBoard(boardState, transform){
    //console.log("reverseTransformBoard: board state is ", boardState)
    //console.log("reverseTransformBoard: transform is ", transform)
    let newBoard = boardState.map((item, index) => boardState[reverseTransformation(index,transform)])
    //console.log("reverseTransformBoard: newBoard is ", newBoard)
    return newBoard
    
}
// console.log("received transformed is : ", transformBoard(['X', 'X', null, 'X', 'X', 'O', null, 'O', 'O'], [0,1]))

// console.log("arche transformed is : ", reverseTransformBoard([null, 'X', 'X', 'O', 'X', 'X', 'O', 'O', null], [0,1]))



//F1.4.1.1.1.2.1 areRotationalVariants//

//checks whether two board states are n-step rotational variants of one another
//references the globals edge and corner, which say whether an index indexes a center-edge square or corner square
//uses nextWheel, which takes an index and n, and returns the index at n clockwise rotations from it
export function checkRotationalID(board1, board2, n){
    for (let i = 0; i<board1.length; i++){
        if (edge.includes(i)){
            let indexOfRotation = nextWheel(edge.indexOf(i),n); 
            if (equals(board1[i], board2[edge[indexOfRotation]])) continue
            else return false
        }
        else if (corner.includes(i)){
            let indexOfRotation = nextWheel(corner.indexOf(i),n);
            if (equals(board1[i],board2[corner[indexOfRotation]])) continue
            else return false
            }
        else if (equals(board1[4], board2[4])) continue
        else return false
    }
    return true; 
}

//F1.4.1.1.1.2.1.1 nextWheel//
// Returns the edge or corner index that is m ahead of n proceeding clockwise
export function nextWheel(n,m){
    return (n+m) % 4
}



//F1.4.1.1.1.3 reflection//

//returns reflection of given board state across vertical midline
export function reflection(board){
    return [board[2],board[1],board[0],board[5],board[4],board[3],board[8],board[7],board[6]] 
}

//returns reflection of given square across vertical midline
export function reflectNumber(number){
    switch(number) {
        case 0: return 2; 
        case 1: return 1; 
        case 2: return 0; 
        case 3: return 5;
        case 4: return 4;
        case 5: return 3;
        case 6: return 8;
        case 7: return 7;
        case 8: return 6;
        default: 
            throw new Error(`Invalid input for reflectNumber: ${number}`);
    }
}

export function includes(array, arrayMember){
    for (let i = 0; i < array.length; i++){
        if (areIdentical(array[i],arrayMember)) return true; 
    }
    return false; 
}

//this just checks that the input is an array with objects of the right sort.
export function structureTest(array){
    if (array[0].state.length === 9){return true}
    else return false; 
}



export function basicNormalization(array){
    let sum = array.reduce((accumulator, current) => accumulator + current, 0)
    let normalized = array.map((item)=>(item /sum))
    // let checkSum = normalized.reduce((accumulator, current) => accumulator + current, 0) 
    // if (checkSum >= 0.99 && checkSum <= 1) {console.log("yup")}
    return normalized
}

// this rounds off the normalized figures to two dp. If they don't sum to 1, the difference is removed 
// from a random element (in the case where the difference is negative, that means it's effectively added)
export function roundedNormalization(array){
    let normalized = basicNormalization(array)
    let roundedTimes100 = normalized.map(value => Math.round(value * 100));
    let sum = roundedTimes100.reduce((accumulator, current) => accumulator + current, 0);
    if (sum !== 100){
        let difference = sum - 100; 
        let randomIndex = getIndexOfSufficientlyLargeElement(roundedTimes100,difference);
        roundedTimes100[randomIndex] -= difference; 
    }
    let rounded = roundedTimes100.map(value => value/100);
    checkNormalized(rounded, "roundedNormalization"); 
    return rounded; 
}


// this keeps running itself until it returns the index of an element = or larger than lowerBound
function getIndexOfSufficientlyLargeElement(array, lowerBound){
    let randomIndex = Math.floor(Math.random() * array.length);
    if (array[randomIndex]>=lowerBound) {
        return randomIndex
    }
    else return getIndexOfSufficientlyLargeElement(array, lowerBound)
}


export function hasTwoOrFewerDecimalPlaces(num) {
    const epsilon = 0.0001;
    return Math.abs(Math.round(num * 100) - num * 100) < epsilon;
}


export function dataBaseDuplicator(database){
    let duplicate = JSON.parse(JSON.stringify(database)); 
    return duplicate; 
}

//console.log(areIdentical([1,0.16666666666666666,0,0.16666666666666666,0,0.16666666666666666,0.16666666666666666,0.16666666666666666,0.16666666666666666],[1,0.16666666666666666,0,0.16666666666666666,0,0.16666666666666666,0.16666666666666666,0.16666666666666666,0.16666666666666666]))


//this takes a type (either a square or a whole board) and a transform code and 
// returns a description of the transformation in natural language
export function transformationReader(type, transform){
    if (transform[0] === 0 && transform[1] === 0){return `No transformation of ${type} was necessary.`}
    else if (transform[0] === 0) return (`${type} was rotated by ${transform[1]}`)
    else return `${type} was flipped and rotated by ${transform[1]}`
}

export function isOdd(n){
    if (n % 2 === 0) return false; 
    else return true; 
}

export function opposite(XorO){
    if (XorO === "X") return "O"
    else return "X"; 
}

export function isAnInteger(value) {
    const num = Number(value); 
    return !isNaN(num) && isFinite(num) && num % 1 === 0;
} 

export function isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
}


// returns a new board state with the appropriate letter placed in the given place
export function placeMark(squareNumber, board){
    if (board[squareNumber]) return;            // if the square is occupied, do nothing 
    let symbolCount = board.reduce((acc,item) => item? acc+1: acc, 0)
    console.log("symbol count is ", symbolCount)
    if (symbolCount % 2 === 0){ board[squareNumber] = 'X'} 
    else board[squareNumber] = 'O'; 
    return board
  }

  //console.log(placeMark(3, [null, null, null, null, null, null, null, null, null]))

  export function roundOffElementsInArray(array){
    let newArray = []; 
    for (let i = 0; i < array.length; i++){
        newArray.push(Math.round(array[i] * 100) / 100)
    }
    return newArray; 
}