import { readGenes } from '../geneticAlgo/readGenes.js'

export function evolvoChooseMove(board, mySymbol, genome){
    // console.log("genome is ", genome)
    return readGenes(genome, board, mySymbol)
}