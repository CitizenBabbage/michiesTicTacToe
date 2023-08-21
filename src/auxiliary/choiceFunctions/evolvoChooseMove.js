import { readGenome } from '../geneticAlgo/readGenome'

export function evolvoChooseMove(board, mySymbol, genome){
    return readGenome(genome, board, mySymbol)
}