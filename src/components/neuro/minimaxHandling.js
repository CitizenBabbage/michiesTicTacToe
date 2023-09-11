import { whoseMove } from "../../auxiliary/general/usefulFunctions";
import { minimaxChooseMove } from "../../auxiliary/choiceFunctions/minimaxChooseMove";
import { checkArrayHasDefinedValues } from "../../auxiliary/testers/errorCheckers";

//this gets the correct array of values from minimax
export function getCorrectArray(board){
    //console.log("starting getCorrectArray")

    const whoseTurn = whoseMove(board); 
    console.log("getCorrectArray: board is ", board)
    const minimaxArray = minimaxChooseMove(board, whoseTurn)[2];
    // const denullifiedMinimaxArray = convertMinimax(minimaxArray); // replaces null values with numerical
    //                                                 checkArrayHasDefinedValues(denullifiedMinimaxArray, "denullifiedMinimaxArray", "getComparisonArraysAndForwardPassData", ["n/a"]) 

    //console.log("ending getCorrectArray")
    //return denullifiedMinimaxArray; 
    return minimaxArray; 
    }

// removes null values
export function convertMinimax(minimaxArray){
    let convertedArray = []; 
    for (let i = 0; i < minimaxArray.length; i++){
        if (minimaxArray[i] === null || minimaxArray[i] === undefined){convertedArray[i] = 1}
        else convertedArray[i] = minimaxArray[i]
    }
    return convertedArray; 
    }