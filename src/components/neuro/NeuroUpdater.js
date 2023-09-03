import { oneTrainingCycle, getTrainingSet, oneLearningIteration, convertMinimax, reluPrime, getDifferentials, getComparisonArraysAndForwardPassData, computeErrorForLastLayer, update, computeErrorForHiddenLayers } from "./updaterHelpers";

function NeuroUpdater(percentTrainingSet, db, net, learningRate, maxCycle){

    useEffect(neuroLearn(), []) //update dependency array later

    function neuroLearn(percentTrainingSet, db, net, learningRate, sigma, maxCycle){
        const trainingSet = getTrainingSet(percentTrainingSet, db); 
        let newNet = net, results; 
        for (let i = 0; i < maxCycle; i++){
            results = oneTrainingCycle(trainingSet, newNet, learningRate); 
            // the above returns an array [hiddenLayerWeights, finalLayerWeights, hiddenLayerBias, finalLayerBias,residualError]
            let error = results[4]
            if (error < sigma) break; 
            newNet = results; 
            newNet.pop(); // but remove the error to get the net
        }
        return newNet; 
}

}
