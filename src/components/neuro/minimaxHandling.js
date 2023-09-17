import { whoseMove } from "../../auxiliary/general/usefulFunctions";
import { minimaxChooseMove } from "../../auxiliary/choiceFunctions/minimaxChooseMove";
import { checkArrayHasDefinedValues } from "../../auxiliary/testers/errorCheckers";

//this gets the correct array of values from minimax
export function getCorrectArray(board){
    //console.log("starting getCorrectArray")

    const whoseTurn = whoseMove(board); 
    //console.log("getCorrectArray: board is ", board)
    const minimaxArray = minimaxChooseMove(board, whoseTurn)[2];
    const oneHotOutput = convertMinimax(minimaxArray); // replaces null values with numerical
    //                                                 checkArrayHasDefinedValues(denullifiedMinimaxArray, "denullifiedMinimaxArray", "getComparisonArraysAndForwardPassData", ["n/a"]) 

    //console.log("ending getCorrectArray")
    //return denullifiedMinimaxArray; 
    return minimaxArray; 
    }

// converts minimax recommendations into one-hot binary arrays
// predict win = [1,0,0,0] 
// predict draw = [0,1,0,0] 
// predict loss = [0,0,1,0] 
// cannot play here = [0,0,0,1] 

function convertMinimax(array) {
    return array.map(item => {
        switch(item) {
            case 1:
                return [1, 0, 0, 0];
            case 0:
                return [0, 1, 0, 0];
            case -1:
                return [0, 0, 1, 0];
            default:
                return [0, 0, 0, 1];
        }
});
}

// // removes null values
// export function convertMinimax(minimaxArray){
//     let convertedArray = []; 
//     for (let i = 0; i < minimaxArray.length; i++){
//         if (minimaxArray[i] === null || minimaxArray[i] === undefined){convertedArray[i] = 1}
//         else convertedArray[i] = minimaxArray[i]
//     }
//     return convertedArray; 
//     }