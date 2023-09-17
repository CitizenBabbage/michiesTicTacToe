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
        const [critter1, ...restOfTheArray] = genepool; 
        randomChoice = Math.floor(Math.random()*restOfTheArray.length)
        const critter2 = restOfTheArray[randomChoice]
        genepool = removeNthElement(randomChoice,restOfTheArray) 
        pairings = pairings.push[critter1,critter2]
    }
    return [pairings]; 
}

// starts counting from 0. So 5 will remove the 6th element. 
function removeNthElement(n, array){
    return [...array.slice(0,n),...array.slice(n+1)]
}

// where n is the number of encounters each critter has, 
// runs n games for each critter
function runOneCompetition(genepool, numberOfEncounters){
    for (let j = 0; j < numberOfEncounters; j++){
        const matchUps = createPairings(genepool); 
        for (let i = 0; i < matchUps.length; i++){
            // have a game between the players in the pairing
            let result = runOneGame(matchUps[i][0], matchUps[i][1]); 
            // record the scores 
            matchUps[i][0][1] = matchUps[i][0][1] + result; 
            matchUps[i][1][1] = matchUps[i][1][1] + result*-1; 
        }
        genepool = matchUps.flat(); 
    }
    return genepool; 
}



function cullGenePool(genepool, cullFraction){ //cullFraction should be a fraction between 0 and 1
    let totalToBeCulled = Math.floor(genepool.length * cullFraction);
    let survivors = []; 
    for (let i = 0; i < genepool.length; i++){
        if (areThereNworseThan(genepool[i],genepool,totalToBeCulled)) survivors.push(genepool[i])
    }
    return survivors; 
}

function reproduceFromSurvivors(genepool, successFraction){//successFraction should be a fraction between 0 and 1
    const newPoolSize = genepool.length + Math.floor(genepool.length * successFraction)
    const pairings = createPairings(genepool); 
    const newPool = [...genepool]; 
    while (newPool.length < newPoolSize){
        randomPairingIndex = Math.floor(Math.random()*pairings.length); 
        const luckyCouple = pairings[randomPairingIndex]; 
        newPool.push(mixTwoGenomes(luckyCouple[0], luckyCouple[1])); // add a baby to the genepool
    }
    return newPool; 
}



function mutatePool(genepool, mutationRate, mutationSize){
    const genesToBeMutated = genepool * genepool[0][0].length * mutationRate; 
    let genesMutated = 0; 
    while (genesMutated < genesToBeMutated) {
        const randomCritterIndex = Math.floor(Math.random()*genepool.length); 
        const randomGeneIndex = Math.floor(Math.random()*genome.length); 
        const randomMagnitude = Math.floor(Math.random()*mutationSize); 
        const randomPolarity = Math.random() < 0.5? -1 : 1; 
        const randomMutation = randomPolarity * randomMagnitude
        genepool[randomCritterIndex][0][randomGeneIndex] += randomMutation; 
        genesMutated += 1
    }
    return genepool; 
}

function zeroFitnessScores(genepool){
    for (let i = 0; i < genepool.length; i++){
        genepool[i][1] = 0; 
    }
    return genepool; 
}

function mixTwoGenomes(genome1,genome2){
    const firstCut = Math.floor(Math.random()*genome1.length); 
    const secondCut = Math.floor(Math.random()*genome1.length); 
    if (firstCut === secondCut) secondCut = secondCut + (genome1.length/2)
    if (secondCut > genome1.length) secondCut = secondCut - genome1.length; 
    let genome3 = []; 
    for (let i = 0; i < genome1.length; i++){
        if (i < firstCut) genome3[i] = genome1[i]; 
        else if (i > secondCut) genome3[i] = genome1[i];
        else genome3[i] = genome2[i];
    }
    genome3 = [genome3, 0] //initialize fitness to 0
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
    while (winningCritter === undefined){
        const move = evolvoChooseMove(board, currentSymbol, currentPlayer[1]); 
        board[move] = currentSymbol; 
        winningCritter = calculateWinner(board); // returns X, O or D
        currentPlayer = oppositePlayer(currentPlayer); 
        currentSymbol = oppositeSymbol(currentSymbol); 
    }
    if (winningCritter === 'X'){
        if (x === genome1) {return 1}
        else return -1; 
    }
    else if (winningCritter === 'O'){
        if (x === genome1) {return -1}
        else return 1; 
    }
    else return 0; 
}

function runOneGeneration(genepool, encountersPerCompetition, cullFraction, mutationRate, mutationSize){
    genepool = runOneCompetition(genepool, encountersPerCompetition); 
    genepool = cullGenePool(genepool, cullFraction); 
    genepool = zeroFitnessScores(genepool)
    genepool = reproduceFromSurvivors(genepool, successFraction);
    genepool = mutatePool(genepool, mutationRate, mutationSize);
    return genepool; 
}
