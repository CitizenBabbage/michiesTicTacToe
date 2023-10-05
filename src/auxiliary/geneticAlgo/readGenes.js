

import { opposite } from "../general/usefulFunctions.js";
import { returnEmptySpaces } from "./heuristics.js";
import { 
        win,
        fork,
        blockSingleForkingOpportunity,
        blockAllForksWhileThreatening,
        threatenWithoutInvitingAFork,
        cornerOnFirst,
        center,
        oppositeCorner,
        emptyCorner,
        emptySide,
        centreOnFirst,
        nextCornerAsOpponentClockwise,
        nextCornerAsOpponentAntiClockwise,
        nextCornerAsSelfClockwise,
        nextCornerAsSelfAntiClockwise,
        nextEdgeAsOpponentClockwise,
        nextEdgeAsOpponentAntiClockwise,
        nextEdgeAsSelfClockwise,
        nextEdgeAsSelfAntiClockwise,
        oppositeEdgeAsOpponent,
        oppositeEdgeAsSelf,
        playCenterOnSecond,
        playRandom,
        makeTwoInALine,
        avoidInvitingAFork 
    } from './heuristics.js'



function numberOfBlanks(board){
    return board.reduce((accum, current) => !current? accum+1: accum, 0)
}

function firstBlank(board){
    for (let i = 0; i < board.length; i++){
        if (!board[i]) return i
    }
}

// console.log(readGenes([93,81,13,63,52,5,59,48,42,76,2,51,9,20,50,51,0,-3,32,46,68,7,78,45,31,60],[null,'X','O','O','O','X','X','O','X'],'X'))

export function readGenes(genome, board, mySymbol){
    // console.log(`Initiating readGenome with genome: ${genome}, board: ${board} and mySymbol: ${mySymbol} `) 
    let genomeClone = [...genome];
    while (genomeClone.some(element => element > 0)){
        // console.log("readGenome: while loop started")
        const blanks = numberOfBlanks(board); 

        if (blanks === 0){
            // console.log("Board is full, returning null")
            return [null,[]]; //if the board is full, return null
        }
        else if (blanks === 1) return [firstBlank(board),"Forced move"] // one move left, forced move
        else { 
            const indexOfMostHigh = indexOfHighest(genomeClone);
            // console.log("Suggesting rule ", indexOfMostHigh) 
            let suggestion = runRule(indexOfMostHigh, board, mySymbol)
            // console.log("suggestion is ", suggestion)
            if (suggestion[0] || suggestion[0] === 0) {
                // console.log(`Rule ${indexOfMostHigh} directs us to play square ${suggestion}`)
                if (returnEmptySpaces(board).includes(suggestion[0])) {return suggestion; }
                else {
                    throw new Error(`rule ${indexOfMostHigh} directed me to a filled square, namely ${suggestion}, when asked about board ${board}!`) // delete this for production
                    genomeClone[indexOfMostHigh] = 0;  // failsafe 
                } 
            }
            else {
                // console.log(`Rule ${indexOfMostHigh} rejected!`)
                genomeClone[indexOfMostHigh] = 0; 
            }
        }
    }
    // console.log("returning from readGenome with no suggestion.")
    return runRule(23, board, mySymbol) // play randomly
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
        return [win(board, symbol), "Rule: Make 3 in a row!"]
    }
    else if (number === 1) {
        return [win(board, opposite(symbol)), "Rule: Block opponent!"]
    }
    else if (number === 2) {
        return [fork(board, symbol), "Rule: Make a fork!"]
    }
    else if (number === 3) {
        return [blockSingleForkingOpportunity(board, opposite(symbol)), "Rule: Block your fork!"]
    }
    else if (number === 4) {
        return [blockAllForksWhileThreatening(board, symbol), "Rule: Block fork & threaten!"]
    }
    else if (number === 5) {
        return [threatenWithoutInvitingAFork(board, symbol), "Rule: Threaten... if safe to"]
    }
    else if (number === 6) {
        return [cornerOnFirst(board), "Rule: Take corner on 1st move"]
    }
    else if (number === 7) {
        return [center(board), "Rule: Take the centre!"]
    }
    else if (number === 8) {
        return [oppositeCorner(board, symbol), "Rule: Take opposite corner"]
    }
    else if (number === 9) {
        return [emptyCorner(board), "Rule: Take any empty corner"]
    }
    else if (number === 10) {
        return [emptySide(board), "Rule: Take any empty edge"]
    }
    else if (number === 11) {
        return [centreOnFirst(board), "Rule: Take centre on 1st move"]
    }
    else if (number === 12) {
        return [nextCornerAsOpponentClockwise(board, symbol), "Take next clockwise corner to you"]
    }
    else if (number === 13) {
        return [nextCornerAsOpponentAntiClockwise(board, symbol), "Take next anticlockwise corner to you"]
    }
    else if (number === 14) {
        return [nextCornerAsSelfClockwise(board, symbol), "Take next clockwise corner to me"]
    }
    else if (number === 15) {
        return [nextCornerAsSelfAntiClockwise(board, symbol), "Rule: Take next anticlockwise corner to me"]
    }
    else if (number === 16) {
        return [nextEdgeAsOpponentClockwise(board, symbol), "Rule: Take next clockwise edge to you"]
    }
    else if (number === 17) {
        return [nextEdgeAsOpponentAntiClockwise(board, symbol), "Rule: Take next anticlockwise edge to you"]
    }
    else if (number === 18) {
        return [nextEdgeAsSelfClockwise(board, symbol), "Rule: Take next clockwise edge to me"]
    }
    else if (number === 19) {
        return [nextEdgeAsSelfAntiClockwise(board, symbol), "Rule: Take next anticlockwise edge to me"]
    }
    else if (number === 20) {
        return [oppositeEdgeAsOpponent(board, symbol), "Rule: Take opposite edge to you"]
    }
    else if (number === 21) {
        return [oppositeEdgeAsSelf(board, symbol), "Rule: Take opposite edge to me"]
    }
    else if (number === 22) {
        return [playCenterOnSecond(board), "Rule: Take centre on 2nd move"]
    }
    else if (number === 23) {
        return [playRandom(board), "Rule: Play random!"]
    }
    else if (number === 24) {
        return [makeTwoInALine(board, symbol), "Rule: Make 2 in a line!"]
    }
    else if (number === 25) {
        return [avoidInvitingAFork(board, symbol), "Rule: Block all forks!"]
    }
    else return [null, "no rule with this number"]; 
}
  

