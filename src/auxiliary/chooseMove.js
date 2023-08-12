import { minimaxChooseMove } from "./minimaxChooseMove.js";
import { menaceChooseMove } from "./menaceChooseMove.js";
import { checkBoard, checkDbase } from './errorCheckers.js';


//For testing
// eslint-disable-next-line no-unused-vars
let example = [
    'O', null, 'O',
    'X', null, 'X',
    'X', null, 'O'
  ]

// takes board state, returns move chosen

export function chooseMove(board, dbase, foe){
    checkDbase(dbase, "chooseMove")
    checkBoard(board, "chooseMove")
    console.log("1. board is ", board)
    let whoseTurn = whoseMove(board); 
    if (foe === "menace"){return menaceChooseMove(board, dbase)}
    else if (foe === "minimax"){
        return [minimaxChooseMove(board, whoseTurn),["n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a"]]} 
}


    
   
export function whoseMove(board){
    let xes = 0; 
    let oes = 0; 
    for (let i = 0; i < board.length; i++){
        if (board[i] === "X"){xes+=1}
        else if (board[i] === "O"){oes+=1}
        else continue; 
    }
    if (oes === xes) return "X"; 
    else return "O"; 
}
