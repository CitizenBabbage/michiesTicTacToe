
import { corner, edge } from "./globals.js";
import { opposite } from "./usefulFunctions.js";



export function readGenome(genome, board, mySymbol){
    console.log("Initiating readGenome")
    if (genome.every(element => element <= 0)){
        if (board.every(element => element !== null)) {
            console.log("Board is full, returning null")
            return null; //if the board is full, return null
        }
        console.log("Genome is all zeroes (end of recursion?). Returning null")
        const emptySpaces = returnEmptySpaces(genome); 
        console.log("The only remaining empty spaces are ", emptySpaces)
        const randomIndex = Math.floor(Math.random()*emptySpaces.length)
        console.log(`Choosing ${randomIndex} at random from those.`)
        return emptySpaces[randomIndex]  // if all the elements of the genome are 0, make a move at random
    }
    else {
        let genomeClone = [...genome]; 
        const indexOfMostHigh = indexOfHighest(genomeClone); 
        let suggestion = runRule(indexOfMostHigh, board, mySymbol)
        console.log("Suggesting rule ", suggestion)
        if (suggestion) return suggestion; 
        else {
            console.log(`Rule ${suggestion} rejected!`)
            genomeClone[indexOfMostHigh] = 0; 
            return readGenome(genomeClone, board, mySymbol)
        }
    }
}

function returnEmptySpaces(array) {
    let result = [];
    
    for (let i = 0; i < array.length; i++) {
        if (array[i] === undefined) {
            result.push(i);
        }
    }
    
    return result;
}




function indexOfHighest(array){
    if (!array.length) return -1; // Handle empty arrays
    return array.indexOf(array.reduce((acc, curr) => curr > acc? curr: acc, array[0]))
}

function runRule(number, board, symbol){
    console.log(`Initiating runRule with number ${number} for board ${board}`)
    if (number === 0) {
        let suggestion = win(board, symbol)
        console.log("Suggestion within runRule is ", suggestion)
        return win(board, symbol)
    }
    else if (number === 1) {
        let suggestion = win(board, opposite(symbol))
        console.log("Suggestion within runRule is ", suggestion)
        return win(board, opposite(symbol))
    }
    else if (number === 2) {
        return fork(board, symbol)
    }
    else if (number === 3) {
        let suggestion = win(board, symbol)
        console.log("Suggestion within runRule is ", suggestion)
        return fork(board, opposite(symbol))
    }
    else if (number === 4) {
        return cornerOnFirst(board)
    }
    else if (number === 5) {
        return center(board)
    }
    else if (number === 6) {
        return oppositeCorner(board, symbol)
    }
    else if (number === 7) {
        return emptyCorner(board)
    }
    else if (number === 8) {
        return emptySide(board)
    }
    else if (number === 9) {
        return centreOnFirst(board)
    }
    else if (number === 10) {
        return nextCornerClockwise(board, symbol)
    }
    else if (number === 11) {
        return nextCornerAntiClockwise(board, symbol)
    }
    else return null; 
}
  
// each threat pair consists of [place, tile]
function listThreats(array){
    let threats = []; 
    if (array[0] === null){
        if (array[1] === array[2]){threats.push([0,array[1]])}
        if (array[3] === array[6]){threats.push([0,array[3]])}
        if (array[4] === array[8]){threats.push([0,array[4]])}
    }
    if (array[1] === null){
        if (array[0] === array[2]){threats.push([1,array[0]])}
        if (array[4] === array[7]){threats.push([1,array[4]])}
    }
    if (array[2] === null){
        if (array[0] === array[1]){threats.push([2,array[0]])}
        if (array[4] === array[6]){threats.push([2,array[3]])}
        if (array[5] === array[8]){threats.push([2,array[5]])}
    }
    if (array[3] === null){
        if (array[0] === array[6]){threats.push([3,array[0]])}
        if (array[4] === array[5]){threats.push([3,array[4]])}
    }
    if (array[4] === null){
        if (array[0] === array[8]){threats.push([4,array[0]])}
        if (array[2] === array[6]){threats.push([4,array[2]])}
    }
    if (array[5] === null){
        if (array[2] === array[8]){threats.push([5,array[2]])}
        if (array[3] === array[4]){threats.push([5,array[3]])}
    }
    if (array[6] === null){
        if (array[0] === array[3]){threats.push([6,array[0]])}
        if (array[2] === array[4]){threats.push([6,array[2]])}
        if (array[7] === array[8]){threats.push([6,array[7]])}
    }
    if (array[7] === null){
        if (array[1] === array[4]){threats.push([7,array[1]])}
        if (array[6] === array[8]){threats.push([7,array[6]])}
    }
    if (array[8] === null){
        if (array[0] === array[4]){threats.push([8,array[0]])}
        if (array[2] === array[5]){threats.push([8,array[2]])}
        if (array[6] === array[7]){threats.push([8,array[6]])}
    }
    return threats; 
}

function myWins(array, mySymbol){
    let threats = listThreats(array);
    return threats.filter(threatPair => threatPair[1] === mySymbol)
}

//win: If the player has two in a row, they can place a third to get three in a row.
function win(array, mySymbol){
    let opportunities = myWins(array, mySymbol); 
    if (opportunities.length > 0){
        return opportunities[0][0]
    }
    else return null; 
}

//Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
// as win but with opponentsSymbol as second argument
// function Block(array, opponentsSymbol){
//     let opportunities = myWins(array, opponentsSymbol); 
//     if (opportunities.length > 0){return opportunities[0][0]}
//     else return null; 
// }

//Fork: Cause a scenario where the player has two ways to win (two non-blocked lines of 2).
function fork(array, mySymbol){
    for (let i = 0; i < array.length; i++){
        if (!array[i]){
            let hypotheticalArray = [...array]
            hypotheticalArray[i] = mySymbol; 
            let opportunities = myWins(hypotheticalArray, mySymbol);
            if (opportunities.length >=2) return i; 
        }
    }
    return null; 
}

//Blocking an opponent's fork: If there is only one possible fork for the opponent, the player should block it. Otherwise, the player should block all forks in any way that simultaneously allows them to make two in a row. Otherwise, the player should make a two in a row to force the opponent into defending, as long as it does not result in them producing a fork. For example, if "X" has two opposite corners and "O" has the center, "O" must not play a corner move to win. (Playing a corner move in this scenario produces a fork for "X" to win.)
// as fork but with opponentsSymbol as second argument
//function BlockFork(){}

// if first move, play corner. 
function cornerOnFirst(array){
    if (array.every(element => element === null || element === undefined)) {
        return corner[Math.floor(Math.random()*4)]
    }
    else return null; 
}





//Center: A player marks the center. 
function center(array){
    if (!array[4]) return 4
    else return null; 
}


//Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
function oppositeCorner(array, mySymbol){
    if (!array[0] && array[8] === opposite(mySymbol)) return 0; 
    else if (!array[2] && array[6] === opposite(mySymbol)) return 2;
    else if (!array[6] && array[2] === opposite(mySymbol)) return 6;
    else if (!array[8] && array[0] === opposite(mySymbol)) return 8;
    else return null; 
}


//Empty corner: The player plays in a corner square.
function emptyCorner(array){
    for (let i of corner) {
        if (!array[i]) return i;
    }
    return null; 
}


//Empty side: The player plays in a middle square on any of the four sides.
function emptySide(array){
    for (let i of edge) {
        if (!array[i]) return i;
    }
    return null; 
}

//distractors
// if first move, play centre. 
function centreOnFirst(array){
    if (array.every(element => element === null || element === undefined)) {
        return 4
    }
    else return null; 
}



//next corner clockwise: If the opponent is in the corner, the player plays the next corner clockwise.
function nextCornerClockwise(array, mySymbol){
    if (!array[0] && array[6] === opposite(mySymbol)) return 0; 
    else if (!array[2] && array[0] === opposite(mySymbol)) return 2;
    else if (!array[6] && array[8] === opposite(mySymbol)) return 6;
    else if (!array[8] && array[2] === opposite(mySymbol)) return 8;
    else return null; 
}



//next corner anticlockwise: If the opponent is in the corner, the player plays the next corner anticlockwise.
function nextCornerAntiClockwise(array, mySymbol){
    if (!array[0] && array[2] === opposite(mySymbol)) return 0; 
    else if (!array[2] && array[8] === opposite(mySymbol)) return 2;
    else if (!array[6] && array[0] === opposite(mySymbol)) return 6;
    else if (!array[8] && array[6] === opposite(mySymbol)) return 8;
    else return null; 
}