import { includes, areIdentical, opposite} from "../general/usefulFunctions.js";
import { evolvoChooseMove } from "../choiceFunctions/evolvoChooseMove.js";
import { calculateWinner } from "../engineHelpers/checkWinner.js";
import randomName from "./nameGenerator.js";
import { Genome } from "./createGenepool.js";


export function runOneGeneration(genepool, encountersPerCompetition, cullFraction, mutationRate, mutationSize, generationOrdinal){
    const normativeSizeOfGenepool = genepool.length; 
    if (!genepool || genepool.length === 0) throw new Error(`runOneGeneration received a bum genepool at input. genepool = ${JSON.stringify(genepool)} `)

    genepool = runOneCompetition(genepool, encountersPerCompetition); 
    if (!genepool || genepool.length === 0) throw new Error(`runOneGeneration received a bum genepool from runOneCompetition. genepool = ${JSON.stringify(genepool)} `)

    genepool = cullGenePool(genepool, cullFraction); 
    if (!genepool || genepool.length === 0) throw new Error(`runOneGeneration received a bum genepool from CULLGENEPOOL. genepool = ${JSON.stringify(genepool)} `)

    //genepool = zeroFitnessScores(genepool)
    let averageFitness = Math.round(genepool.reduce((accum, current) => accum + current.fitness,0)/genepool.length);
    if (isNaN(averageFitness)) throw new Error(`runOneGeneration assigned NaN to averagefitness. genepool = ${JSON.stringify(genepool)} `)

    genepool = reproduceFromSurvivors(genepool, normativeSizeOfGenepool, generationOrdinal, averageFitness);
    genepool = mutatePool(genepool, mutationRate, mutationSize);
    return genepool; 
}


// function createGenepool(numberOfCritters, genomeLength){
//     let genePool = []
//     for (let i = 0; i < numberOfCritters; i++){
//         let genome = []; 
//         for (let j = 0; j < genomeLength; j++){
//             genome[j] = Math.floor(Math.random()*100)
//         }
//         genome = [genome, 0] // second score is a fitness score, initiated at 0
//         genePool.push(genome)
//     }
//     return genePool; 
// }


function createPairings(genepool){
    if (!genepool || genepool.length === 0) throw new Error(`createPairings received a bum genepool. genepool = ${JSON.stringify(genepool)} `)
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
    if (!pairings || pairings.length === 0) throw new Error(`createPairings created a bum pairing array. pairings = ${pairings} `)

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
            // have a game between the critters in the pairing

            let result = runOneGame(matchUps[i][0].genome, matchUps[i][1].genome); 
            // 1 = Player1 won, -1 = Player2 won, 0 = it was a draw
            // adjust the fitness of the critters based on the result 
            matchUps[i][0].fitness += result; 
            matchUps[i][1].fitness -= result; 
        }
        genepool = matchUps.flat(); 
    }
    return genepool; 
}




// culls the worst n by ... 
// 1. letting n = the cullFraction times the whole
// 2. if there are n critters with worse fitness scores, this critter survives
// 3. otherwise this critter is in the worst cullfraction
function cullGenePool(genepool, cullFraction){ //cullFraction should be a fraction between 0 and 1
    let totalToBeCulled = Math.floor(genepool.length * cullFraction);
    if (totalToBeCulled % 2 === 1) totalToBeCulled = Math.ceil(genepool.length * cullFraction);
    genepool.sort((a, b) => b.fitness - a.fitness);
    genepool = genepool.slice(0, -totalToBeCulled); 
    return genepool; 
}


function reproduceFromSurvivors(genepool, normativeSizeOfGenepool, generationOrdinal, averageFitness){
    if (!genepool || genepool.length === 0) throw new Error(`reproduceFromSurvivors received a bum genepool. genepool = ${JSON.stringify(genepool)} `)

    const pairings = createPairings(genepool); 
    const newPool = [...genepool]; 
    while (newPool.length < normativeSizeOfGenepool){
        const randomPairingIndex = Math.floor(Math.random()*pairings.length); 
        const luckyCouple = pairings[randomPairingIndex];
        const genes = mixTwoGenomes(luckyCouple[0].genome, luckyCouple[1].genome); 
        const moniker = randomName(); 
        const baby = new Genome({genome:genes, fitness:averageFitness, basicName: moniker, extendedName: moniker, generation: generationOrdinal}) // make baby with fitness = average
        newPool.push(baby); // add baby to the genepool
    }
    return newPool; 
}






function mutatePool(genepool, mutationRate, mutationSize){
    const genesToBeMutated = Math.floor(genepool.length * genepool[0].genome.length * mutationRate); 
    //console.log("genesToBeMutated = ", genesToBeMutated)
    let genesMutated = 0; 
    while (genesMutated < genesToBeMutated) {
        const randomCritterIndex = Math.floor(Math.random()*genepool.length); 
        const randomGeneIndex = Math.floor(Math.random()*genepool[0].genome.length); 
        const randomMagnitude = Math.floor(Math.random()*(mutationSize -1))+1; 
        const randomPolarity = Math.random() < 0.5? -1 : 1; 
        const randomMutation = randomPolarity * randomMagnitude
        genepool[randomCritterIndex].genome[randomGeneIndex] += randomMutation; 
        genesMutated += 1
        //console.log("genesMutated is " , genesMutated)
    }
    //console.log("genesMutated is " , genesMutated)

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
        if (genepool[i].fitness < critter.fitness) count++; 
        if (count >= threshold) return true; 
    }
    return false; 
}



// returns 1 if the first player wins, -1 if the second player wins, 0 for a draw
function runOneGame(genome1, genome2){ // receives numerical genomes only
    const coinflip = Math.random(); 
    let currentPlayer, winningCritter, currentSymbol = 'X', playerX; 
    let board = [null, null, null, null, null, null, null, null, null]; 
    if (coinflip < 0.5) {currentPlayer = genome1, playerX = genome1}
    else {currentPlayer = genome2, playerX = genome2}
    let counter = 0; 
    while (!winningCritter && counter < 10){
        //console.log("currentPlayer is : ", currentPlayer)
        const move = evolvoChooseMove(board, currentSymbol, currentPlayer)[0];
        board[move] = currentSymbol; 
        winningCritter = calculateWinner(board); // returns X, O or D
        currentPlayer = oppositePlayer(currentPlayer, genome1, genome2); 
        currentSymbol = opposite(currentSymbol); 
        counter++;  
        if (counter > 12) throw new Error(`Problem in runOneGame. While loop is looping too long. This was brought to you by genome 1 = ${JSON.stringify(genome1)} and genome 2 = ${JSON.stringify(genome2)}`)
    }
    if (winningCritter === 'X'){
        //console.log("X wins")
        if (playerX === genome1) {return 1}
        else return -1; 
    }
    else if (winningCritter === 'O'){
        //console.log("O wins")

        if (playerX === genome1) {return -1}
        else return 1; 
    }
    
    else return 0; 
}



function oppositePlayer(currentPlayer, firstPlayer, secondPlayer){
    if (areIdentical(currentPlayer,firstPlayer)) return secondPlayer; 
    else return firstPlayer; 
}