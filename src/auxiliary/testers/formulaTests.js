import {corner, edge} from '../general/globals.js'
import {includes, rotation, areEquivalent, equivalenceScore, areIdentical, reflectNumber, nextWheel, reverseTransformBoard, transformBoard, reverseRotation, reverseTransformation} from '../general/usefulFunctions.js'
// import {chooseMove} from './chooseMove.js'
// import {db} from './databaseFormatted.js' //assert { type: "json" };
import {generateAllBoards, generateGoodBoardStates, removeNumericallyIllegalBoards, removeUnreachables, removeFullBoardStates} from './makeBoardAuxiliaries.js'
import {listThreats} from '../geneticAlgo/heuristics.js'

function testAllReverseRotation()
    {
        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 5; j++){
                let x = rotation(i, j); 
                let y = reverseRotation(x,j)
                if (i !== y){
                    console.log(`Failure for ${i}, ${j}`)
                    return
                }
            }
        }
        console.log("All passed!")
        return
    }

    //testReverseRotation()

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

   // console.log(gtTest())

    //console.log(chooseMove(['X',null,null,null,null,null,null,null,null]))

    function transformAndReTransformBoardStates(board, transform){
        console.log("Board is", board)
        let newBoard = transformBoard(board,transform); 
        //console.log("newBoard is", newBoard)
        let oldBoard = reverseTransformBoard(newBoard,transform)
        //console.log("oldBoard is", oldBoard)
        if (!areIdentical(board,oldBoard)){return false}
        return true; 
    }
let boardstate2 = [null, 'X', 'X', 'O', 'X', 'X', 'O', 'O', null]
let boardstate1 = ['X', 'X', null, 'X', 'X', 'O', null, 'O', 'O']
//console.log(transformAndReTransformBoardStates(boardstate1,[0,1]))
    //console.log(transformAndReTransformBoardStates(['X',,'X','X',,'O','O','X','O'], [1,0]))

    function transformAndReverseAllBoardStates(){
        for (let i = 0; i < db.length; i++){
            let board = db[i].state; 
            for (let j = 0; j < 5; j++){ // number of rotations
                for (let k = 0; k < 2; k++){ // flip score
                    try {
                        console.log("x")
                    if (transformAndReTransformBoardStates(board,[k,j])) continue
                    else {
                        console.log(`1. Fail for board ${board} with transform [${k},${j}]}`)
                        return false
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

    //transformAndReverseAllBoardStates()

function testChooseMoveForAllDBEntries(){
    for (let i = 0; i < db.length; i++){
        if (!chooseMove(db[i].state)){console.log(`Failure for i = ${i}`)}
    }
    console.log("testChooseMoveForAllDBEntries finished with success")
}

function testEquivalenceScoreForAllDBEntries(){
    let allPass = true; 
    let bigDB = generateGoodBoardStates(9); 
    for (let j = 0; j < bigDB.length; j++){
        let originalBoard = bigDB[j]; 
        //console.log("Original board is: ", originalBoard)
        for (let i = 0; i < db.length; i++){
            let boardObject = db[i]; 
            let boardState2 = boardObject.state; 
            //console.log("second board is : ", boardState2)
            if (!testEquivalenceScoreForOneEntry(originalBoard,boardState2)){
                allPass = false; 
            }
        }
    }
    return allPass; 
}

function testEquivalenceScoreForOneEntry(boardState1, boardState2){
    let transform; 
    if (areEquivalent(boardState1, boardState2)) {
        transform = equivalenceScore(boardState1, boardState2)
    }
    else {
        //console.log(`Inputs ${boardState1} and  ${boardState2} are not equivalent.`)
        return true; // this cannot falsify our test for equivalence score
    }
    let oldBoard = reverseTransformBoard(boardState2,transform); 
    if (areIdentical(oldBoard,boardState1)){
        //console.log(`Pass for original board ${boardState1}, archetype ${boardState2} and transform ${transform}`)
        return true; 
    }
    else {
        //console.log(`FAIL for original board ${boardState1}, archetype ${boardState2} and transform ${transform}`)
        return false; 
    }
    } 

//console.log(testEquivalenceScoreForAllDBEntries())
// console.log("1st:", testEquivalenceScoreForOneEntry([,,,,,,,,],[,,,,,,,,]))
// console.log("2nd:", testEquivalenceScoreForOneEntry([,,,,,,,,],[undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined]))
// console.log("3rd:", testEquivalenceScoreForOneEntry([null,null,null,null,null,null,null,null,null],[undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined]))

// this generates all legal board states, including equivalents. 
// function generateGoodBoardStates(num){
//     const allBoardStates = generateAllBoards(num); 
//     let legalStates = removeNumericallyIllegalBoards(allBoardStates);
//     let newLegalStates = removeUnreachables(legalStates); 
//     return removeFullBoardStates(newLegalStates); 
//     //return removeEquivalents(newLegalStates)
// }
//testChooseMoveForAllDBEntries()

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

// if (includes([[null, null, null]], ["B", null, null])) console.log ("yiddle dee dee")

//each threat pair consists of [place, tile]
function altlistThreats(array){
    let threats = []; 
    if (array[0] === null){
        if (substantiallyEqual(array[1], array[2])){threats.push([0,array[1]])}
        if (substantiallyEqual(array[3] , array[6])){threats.push([0,array[3]])}
        if (substantiallyEqual(array[4] , array[8])){threats.push([0,array[4]])}
    }
    if (array[1] === null){
        if (substantiallyEqual(array[0] , array[2])){threats.push([1,array[0]])}
        if (substantiallyEqual(array[4] , array[7])){threats.push([1,array[4]])}
    }
    if (array[2] === null){
        if (substantiallyEqual(array[0] , array[1])){console.log("Opportunity confirmed: ", 1); threats.push([2,array[0]])}
        if (substantiallyEqual(array[4] , array[6])){console.log("Opportunity confirmed: ", 2); threats.push([2,array[3]])}
        if (substantiallyEqual(array[5] , array[8])){console.log("Opportunity confirmed: ", 3); threats.push([2,array[5]])}
    }
    if (array[3] === null){
        if (substantiallyEqual(array[0] , array[6])){threats.push([3,array[0]])}
        if (substantiallyEqual(array[4] , array[5])){threats.push([3,array[4]])}
    }
    if (array[4] === null){
        if (substantiallyEqual(array[0] , array[8])){threats.push([4,array[0]])}
        if (substantiallyEqual(array[2] , array[6])){threats.push([4,array[2]])}
    }
    if (array[5] === null){
        if (substantiallyEqual(array[2] , array[8])){threats.push([5,array[2]])}
        if (substantiallyEqual(array[3] , array[4])){threats.push([5,array[3]])}
    }
    if (array[6] === null){
        if (substantiallyEqual(array[0] , array[3])){threats.push([6,array[0]])}
        if (substantiallyEqual(array[2] , array[4])){threats.push([6,array[2]])}
        if (substantiallyEqual(array[7] , array[8])){threats.push([6,array[7]])}
    }
    if (array[7] === null){
        if (substantiallyEqual(array[1] , array[4])){threats.push([7,array[1]])}
        if (substantiallyEqual(array[6] , array[8])){threats.push([7,array[6]])}
    }
    if (array[8] === null){
        if (substantiallyEqual(array[0] , array[4])){threats.push([8,array[0]])}
        if (substantiallyEqual(array[2] , array[5])){threats.push([8,array[2]])}
        if (substantiallyEqual(array[6] , array[7])){threats.push([8,array[6]])}
    }
    return threats; 
}

function testThreats(){
    const boardStates = generateGoodBoardStates(9); 
    let differenceList = []; 
    for (let i = 0; i < boardStates.length; i++){
        const threats1 = listThreats(boardStates[i])
        const threats2 = altlistThreats(boardStates[i])
        differenceList.push([boardStates[i],...differences(threats1, threats2)])
    }
    return differenceList; 
}

function differences(array1, array2){
    let firstListAdditionals = []; 
    let secondListAdditionals = []; 
    for (let i = 0; i < array1.length; i++){
        if (!array2.includes(array1[i])){firstListAdditionals.push(i)}
    }
    for (let i = 0; i < array2.length; i++){
        if (!array1.includes(array2[i])){secondListAdditionals.push(i)}
    }
    return [firstListAdditionals,secondListAdditionals]
}

console.log(testThreats())