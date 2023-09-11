import { minimaxChooseMove } from "./minimaxChooseMove.js";
import { menaceChooseMove } from "./menaceChooseMove.js";
import { checkBoard, checkDbase } from '../testers/errorCheckers.js';
import { hurisChooseMove } from "./hurisChooseMove.js";
import { evolvoChooseMove } from "./evolvoChooseMove.js";
import { neuroChooseMove } from "./neuroChooseMoveGeneral.js";
import { whoseMove } from "../general/usefulFunctions.js";


//For testing
// eslint-disable-next-line no-unused-vars
let example = [
    'O', null, 'O',
    'X', null, 'X',
    'X', null, 'O'
  ]

// takes board state, returns move chosen
//board, foeSpec, foe
export function chooseMove(board, foeSpec, foe){
    console.log("foeSpec is", foeSpec)
    checkBoard(board, "chooseMove")
    //let tempDB = [...dbase]
    let whoseTurn = whoseMove(board);
    let netOutput;  
    if (foe === "menace"){
        let tempDB = [...foeSpec] // foeSpec[0] in this case should be the board object database
        return menaceChooseMove(board, tempDB)
    }
    else if (foe === "minimax"){
        netOutput = minimaxChooseMove(board, whoseTurn); 
        console.log("netOutput is ", netOutput)
        return [netOutput[0], netOutput[2]]; 
    }
    // else if (foe === "huris"){
    //     return [evolvoChooseMove(board, whoseTurn, [100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89]),["n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a"]]}
    else if (foe === "huris"){
        return [hurisChooseMove(board, whoseTurn),["n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a"]]
    }
    
    else if (foe === "evolvo"){
        return [evolvoChooseMove(board, whoseTurn, foeSpec),["n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a","n/a"]]
    }
    else if (foe === "Neuro"){
        console.log("choosemove: foe is neuro")
        //neuroChooseMove returns processing data along with the move choice, but we only need the move choice here, which is the first item
        netOutput = neuroChooseMove(board, foeSpec)
        console.log(`In chooseMove, netOutput[1][3] is `, netOutput[1][3])
        return [netOutput[0],netOutput[2]]
    }
    }




    
   

