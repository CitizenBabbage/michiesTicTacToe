import { isNumber, hasTwoOrFewerDecimalPlaces } from "../general/usefulFunctions.js";


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
    // for (let i = 0; i < dbase.length; i++){
    //     for (let j = 0; j < dbase[i].response.length; j++)
    //     if (!hasTwoOrFewerDecimalPlaces(dbase[i].response[j])) throw new Error(` in ${funcName}: dbase isn't right. Board state ${i} should have all numbers rounded to 2dp in response array, but element ${j} is ${dbase[i].response[j]}.`)
    // }
    for (let i = 0; i < dbase.length; i++){
        for (let j = 0; j < dbase[i].response.length; j++){
            if (dbase[i].response[j] < 0 ) throw new Error(` in ${funcName}: dbase isn't right. Element ${j} in response array of board state ${i} is smaller than 0.`)
            if (dbase[i].response[j] > 1 ) throw new Error(` in ${funcName}: dbase isn't right. Element ${j} in response array of board state ${i} is larger than 1.`)
    }
}
}

export function checkBeadbase(dbase, funcName){
    let dblength = dbase.length; 
    let arbitraryTest = dbase[2].state[7]; 
    if (arbitraryTest !== 'X') {
        throw new Error(` in ${funcName}: dbase isn't right. Board state 2 should have seventh place X, but has ${arbitraryTest} instead. Board state 2 = ${JSON.stringify(dbase[2].state)}, from object ${JSON.stringify(dbase[2])}. dblength = ${dblength}.`)
    }
    if (!isNumber(dbase[0].response[0])) throw new Error(` in ${funcName}: dbase isn't right. Board state 0 should have all numbers for response array, but has ${JSON.stringify(dbase[0].response)} instead. dblength = ${dblength}.`)
    for (let i = 0; i < dbase.length; i++){
        for (let j = 0; j < dbase[i].response.length; j++){
            if (dbase[i].response[j] < 0 ) throw new Error(` in ${funcName}: dbase isn't right. Element ${j} in response array of board state ${i} is smaller than 0.`)
            if (dbase[i].response[j] % 1 !== 0 ) throw new Error(` in ${funcName}: dbase isn't right. Element ${j} in response array of board state ${i} is non integral.`)
    }
}
}

export function checkBeadSubbase(dbase, funcName){
    let dblength = dbase.length; 
    if (dbase.length ===0){
        console.log(`Warning: ${funcName}: checkBeadSubbase has only passed because dbase is empty!`)
        return; 
    }
    if (!isNumber(dbase[0].response[0])) throw new Error(` in ${funcName}: dbase isn't right. Board state 0 should have all numbers for response array, but has ${JSON.stringify(dbase[0].response)} instead. dblength = ${dblength}.`)
    for (let i = 0; i < dbase.length; i++){
        for (let j = 0; j < dbase[i].response.length; j++){
            if (dbase[i].response[j] < 0 ) throw new Error(` in ${funcName}: dbase isn't right. Element ${j} in response array of board state ${i} is smaller than 0.`)
            if (dbase[i].response[j] % 1 !== 0 ) throw new Error(` in ${funcName}: dbase isn't right. Element ${j} in response array of board state ${i} is non integral.`)
    }
}
}

export function checkIsIntegral(num, funcName){
    let remainder = num%1; 
    if (!remainder === 0) throw new Error(` in ${funcName}: number ${num} isn't integral, but has remainder ${remainder} when divided by one!`)
    return; 
}

export function showFirstnElements(array, num){
    for (let i = 0; i < num; i++){
        console.log(`Element ${num}: ${JSON.stringify(array[num])}`)
    }
}

export function checkIsANumber(value, funcName, valName){
    if (!isNumber(value)) throw new Error(` in ${funcName}: ${valName} is ${value}, not a number.`)
} 

export function checkIsTernaryNumber(value, funcName, valName){
    if (!isNumber(value)) throw new Error(` in ${funcName}: ${valName} is ${value}, not a number.`)
    if (value !== 0 && value !== 1 && value !== -1) throw new Error(` in ${funcName}: ${valName} is ${value}, not 1, -1, or 0.`)
} 

export function checkArchetype(obj){
    if (!isNumber(obj.response[0])) {
        throw new Error(` in menaceChooseMove/getBoardObject: got a bad archetype, namely: ${JSON.stringify(obj)}`)
    }
}

export function checkNormalized(rounded, funcName){
    let sum = rounded.reduce((accumulator, current) => accumulator + current, 0);
    const epsilon = 0.0001;
    if (sum - 1 > epsilon || 1 - sum > epsilon ) throw new Error(`in ${funcName}: normalized array does not sum to 1`)
}