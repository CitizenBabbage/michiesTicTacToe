///this page is just for temporarily holding code as a reference. Periodically, everything below this line should be deleted. 

import { whoseMove , numerizeBoard} from "../../auxiliary/general/usefulFunctions";
import { neuroChooseMove } from "../../auxiliary/choiceFunctions/neuroChooseMove";
import { minimaxRecurse } from "../../auxiliary/choiceFunctions/minimaxChooseMove";
import { db } from "../../auxiliary/boardStateDatabase/dataBeadsFormatted";
import { returnArrayOfTypesOf, checkArrayHasDefinedValues, checkArrayOfArrays ,checkArray, checkforNonFalseyValueOtherThan0, checkConnections } from "../../auxiliary/testers/errorCheckers";
import { generateGoodBoardStates } from "../../auxiliary/boardStateDatabase/makeBeadAuxilliaries";


// goes through each board state in the training set once
// returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError]
export function oneTrainingCycle(trainingSet, net, learningRate, sigma){
    console.log("starting oneTrainingCycle")
    if (net.length > 4) throw new Error(`Problem in oneTrainingCycle 1: net as input is too long! length = ${net.length}, should equal 4. net[4] is ${net[4]}`)

    let results, runningError = 0; 
    checkConnections(net[0], "first layer of connections after start of function", "oneTrainingCycle") 
    for (let i = 0; i < trainingSet.length; i++){
        let board = trainingSet[i]; 
        board = numerizeBoard(board); 
        if (net.length > 4) throw new Error(`Problem in oneTrainingCycle 2: net in loop is too long at iteration ${i}! length = ${net.length}, should equal 4. net[4] is ${net[4]}`)

        results = oneLearningIteration(board, net, learningRate, sigma) // returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError, rawErrors]
        //console.log("in oneTrainingCycle, received results of type:", returnArrayOfTypesOf(results))
        checkArrayHasDefinedValues(results[5], "results[5]", "oneTrainingCycle test 1", [JSON.stringify(board)])
        //console.log("oneTrainingCycle: results[5] is... ", results[5])
        checkArrayHasDefinedValues(results[5], "results[5]", "oneTrainingCycle test 2", [JSON.stringify(board)])
        const errorOnRun = Math.sqrt(squaredError(results[5])); 
        checkforNonFalseyValueOtherThan0(errorOnRun, "errorOnRun", "oneTrainingCycle")
        checkConnections(results[0], `first layer of connections after results returned on iteration ${i}`, "oneTrainingCycle") 
        checkConnections(results[1], `second layer of connections after results returned on iteration ${i}`, "oneTrainingCycle") 
        checkArrayHasDefinedValues(results[2], `results[2] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
        checkArrayHasDefinedValues(results[3], `results[3]at iteration ${i}`, "oneTrainingCycle", ["n/a"])
        net = [...results]; 
        //console.log("before pops, net length is ", net.length)
        net.pop();
        net.pop(); // knock off the last two values to get the net
        //console.log("after pops, net length is ", net.length)

        if (net.length > 4) throw new Error(`Problem in oneTrainingCycle 3: net as input is too long! length = ${net.length}, should equal 4. net[4] is ${net[4]}`)

        checkConnections(net[0], `first layer of connections after net returned on iteration ${i}`, "oneTrainingCycle") 
        checkConnections(net[1], `second layer of connections after net returned on iteration ${i}`, "oneTrainingCycle") 
        checkArrayHasDefinedValues(net[2], `net[2] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
        checkArrayHasDefinedValues(net[3], `net[3] at iteration ${i}`, "oneTrainingCycle", ["n/a"])
        //console.log("in loop: average error on this run is ", errorOnRun/9)
        runningError += errorOnRun; 
        }
    // the final net is the first four values of results, but the last value must be changed to the running error, not the error on the last run
    const averageError = runningError/(9*trainingSet.length); //average error per output unit
    results[4] = averageError; 
    console.log("Average error is ", averageError)
    console.log("ending oneTrainingCycle")
    return results; 
}

// export function getTrainingSet(percentTrainingSet){
//     // console.log('training set percent is set to :', percentTrainingSet)
//     const fraction = percentTrainingSet/100; 
//     const goodStates = generateGoodBoardStates(9);
//     let trainingSet = [goodStates[0]]; 
//     // console.log("db.length is ", db.length)
//     for (let i = 1; i < goodStates.length; i++){
//         const rando = Math.random(); 
//         // console.log("random number is: ", rando)
//         if (rando < fraction) {
//             trainingSet.push(goodStates[i]); 
//         }
//     }
//     return trainingSet; 
//     }

// returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError, rawErrors]
export function oneLearningIteration(board, net, learningRate, sigma){
    console.log("starting oneLearningIteration")
    if (net.length > 4) throw new Error(`Problem in oneLearningIteration: net as input is too long! length = ${net.length}, should equal 4. net[4] is ${net[4]}`)
    const predictionData = neuroChooseMove(board, net); // returns [0.recommended move, 1.hiddenSums, 2.hiddenValues, 3.outputSums, 4.output values]
    const recommendedMove = predictionData[0];
    const hiddenSums = predictionData[1];
    const hiddenValues = predictionData[2];
    const outputSuums = predictionData[3]; 
    const outputValues = predictionData[4]; 
    const correctArray = getCorrectArray(board); 

    // const data = getComparisonArraysAndForwardPassData(board,net); // returns [0. minimaxArray, 1.recommended move, 2.hiddenSums, 3.hiddenValues, 4.outputSums, 5.output values]

    const finalWeights = calculateFinalLayerUpdate([correctArray,...predictionData], net, learningRate, sigma, board) // returns [newWeights, newBiases, squrdError, finalErrors, rawErrors] 
    if (finalWeights[2] < sigma) {
        checkArrayHasDefinedValues(finalWeights[4], "finalWeights[4]", "oneLearningIteration test 1", [JSON.stringify(board)])
        return [...net, finalWeights[2],finalWeights[4]]; 
    }
    checkforNonFalseyValueOtherThan0(finalWeights[2], "finalWeights[2]", "oneLearningIteration")
    const hiddenWeights = calculateHiddenLayerUpdate([correctArray,...predictionData], net, board, learningRate, finalWeights[3]);
    const output = [hiddenWeights[0],finalWeights[0],hiddenWeights[1],finalWeights[1],finalWeights[2], finalWeights[4]]//finalWeights[2] carries the residual error, finalWeights[4] the raw errors
    checkArrayHasDefinedValues(output[5], "output[5]", "oneLearningIteration test 2", [JSON.stringify(board)])
    console.log("ending oneLearningIteration")
    return output;  
}

// returns [newWeights, newBiases, squrdError, finalErrors] 
// data = [0. minimaxArray, 1.recommended move, 2.hiddenSums, 3.hiddenValues, 4.outputSums, 5.output values]
export function calculateFinalLayerUpdate([minimaxArray, recommendedMove, hiddenSums, hiddenValues, outputSums, outputValues], net, learningRate, sigma, board){
    console.log("starting calculateFinalLayerUpdate")
    const predictionArray = outputValues; //for readability
    const secondWeights = net[1], secondBias = net[3]; //likewise

    //const correctArray = convertMinimax(minimaxArray);
    const correctArray = [7,7,7,7,7,7,7,7,7] // for debugging, to check if error correction happens in the upper direction

    const [finalErrors,rawErrors] = computeErrorForLastLayer(predictionArray, correctArray, outputSums);
    if (!rawErrors){console.log("rawErrors undefined in calculateFinalLayerUpdate, after returning from computeErrorForLastLayer")}
    checkArrayHasDefinedValues(finalErrors, "finalErrors", "calculateFinalLayerUpdate",["n/a"]) 
    const squrdError = squaredError(rawErrors); // this is only to provide a stop condition
  
    checkforNonFalseyValueOtherThan0(squrdError, "squrdError", "calculateFinalLayerUpdate")
    let output; 
    if (squrdError < sigma) {

        output = [net[1],net[3], squrdError,finalErrors, rawErrors]
        //console.log("in calculateFinalLayerUpdate 1, preparing output of types:", returnArrayOfTypesOf(output))

    }
    else {
        const finalWeights = update(secondWeights, secondBias, finalErrors, hiddenValues, learningRate);
        checkArrayHasDefinedValues(finalErrors, "finalErrors", "calculateFinalLayerUpdate",["n/a"])

        output = [...finalWeights, squrdError, finalErrors, rawErrors];
        //console.log("in calculateFinalLayerUpdate 2, preparing output of types:", returnArrayOfTypesOf(output))


    }

    
    const indexOfSqrdError = output.indexOf(squrdError); 
    // console.log("calculateFinalLayerUpdate: the index in output of sqrdError is: ", output.indexOf(squrdError))
    if (indexOfSqrdError !== 2) throw new Error (" in calculateFinalLayerUpdate: index of sqrdError not equal to 2")
    checkforNonFalseyValueOtherThan0(squrdError, "squrdError", "calculateFinalLayerUpdate")
    checkforNonFalseyValueOtherThan0(output[2], "output[2]", "calculateFinalLayerUpdate")
    // console.log("in calculateFinalLayerUpdate, length of output is: ", output.length)
    checkArrayHasDefinedValues(output[3], "output[3]", "calculateFinalLayerUpdate",["n/a"])
    // console.log(`calculateFinalLayerUpdate 2nd exit: returning: ${[(typeof output[0]),(typeof output[1]),(typeof squrdError),(typeof finalErrors),(typeof rawErrors)]}`)
    console.log("ending calculateFinalLayerUpdate")
    return output;  
}

export function squaredError(array){
    return array.reduce((acc,curr)=>acc+(curr**2),0)
}

//returns [newWeights,newBiases]
export function calculateHiddenLayerUpdate(data, net, board, learningRate, finalErrors){
    console.log("starting calculateHiddenLayerUpdate")
    const differentialArray1 = getDifferentials(data[2])
    const hiddenErrors = computeErrorForHiddenLayers(net[0], finalErrors, differentialArray1)
    const hiddenWeights = update(net[0], net[2], hiddenErrors, board, learningRate);
    checkConnections(hiddenWeights[0], "hiddenWeights[0]", "calculateHiddenLayerUpdate")
    console.log("ending calculateHiddenLayerUpdate")

    return hiddenWeights; 
}



export function convertMinimax(minimaxArray){
    let convertedArray = []; 
    for (let i = 0; i < minimaxArray.length; i++){
        if (minimaxArray[i] === null || minimaxArray[i] === undefined){convertedArray[i] = 1}
        else convertedArray[i] = minimaxArray[i]
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

// returns [0. minimaxArray, 1.recommended move, 2.hiddenSums, 3.hiddenValues, 4.outputSums, 5.output values]
// export function getComparisonArraysAndForwardPassData(board,net){

//     const whoseTurn = whoseMove(board); 
//     const outputAndForwardPassData = neuroChooseMove(board, net); 
//     const minimaxArray = minimaxRecurse(board, whoseTurn)[2];
//     const denullifiedMinimaxArray = convertMinimax(minimaxArray); 
//     checkArrayHasDefinedValues(denullifiedMinimaxArray, "denullifiedMinimaxArray", "getComparisonArraysAndForwardPassData", ["n/a"]) 
//     const output = [denullifiedMinimaxArray,...outputAndForwardPassData]
//     return output; 
// }

//this gets the correct array of values from minimax
export function getCorrectArray(board){
        console.log("starting getCorrectArray")

    const whoseTurn = whoseMove(board); 
    const minimaxArray = minimaxRecurse(board, whoseTurn)[2];
    const denullifiedMinimaxArray = convertMinimax(minimaxArray); // replaces null values with numerical
                                                    checkArrayHasDefinedValues(denullifiedMinimaxArray, "denullifiedMinimaxArray", "getComparisonArraysAndForwardPassData", ["n/a"]) 
    
    console.log("ending getCorrectArray")
    return denullifiedMinimaxArray; 
}

//the raw error is just the difference between predicted and actual, and is useful for 
//deciding when the learning should stop. The learning error is what is actually used in backprop. 
// export function computeErrorForLastLayerLEGACY(predictionArray, correctArray, differentialArray){
//     const rawErrorArray = correctArray.map((num, i) => (num - predictionArray[i]));
//     const learningErrorArray = rawErrorArray.map((num,i) => num * differentialArray[i])
//     return [learningErrorArray, rawErrorArray]; 
// }

export function computeErrorForLastLayer(predictionArray, correctArray, sums){
    console.log("starting computeErrorForLastLayer")
    const differentialArray = getDifferentials(sums);
    const rawErrorArray = correctArray.map((num, i) => (num - predictionArray[i]));
    const learningErrorArray = rawErrorArray.map((num,i) => num * differentialArray[i])
    console.log("learningErrorArray is:", learningErrorArray)
    console.log("ending computeErrorForLastLayer")
    return [learningErrorArray, rawErrorArray]; 
}

export function update(weightArray, biasArray, errorArray, priorLayer, learningRate){
    console.log("starting update")

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
    console.log("ending update")

    return [newWeights,newBiases]
}

// //for debugging only. collapse into a single function update later
// export function updateFinalLayer(weightArray, biasArray, errorArray, priorLayer, learningRate){
//     // console.log("updateFinalLayer: priorLayer is ", priorLayer)
//     checkArrayHasDefinedValues(biasArray, "biasArray", "updateFinalLayer", ["n/a"])
//     checkArrayHasDefinedValues(errorArray, "errorArray", "updateFinalLayer", ["n/a"])
//     checkConnections(weightArray, "weightArray", "update")
//     checkArrayHasDefinedValues(priorLayer, "priorLayer", "updateFinalLayer", ["n/a"])
//     checkforNonFalseyValueOtherThan0(learningRate, "learningRate", "update")
//     let newWeights = [...weightArray];
    
 
//     let newBiases = [...biasArray]; 
//     for (let i = 0; i < weightArray.length; i++){
//         for (let j = 0; j < errorArray.length; j++){
//             newWeights[i][j] = weightArray[i][j] + (learningRate * priorLayer[i] * errorArray[j])
//             newBiases[j] = biasArray[j] + (learningRate * errorArray[j])
//         }
//     }
//     const output = [newWeights,newBiases]
//     return [newWeights,newBiases]
// }

// export function updateHiddenLayer(weightArray, biasArray, errorArray, priorLayer, learningRate){
//     // console.log("updateHiddenLayer: priorLayer is ", priorLayer)
//     checkArrayHasDefinedValues(biasArray, "biasArray", "updateHiddenLayer", ["n/a"])
//     checkArrayHasDefinedValues(errorArray, "errorArray", "updateHiddenLayer", ["n/a"])
//     checkConnections(weightArray, "weightArray", "update")
//     checkArrayHasDefinedValues(priorLayer, "priorLayer", "updateHiddenLayer", ["n/a"])
//     checkforNonFalseyValueOtherThan0(learningRate, "learningRate", "update")
//     let newWeights = [...weightArray];
    
 
//     let newBiases = [...biasArray]; 
//     for (let i = 0; i < weightArray.length; i++){
//         for (let j = 0; j < errorArray.length; j++){
//             newWeights[i][j] = weightArray[i][j] + (learningRate * priorLayer[i] * errorArray[j])
//             newBiases[j] = biasArray[j] + (learningRate * errorArray[j])
//         }
//     }
//     const output = [newWeights,newBiases]
//     return [newWeights,newBiases]
// }

// this computes the error for a given hidden layer given the errors from its successor layer
// and the differentials at the actual layer
export function computeErrorForHiddenLayers(weights, errors, differentials){
    console.log("starting computeErrorForHiddenLayers")

    let errorArray = []; 
    for (let i = 0; i < weights.length; i++){
        let runningSum = 0; 
        for (let j = 0; j < errorArray.length; j++){
            runningSum = runningSum + (weights[i][j] * errors[j])
        }
        errorArray[i] = runningSum * differentials[i]
        }
    console.log("ending computeErrorForHiddenLayers")

    return errorArray;
    }



