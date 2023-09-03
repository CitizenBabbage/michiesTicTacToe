export function oneTrainingCycle(trainingSet, net, learningRate){
    let newNet = net; let results; 
    for (let i = 0; i < trainingSet.length; i++){
        let board = trainingSet[i].state; 
        results = oneLearningIteration(board, results[0], learningRate)
        }
    return results; 
}

export function getTrainingSet(percentTrainingSet, db){
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
export function oneLearningIteration(board, net, learningRate){
    const data = getComparisonArraysAndForwardPassData(board,net);
    const finalWeights = calculateFinalLayerUpdate(data, net, learningRate, sigma)
    if (finalWeights[1] < sigma) {
        console.log("Error is reduced to less than maximum. Stopping.") 
        return [...net, finalWeights[1]]; 
    }
    const hiddenWeights = calculateHiddenLayerUpdate(data, net, board, learningRate);

    return [hiddenWeights[0],finalWeights[0],hiddenWeights[1],finalWeights[1],hiddenWeights[2]] //hiddenWeights[2] carries the residual error
}

export function calculateFinalLayerUpdate(data, net, learningRate, sigma){
    const correctArray = convertMinimax(data[0]);
    const predictionArray = data[5]; 
    const differentialArray2 = getDifferentials(data[4]);
    const finalErrors = computeErrorForLastLayer(predictionArray, correctArray, differentialArray2);
    const squaredError = squaredError(finalErrors); // this is only to provide a stop condition
    if (squaredError < sigma) return [net, squaredError]
    const finalWeights = update(net[1], net[3], finalErrors, data[3], learningRate);
    return [...finalWeights, squaredError]; 
}

export function calculateHiddenLayerUpdate(data, net, board, learningRate){
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
        if (!minimaxArray[i]){convertedArray[i] = -2}
        else convertedArray[i] = minimaxArray[i]/10}
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
    const minimaxArray = minimaxChooseMove(board, whoseTurn); 
    return [minimaxArray,...outputAndForwardPassData]
}

export function computeErrorForLastLayer(predictionArray, correctArray, differentialArray){
    const errorArray = correctArray.map((num, i) => (num - predictionArray[i])*differentialArray[i]);
    return errorArray; 
}

export function update(weightArray, biasArray, errorArray, priorLayer, learningRate){
    let newWeights = []; 
    let newBiases = []; 
    for (let i = 0; i < weightArray.length; i++){
        for (let j = 0; j < errorArray.length; j++){
            newWeights[i][j] = weightArray[i][j] + (learningRate * priorLayer[i] * errorArray[j])
            newBiases[j] = biasArray[j] + (learningRate * errorArray[j])
        }
    }
    return [newWeights,newBiases]
}

// this computes the error for a given hidden layer given the errors from its successor layer
// and the differentials at the actual layer
export function computeErrorForHiddenLayers(weights, errors, differentials){
    let errorArray = []; 
    for (let i = 0; i < weightArray.length; i++){
        let runningSum = 0; 
        for (let j = 0; j < errorArray.length; j++){
            runningSum = runningSum + (weights[i][j] * errors[j])
        }
        errorArray[i] = runningSum * differentials[i]
        }
    return errorArray;
    }



