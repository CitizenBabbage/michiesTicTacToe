import { readGenome } from './hurisAndEvolvoAuxiliaries'

export function hurisChooseMove(board, mySymbol){
    return readGenome([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], board, mySymbol)
}