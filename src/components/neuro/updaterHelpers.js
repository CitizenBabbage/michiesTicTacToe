import { whoseMove } from "../../auxiliary/general/usefulFunctions";
import { neuroChooseMove } from "../../auxiliary/choiceFunctions/neuroChooseMove";
import { minimaxRecurse } from "../../auxiliary/choiceFunctions/minimaxChooseMove";
import { db } from "../../auxiliary/boardStateDatabase/dataBeadsFormatted";

export function oneTrainingCycle(trainingSet, net, learningRate, sigma){
    let newNet = net; let results; 
    for (let i = 0; i < trainingSet.length; i++){
        let board = trainingSet[i].state; 
        results = oneLearningIteration(board, newNet, learningRate, sigma)
        }
    return results; 
}

export function getTrainingSet(percentTrainingSet){
    const fraction = percentTrainingSet/100; 
    let trainingSet = []; 
    for (let i = 0; i < db.length; i++){
        if (fraction < Math.random()) {
            trainingSet.push(db[i]); 
        }
    return trainingSet; 
    }
}

// returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias,residualError]
export function oneLearningIteration(board, net, learningRate, sigma){
    const data = getComparisonArraysAndForwardPassData(board,net);
    const finalWeights = calculateFinalLayerUpdate(data, net, learningRate, sigma)
    if (finalWeights[1] < sigma) {
        console.log("Error is reduced below acceptability threshold. Stopping.") 
        return [...net, finalWeights[1]]; 
    }
    const hiddenWeights = calculateHiddenLayerUpdate(data, net, board, learningRate, finalWeights[2]);

    return [hiddenWeights[0],finalWeights[0],hiddenWeights[1],finalWeights[1],hiddenWeights[2]] //hiddenWeights[2] carries the residual error
}

export function calculateFinalLayerUpdate(data, net, learningRate, sigma){
    const minimaxArray = data[0], predictionArray = data[5], outputSums = data[4], hiddenValues = data[3]; //for readability
    const secondWeights = net[1], secondBias = net[3]; //likewise
    console.log(`minimaxArray is ${minimaxArray}`)

    const correctArray = convertMinimax(minimaxArray);
    const differentialArray2 = getDifferentials(outputSums);
    console.log(`predictionArray is ${predictionArray}; correctArray is ${correctArray}; differentialArray2 is ${differentialArray2}`)
    const finalErrors = computeErrorForLastLayer(predictionArray, correctArray, differentialArray2);
    const squrdError = squaredError(finalErrors); // this is only to provide a stop condition
    console.log("squrdError is", squrdError)
    if (squrdError < sigma) return [net, squrdError]
    const finalWeights = update(secondWeights, secondBias, finalErrors, hiddenValues, learningRate);
    return [...finalWeights, squrdError]; 
}

export function squaredError(array){
    return array.reduce((acc,curr)=>acc+(curr**2),0)
}

export function calculateHiddenLayerUpdate(data, net, board, learningRate, finalErrors){
    const differentialArray1 = getDifferentials(data[2])
    const hiddenErrors = computeErrorForHiddenLayers(net[0], finalErrors, differentialArray1)
    const hiddenWeights = update(net[0], net[2], hiddenErrors, board, learningRate);
    return hiddenWeights; 
}

// data: [
    //  minimaxArray,
    //  recommendedMove, 
    //  hiddenSums,
    //  hiddenValues,
    //  outputSums,
    //  outputArray     
//      ]

export function convertMinimax(minimaxArray){
    let convertedArray = []; 
    for (let i = 0; i < minimaxArray.length; i++){
        if (minimaxArray[i] === null || minimaxArray[i] === undefined){convertedArray[i] = -2}
        else convertedArray[i] = minimaxArray[i]/10
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
    console.log(`getComparisonArraysAndForwardPassData: board is ${board} while whoseTurn is ${JSON.stringify(whoseTurn)}`)

    const minimaxArray = minimaxRecurse(board, whoseTurn)[2]; 
    console.log("getComparisonArraysAndForwardPassData: minimaxArray is ", JSON.stringify(minimaxArray))

    const output = [minimaxArray,...outputAndForwardPassData]
    // console.log("getComparisonArraysAndForwardPassData: output is ", JSON.stringify(output))
    return output; 
}

export function computeErrorForLastLayer(predictionArray, correctArray, differentialArray){
    const errorArray = correctArray.map((num, i) => (num - predictionArray[i])*differentialArray[i]);
    return errorArray; 
}

export function update(weightArray, biasArray, errorArray, priorLayer, learningRate){
    let newWeights = weightArray; 
    let newBiases = biasArray; 
    for (let i = 0; i < weightArray.length; i++){
        for (let j = 0; j < errorArray.length; j++){
            newWeights[i][j] = weightArray[i][j] + (learningRate * priorLayer[i] * errorArray[j])
            console.log(`biasArray is ${biasArray}`)
            console.log(`biasArray[j] is ${biasArray[j]}`)
            console.log(` learningRate is ${learningRate}`)
            console.log(` errorArray[j] is ${errorArray[j]}`)
            newBiases[j] = biasArray[j] + (learningRate * errorArray[j])
        }
    }
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



