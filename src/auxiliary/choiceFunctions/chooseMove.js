import { minimaxChooseMove } from "./minimaxChooseMove.js";
import { menaceChooseMove } from "./menaceChooseMove.js";
import { checkBoard, checkDbase } from '../testers/errorCheckers.js';
import { hurisChooseMove } from "./hurisChooseMove.js";
import { evolvoChooseMove } from "./evolvoChooseMove.js";
import { neuroChooseMove } from "./neuroChooseMoveTF.js";
import { whoseMove } from "../general/usefulFunctions.js";


//For testing
// eslint-disable-next-line no-unused-vars
let example = [
    'O', null, 'O',
    'X', null, 'X',
    'X', null, 'O'
  ]

// takes board state, returns move chosen
// board, foeSpec, foe
export function chooseMove(board, foeSpec, foe){
    checkBoard(board, "chooseMove")
    let whoseTurn = whoseMove(board);
    let netOutput;  
    if (foe === "menace"){
        let tempDB = [...foeSpec] // foeSpec[0] in this case should be the board object database
        let x = menaceChooseMove(board, tempDB)
        return x; 
    }
    else if (foe === "minimax"){
        netOutput = minimaxChooseMove(board, whoseTurn); 
        return [netOutput[0], netOutput[2]]; 
    }
    else if (foe === "huris"){
        return hurisChooseMove(board, whoseTurn)
    }
    
    else if (foe === "evolvo"){
        return evolvoChooseMove(board, whoseTurn, foeSpec)
    }
    else if (foe === "Neuro"){
        // netOutput = neuroChooseMove(board, foeSpec)
        // return [netOutput[0],netOutput[2]]
        return neuroChooseMove(board, foeSpec)
    }
    }




    
   

