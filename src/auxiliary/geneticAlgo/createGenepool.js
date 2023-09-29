import randomName from "./nameGenerator.js";
import { NameManager, makeNameUnique } from "./nameManager.js";

export default function createGenepool (numberOfCritters, genomeLength){
    let genePool = []; 
    let nmManager = new NameManager(); 
    for (let i = 0; i < numberOfCritters; i++){
        const genes = createRandomGenome(genomeLength); 
        const name = randomName(); 
        const [extName,newNameManager] = makeNameUnique(name,nmManager);
        const genome = new Genome({genome:genes, basicName:name, extendedName: extName, fitness: 0, generation: "1st"})
        genePool.push(genome)
        nmManager = newNameManager; 
    }
    return [genePool, nmManager]; 
}

export class Genome {
    constructor({genome, fitness, basicName, extendedName, generation}) {
      this.genome = genome;
      this.fitness = fitness;
      this.basicName = basicName; 
      this.extendedName = extendedName; 
      this.generation = generation; 
    }
  }

export function createRandomGenome(genomeLength){
    let genes = [];
    for (let j = 0; j < genomeLength; j++){
        genes[j] = Math.floor(Math.random()*100);
    }
    
    return genes; 
}


