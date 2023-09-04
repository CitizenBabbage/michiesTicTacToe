import { calculateWinner } from "../engineHelpers/checkWinner.js"
import { whoseMove } from "../general/usefulFunctions.js";

export function minimaxChooseMove(board, whoseTurn){
    return minimaxRecurse(board,whoseTurn)[0]
}


export function minimaxRecurse(board, turn){
    
    let moveArray = [null,null,null,null,null,null,null,null,null] 
    let whoseTurn = whoseMove(board); 
    //console.log(`local turn for ${board} is set to `, whoseTurn)
    for (let i = 0; i < board.length; i++){
        let tempboard = [...board]; 
        
        if (tempboard[i] !== undefined && tempboard[i] !== null) continue; 
        tempboard[i] = whoseTurn; // place whoever's turn it is into empty slot
        let winner = calculateWinner(tempboard)
        //console.log(`for board ${tempboard} we have winner ${winner} and last turn ${turn}`)
        if (winner === turn){ // if this is a winning position 
            moveArray[i] = 10; // give that move 10 points
            }
        else if (["X","O"].includes(winner)){ // otherwise if there's a winner defined, it's the other guy
            moveArray[i] = -10; // so give that move -10 points
        }
        else if (winner === "D"){ //if it's a draw
            moveArray[i] = 0; // that's worth nothing
            }
        else { //if the game doesn't terminate with this move
            let mr = minimaxRecurse(tempboard, turn); // imagine making the move and take the game from there
            moveArray[i] = mr[1]; // the score for that move is then equal to the score for the recursion (which is in argument place 1)
            }
        }
        let moveScoreAndMoveArray = [...getMoveAndAssociatedScore(moveArray, turn, whoseTurn),moveArray]
        return moveScoreAndMoveArray; 
    }

    function getMoveAndAssociatedScore(moveArray, turn, whoseTurn){
        let recommendedMove = 0, highestSoFar = -11, lowestSoFar = 11, recommendedMoveScore = -1; 
        if (whoseTurn === turn){
            for (let i = 0; i < moveArray.length; i++){
                if (moveArray[i] === null) continue; 
                // find the highest valued move in moveArray
                if (moveArray[i] > highestSoFar){
                    highestSoFar = moveArray[i]; 
                    recommendedMove = i; 
                    recommendedMoveScore = highestSoFar; 
                }
            }
        }
        else {
            for (let i = 0; i < moveArray.length; i++){
                if (moveArray[i] === null) continue; 
                if (moveArray[i] < lowestSoFar){
                    lowestSoFar = moveArray[i];
                    recommendedMove = i; 
                    recommendedMoveScore = lowestSoFar; 
                }
                //if (moveArray[i] === -10){console.log(`Its my opponent's turn, and moving to position ${i} on board ${board} leads to a losing position for me, ${turn}`)}
            }
        }
        // console.log("getMoveAndAssociatedScore, recommending move ", recommendedMove) 
        return [recommendedMove, recommendedMoveScore]
    
    }

console.log(minimaxChooseMove([,,,,,,,], 'X'))
    