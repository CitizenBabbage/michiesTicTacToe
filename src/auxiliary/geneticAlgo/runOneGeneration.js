import { includes, areIdentical, opposite} from "../general/usefulFunctions.js";
import { evolvoChooseMove } from "../choiceFunctions/evolvoChooseMove.js";
import { calculateWinner } from "../engineHelpers/checkWinner.js";


function runOneGeneration(genepool, encountersPerCompetition, cullFraction, breedFraction, mutationRate, mutationSize){
    genepool = runOneCompetition(genepool, encountersPerCompetition); 
    genepool = cullGenePool(genepool, cullFraction); 

    genepool = zeroFitnessScores(genepool)
    genepool = reproduceFromSurvivors(genepool, breedFraction);
    genepool = mutatePool(genepool, mutationRate, mutationSize);
    return genepool; 
}

function testRunOneGeneration(numberOfCritters, genomeLength, encountersPerCompetition, cullFraction, breedFraction, mutationRate, mutationSize){
    let genepool = createGenepool(numberOfCritters, genomeLength); 
    genepool = runOneGeneration(genepool, encountersPerCompetition, cullFraction, breedFraction, mutationRate, mutationSize); 
    let random = Math.floor(Math.random()*genepool.length)
    return genepool[random]
}

function createGenepool(numberOfCritters, genomeLength){
    let genePool = []
    for (let i = 0; i < numberOfCritters; i++){
        let genome = []; 
        for (let j = 0; j < genomeLength; j++){
            genome[j] = Math.floor(Math.random()*100)
        }
        genome = [genome, 0] // second score is a fitness score, initiated at 0
        genePool.push(genome)
    }
    return genePool; 
}


function createPairings(genepool){
    const sizeOfInitialGenepool = genepool.length; 
    const pairings = []; 
    while (genepool.length > 1){
        const critter1 = genepool[0]; 
        const restOfTheArray = genepool.slice(1)
        const randomChoice = Math.floor(Math.random()*restOfTheArray.length)
        const critter2 = restOfTheArray[randomChoice]
        genepool = removeNthElement(randomChoice,restOfTheArray) 
        pairings.push([critter1,critter2])

    }
    return pairings; 
}

// starts counting from 0. So 5 will remove the 6th element. 
function removeNthElement(n, array){
    return [...array.slice(0,n),...array.slice(n+1)]
}

// where n is the number of encounters each critter has, 
// runs n games for each critter
function runOneCompetition(genepool, numberOfEncounters){
    for (let j = 0; j < numberOfEncounters; j++){
        //console.log("encounter number ", j)
        const matchUps = createPairings(genepool); 
        for (let i = 0; i < matchUps.length; i++){
            //console.log("pairing number :" , i)

            // have a game between the players in the pairing
            let result = runOneGame(matchUps[i][0], matchUps[i][1]); 
            // let result = -1; 
            // if (result === 1){console.log("Player1 won")}
            // if (result === -1){console.log("Player2 won")}
            // if (result === 0){console.log("It was a draw")}
            // record the scores 
            matchUps[i][0][1] = matchUps[i][0][1] + result; 
            matchUps[i][1][1] = matchUps[i][1][1] + result*-1; 
        }
        genepool = matchUps.flat(); 
    }
    return genepool; 
}

function testRunOneCompetition(numberOfCritters, genomeLength, numberOfEncounters){
    let genepool = createGenepool(numberOfCritters, genomeLength);
    genepool = runOneCompetition(genepool, numberOfEncounters); 
    const random = Math.floor(Math.random(genepool.length)); 
    console.log(genepool[random]); 
}

testRunOneCompetition(100, 13, 2)


// culls the worst n by ... 
// 1. letting n = the cullFraction times the whole
// 2. if there are n critters with worse fitness scores, this critter survives
// 3. otherwise this critter is in the worst cullfraction
function cullGenePool(genepool, cullFraction){ //cullFraction should be a fraction between 0 and 1
    let totalToBeCulled = Math.floor(genepool.length * cullFraction);
    let survivors = []; 
    for (let i = 0; i < genepool.length; i++){
        if (areThereNworseThan(genepool[i],genepool,totalToBeCulled)) survivors.push(genepool[i])
        if (survivors.length === genepool.length - totalToBeCulled) return survivors; 
    }
    return survivors; 
}

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

function reproduceFromSurvivors(genepool, successFraction){//successFraction should be a fraction between 0 and 1
    const newPoolSize = genepool.length + Math.floor(genepool.length * successFraction)
    const pairings = createPairings(genepool); 
    const newPool = [...genepool]; 
    while (newPool.length < newPoolSize){
        const randomPairingIndex = Math.floor(Math.random()*pairings.length); 
        const luckyCouple = pairings[randomPairingIndex]; 
        //console.log("lucky couple is ", JSON.stringify(luckyCouple))
        newPool.push([mixTwoGenomes(luckyCouple[0][0], luckyCouple[1][0]),0]); // add a baby to the genepool
        //console.log("newBaby is: ", newPool[newPool.length-1])
    }
    return newPool; 
}

//creates a phony genepool with makde up fitness scores for testing
function makePhonyGenePool(numberOfCritters, genomeLength){
    let x = createGenepool(numberOfCritters, genomeLength); 
    for (let i = 0; i < x.length; i++){
        let ran = Math.floor(Math.random()*10)
        x[i][x[i].length-1] = ran
    }
return x; 
}

function tESTreproduceFromSurvivors(numberOfCritters, genomeLength, successFraction){
    const phonyGenePool = makePhonyGenePool(numberOfCritters, genomeLength); 
    //console.log("first in phonyGenePool is ", phonyGenePool[0])
    const newGenePool = reproduceFromSurvivors(phonyGenePool, successFraction)
    //console.log("phonyGenePool length is ", phonyGenePool.length) 
    //console.log("newGenePool length is ", newGenePool.length) 
}



function mutatePool(genepool, mutationRate, mutationSize){
    const genesToBeMutated = Math.floor(genepool.length * genepool[0][0].length * mutationRate); 
    //console.log("genesToBeMutated = ", genesToBeMutated)
    let genesMutated = 0; 
    while (genesMutated < genesToBeMutated) {
        const randomCritterIndex = Math.floor(Math.random()*genepool.length); 
        const randomGeneIndex = Math.floor(Math.random()*genepool[0][0].length); 
        const randomMagnitude = Math.floor(Math.random()*(mutationSize -1))+1; 
        const randomPolarity = Math.random() < 0.5? -1 : 1; 
        const randomMutation = randomPolarity * randomMagnitude
        genepool[randomCritterIndex][0][randomGeneIndex] += randomMutation; 
        genesMutated += 1
        //console.log("genesMutated is " , genesMutated)
    }
    //console.log("genesMutated is " , genesMutated)

    return genepool; 
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

//takes two same-length arrays of numbers and checks they have the same values
function sameValues(array1, array2){
    for (let i = 0; i < array1.length; i++){
        if (array1[i] !== array2[i]) return false
    }
    return true; 
}

// takes an array of genomes (with fitnesses) and a genome (with fitness) and checks whether the latter is in the former
function includesGenome(arrayOfArrays, array){
    for (let i = 0; i < arrayOfArrays.length; i++){
        if (sameValues(arrayOfArrays[i][0],array[0] )) return true
}
return false; 
}

//testMutatePool(100, 13, 0.005, 5)

function zeroFitnessScores(genepool){
    for (let i = 0; i < genepool.length; i++){
        genepool[i][1] = 0; 
    }
    return genepool; 
}

// takes raw genomes as inputs, i.e. without fitness score
// returns raw genome
// genomes expected to be same length
function mixTwoGenomes(genome1,genome2){
    let firstCut = Math.floor(Math.random()*genome1.length); 
    let secondCut = Math.floor(Math.random()*genome1.length); 
    if (firstCut === secondCut) secondCut = secondCut + (genome1.length/2)
    if (secondCut > genome1.length) {secondCut = secondCut - genome1.length}; 
    if (secondCut < firstCut) {
        const x = secondCut; 
        secondCut = firstCut; 
        firstCut = x; 
    }
    let genome3 = []; 
    for (let i = 0; i < genome1.length; i++){
        if (i < firstCut) genome3[i] = genome1[i]; 
        else if (i > secondCut) genome3[i] = genome1[i];
        else genome3[i] = genome2[i];
    }
    genome3 = genome3 //initialize fitness to 0
    return genome3; 
}


function areThereNworseThan(critter, genepool, threshold){
    let count = 0; 
    for (let i = 0; i < genepool.length; i++){
        if (genepool[i][1] < critter[1]) count++; 
        if (count >= threshold) return true; 
    }
    return false; 
}



// returns 1 if the first player wins, -1 if the second player wins, 0 for a draw
function runOneGame(genome1, genome2){
    const coinflip = Math.random(); 
    let currentPlayer, winningCritter, currentSymbol = 'X', x; 
    let board = [null, null, null, null, null, null, null, null, null]; 
    if (coinflip < 0.5) {currentPlayer = genome1, x = genome1}
    else {currentPlayer = genome2, x = genome2}
    while (!winningCritter){
        //console.log("currentPlayer is : ", currentPlayer)
        const move = evolvoChooseMove(board, currentSymbol, currentPlayer[0]); 
        board[move] = currentSymbol; 
        winningCritter = calculateWinner(board); // returns X, O or D
        currentPlayer = oppositePlayer(currentPlayer, genome1, genome2); 
        currentSymbol = opposite(currentSymbol); 
    }
    if (winningCritter === 'X'){
        //console.log("X wins")
        if (x === genome1) {return 1}
        else return -1; 
    }
    else if (winningCritter === 'O'){
        //console.log("O wins")

        if (x === genome1) {return -1}
        else return 1; 
    }
    
    else return 0; 
}



// testRunOneGeneration(100, 13, 1, 0.2, 0.2, 0.002, 5)


function oppositePlayer(currentPlayer, firstPlayer, secondPlayer){
    if (areIdentical(currentPlayer,firstPlayer)) return secondPlayer; 
    else return firstPlayer; 
}