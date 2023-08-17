import { isNumber } from "./usefulFunctions";


export function checkSum(array, funcName){
    let sum = 0; 
    for (let i = 0; i < array.length; i++){
        sum = sum + array[i]
    }
    if (sum > 1.01 || sum < 0.99) throw new Error(` in menaceChooseMove/${funcName}: ${array} sums to ${sum} but should sum to 1`)
}

export function checkBoard(board, funcName){
    if (!Array.isArray(board)) throw new Error(` in ${funcName}: Board received is not an array! Received ${board}`)
    if (board.length !== 9) throw new Error(` in ${funcName}: Board received is of wrong length! Received ${board}`)
    let xes = 0, oes = 0; 
    for (let i = 0; i < board.length; i++){
        if (board[i] === 'X') xes +=1; 
        if (board[i] === 'O') oes +=1; 
    }
    if (oes > xes) throw new Error(` in ${funcName}: Too many O's in board state ${board}!`)
}

export function checkDbase(dbase, funcName){
    let dblength = dbase.length; 
    let arbitraryTest = dbase[2].state[7]; 
    if (arbitraryTest !== 'X') {
        throw new Error(` in ${funcName}: dbase isn't right. Board state 2 should have seventh place X, but has ${arbitraryTest} instead. Board state 2 = ${JSON.stringify(dbase[2].state)}, from object ${JSON.stringify(dbase[2])}. dblength = ${dblength}.`)
    }
    if (!isNumber(dbase[0].response[0])) throw new Error(` in ${funcName}: dbase isn't right. Board state 0 should have all numbers for response array, but has ${JSON.stringify(dbase[0].response)} instead. dblength = ${dblength}.`)
}

export function showFirstnElements(array, num){
    for (let i = 0; i < num; i++){
        console.log(`Element ${num}: ${JSON.stringify(array[num])}`)
    }
}

export function checkIsANumber(value, funcName, valName){
    if (!isNumber(value)) throw new Error(` in ${funcName}: ${valName} is ${value}, not a number.`)
} 

export function checkArchetype(obj){
    if (!isNumber(obj.response[0])) {
        throw new Error(` in menaceChooseMove/getBoardObject: got a bad archetype, namely: ${JSON.stringify(obj)}`)
    }
}