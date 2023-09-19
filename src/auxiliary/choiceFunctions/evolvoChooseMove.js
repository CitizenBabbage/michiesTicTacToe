import { readGenome } from '../geneticAlgo/readGenome.js'

export function evolvoChooseMove(board, mySymbol, genome){
    return readGenome(genome, board, mySymbol)
}