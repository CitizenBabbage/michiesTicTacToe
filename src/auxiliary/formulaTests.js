import {corner, edge} from './globals.js'
import {rotation, areEquivalent, equivalenceScore, areIdentical, reflectNumber, nextWheel, reverseTransformBoard, transformBoard, reverseTransformation} from './usefulFunctions.js'
import {chooseMove} from './chooseMove.js'
import {db} from './databaseFormatted.js' //assert { type: "json" };



// gtTest is going to take each number, rotate and reflect it by every possible combination
// then test whether reverseTransformation returns the original number 

function gtTest(){
    let newNum, num;  
    for (let h = 0; h < 2; h++){ // h is whether the square is reflected
        for (let i = 0; i < 9; i++){ // i is the square number
            for (let j = 0; j < 5; j++){ // j is the amount of rotation
                if (h === 1){
                    num = reflectNumber(i);
                }
                else {num = i} 
                if (edge.includes(num)){
                    newNum = edge[nextWheel(edge.indexOf(num),j)]
                }
                else if (corner.includes(num))
                    {newNum = corner[nextWheel(corner.indexOf(num),j)]}
                else newNum = num; //center square
                let oldNum = reverseTransformation(newNum,[h,j])
                if (oldNum !== i) {
                    return false
                }
            
                }
            }
    
        }
        console.log("gtTest passed!")
        return true; 
    }

   

    //console.log(chooseMove(['X',null,null,null,null,null,null,null,null]))

    function transformAndReTransformBoardStates(board, transform){
        //console.log("Board is", board)
        let newBoard = transformBoard(board,transform); 
        //console.log("newBoard is", newBoard)
        let oldBoard = reverseTransformBoard(newBoard,transform)
        //console.log("oldBoard is", oldBoard)
        if (!areIdentical(board,oldBoard)){return false}
        return true; 
    }

    //console.log(transformAndReTransformBoardStates(['X',,'X','X',,'O','O','X','O'], [1,0]))

    function transformAndReverseAllBoardStates(){
        for (let i = 0; i < db.length; i++){
            let board = db[i].state; 
            for (let j = 0; j < 5; j++){
                for (let k = 0; k < 2; k++){
                    try {
                    if (transformAndReTransformBoardStates(board,[k,j])) continue
                    else {
                        console.log(`1. Fail for board ${board} with transform [${k},${j}]}`)
                    }
                    }
                    catch(e) {
                        console.log(`2. Fail for board ${board} with transform [${k},${j}]}`)
                        console.error(e.message)};
                }
            }
        }
        console.log("transformAndReverseAllBoardStates succeeds for all values!")
    }

function testChooseMoveForAllDBEntries(){
    for (let i = 0; i < db.length; i++){
        if (!chooseMove(db[i].state)){console.log(`Failure for i = ${i}`)}
    }
    console.log("testChooseMoveForAllDBEntries finished with success")
}

testChooseMoveForAllDBEntries()

    function testChooseMoveNeverTriesToFillFilledSquare(){
        let nextBoard = [null, null,null,null,null,null,null,null,null];
        let newSuggestion;  
        for (let i = 0; i < 9; i++){
            nextBoard = [null, null,null,null,null,null,null,null,null]
            nextBoard[i] = 'X'
            //console.log(`Trying: `, nextBoard)
            for (let j = 0; j < 300; j++){
                newSuggestion = chooseMove(nextBoard); 
                if (nextBoard[newSuggestion]){
                    console.log(`ERROR: X suggestion for ${nextBoard} is already filled`)
                return}
            }
        }
        console.log("testChooseMoveNeverTriesToFillFilledSquare completed with no errors.")
        return true; 
    }

    function testEquivalenceAndEquivalenceScore(){
        for (let i = 0; i < db.length; i++){
            let board1 = db[i].state; 
            for (let j = 0; j < 5; j++){
                for (let k = 0; k < 2; k++){
                    let board2 = transformBoard(board1, [k,j])
                    if (!areEquivalent(board1,board2)){
                        console.log(`Bad inequivalence 1 for board1 = ${board1}, board2 = ${board2}`)
                        return
                    }
                    else if (areIdentical(equivalenceScore(board1,board2),['error','error'])){
                        console.log(`Bad inequivalence 2 for board1 = [${board1}] board2 = [${board2}]`)
                        return
                    }
                }
            }
        }
        console.log("testEquivalenceAndEquivalenceScore succeeds without errors")
    }

//testEquivalenceAndEquivalenceScore()