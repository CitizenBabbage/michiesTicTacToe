import {db} from './databaseFormatted.js' //assert { type: "json" };
//const boardStatesDB = require('./databaseFormatted.json');
import { calculateWinner } from "./checkWinner.js";
import {corner, edge} from './globals.js'
import { minimaxChooseMove } from "./minimaxChooseMove.js";
import { menaceChooseMove } from "./menaceChooseMove.js";

const boardStatesDB = db; 

//For testing
let example = [
    'O', null, 'O',
    'X', null, 'X',
    'X', null, 'O'
  ]


//console.log("object corresponding to ['X','X',null,'O','O',null,'X','O',null] is: ", getBoardObject(['X','X',null,'O','O',null,'X','O',null]))
//console.log("move chosen in response to ['X','X',null,'O','O',null,'X','O',null] is: ", chooseMove(['X','X',null,'O','O',null,'X','O',null]))

// takes board state, returns move chosen

export function chooseMove(board, dbase, foe){
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

