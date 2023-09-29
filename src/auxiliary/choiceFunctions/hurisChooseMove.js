import { readGenes } from "../geneticAlgo/readGenes.js"

export function hurisChooseMove(board, mySymbol){
    //return readGenes([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], board, mySymbol)
    return readGenes([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], board, mySymbol) // for debugging rules
}