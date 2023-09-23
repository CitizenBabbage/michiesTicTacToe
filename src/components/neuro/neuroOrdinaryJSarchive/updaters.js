import { computeErrorForLastLayer, computeErrorForHiddenLayers } from "../errorFunctions.js";
import { checkNetData, checkArrayContainsOnlyNumbers, checkArrayHasDefinedValues, checkforNonFalseyValueOtherThan0, checkConnections, check9ArrayBundle } from "../../../auxiliary/testers/errorCheckers.js";
import { squaredError, getReluDifferentials } from "../errorFunctions.js";

// needs to return [finalLayerWeights, finalLayerBiases, highestError, finalErrors, rawErrors] 
// returns [newWeights, newBiases, squrdError, finalErrors] 
// data = [0. minimaxArray, 1.recommended move, 2.hiddenSums, 3.hiddenValues, 4.outputSums, 5.output values]
                                        // minimaxArray, hiddenValues, outputSums, outputValues, secondWeights, secondBias, learningRate, sigma, board
                                        // correctArray, previousLayerValues, thisLayerSums, thisLayerValues, afferentConnections, afferentBiases, learningRate, sigma, board)
                                        //correctArray, previousLayerValues, thisLayerSums, predictedValues, afferentConnections, afferentBiases, learningRate, epsi, board
export function calculateFinalLayerUpdate(correctArray, previousLayerValues, thisLayerSums, predictedValues, afferentConnections, afferentBiases, learningRate, epsi, board){
    const [finalErrors,crossEntropyErrors] = computeErrorForLastLayer(predictedValues, correctArray, thisLayerSums);
    let output; 
    console.log("calculateFinalLayerUpdate: finalErrors are... ", finalErrors)
    const finalWeights = update(afferentConnections, afferentBiases, finalErrors, previousLayerValues, learningRate);
    output = [...finalWeights, "dummy", finalErrors, crossEntropyErrors];
    return output;  
}




//returns [newWeights,newBiases]
export function calculateHiddenLayerUpdate(
    hiddenSums, firstConnections, firstBiases, board, learningRate, finalErrors){
   
    const differentialArray1 = getReluDifferentials(hiddenSums) 
    console.log(`calculateHiddenLayerUpdate: calling computeErrorForHiddenLayers with values firstConnections ${firstConnections} finalErrors, ${finalErrors} differentialArray1 ${differentialArray1}`)

    const hiddenErrors = computeErrorForHiddenLayers(firstConnections, finalErrors, differentialArray1)
    console.log("calculateHiddenLayerUpdate, calling update with errors... ", hiddenErrors)
    const hiddenWeights = update(firstConnections, firstBiases, hiddenErrors, board, learningRate);
    return hiddenWeights; 
}

// returns [newWeights,newBiases]
export function update(weightArray, biasArray, errArray, priorLayer, learningRate){

    console.log("update: errArray is ", errArray)
    let newWeights = [...weightArray];
    
    
    let newBiases = [...biasArray]; 
    for (let i = 0; i < weightArray.length; i++){
        for (let j = 0; j < errArray.length; j++){
            newWeights[i][j] = weightArray[i][j] + (learningRate * priorLayer[i] * errArray[j])
        }
    }
    for (let j = 0; j < errArray.length; j++){
        newBiases[j] = biasArray[j] + (learningRate * errArray[j])

    }
  
    return [newWeights,newBiases]
}
