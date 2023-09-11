import { calculateWinner } from "../engineHelpers/checkWinner.js"
import { whoseMove } from "../general/usefulFunctions.js";

export function minimaxChooseMove(board, whoseTurn){
    let [choice, bestScore, boardScores] = minimaxRecurse(board,whoseTurn);
    console.log("minimaxChooseMove: boardScores are ", boardScores)
    boardScores = numerizeFullSquares(boardScores); // replaces 'full' with 1
    console.log("minimaxChooseMove: boardScores after numerization are ", boardScores)
    return [choice, bestScore, boardScores];
}

// export function minimaxRecurseShell(board,whoseTurn){
//     const answerButWithSomeWords = minimaxRecurse(board, whoseTurn); 
//     const fullyNumerizedOutput = [...answerButWithSomeWords[2]]; 
//     for (let i = 0; i < answerButWithSomeWords[2].length; i++){
//         if (answerButWithSomeWords[2][i] === 'full'){fullyNumerizedOutput[i] = 1}
//     }
//     return fullyNumerizedOutput; 
// }

// expects an array of 'X's and 'O's
// returns recommendedMove, recommendedMoveScore, moveArray
export function minimaxRecurse(board, turn){
    let moveArray = [null,null,null,null,null,null,null,null,null] 
    let whoseTurn = whoseMove(board); 
    //console.log(`local turn for ${board} is set to `, whoseTurn)
    for (let i = 0; i < board.length; i++){
    
        let tempboard = [...board]; 
        
        if (tempboard[i]) {// if the spots are taken...
            //console.log(`spot ${i} is taken`)
            moveArray[i] = "full" // to stop null being evaluated as lowest
            continue; 
            }
        tempboard[i] = whoseTurn; // place whoever's turn it is into empty slot
        let winner = calculateWinner(tempboard) // then see if that yields a win
        if (winner === turn){ // if this is a winning position for computer
            moveArray[i] = 512; // give that move 512 points
            }
        else if (["X","O"].includes(winner)){ // otherwise if there's a winner defined, it's the other guy
            moveArray[i] = 8; // so give that move 8 points (bc, for teaching neural net, it's better than trying to play into a taken square)
        }
        else if (winner === "D"){ //if it's a draw
            moveArray[i] = 64; // that's worth 64 (i.e. getting this right is as important to error as getting all the other eight at 8 points each)
            }
        else { //if the game doesn't terminate with this move
            let mr = minimaxRecurse(tempboard, turn); // imagine making the move and take the game from there
            moveArray[i] = mr[1]; // the score for that move is then equal to the score for the recursion (which is in argument place 1)
            }
        }
        // console.log("move array is ", moveArray)
        let moveScoreAndMoveArray = [...getMoveAndAssociatedScore(moveArray, turn, whoseTurn),moveArray]
        return moveScoreAndMoveArray; 
    }

    

    //this takes a precalculated movearray (as above) and finds the highest score in that array
    // or lowest if it is calculating for opponent
    function getMoveAndAssociatedScore(moveArray, turn, whoseTurn){
        let recommendedMove = 0.5, highestSoFar = 0.3, lowestSoFar = 1024, recommendedMoveScore = 0.1; 
        if (whoseTurn === turn){
            for (let i = 0; i < moveArray.length; i++){
                if (moveArray[i] === null) continue; 
                // find the highest valued move in moveArray
                if (moveArray[i] > highestSoFar){
                    highestSoFar = moveArray[i]; 
                    recommendedMove = i; 
                    recommendedMoveScore = moveArray[i]; 
                }
            }
        }
        else {
            for (let i = 0; i < moveArray.length; i++){
                if (moveArray[i] === null) continue; 
                if (moveArray[i] < lowestSoFar){
                    lowestSoFar = moveArray[i];
                    recommendedMove = i; 
                    recommendedMoveScore = moveArray[i]; 
                }
            }
        }
        // console.log("getMoveAndAssociatedScore, recommending move ", recommendedMove) 
        return [recommendedMove, recommendedMoveScore]
    
    }


    function numerizeFullSquares(board){
        for (let i = 0; i < board.length; i++){
            if (board[i] === 'full') board[i] = 1; 
            }
        return board; 
    }

//console.log(minimaxRecurse([null, null, null, null, null, null, null, 'O', 'X'],'X'))
//console.log(['O','X',,,'X',,,,'O'].length)
//console.log(minimaxChooseMove(['O','X',,,'X',,,,'O'], 'X'))
//console.log(minimaxChooseMove(['X','X','O','X','X','O','O','O',null],'X'))
//console.log(minimaxChooseMove(['X','O','X','X','O',null,'O','X',null],'X'))
// console.log(minimaxChooseMove(['X',null,null,null,'O',null,null,null,null],'X'))
// console.log("a" > 3)
