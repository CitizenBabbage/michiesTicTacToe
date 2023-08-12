import { isNumber } from "./usefulFunctions";


export function checkSum(array, funcName){
    let sum = 0; 
    for (let i = 0; i < array.length; i++){
        sum = sum + array[i]
    }
    if (sum > 1 || sum < 0.99) throw new Error(`Error in menaceChooseMove/${funcName}:received probability array that does not sum to 1`)
}

export function checkBoard(board, funcName){
    if (!Array.isArray(board)) throw new Error(`Error in ${funcName}: Board received is not an array!`)
    if (board.length !== 9) throw new Error(`Error in ${funcName}: Board received is of wrong length!`)
    let xes = 0, oes = 0; 
    for (let i = 0; i < board.length; i++){
        if (board[i] === 'X') xes +=1; 
        if (board[i] === 'O') oes +=1; 
    }
    if (oes > xes) throw new Error(`Error in ${funcName}: Too many O's!`)
}

export function checkDbase(dbase, funcName){
    let arbitraryTest = dbase[2].state[7]; 
    if (arbitraryTest !== 'X') throw new Error(`Error in ${funcName}: dbase isn't right. Board state 2 should have seventh place X, but has ${arbitraryTest} instead.`)
    if (!isNumber(dbase[0].response[0])) throw new Error(`Error in ${funcName}: dbase isn't right. Board state 0 should have all numbers for response array, but has ${JSON.stringify(dbase[0].response)} instead`)
}

export function checkIsANumber(value, funcName, valName){
    if (!isNumber(value)) throw new Error(`Error in ${funcName}: ${valName} is not a number.`)
} 

export function checkArchetype(obj){
    if (!isNumber(obj.response[0])) {
        throw new Error(`Error in menaceChooseMove/getBoardObject: got a bad archetype, namely: ${JSON.stringify(obj)}`)
    }
}