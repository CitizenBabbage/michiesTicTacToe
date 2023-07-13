//////////////GLOBALS//////////////

const edge = [1,5,7,3] //in cw rotational order
const corner = [0,2,8,6]

//////////////FUNCTIONS//////////////

////F1////
function generateGoodBoardStates(num){
    const allBoardStates = generateAllBoards(num); 
    let legalStates = removeNumericallyIllegalBoards(allBoardStates);
    let newLegalStates = removeUnreachables(legalStates)
    console.log("after removing unreachables length is: ", newLegalStates.length)
    return removeEquivalents(newLegalStates)
}

////F1.1 removeNumericallyIllegalBoards////

    // because X goes first and they otherwise take turns...
    // a board is numerically legal iff the number of X's is either equal to or one greater 
    // than the number of Os 

function removeNumericallyIllegalBoards(arrayOfArrays){
    for (let i = 0; i < arrayOfArrays.length; i++){
        return arrayOfArrays.filter((i) => isNumericallyLegal(i) )
    }
}

//F1.1.1 isNumericallyLegal //

function isNumericallyLegal(board) {
    const xsum = xCounter(board);
    const osum = oCounter(board);
    if (xsum > osum + 1) {
        return false}
    else if (osum > xsum) {
        return false}
    else return true; 
}

////F1.2 removeUnreachables////

//A board state is unreachable if the game would halt before reaching it
function removeUnreachables(arrayOfArrays){
    return arrayOfArrays.filter((item) => !containsXLineAndOLine(item) && !containsXwinPlusEqualOs(item))
}

///////////////////////////////////

function nextWheel(n,m){
    return (n+m) % 4
}

function checkRotationalIdentity(board1, board2){
    if (checkRotationalID0(board1, board2)){return checkRotationalID0(board1, board2)}
    else if (checkRotationalID(board1, board2,1)){return checkRotationalID0(board1, board2,1)}
    else if (checkRotationalID(board1, board2,2)){return checkRotationalID0(board1, board2,2)}
    else return checkRotationalID0(board1, board2,3)
}

function checkRotationalID0(board1, board2){
    for (let i = 0; i<board1.length; i++){
        if (board1[i] === board2[i]) continue
        else return false; 
    }
    return true; 
}

//checks whether two board states are n-step rotational variants of one another
//references the globals edge and corner, which say whether an index indexes a center-edge square or corner square
//uses nextWheel, which takes an index and n, and returns the index at n clockwise rotations from it
function checkRotationalID(board1, board2, n){
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

function areRotationalVariants(board1, board2) {
    if (checkRotationalID(board1, board2, 1) ||
        checkRotationalID(board1, board2, 2) ||
        checkRotationalID(board1, board2, 3) ) 
        return true
    else return false; 
}

// checks if a given board state is a rotational variant of any board state in array
function isRotationOfBoardOnList(board, arrayOfBoards){
    for (let i = 0; i < arrayOfBoards.length; i++){
        if (areRotationalVariants(board,i)){return true}
    }
    return false; 
}

//returns reflection of given board state across vertical midline
function reflection(board){
    return [board[2],board[1],board[0],board[5],board[4],board[3],board[8],board[7],board[6]] 
}

function areIdentical(board1,board2){
    for (let i = 0; i < board1.length; i++){
        if (board1[i] === board2[i]) {continue}
        else return false;
    }
    return true;
}

function areEquivalent(board1, board2){
    if (areIdentical(board1, board2)){return true}; 
    if (areRotationalVariants(board1, board2)){return true}; 
    const refl = reflection(board1); 
    if (areIdentical(refl, board2)){return true}; 
    if (areRotationalVariants(refl, board2)){return true}
}

function isEquivalentToBoardOnList(board, arrayOfBoards){
    for (let i = 0; i < arrayOfBoards.length; i++){
        if (areEquivalent(board,arrayOfBoards[i])){return true}
    }
    return false
}

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

function generateAllBoards(num) {
    if (num === 0){return [[]]}
    else {
        let boards = generateAllBoards(num-1)
        let first = boards.map((i) => [undefined,...i])
        let second = boards.map((i) => ['X',...i])
        let third = boards.map((i) => ['O',...i])
        return [...first, ...second, ...third]
        }
    }


// returns true if given board state has a line of X's and a line of O's
function containsXLineAndOLine(boardState){
const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let winningLines = []; 
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      winningLines = [...winningLines, boardState[a]];
    }
    if (winningLines.includes('X') && winningLines.includes('O')){return true}
  }
  return false
}

function containsXline (boardState){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
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

// function containsOline (boardState){
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6]
//       ];
//       let winningLines = []; 
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
//          winningLines = [...winningLines, boardState[a]];
//         }
//         if (winningLines.includes('O')){return true}
//         }
//   return false
// }

function oCounter (boardState){
    return boardState.reduce((accumulator, currentValue) => {
        return currentValue === 'O'? accumulator + 1: accumulator}, 0);
}

function xCounter (boardState){
    return boardState.reduce((accumulator, currentValue) => {
        return currentValue === 'X'? accumulator + 1: accumulator}, 0);
}





function arrayEquals(array1,array2){
    return array1.every((element, index) => element === array2[index])
}









function containsXwinPlusEqualOs(boardState){
    const osum = oCounter(boardState);
    const xsum = xCounter(boardState);
    return containsXline(boardState) && xsum === osum; 
}



//since x goes first, you can't have a win for X with an equal number of Os
// this checks for that, to facilitate removal
function removeXwinPlusEqualOs(boardStates){
    let newArray = []; 
    for (let i = 0; i < boardStates.length; i++){
        if (containsXwinPlusEqualOs(boardStates[i])){continue}
        else newArray = [...newArray, boardStates[i]]
    }
    return newArray; 
}



function containsMember(arrayOfArrays, member) {
    return arrayOfArrays.some((array) => {
      return arrayEquals(array,member)
    });
  }

//console.log(containsXLineAndOLine(['O','O','O','X','X','X','O','X','X']))


console.log(generateGoodBoardStates(9).length)
// console.log("['O','O','O','X','X','X','O','X','X'] is legal: ", isLegal(['O','O','O','X','X','X','O','X','X']))
// console.log("['O','O','O','X','X','X','X','X','X'] is legal: ", isLegal(['O','O','O','X','X','X','X','X','X']))
// console.log("['O','O','O','O','O','X','X','X','X'] is legal: ", isLegal(['O','O','O','O','O','X','X','X','X']))
// console.log("['O','O','O','O','O','O','X','X','X'] is legal: ", isLegal(['O','O','O','O','O','O','X','X','X']))



function checkMembers(array){
    for (let i = 0; i < array.length; i++){
        if (Array.isArray(array[i]) && ((array[i][0]==='X')||(array[i][0]==='O')||(array[i][0]===undefined))){continue}
        else {
            console.log(`found a bad one at position ${i}, namely: `, array[i])
        return false
        }
    }
    return true
}

//console.log(removeBadDuplicates([['O','O','O','X','O','X','O','X','X'],['O','O','O','X','X','X','O','X','X']]))

