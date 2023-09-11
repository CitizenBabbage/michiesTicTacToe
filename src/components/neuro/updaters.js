import { convertMinimax } from "./minimaxHandling";
import { computeErrorForLastLayer, computeErrorForHiddenLayers } from "./errorFunctions";
import { checkNetData, checkArrayContainsOnlyNumbers, checkArrayHasDefinedValues, checkforNonFalseyValueOtherThan0, checkConnections, check9ArrayBundle } from "../../auxiliary/testers/errorCheckers";
import { squaredError, getDifferentials } from "./errorFunctions";

// returns [newWeights, newBiases, squrdError, finalErrors] 
// data = [0. minimaxArray, 1.recommended move, 2.hiddenSums, 3.hiddenValues, 4.outputSums, 5.output values]
export function calculateFinalLayerUpdate(minimaxArray, hiddenValues, outputSums, outputValues, secondWeights, secondBias, learningRate, sigma, board){
    console.log("calculateFinalLayerUpdate: board is ", board)
    //console.log("starting calculateFinalLayerUpdate")
    checkArrayContainsOnlyNumbers(minimaxArray, "minimaxArray", "calculateFinalLayerUpdate 1",[minimaxArray])

    const correctArray = convertMinimax(minimaxArray);
    //const correctArray = [3,3,3,7,7,7,7,7,7] // for debugging, to check if error correction happens in the upper direction
    checkArrayContainsOnlyNumbers(correctArray, "correctArray", "calculateFinalLayerUpdate 2",[minimaxArray])

    const [finalErrors,rawErrors] = computeErrorForLastLayer(outputValues, correctArray, outputSums);
        console.log("calculateFinalLayerUpdate: rawErrors are", rawErrors)

    if (!rawErrors){console.log("rawErrors undefined in calculateFinalLayerUpdate, after returning from computeErrorForLastLayer")}
    //checkArrayHasDefinedValues(finalErrors, "finalErrors", "calculateFinalLayerUpdate",["n/a"]) 
    const squrdError = squaredError(rawErrors); // this is only to provide a stop condition
  
    let output; 
    if (squrdError < sigma) {

        output = [secondWeights,secondBias, squrdError,finalErrors, rawErrors]
        //console.log("in calculateFinalLayerUpdate 1, preparing output of types:", returnArrayOfTypesOf(output))

    }
    else {
        //console.log("calling update for final layer")

        const finalWeights = update(secondWeights, secondBias, finalErrors, hiddenValues, learningRate);
        //checkArrayHasDefinedValues(finalErrors, "finalErrors", "calculateFinalLayerUpdate",["n/a"])

        output = [...finalWeights, squrdError, finalErrors, rawErrors];
        //console.log("in calculateFinalLayerUpdate 2, preparing output of types:", returnArrayOfTypesOf(output))


    }

    
    const indexOfSqrdError = output.indexOf(squrdError); 
    return output;  
}


//returns [newWeights,newBiases]
export function calculateHiddenLayerUpdate(
    hiddenSums, firstConnections, firstBiases, board, learningRate, finalErrors){
    // console.log("starting calculateHiddenLayerUpdate")
    // console.log("calculateHiddenLayerUpdate: hiddenSums is ", hiddenSums)
    check9ArrayBundle(hiddenSums, "hiddenSums", "calculateHiddenLayerUpdate", ["n/a"])

    const differentialArray1 = getDifferentials(hiddenSums) 
    checkArrayContainsOnlyNumbers(differentialArray1, "differentialArray1", "calculateHiddenLayerUpdate", ["n/a"])
    // console.log("calculateHiddenLayerUpdate: differentialArray1 is ", differentialArray1)
    const hiddenErrors = computeErrorForHiddenLayers(firstConnections, finalErrors, differentialArray1)
    checkArrayContainsOnlyNumbers(hiddenErrors, "hiddenErrors", "calculateHiddenLayerUpdate", ["n/a"])

    // console.log("calling update for hidden layer")
    const hiddenWeights = update(firstConnections, firstBiases, hiddenErrors, board, learningRate);
    // console.log("ending calculateHiddenLayerUpdate")
    checkNetData(hiddenWeights, "calculateHiddenLayerUpdate on hiddenweights")

    return hiddenWeights; 
}

// returns [newWeights,newBiases]
export function update(weightArray, biasArray, errorArray, priorLayer, learningRate){
    // console.log("starting update")

    // console.log("priorLayer is ", priorLayer)
    // checkArrayHasDefinedValues(biasArray, "biasArray", "update", ["n/a"])
    // checkArrayHasDefinedValues(errorArray, "errorArray", "update", ["n/a"])
    // checkConnections(weightArray, "weightArray", "update")
    // checkArrayHasDefinedValues(priorLayer, "priorLayer", "update", ["n/a"])
    // checkforNonFalseyValueOtherThan0(learningRate, "learningRate", "update")
    let newWeights = [...weightArray];
    
 
    let newBiases = [...biasArray]; 
    for (let i = 0; i < weightArray.length; i++){
        for (let j = 0; j < errorArray.length; j++){
            //console.log(`The weight from presynaptic node ${i} to postsynaptic node ${j} is being updated from ${weightArray[i][j]} to that plus ${learningRate} times ${priorLayer[i]} times ${errorArray[j]}, i.e. by  ${(learningRate * priorLayer[i] * errorArray[j])} `)
            newWeights[i][j] = weightArray[i][j] + (learningRate * priorLayer[i] * errorArray[j])
        }
    }
    for (let j = 0; j < errorArray.length; j++){
        newBiases[j] = biasArray[j] + (learningRate * errorArray[j])
        //console.log(`The bias on postsynaptic node ${j} is being updated from ${biasArray[j]} to that plus ${learningRate} times ${errorArray[j]}, i.e. by  ${(learningRate * errorArray[j])} `)

    }
    const output = [newWeights,newBiases]
    //console.log("ending update")

    return [newWeights,newBiases]
}
