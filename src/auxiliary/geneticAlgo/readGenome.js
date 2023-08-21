

import { opposite } from "../general/usefulFunctions.js";
import { blockAllForksWhileThreatening, blockSingleForkingOpportunity, threatenWithoutInvitingAFork, avoidInvitingAFork, makeTwoInALine, win, fork, cornerOnFirst, center, oppositeCorner, emptyCorner, emptySide, centreOnFirst, nextCornerAsOpponentClockwise, nextCornerAsOpponentAntiClockwise} from './heuristics.js'



export function readGenome(genome, board, mySymbol){
    console.log("Initiating readGenome")
    if (genome.every(element => element <= 0)){
        if (board.every(element => element !== null)) {
            console.log("Board is full, returning null")
            return null; //if the board is full, return null
        }
        console.log("Genome is all zeroes (end of recursion?). Returning null")
    }
    else {
        let genomeClone = [...genome]; 
        const indexOfMostHigh = indexOfHighest(genomeClone);
        console.log("Suggesting rule ", indexOfMostHigh) 
        let suggestion = runRule(indexOfMostHigh, board, mySymbol)
        if (suggestion) {
            console.log(`Rule ${indexOfMostHigh} directs us to play square ${suggestion}`)
            return suggestion
        } 
        else {
            console.log(`Rule ${indexOfMostHigh} rejected!`)
            genomeClone[indexOfMostHigh] = 0; 
            return readGenome(genomeClone, board, mySymbol)
        }
    }
}





function indexOfHighest(array){
    if (!array.length) return -1; // Handle empty arrays
    return array.indexOf(array.reduce((acc, curr) => curr > acc? curr: acc, array[0]))
}

function runRule(number, board, symbol){
    console.log(`Trying rule ${number} for board ${board}`)
    if (number === 0) {
        console.log("here at rule 0")
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
    else return null; 
}
  

