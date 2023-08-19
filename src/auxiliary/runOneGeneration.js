function createPairings(genepool){
    const sizeOfInitialGenepool = genepool.length; 
    const pairings = []; 
    for (let i = 0; i < sizeOfInitialGenepool; i ++){
        const [critter1, ...restOfTheArray] = genepool; 
        randomChoice = Math.floor(Math.random()*restOfTheArray.length)
        const critter2 = restOfTheArray[randomChoice]
        genepool = removeNthElement(randomChoice,restOfTheArray) 
        pairings = pairings.push[critter1,critter2]
    }
    return pairings; 
}

// starts counting from 0. So 5 will remove the 6th element. 
function removeNthElement(n, array){
    return [...array.slice(0,n),...array.slice(n+1)]
}

