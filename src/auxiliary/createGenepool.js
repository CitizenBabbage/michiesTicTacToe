function createGenepool (numberOfCritters){
    let genePool = []; 
    for (let i = 0; i < numberOfCritters; i++){
        let genome = []; 
        for (j = 0; j < 12; j++){
            genome[j] = Math.floor(Math.random()*100);
        }
        genePool.push({'genome':genome,'fitness':0})
    }
}