import { readGenes } from "../geneticAlgo/readGenes.js"

export function hurisChooseMove(board, mySymbol, foeSpec){
    return readGenes(foeSpec.genome, board, mySymbol); 
    // return readGenes([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], board, mySymbol)
}