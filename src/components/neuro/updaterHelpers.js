import { whoseMove , numerizeBoard} from "../../auxiliary/general/usefulFunctions";
import { neuroChooseMove } from "../../auxiliary/choiceFunctions/neuroChooseMove";
import { minimaxRecurse } from "../../auxiliary/choiceFunctions/minimaxChooseMove";
import { db } from "../../auxiliary/boardStateDatabase/dataBeadsFormatted";
import { checkArrayHasDefinedValues, checkArrayOfArrays ,checkArray, checkforNonFalseyValueOtherThan0, checkConnections } from "../../auxiliary/testers/errorCheckers";

// goes through each board state in the training set once
// returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError]
export function oneTrainingCycle(trainingSet, net, learningRate, sigma){
    let results;
    checkConnections(net[0], "first layer of connections after start of function", "oneTrainingCycle") 
    for (let i = 0; i < trainingSet.length; i++){
        let board = trainingSet[i].state; 
        board = numerizeBoard(board); 
        results = oneLearningIteration(board, net, learningRate, sigma)
        checkConnections(results[0], `first layer of connections after results returned on iteration ${i}`, "oneTrainingCycle") 
        checkConnections(results[1], `second layer of connections after results returned on iteration ${i}`, "oneTrainingCycle") 
        checkArrayHasDefinedValues(results[2], `results[2] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
        checkArrayHasDefinedValues(results[3], `results[3]at iteration ${i}`, "oneTrainingCycle", ["n/a"])
        net = [...results]; 
        net.pop(); 
        checkConnections(net[0], `first layer of connections after net returned on iteration ${i}`, "oneTrainingCycle") 
        checkConnections(net[1], `second layer of connections after net returned on iteration ${i}`, "oneTrainingCycle") 
        checkArrayHasDefinedValues(net[2], `net[2] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
        checkArrayHasDefinedValues(net[3], `net[3] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
        console.log("in loop: results[4] is ", results[4])

        checkforNonFalseyValueOtherThan0(results[4], "results[4]", "oneTrainingCycle")
        }
    console.log("results.length is ", results.length)
    console.log("after loop, results is ", results)
    console.log("after loop: results[4] is " , results[4])
    return results; 
}

export function getTrainingSet(percentTrainingSet){
    // console.log('training set percent is set to :', percentTrainingSet)
    const fraction = percentTrainingSet/100; 
    let trainingSet = [db[0]]; 
    // console.log("db.length is ", db.length)
    for (let i = 1; i < db.length; i++){
        const rando = Math.random(); 
        // console.log("random number is: ", rando)
        if (rando < fraction) {
            // console.log("random process selects boardstate: ", db[i].id)
            trainingSet.push(db[i]); 
        }
    }
    // console.log(`getTrainingSet: training set length is ${trainingSet.length}`)
    return trainingSet; 
    }

// returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError]
export function oneLearningIteration(board, net, learningRate, sigma){
    const data = getComparisonArraysAndForwardPassData(board,net);
    checkArrayOfArrays([data[0],data[2],data[3],data[4],data[5]], "data", "oneLearningIteration")
    const finalWeights = calculateFinalLayerUpdate(data, net, learningRate, sigma, board) // returns [newWeights, newBiases, squrdError, finalErrors] 
    // console.log(`
    //     Minimax board is ${data[0]} 
    //     prediction is ${data[5]}
    //     error array is ${finalWeights[3]}
    //     squared error is ${finalWeights[2]}`)
    if (finalWeights[2] < sigma) {
        // console.log("Error is reduced below acceptability threshold. Stopping.") 
        return [...net, finalWeights[2]]; 
    }
    checkforNonFalseyValueOtherThan0(finalWeights[2], "finalWeights[2]", "oneLearningIteration")
    const hiddenWeights = calculateHiddenLayerUpdate(data, net, board, learningRate, finalWeights[3]);
    console.log("oneLearningIteration: finalWeights[2] is", finalWeights[2])
    const output = [hiddenWeights[0],finalWeights[0],hiddenWeights[1],finalWeights[1],finalWeights[2]]
    console.log("output[4] is ", output[4])
    return output;  //finalWeights[2] carries the residual error
}

// returns [newWeights, newBiases, squrdError, finalErrors] 
export function calculateFinalLayerUpdate(data, net, learningRate, sigma, board){
    const minimaxArray = data[0], predictionArray = data[5], outputSums = data[4], hiddenValues = data[3]; //for readability
    const secondWeights = net[1], secondBias = net[3]; //likewise

    const correctArray = convertMinimax(minimaxArray);
    const differentialArray2 = getDifferentials(outputSums);
    const finalErrors = computeErrorForLastLayer(predictionArray, correctArray, differentialArray2);
    checkArrayHasDefinedValues(finalErrors, "finalErrors", "calculateFinalLayerUpdate",["n/a"]) 
    const squrdError = squaredError(finalErrors); // this is only to provide a stop condition
    checkforNonFalseyValueOtherThan0(squrdError, "squrdError", "calculateFinalLayerUpdate")
    if (squrdError < sigma) return [net[1],net[3], squrdError,finalErrors]
    

    const finalWeights = updateFinalLayer(secondWeights, secondBias, finalErrors, hiddenValues, learningRate);
    checkArrayHasDefinedValues(finalErrors, "finalErrors", "calculateFinalLayerUpdate",["n/a"])
    const output = [...finalWeights, squrdError, finalErrors];
    const indexOfSqrdError = output.indexOf(squrdError); 
    // console.log("calculateFinalLayerUpdate: the index in output of sqrdError is: ", output.indexOf(squrdError))
    if (indexOfSqrdError !== 2) throw new Error (" in calculateFinalLayerUpdate: index of sqrdError not equal to 2")
    checkforNonFalseyValueOtherThan0(squrdError, "squrdError", "calculateFinalLayerUpdate")
    checkforNonFalseyValueOtherThan0(output[2], "output[2]", "calculateFinalLayerUpdate")
    // console.log("in calculateFinalLayerUpdate, length of output is: ", output.length)
    checkArrayHasDefinedValues(output[3], "output[3]", "calculateFinalLayerUpdate",["n/a"])
    return output;  
}

export function squaredError(array){
    return array.reduce((acc,curr)=>acc+(curr**2),0)
}

//returns [newWeights,newBiases]
export function calculateHiddenLayerUpdate(data, net, board, learningRate, finalErrors){
    const differentialArray1 = getDifferentials(data[2])
    const hiddenErrors = computeErrorForHiddenLayers(net[0], finalErrors, differentialArray1)
    const hiddenWeights = updateHiddenLayer(net[0], net[2], hiddenErrors, board, learningRate);
    checkConnections(hiddenWeights[0], "hiddenWeights[0]", "calculateHiddenLayerUpdate")
    return hiddenWeights; 
}



export function convertMinimax(minimaxArray){
    let convertedArray = []; 
    for (let i = 0; i < minimaxArray.length; i++){
        if (minimaxArray[i] === null || minimaxArray[i] === undefined){convertedArray[i] = 0}
        else convertedArray[i] = minimaxArray[i]/10 + 2
    }
    return convertedArray; 
    }

// this is the first derivative of the relu function
export function reluPrime(value){
    if (value > 0) return 1
    else return 0; 
}

export function getDifferentials(array){
    let differentialsArray = []; 
    for (let i = 0; i < array.length; i++){
        differentialsArray.push(reluPrime(array[i]))
    }
    return differentialsArray; 
}

// this returns an array with 
// data: [
    //  minimaxArray,
    //  recommendedMove, 
    //  hiddenSums,
    //  hiddenValues,
    //  outputSums,
    //  outputArray     
//      ]
export function getComparisonArraysAndForwardPassData(board,net){

    const whoseTurn = whoseMove(board); 
    const outputAndForwardPassData = neuroChooseMove(board, net); 

    // console.log("getComparisonArraysAndForwardPassData: board received is ", board) 
    // console.log("getComparisonArraysAndForwardPassData: net received is ", net) 
    const minimaxArray = minimaxRecurse(board, whoseTurn)[2];
    // console.log(`minimaxArray is `, JSON.stringify(minimaxArray))
    const denullifiedMinimaxArray = convertMinimax(minimaxArray); 
    checkArrayHasDefinedValues(denullifiedMinimaxArray, "denullifiedMinimaxArray", "getComparisonArraysAndForwardPassData", ["n/a"]) 

    const output = [denullifiedMinimaxArray,...outputAndForwardPassData]
    // console.log("getComparisonArraysAndForwardPassData: output is ", JSON.stringify(output))
    return output; 
}


export function computeErrorForLastLayer(predictionArray, correctArray, differentialArray){
    const errorArray = correctArray.map((num, i) => (num - predictionArray[i])*differentialArray[i]);
    checkArrayHasDefinedValues(errorArray, "errorArray", computeErrorForLastLayer, ["n/a"]) 
    return errorArray; 
}

export function update(weightArray, biasArray, errorArray, priorLayer, learningRate){
    // console.log("priorLayer is ", priorLayer)
    checkArrayHasDefinedValues(biasArray, "biasArray", "update", ["n/a"])
    checkArrayHasDefinedValues(errorArray, "errorArray", "update", ["n/a"])
    checkConnections(weightArray, "weightArray", "update")
    checkArrayHasDefinedValues(priorLayer, "priorLayer", "update", ["n/a"])
    checkforNonFalseyValueOtherThan0(learningRate, "learningRate", "update")
    let newWeights = [...weightArray];
    
 
    let newBiases = [...biasArray]; 
    for (let i = 0; i < weightArray.length; i++){
        for (let j = 0; j < errorArray.length; j++){
            newWeights[i][j] = weightArray[i][j] + (learningRate * priorLayer[i] * errorArray[j])
            newBiases[j] = biasArray[j] + (learningRate * errorArray[j])
        }
    }
    const output = [newWeights,newBiases]
    return [newWeights,newBiases]
}

//for debugging only. collapse into a single function update later
export function updateFinalLayer(weightArray, biasArray, errorArray, priorLayer, learningRate){
    // console.log("updateFinalLayer: priorLayer is ", priorLayer)
    checkArrayHasDefinedValues(biasArray, "biasArray", "updateFinalLayer", ["n/a"])
    checkArrayHasDefinedValues(errorArray, "errorArray", "updateFinalLayer", ["n/a"])
    checkConnections(weightArray, "weightArray", "update")
    checkArrayHasDefinedValues(priorLayer, "priorLayer", "updateFinalLayer", ["n/a"])
    checkforNonFalseyValueOtherThan0(learningRate, "learningRate", "update")
    let newWeights = [...weightArray];
    
 
    let newBiases = [...biasArray]; 
    for (let i = 0; i < weightArray.length; i++){
        for (let j = 0; j < errorArray.length; j++){
            newWeights[i][j] = weightArray[i][j] + (learningRate * priorLayer[i] * errorArray[j])
            newBiases[j] = biasArray[j] + (learningRate * errorArray[j])
        }
    }
    const output = [newWeights,newBiases]
    return [newWeights,newBiases]
}

export function updateHiddenLayer(weightArray, biasArray, errorArray, priorLayer, learningRate){
    // console.log("updateHiddenLayer: priorLayer is ", priorLayer)
    checkArrayHasDefinedValues(biasArray, "biasArray", "updateHiddenLayer", ["n/a"])
    checkArrayHasDefinedValues(errorArray, "errorArray", "updateHiddenLayer", ["n/a"])
    checkConnections(weightArray, "weightArray", "update")
    checkArrayHasDefinedValues(priorLayer, "priorLayer", "updateHiddenLayer", ["n/a"])
    checkforNonFalseyValueOtherThan0(learningRate, "learningRate", "update")
    let newWeights = [...weightArray];
    
 
    let newBiases = [...biasArray]; 
    for (let i = 0; i < weightArray.length; i++){
        for (let j = 0; j < errorArray.length; j++){
            newWeights[i][j] = weightArray[i][j] + (learningRate * priorLayer[i] * errorArray[j])
            newBiases[j] = biasArray[j] + (learningRate * errorArray[j])
        }
    }
    const output = [newWeights,newBiases]
    return [newWeights,newBiases]
}

// this computes the error for a given hidden layer given the errors from its successor layer
// and the differentials at the actual layer
export function computeErrorForHiddenLayers(weights, errors, differentials){
    let errorArray = []; 
    for (let i = 0; i < weights.length; i++){
        let runningSum = 0; 
        for (let j = 0; j < errorArray.length; j++){
            runningSum = runningSum + (weights[i][j] * errors[j])
        }
        errorArray[i] = runningSum * differentials[i]
        }
    return errorArray;
    }



