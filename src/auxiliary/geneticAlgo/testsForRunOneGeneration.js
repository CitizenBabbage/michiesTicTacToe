function testRunOneGeneration(numberOfCritters, genomeLength, encountersPerCompetition, cullFraction, breedFraction, mutationRate, mutationSize){
    let genepool = createGenepool(numberOfCritters, genomeLength); 
    genepool = runOneGeneration(genepool, encountersPerCompetition, cullFraction, mutationRate, mutationSize); 
    let random = Math.floor(Math.random()*genepool.length)
    return genepool[random]
}

function testRunOneCompetition(numberOfCritters, genomeLength, numberOfEncounters){
    let genepool = createGenepool(numberOfCritters, genomeLength);
    genepool = runOneCompetition(genepool, numberOfEncounters); 
    const random = Math.floor(Math.random(genepool.length)); 
    console.log(genepool[random]); 
}

// testRunOneCompetition(100, 13, 2)

function testCullGenePool(genepool, cullFraction){
    //console.log("typical genepool element = ", genepool[3])
    let culledPool = cullGenePool(genepool, cullFraction); 
    //console.log("typical culledPool element = ", culledPool[0])
    //console.log("culledPoolLength is ", culledPool.length)
    for (let i = 0; i < genepool.length; i++){
        if(!genepool[i][1] && !genepool[i][1] === 0)(console.log(`Item ${i} in genepool has no second value! Item is ${JSON.stringify(genepool[i])}`))
    }
    for (let i = 0; i < culledPool.length; i++){
        if(!culledPool[i][1])(console.log(`Item ${i} in culledPool has no second value!`))
    }
    for (let i = 0; i < genepool.length; i++){
        if (!includes(culledPool, genepool[i])){
            //console.log(`checking whether ${genepool[i]} should have been culled...`)
            for (let j = 0; j < culledPool.length; j++){
                if (culledPool[j][1] < genepool[i][1]){console.log(`${JSON.stringify(genepool[i])} was culled, but has fitness higher than ${JSON.stringify(culledPool[j])}, which was not!`)}
            }
        }
    }
}

//testCullGenePool(makePhonyGenePool(100, 13), 0.2)

function tESTreproduceFromSurvivors(numberOfCritters, genomeLength, successFraction){
    const phonyGenePool = makePhonyGenePool(numberOfCritters, genomeLength); 
    //console.log("first in phonyGenePool is ", phonyGenePool[0])
    const newGenePool = reproduceFromSurvivors(phonyGenePool, successFraction)
    //console.log("phonyGenePool length is ", phonyGenePool.length) 
    //console.log("newGenePool length is ", newGenePool.length) 
}

function testMutatePool(numberOfCritters, genomeLength, mutationRate, mutationSize){
    let gpool = createGenepool(numberOfCritters, genomeLength);
    let gpoolCopy = JSON.parse(JSON.stringify(gpool))
    let mpool = mutatePool(gpoolCopy, mutationRate, mutationSize)
    //console.log('mpool.length is ', mpool.length)
    let mutatedPool = []; 
    for (let i = 0; i < mpool.length; i++){
        if (!includesGenome(gpool,mpool[i])){
            mutatedPool.push([gpool[i],mpool[i]])
        }
    }
    //console.log("mutatedPool.length is ", mutatedPool.length )
    nicePrint(mutatedPool)
    return mutatedPool; 
}

function nicePrint(arrayOfArrays){
    for (let i = 0; i < arrayOfArrays.length; i++){
        for (let j = 0; j < arrayOfArrays[i].length; j++){
        //console.log(JSON.stringify(arrayOfArrays[i][j]))
    }
}
}

// takes an array of genomes (with fitnesses) and a genome (with fitness) and checks whether the latter is in the former
function includesGenome(arrayOfArrays, array){
    for (let i = 0; i < arrayOfArrays.length; i++){
        if (sameValues(arrayOfArrays[i][0],array[0] )) return true
}
return false; 
}

//testMutatePool(100, 13, 0.005, 5)

//takes two same-length arrays of numbers and checks they have the same values
function sameValues(array1, array2){
    for (let i = 0; i < array1.length; i++){
        if (array1[i] !== array2[i]) return false
    }
    return true; 
}




function zeroFitnessScores(genepool){
    for (let i = 0; i < genepool.length; i++){
        genepool[i][1] = 0; 
    }
    return genepool; 
}

// runOneGame([96,89,77,48,3,14,19,69,13,71,50,49,72,70,83,61,43,14,48,43,20,34,100,57,31,11],[96,81,54,66,3,14,19,69,13,71,50,49,72,70,15,61,47,14,69,14,20,34,100,57,31,11])



// testRunOneGeneration(100, 13, 1, 0.2, 0.2, 0.002, 5)


//creates a phony genepool with makde up fitness scores for testing
function makePhonyGenePool(numberOfCritters, genomeLength){
    let x = createGenepool(numberOfCritters, genomeLength); 
    for (let i = 0; i < x.length; i++){
        let ran = Math.floor(Math.random()*10)
        x[i][x[i].length-1] = ran
    }
return x; 
}