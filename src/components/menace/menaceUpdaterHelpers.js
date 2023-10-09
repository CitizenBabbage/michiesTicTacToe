import { transformBoard, boardFull, areExactlyTheSame, isOdd,  reverseTransformation, dataBaseDuplicator, areEquivalent , equivalenceScore, isNumber} from '../../auxiliary/general/usefulFunctions.js';
import { checkIsIntegral, checkBeadSubbase, checkIsANumber } from '../../auxiliary/testers/errorCheckers.js';
import { returnSymmetries, returnHorizontalOpposite, returnVerticalOpposite, returnForwardDiagonalOpposite, returnBackwardDiagonalOpposite  } from '../../auxiliary/general/symmetryCheckers.js';

// commented out because it is no longer called from MenaceUpdater
//
// export function updateHistoryLog(allPlayedBoards, gameLog, database){ 
//     //console.log(`updateHistoryLog called: allPlayedBoards has length ${allPlayedBoards.length} and is as follows: ${JSON.stringify(allPlayedBoards)}. gameLog has length ${gameLog.length}`)
//     let newAllPlayedBoards = dataBaseDuplicator(allPlayedBoards);
//     // checkBeadSubbase(newAllPlayedBoards, "updateHistoryLog")
//     for (let j = 0; j < gameLog.length; j++){ //for each item in the new gameLog, find the corresponding object and update the history log with it
//         //console.log(`checking gamelog[${j}], which is `, gameLog[j])
//         let gameLogObject = returnCorrespondingObjectFromDatabase(gameLog[j], database); 
//         if (!gameLogObject && !(boardFull(gameLog[j]))) throw new Error(` at updateHistoryLog: board state ${gameLog[j]} has no corresponding object`)
//         newAllPlayedBoards = updateHistory(newAllPlayedBoards,gameLogObject)
//     }
//     //console.log(`icounter is ${icounter}, jcounter is ${jcounter} and kcounter is ${kcounter} `)
//     //console.log(`newAllPlayedBoards has length ${newAllPlayedBoards.length} and is `, newAllPlayedBoards)
//     return newAllPlayedBoards ; 
// }

// function returnCorrespondingObjectFromDatabase(boardstate, database){
//     for (let k = 0; k < database.length; k++){ // find the database object it corresponds to
//         if (areEquivalent(database[k].state,boardstate)){
//             return database[k]; 
//         }
//     }
// }

// no longer called 
//
// function updateHistory(historyBase, object){
//     if (!object) return historyBase; // we get an undefined object for full board states, ignore. 
//     let isInHistoryAlready = false; 
//     for (let i = 0; i < historyBase.length; i++){ // for each board object in historyBase
//         if (areExactlyTheSame(historyBase[i].state,object.state)){
//             //console.log("Updating a board state that is already in history...  ")
//             historyBase = [...historyBase.slice(0,i),object, ...historyBase.slice(i+1)]
//             isInHistoryAlready = true; 
//             break; 
//             }
//         }
//     if (!isInHistoryAlready) historyBase = [...historyBase,object] // if it wasnt anywhere in the set, push it to the end
//     //console.log("historyBase is ", historyBase)
//     return historyBase; 
//     }

// export function startNewTrainingIteration(trainingIterations){
//     if (trainingIterations <= 0) return; 
//     //console.log("RESTARTING with training iterations remaining: ", trainingIterations-1)
//     setSquares(Array(9).fill(null)); 
//     setWinner(null); 
//     setGameLog([Array(9).fill(null)]); 
//     setTrainingIterations(trainingIterations - 1)
// }


export function learnFromGame(winner, gameLog, database){
    //console.log("initiating learnFromGame, winner is ", winner)
    if (winner === undefined || winner == null || gameLog === undefined) {
        //console.log(`Either winner or gamelog is undefined or null. Aborting learnFromGame. Details: winner = ${winner}, gameLog = ${gameLog}`)
        return
     }  
     
    else {
        let gameResult = gameresult(winner); // 1 for a win for X, 0 for a draw, -1 for a loss
        checkIsANumber(gameResult, "learnFromGame", "gameResult")
        let newDataAndLog = updateEachBoardPlayed(gameLog, gameResult, database) // returns an array [newData,nLLog]
        //console.log("About to update database")
        return newDataAndLog; 
    }
}

// returns an updated database, with the response arrays from all the games in the log 
// updated depending on whether they led to a win or a loss. 
function updateEachBoardPlayed(log, gameResult, database){ // gameResult = 1: X won, =0 : draw, =-1: O won 
    let nLLog = []; 
    let newData = dataBaseDuplicator(database); 
    checkIsANumber(gameResult, "updateEachBoardPlayed", "gameResult")
    for (let i = 0; i < log.length -1; i++){                    //for each state in the game log
        let move = getPositionThatChanged(log[i], log[i+1]);    //find the position that changed 
        let update; 
        if (isOdd(i)) {                                         // if it was an odd round, that was O's turn. 
            update = gameResult * (-1)                          // uninvert result for O
        } 
        else update = gameResult; 
        if (update > 0) update *= 3 // 3 points for a win
        else if (update === 0) update = 1; // 1 point for a draw
        console.log(`on the ${i}th move...`)
        newData = findAndUpdateEquivalent(newData, update, move, log[i]); 
        nLLog = [...nLLog, [gameResult, update, log[i], move]]
        }
    //setNLLogStats(nLLog)
    // setNaturalLanguageLog(nLLog); 
    return [newData,nLLog]; 
}






// finds the equivalent of a given board state in the db and updates it, returning whole db
function findAndUpdateEquivalent(data, update, move, boardState){
    //console.log(`Updating for ${JSON.stringify(boardState)}`)
    let newData = dataBaseDuplicator(data); 
    for (let j = 0; j < newData.length; j++){                                                   // look through the db for equivalent board state
        if (areEquivalent(boardState, newData[j].state)){                                       // when you find it
            let equivScore = equivalenceScore(boardState, newData[j].state)                     // get the equivalence score 
            console.log(`equivScore is ${equivScore}`)
            let newMove = reverseTransformation(move, equivScore)                               // use that to rotate/flip move appropriately
            console.log(`For boardstate ${JSON.stringify(boardState)}, transformed to ${JSON.stringify(newData[j].state)}, move ${move} tranformed to newMove (before symmetries eliminated) is ${newMove}`)
            newMove = eliminateSymmetriesFromResponseMove(newData[j].state, newMove, newData[j].response)     
            console.log(`newMove after symmetries eliminated is ${newMove}`) 
            if (newData[j].response[newMove] === -1)  throw new Error (`in findAndUpdateEquivalent: trying to alter a response whose value is -1, namely item ${newMove} in response array ${newData[j].response}`)                    
            let newBeadCount = Math.max(0, newData[j].response[newMove] + update); 
            //console.log("newBeadCount is", newBeadCount); 
            checkIsIntegral(newBeadCount, "findAndUpdateEquivalent")
            newData[j].response[newMove] = newBeadCount;                                        // update response array accordingly 
            newData[j].updates = newData[j].updates + 1;                                        // mark that the object has been updated
            //addToAllPlayedBoards(newData[j])
            return newData;
            }
    }
    return newData; 
}


function findEquivalent(data, boardState){
    let newData = dataBaseDuplicator(data); 
    for (let j = 0; j < newData.length; j++){                                                   // look through the db for equivalent board state
        if (areEquivalent(boardState, newData[j].state)){ 
            return newData[j]
            }
    }
}



// given that we're already in an archetypal frame...
// get the move
// see if the move is on the responses array
// if it isn't, try out each reflection of the move
// when you find one, update that. 

// export function returnSymmetries(boardstate){
//     let symmetryList = [];
//     if (isHorizontallySymmetrical(boardstate)) symmetryList.push('h'); 
//     if (isVerticallySymmetrical(boardstate)) symmetryList.push('v'); 
//     if (isForwardDiagonallySymmetrical(boardstate)) symmetryList.push('d'); 
//     if (isBackwardDiagonallySymmetrical(boardstate)) symmetryList.push('b')
//     return symmetryList; 
// }

//ALERT : using >= 0 rather than >0 because 0 is updatable, but -1 is not to be updated. 
// the board here should be the archetypal board pulled from the db
export function eliminateSymmetriesFromResponseMove(board, move, responses){
    console.log("responses = ", responses)
    if (responses[move] >= 0) {return move}
    else {
        console.log(`responses[move] equals ${responses[move]}, which is < 0`)
        const symmetries = returnSymmetries(board); 
        if (symmetries.includes('h') && returnHorizontalOpposite(move) > 0) return returnHorizontalOpposite(move); 
        if (symmetries.includes('v') && returnVerticalOpposite(move) > 0) return returnVerticalOpposite(move); 
        if (symmetries.includes('d') && returnForwardDiagonalOpposite(move) > 0) return returnForwardDiagonalOpposite(move); 
        if (symmetries.includes('b') && returnBackwardDiagonalOpposite(move) > 0) return returnBackwardDiagonalOpposite(move); 
    }
}

3,3,3,-1,3,-1,-1,-1,-1


//console.log(getEquivalentResponse(['X','X',null,'O',null,null,null,null,null],2,[3,null,null,1,0,null,2,3,4]))

// //remove if not called 
// function addToAllPlayedBoards(object){
//     let newAllPlayedBoards = dataBaseDuplicator(allPlayedBoards);
//     checkBeadSubbase(newAllPlayedBoards, "addToAllPlayedBoards") 
//     let presentInSet = false; 
//     for (let i = 0; i < newAllPlayedBoards.length; i++){
//         if (areEquivalent(newAllPlayedBoards[i].state,object.state)){
//             newAllPlayedBoards = [...newAllPlayedBoards.slice(0,i),object, ...newAllPlayedBoards.slice(i+1)]
//             presentInSet = true; 
//             break; 
//     }
//     }
//     if (!presentInSet) {
//         // console.log(`Adding ${JSON.stringify(object)} to allPlayedBoards`)
//         // console.log(`Prior to addition allPlayedBoards has length: ${allPlayedBoards.length}`)
//         newAllPlayedBoards = [...newAllPlayedBoards,object]; 
//         setAllPlayedBoards(newAllPlayedBoards); 
//         //console.log(`After addition allPlayedBoards has length: ${allPlayedBoards.length}`)
//     }
//     else {
//         console.log(`1. ${JSON.stringify(object)} is already in allPlayedBoards`)
//     }
// }




function getPositionThatChanged(array1, array2){
    for (let i = 0; i < array1.length; i++){
        if (array1[i] !== array2[i]) {return i}
    }
}



// //takes in winner as a symbol 'O' or 'X', determines whether computer won, and returns either 1 or -1 
function gameresult(winner){
    //console.log("winner is", winner)
    if (winner !== 'X' && winner !== 'O' && winner !== "D") return; //ignore incomplete games
    if (winner === "X") return 1 // 
    else if (winner === "O") return -1 //
    else return 0; // else it's a draw
}