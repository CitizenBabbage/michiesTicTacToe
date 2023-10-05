import { checkArrayContainsOnlyNumbers, check9ArrayBundle } from "../../auxiliary/testers/errorCheckers.js";
import { cutIntoOneHots } from "./neuroHelpers.js";

export function computeErrorForLastLayer(predictionArray, correctArray, sums){
    let learningErrorArray = []; 
    let oneHotErrorArray = []; 
    const crossEntropyArray = getAllCrossEntropyLosses(predictionArray, correctArray) // this is just for reporting. the c.e. cancels out in the back prop
    for (let i = 0; i < predictionArray.length; i++){
        oneHotErrorArray = predictionArray[i].map((num,j) => num - correctArray[i][j]); 
        learningErrorArray.push(oneHotErrorArray); 
    }
    return ([learningErrorArray, crossEntropyArray]); 

}

//expects an array of (4) softmaxed probabilities and an array of (4) one hot encoded correct answers 
function crossEntropyLoss (predictionArray, labelArray){
    let arrayToBeSummed = []; 
    const epsilon = 1e-15
    for (let i = 0; i < predictionArray.length; i++){
        if (predictionArray[i] <= epsilon || (predictionArray[i] >= 1 - epsilon && predictionArray[i] <= 1)){console.log(`WARNING::: ${predictionArray[i]} is very close to 0 or 1 in crossEntropyLoss`)}
        const clippedValue = Math.min(Math.max(predictionArray[i], epsilon), 1 - epsilon);
        arrayToBeSummed[i] = labelArray[i] * Math.log(clippedValue)
    }
    const crossEntropyError = -1 * (arrayToBeSummed.reduce((accumulator, current) => accumulator + current, 0))
    return crossEntropyError; 
}




function getAllCrossEntropyLosses(arrayOfPredictions, arrayOfLabels){

    let outputArray = []; 
    for (let i = 0; i < arrayOfPredictions.length; i++){
        outputArray[i] = crossEntropyLoss(arrayOfPredictions[i], arrayOfLabels[i])
    }
    return outputArray; 
}



// this computes the error for a given hidden layer given the errors from its successor layer
// and the differentials at the actual layer
// returns an error array
export function computeErrorForHiddenLayers(weights, errs, differentials){
    // console.log("computeErrorForHiddenLayers, errs received are: ", errs)
    // console.log("computeErrorForHiddenLayers, weights received are: ", weights) // weights received are NaNs. 
    // console.log("computeErrorForHiddenLayers, differentials received are: ", differentials)


    errs = errs.flat(); 
    let errArray = new Array(weights.length).fill(0);
    for (let i = 0; i < weights.length; i++){ // for each node at the hidden layer
        let runningSum = 0; 
        for (let j = 0; j < errs.length; j++){
            runningSum = runningSum + (weights[i][j] * errs[j]) // sum the weights from that node times the error at the nodes to which they connect
        }
        errArray[i] = runningSum * differentials[i] // the error at that node equals the above sum times the ith differential
    }
    //console.log("computeErrorForHiddenLayers, errArray returned is : ", errArray)
    return errArray;
    }


    export function squaredError(array){
        return array.reduce((acc,curr)=>acc+(curr**2),0)
    }

    export function getReluDifferentials(array){
        let differentialsArray = []; 
        for (let i = 0; i < array.length; i++){
            differentialsArray.push(reluPrime(array[i]))
        }
        return differentialsArray; 
    }
    
    
    // this is the first derivative of the relu function
    export function reluPrime(value){
        if (value > 0) return 1
        else return 0; 
    }

    function softmaxPrime(){}