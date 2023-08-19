import { readGenome } from './hurisAndEvolvoAuxiliaries'

export function evolvoChooseMove(board, mySymbol, genome){
    return readGenome(genome, board, mySymbol)
}