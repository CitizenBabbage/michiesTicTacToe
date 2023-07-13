import {corner, edge, lines, reverseCorner, reverseEdge} from './globals.js'

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
        if (checkRotationalID(board1, board2, i)){return [0,i]}
    }
    const refl = reflection(board1); 
    for (let i = 0; i < 4; i++){
        if (checkRotationalID(board1, board2, i)){return [1,i]}
    }
    return ['error','error']
}

//console.log(equivalenceScore(['X',null, null,null, null,null, null,null, null,],[null, null,null, null,null, null,null, null,'X']))


//F1.4.1.1.1.1 areIdentical//

export function areIdentical(board1,board2){
    for (let i = 0; i < board1.length; i++){
        if (board1[i] === board2[i]) {continue}
        else return false;
    }
    return true;
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

/// given a square number and a number of 90 degree turns, returns the square number reached
export function reverseRotation(square, numOf90DegreeTurns){
    if (reverseEdge.includes(square)){return reverseEdge[(reverseEdge.indexOf(square) + numOf90DegreeTurns)%4]}
    else if (reverseCorner.includes(square)){return reverseCorner[(reverseCorner.indexOf(square) + numOf90DegreeTurns)%4]}
    else return square; //center square 
}

// Returns an array representing the board state (reverse) transformed
export function transformBoard(boardState, transform){
    // console.log("board state is ", boardState)
    // console.log("3. transform is ", transform)
    let newBoard; 
    if (transform[0] === 1) {
        newBoard = boardState.map((item, index) => boardState[reverseRotation(index,transform[1])]);
        return newBoard.map((item) => reflectNumber(item))
    }
    else return boardState.map((item, index) => boardState[rotation(index,transform[1])])
    //console.log("newBoard is ", newBoard)
}


//F1.4.1.1.1.2.1 areRotationalVariants//

//checks whether two board states are n-step rotational variants of one another
//references the globals edge and corner, which say whether an index indexes a center-edge square or corner square
//uses nextWheel, which takes an index and n, and returns the index at n clockwise rotations from it
export function checkRotationalID(board1, board2, n){
    for (let i = 0; i<board1.length; i++){
        if (edge.includes(i)){
            let indexOfRotation = nextWheel(edge.indexOf(i),n); 
            if (board1[i] === board2[edge[indexOfRotation]]) continue
            else return false
        }
        else if (corner.includes(i)){
            let indexOfRotation = nextWheel(corner.indexOf(i),n);
            if (board1[i] === board2[corner[indexOfRotation]]) continue
            else return false
            }
        else if (board1[4] === board2[4]) continue
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
    }
}


