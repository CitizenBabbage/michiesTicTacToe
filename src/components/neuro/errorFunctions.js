import { checkArrayContainsOnlyNumbers, check9ArrayBundle } from "../../auxiliary/testers/errorCheckers";

export function computeErrorForLastLayer(predictionArray, correctArray, sums){
    //console.log("starting computeErrorForLastLayer")
    //console.log("computeErrorForLastLayer: sums is ", sums)

    const differentialArray = getDifferentials(sums);
    // console.log("computeErrorForLastLayer: differentialArray is ", differentialArray)
    // console.log("computeErrorForLastLayer: predictionArray is ", predictionArray)
    // console.log("computeErrorForLastLayer: correctArray is ", correctArray)
    
    
    //const rawErrorArray = correctArray.map((num, i) => (Math.abs(num - predictionArray[i]) > 0.5? num - predictionArray[i]:0));
    const rawErrorArray = correctArray.map((num, i) => (num - predictionArray[i]));
    //console.log("computeErrorForLastLayer: rawErrorArray is ", rawErrorArray)

    const learningErrorArray = rawErrorArray.map((num,i) => num * differentialArray[i])
    //console.log("computeErrorForLastLayer: learningErrorArray is:", learningErrorArray)
    //console.log("ending computeErrorForLastLayer")
    return [learningErrorArray, rawErrorArray]; 
}


// this computes the error for a given hidden layer given the errors from its successor layer
// and the differentials at the actual layer
// returns an error array
export function computeErrorForHiddenLayers(weights, errors, differentials){
    //console.log("starting computeErrorForHiddenLayers")
    // check9ArrayBundle(differentials, "differentials", "computeErrorForHiddenLayers", ["n/a"])
    // console.log("computeErrorForHiddenLayers: receiving errors: ", errors)
    // console.log("computeErrorForHiddenLayers: receiving differentials: ", differentials)
    let errorArray = new Array(weights.length).fill(0);
    for (let i = 0; i < weights.length; i++){ // for each node at the hidden layer
        let runningSum = 0; 
        for (let j = 0; j < errors.length; j++){
            runningSum = runningSum + (weights[i][j] * errors[j]) // sum the weights from that node times the error at the nodes to which they connect
        }
        //console.log("computeErrorForHiddenLayers: runningSum before differentials is: ", runningSum )
        errorArray[i] = runningSum * differentials[i] // the error at that node equals the above sum times the ith differential
        //console.log("computeErrorForHiddenLayers: errorArray[i] after differentials is: ", errorArray[i] )
    }
    // console.log("computeErrorForHiddenLayers: errorArray has length ", errorArray.length)
    // console.log("computeErrorForHiddenLayers: errorArray is ", errorArray)
    // console.log("ending computeErrorForHiddenLayers")
    // checkArrayContainsOnlyNumbers(errorArray, "errorArray", "computeErrorForHiddenLayers", ["n/a"])


    return errorArray;
    }


    export function squaredError(array){
        return array.reduce((acc,curr)=>acc+(curr**2),0)
    }

    export function getDifferentials(array){
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