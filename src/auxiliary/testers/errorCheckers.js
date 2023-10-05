import { isNumber, hasTwoOrFewerDecimalPlaces } from "../general/usefulFunctions.js";
import * as tf from '@tensorflow/tfjs';


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
        // console.log(`Warning: ${funcName}: checkBeadSubbase has only passed because dbase is empty!`)
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
        // console.log(`Element ${num}: ${JSON.stringify(array[num])}`)
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

export function checkArray(array, arrayName, funcName){
    if (!Array.isArray(array)) throw new Error(` in ${funcName}, ${arrayName} is not an array but is ${array}.`)
}

export function checkforNonFalseyValue(value, valueName, funcName){
    if (!value) throw new Error(` in ${funcName}, ${valueName} has a falsey value.`)
}

export function checkforNonFalseyValueOtherThan0(value, valueName, funcName){
    if (value === 0) return; 
    if (!value) throw new Error(` in ${funcName}, ${valueName} has a falsey value.`)
}

export function checkArrayHasDefinedValues(array, arrayName, funcName, inputArray){
    if (!array) throw new Error(` in ${funcName}, ${arrayName} is not defined!`)

    if (!Array.isArray(array) && !array instanceof Float32Array) throw new Error(` in ${funcName}, ${arrayName} is not an array but is ${JSON.stringify(array)}`)
    for (let i = 0; i < array.length; i++){
        if (array[i] === 0) continue; 
        if (!array[i]) throw new Error(`For input arguments ${listInputArguments(inputArray, funcName)} in ${funcName}, the ${i}th member of ${arrayName} has a falsey value, namely ${array[i]}.`)
    }
}

export function checkArrayContainsOnlyNumbers(array, arrayName, funcName, inputArray){
    for (let i = 0; i < array.length; i++){
        if (isNumber(array[i])) continue; 
        if (!array[i]) throw new Error(`For input arguments ${listInputArguments(inputArray, funcName)} in ${funcName}, the ${i}th member of ${arrayName} is not a number, it's ${array[i]}.`)
    }
}

export function check9ArrayBundle(array, arrayName, funcName, inputArray){
    if (array === null || array === undefined) throw new Error(` in ${funcName}, ${arrayName} is not defined!`)
    //if (array.length !== 9) throw new Error(` in ${funcName}, ${arrayName} is wrong length! Is ${array.length} but should be 9.`)
    checkArrayHasDefinedValues(array, arrayName, funcName, inputArray)
    checkArrayContainsOnlyNumbers(array, arrayName, funcName, inputArray)
}




// export function listInputArguments(array, funcName){
//     checkArray(array, "value passed to listInputArguments", funcName)
//     let returnString = ""; 
//     for (let i = 0; i < array.length; i++){
//         if (array.length = 1) {returnString = returnString + `${JSON.stringify(array[0])}`}
//         else if (i === array.length - 1) {returnString = returnString + `and ${JSON.stringify(array[i])}  
//         `}
//         else returnString = returnString + `,
        
//         ${JSON.stringify(array[i])}`
//     }
//     return JSON.stringify(returnString); 
// }

export function listInputArguments(array, funcName){
    checkArray(array, "value passed to listInputArguments", funcName)
    return array.join(','); 
}

export function checkConnections(connectionsArray, arrayName, funcName){
    if (!Array.isArray(connectionsArray) && !connectionsArray instanceof Float32Array) throw new Error(`Bad connection list in ${funcName}, outer array ${arrayName} is not an array, but is ${connectionsArray}.`)
    // if (connectionsArray.length !==9) throw new Error(`Bad connection list in ${funcName}, the outer array ${arrayName} is not the right length, but is length ${connectionsArray.length}.`)
    for (let i = 0; i < connectionsArray.length; i++){
        if (!Array.isArray(connectionsArray[i]) && !connectionsArray[i] instanceof Float32Array) throw new Error(`Bad connection list in ${funcName}, the ${i}th inner array of ${arrayName} is not an array, but is ${connectionsArray[i]}.`)
        //if (connectionsArray[i].length !==9) throw new Error(`Bad connection list in ${funcName}, the ${i}th inner array of ${arrayName} is not the right length, but is length ${connectionsArray[i].length}.`)
        check9ArrayBundle(connectionsArray, "connectionsArray", funcName, ["n/a"])
    }
}

export function checkArrayOfArrays(arrayOfArrays, arrayName, funcName){
    if (!Array.isArray(arrayOfArrays) && !arrayOfArrays instanceof Float32Array) throw new Error(` in ${funcName}, outer array ${arrayName} is not an array, but is ${arrayOfArrays}.`)
    for (let i = 0; i < arrayOfArrays.length; i++){
        if (!Array.isArray(arrayOfArrays[i]) && !arrayOfArrays[i] instanceof Float32Array) throw new Error(` in ${funcName}, the ${i}th inner array of ${arrayName} is not an array, but is ${arrayOfArrays[i]}.`)
        checkArrayHasDefinedValues(arrayOfArrays[i], `the ${i}th array of ${arrayName}`, funcName, ["n/a"])
    }
}

export function returnArrayOfTypesOf(array){
    let typesOfArray = []
    for (let i = 0; i < array.length; i++){
        typesOfArray.push(typeof array[i])
    }
    return typesOfArray; 
}




export function checkNetData(net, funcName){
    const midwayPoint = net.length/2; //this marks when the connections data stops and bias data begins

    for (let i = 0; i < net.length; i++){
        if (i < midwayPoint) {
            checkConnections(net[i], `${i}th layer of connections`, funcName)
        }
        else {
            //console.log(`net[${i}], net is`, net[i]);
            check9ArrayBundle(net[i], `${i}th array, which is ${i-midwayPoint}th bias array`, funcName, ['n/a'])
        }
    }
}

async function hasAllDefinedValues(tensor) {
    const isNaNTensor = tf.isNaN(tensor);
    const anyNaN = await tf.any(isNaNTensor).data();
    return !anyNaN[0];
}

// returns true for 1d tensors of length 9 and 2d tensors with 9 columns
function isOfLength9(tensor){
    if (tensor.shape.length === 1) return tensor.shape[0] === 9; 
    else if (tensor.shape.length === 2) return tensor.shape[1] === 9; 
}

// const tensorTestData = [[0.059, 0.091, 0.024, 0.074, 0.015, 0.026, 0.055, 0.023, 0.069],
// [0.082, 0.01 , 0.023, 0.007, 0.008, 0.073, 0.069, 0.094, 0.024],
// [0.047, 0.039, 0.008, 0.07 , 0.025, 0.057, 0.013, 0.092, 0.093],
// [0.043, 0.007, 0.002, 0.035, 0.082, 0.013, 0.064, 0.029, 0.094],
// [0.08 , 0.082, 0.029, 0.097, 0.036, 0.032, 0.001, 0.022, 0.066],
// [0.091, 0.037, 0.043, 0.061, 0.014, 0.006, 0.076, 0.069, 0.04 ],
// [0.007, 0.078, 0.05 , 0.085, 0.069, 0.023, 0.023, 0.067, 0.02 ],
// [0.001, 0.007, 0.044, 0.098, 0.098, 0.055, 0.009, 0.026, 0.037],
// [0.098, 0.054, 0.078, 0.07 , 0.058, 0.01 , 0.04 , 0.014, 0.063]]
// const tensor = tf.tensor(tensorTestData);


// console.log(checkTensor(tensor, 'testTensor', 'console.log'))

export function checkTensor(tensor, tensorName, funcName, input){
    hasAllDefinedValues(tensor).then(result => {
        if (!result) {
            if (input) {
                // console.log(`tensor ${tensorName} in ${funcName} has NaN values! input that caused problem tensor was...`)
                input.print()
            }
            throw new Error(`tensor ${tensorName} in ${funcName} has NaN values!`)}
    });
    // if (!isOfLength9(tensor)){
    //     console.log(`in tensor ${tensorName} in ${funcName} is not of length 9! Tensor was: `)
    //     tensor.print(); 
    //     throw new Error(`tensor ${tensorName} in ${funcName} is not of length 9!`)
    // }
}