

import { opposite } from "../general/usefulFunctions.js";
import { blockAllForksWhileThreatening, blockSingleForkingOpportunity, threatenWithoutInvitingAFork, avoidInvitingAFork, makeTwoInALine, win, fork, cornerOnFirst, center, oppositeCorner, emptyCorner, emptySide, centreOnFirst, nextCornerAsOpponentClockwise, nextCornerAsOpponentAntiClockwise} from './heuristics.js'



// recursive version works but removed to reduce stack pressure
// export function readGenome(genome, board, mySymbol){
//     console.log("Initiating readGenome")
//     if (genome.every(element => element <= 0)){
//         if (board.every(element => element !== null)) {
//             console.log("Board is full, returning null")
//             return null; //if the board is full, return null
//         }
//         console.log("Genome is all zeroes (end of recursion). Returning null")
//     }
//     else {
//         let genomeClone = [...genome]; 
//         const indexOfMostHigh = indexOfHighest(genomeClone);
//         console.log("Suggesting rule ", indexOfMostHigh) 
//         let suggestion = runRule(indexOfMostHigh, board, mySymbol)
//         if (suggestion) {
//             console.log(`Rule ${indexOfMostHigh} directs us to play square ${suggestion}`)
//             return suggestion
//         } 
//         else {
//             console.log(`Rule ${indexOfMostHigh} rejected!`)
//             genomeClone[indexOfMostHigh] = 0; 
//             return readGenome(genomeClone, board, mySymbol)
//         }
//     }
// }


function numberOfBlanks(board){
    return board.reduce((accum, current) => !current? accum+1: accum, 0)
}

function firstBlank(board){
    for (let i = 0; i < board.length; i++){
        if (!board[i]) return i
    }
}

export function readGenome(genome, board, mySymbol){
    //console.log(`Initiating readGenome with genome: ${genome}, board: ${board} and mySymbol: ${mySymbol} `) 
    let genomeClone = [...genome];
    while (genomeClone.some(element => element > 0)){
        //console.log("readGenome: while loop started")
        const blanks = numberOfBlanks(board); 
        //if (board.every(element => element !== null)) {
        if (blanks === 0){
            console.log("Board is full, returning null")
            return null; //if the board is full, return null
        }
        else if (blanks === 1) return firstBlank(board)
        else { 
            const indexOfMostHigh = indexOfHighest(genomeClone);
            //console.log("Suggesting rule ", indexOfMostHigh) 
            let suggestion = runRule(indexOfMostHigh, board, mySymbol)
            if (suggestion) {
                //console.log(`Rule ${indexOfMostHigh} directs us to play square ${suggestion}`)
                return suggestion; 
            } 
            else {
                //console.log(`Rule ${indexOfMostHigh} rejected!`)
                genomeClone[indexOfMostHigh] = 0; 
            }
        }
    }
    console.log("returning from readGenome with no suggestion.")
}

// console.log(readGenome([8,37,0,38,96,8,56,43,76,88,7,51,0], [null,'X','O',null,'O','X',null,null,null], 'X'))
// console.log(readGenome([85,21,82,28,12,83,43,19,74,80,38,16,99], [null,'X','O',null,'O','X',null,null,null], 'X'))
// ,X,X,O,O,X,X,O,O and mySymbol: O



function indexOfHighest(array){
    if (!array.length) return -1; // Handle empty arrays
    return array.indexOf(array.reduce((acc, curr) => curr > acc? curr: acc, array[0]))
}

function runRule(number, board, symbol){
    //console.log(`Trying rule ${number} for board ${board}`)
    if (number === 0) {
        return win(board, symbol)
    }
    else if (number === 1) {
        return win(board, opposite(symbol))
    }
    else if (number === 2) {
        return fork(board, symbol)
    }
    else if (number === 3) {
        return blockSingleForkingOpportunity(board, opposite(symbol))
    }
    else if (number === 4) {
        return blockAllForksWhileThreatening(board, symbol)
    }
    else if (number === 5) {
        return threatenWithoutInvitingAFork(board, symbol)
    }
    else if (number === 6) {
        return cornerOnFirst(board)
    }
    else if (number === 7) {
        return center(board)
    }
    else if (number === 8) {
        return oppositeCorner(board, symbol)
    }
    else if (number === 9) {
        return emptyCorner(board)
    }
    else if (number === 10) {
        return emptySide(board)
    }
    else if (number === 11) {
        return centreOnFirst(board)
    }
    else if (number === 12) {
        return nextCornerAsOpponentClockwise(board, symbol)
    }
    else if (number === 13) {
        return nextCornerAsOpponentAntiClockwise(board, symbol)
    }
    else if (number === 14) {
        return nextCornerAsOpponentAntiClockwise(board, symbol)
    }
}
  

