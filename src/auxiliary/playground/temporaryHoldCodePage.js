///this page is just for temporarily holding code as a reference. Periodically, everything below this line should be deleted. 
// returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias, residualError, rawErrors]
export function oneLearningIteration(board, net, learningRate, sigma){
    const net = [firstConnections, finalConnections, firstBiases, finalBiases]; 
    //console.log("starting oneLearningIteration")
    const [unused, arrayOfHiddenSums, outputValues] = neuroChooseMove(board, net); // returns [0.recommended move, 1.hiddenSums arrays, 2.output values]
    const hiddenSums = arrayOfHiddenSums[0]; 
    const hiddenValues = makeBiases(); //DUMMY VALUES
    const outputSums = makeBiases(); //DUMMY VALUES
    //console.log("oneLearningIteration: Output from neuroChooseMove is: ", outputValues)
     
    const correctArray = getCorrectArray(board); 

    // const data = getComparisonArraysAndForwardPassData(board,net); // returns [0. minimaxArray, 1.recommended move, 2.hiddenSums, 3.hiddenValues, 4.outputSums, 5.output values]

    const [newWeights, newBiases, highestError, finalErrors, rawErrors] = calculateFinalLayerUpdate(correctArray, hiddenValues, outputSums, outputValues, finalConnections, finalBiases, learningRate, sigma, board) 
    // returns [newWeights, newBiases, squrdError, finalErrors, rawErrors] 
    checkNetData([newWeights, newBiases], "oneLearningIteration on newWeights")

    check9ArrayBundle(hiddenSums, "hiddenSums", "oneLearningIteration", ["n/a"])
    const hiddenWeights = calculateHiddenLayerUpdate(hiddenSums, firstConnections, firstBiases, board, learningRate, finalErrors);
    // returns [newWeights, newBiases]
    checkNetData(hiddenWeights, "oneLearningIteration on hiddenweights")
    
    //console.log("ending oneLearningIteration")
    return [[hiddenWeights[0],newWeights,hiddenWeights[1],newBiases],highestError, rawErrors]; 
}