export default function createGenepool (numberOfCritters, genomeLength){
    let genePool = []; 
    for (let i = 0; i < numberOfCritters; i++){
        let genome = []; 
        for (let j = 0; j < genomeLength; j++){
            genome[j] = Math.floor(Math.random()*100);
        }
        genePool.push([genome,0])
    }
    return genePool; 
}