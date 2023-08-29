import { minimaxChooseMove } from "./minimaxChooseMove.js";
import { menaceChooseMove } from "./menaceChooseMove.js";
import { checkBoard, checkDbase } from '../testers/errorCheckers.js';
import { hurisChooseMove } from "./hurisChooseMove.js";
import { evolvoChooseMove } from "./evolvoChooseMove.js";

//For testing
// eslint-disable-next-line no-unused-vars
let example = [
    'O', null, 'O',
    'X', null, 'X',
    'X', null, 'O'
  ]

// takes board state, returns move chosen

export function chooseMove(board, dbase, foe){
    checkBoard(board, "chooseMove")
    console.log("1. board is ", board)
    let tempDB = [...dbase]
    let whoseTurn = whoseMove(board); 
    if (foe[0] === "menace"){return menaceChooseMove(board, tempDB)}
    else if (foe[0] === "minimax"){
        return [minimaxChooseMove(board, whoseTurn),["n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a"]]}
    // else if (foe[0] === "huris"){
    //     return [evolvoChooseMove(board, whoseTurn, [100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89]),["n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a"]]}
    else if (foe[0] === "huris"){
        return [hurisChooseMove(board, whoseTurn),["n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a"]]}
    
        else if (foe[0] === "evolvo"){
        return [evolvoChooseMove(board, whoseTurn, foe[1]),["n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a"]]}
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
