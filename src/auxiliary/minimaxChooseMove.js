import { calculateWinner } from "./checkWinner.js";
import { whoseMove } from "./chooseMove.js";

export function minimaxChooseMove(board, whoseTurn){
    return minimaxRecurse(board,whoseTurn)[0]
}


function minimaxRecurse(board, turn){
    
    let moveArray = [null,null,null,null,null,null,null,null,null]
    let whoseTurn = whoseMove(board); 
    //console.log(`local turn for ${board} is set to `, whoseTurn)
    for (let i = 0; i < board.length; i++){
        let tempboard = [...board]; 
        
        if (tempboard[i] !== undefined && tempboard[i] !== null) continue; 
        tempboard[i] = whoseTurn; // place whoever's turn it is into empty slot
        let winner = calculateWinner(tempboard)
        //console.log(`for board ${tempboard} we have winner ${winner} and last turn ${turn}`)
        if (winner === turn){ // if this is a winning position for the player evaluating the series of plays
            moveArray[i] = 10; 
            }
        else if (["X","O"].includes(winner)){ // otherwise if there's a winner defined, it's the other guy
            moveArray[i] = -10; 
        }
        else if (winner === "D"){
            moveArray[i] = 0; 
            }
        else {
            let mr = minimaxRecurse(tempboard, turn); 
            moveArray[i] = mr[1]; 
            }
        }
        //console.log(` moveArray for ${board} when it's ${whoseTurn}'s turn is `, moveArray)
        let moveAndAssociatedScore = getMoveAndAssociatedScore(board, moveArray, turn, whoseTurn)
        return moveAndAssociatedScore
    }

    function getMoveAndAssociatedScore(board, moveArray, turn, whoseTurn){
        let recommendedMove = 0, highestSoFar = -11, lowestSoFar = 11, recommendedMoveScore = -1; 
        // console.log("getMoveAndAssociatedScore, received board ", board) 
        // console.log("getMoveAndAssociatedScore, received moveArray ", moveArray) 
        if (whoseTurn === turn){
            for (let i = 0; i < moveArray.length; i++){
                if (moveArray[i] === null) continue; 
                if (moveArray[i] > highestSoFar){
                    highestSoFar = moveArray[i]; 
                    recommendedMove = i; 
                    recommendedMoveScore = highestSoFar; 
                }
                //if (moveArray[i] === 10){console.log(`It's my (${turn}'s) turn, and moving to position ${i} on board ${board} leads to a winning position for me`)}
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


    