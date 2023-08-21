import { generateGoodBoardStates } from '../boardStateDatabase/makeBoardAuxiliaries.js'
import { listThreats, substantiallyEqual } from '../geneticAlgo/heuristics.js';


//each threat pair consists of [place, tile]
function altlistThreats(array){
    let threats = []; 
    if (!array[0]){
        if (substantiallyEqual(array[1], array[2])){threats.push([0,array[1]])}
        if (substantiallyEqual(array[3] , array[6])){threats.push([0,array[3]])}
        if (substantiallyEqual(array[4] , array[8])){threats.push([0,array[4]])}
    }
    if (!array[1]){
        if (substantiallyEqual(array[0] , array[2])){threats.push([1,array[0]])}
        if (substantiallyEqual(array[4] , array[7])){threats.push([1,array[4]])}
    }
    if (!array[2]){
        if (substantiallyEqual(array[0] , array[1])){threats.push([2,array[0]])}
        if (substantiallyEqual(array[4] , array[6])){threats.push([2,array[4]])}
        if (substantiallyEqual(array[5] , array[8])){threats.push([2,array[5]])}
    }
    if (!array[3]){
        if (substantiallyEqual(array[0] , array[6])){threats.push([3,array[0]])}
        if (substantiallyEqual(array[4] , array[5])){threats.push([3,array[4]])}
    }
    if (!array[4]){
        if (substantiallyEqual(array[0] , array[8])){threats.push([4,array[0]])}
        if (substantiallyEqual(array[2] , array[6])){threats.push([4,array[2]])}
        if (substantiallyEqual(array[1] , array[7])){threats.push([4,array[1]])}
        if (substantiallyEqual(array[3] , array[5])){threats.push([4,array[5]])}
    }
    if (!array[5]){
        if (substantiallyEqual(array[2] , array[8])){threats.push([5,array[2]])}
        if (substantiallyEqual(array[3] , array[4])){threats.push([5,array[3]])}
    }
    if (!array[6]){
        if (substantiallyEqual(array[0] , array[3])){threats.push([6,array[0]])}
        if (substantiallyEqual(array[2] , array[4])){threats.push([6,array[2]])}
        if (substantiallyEqual(array[7] , array[8])){threats.push([6,array[7]])}
    }
    if (!array[7]){
        if (substantiallyEqual(array[1] , array[4])){threats.push([7,array[1]])}
        if (substantiallyEqual(array[6] , array[8])){threats.push([7,array[6]])}
    }
    if (!array[8]){
        if (substantiallyEqual(array[0] , array[4])){threats.push([8,array[0]])}
        if (substantiallyEqual(array[2] , array[5])){threats.push([8,array[2]])}
        if (substantiallyEqual(array[6] , array[7])){threats.push([8,array[6]])}
    }
    return threats; 
}

function testThreats(){
    const boardStates = generateGoodBoardStates(9); 
    let listOfDifferenceLists = []; 
    for (let i = 0; i < boardStates.length; i++){
        const threats1 = listThreats(boardStates[i])
        const threats2 = altlistThreats(boardStates[i])
        let diffs = differences(threats1, threats2); 
        if (diffs) listOfDifferenceLists.push([boardStates[i],...diffs])
    }
    return listOfDifferenceLists; 
}

function differences(array1, array2){
    let firstListAdditionals = []; 
    let secondListAdditionals = []; 
    for (let i = 0; i < array1.length; i++){
        if (!deepIncludes(array2,array1[i])){
            console.log(`${JSON.stringify(array2)} does not include ${JSON.stringify(array1[i])}`)
            firstListAdditionals.push(i)
        }
    }
    for (let i = 0; i < array2.length; i++){
        if (!deepIncludes(array1, array2[i])){
            console.log(`${JSON.stringify(array1)} does not include ${JSON.stringify(array2[i])}`)
            secondListAdditionals.push(i)
        }
    }
    if (firstListAdditionals.length === 0 && secondListAdditionals.length === 0) return null; 
    else {
        const lengthReport = `firstListAdditionals has length ${firstListAdditionals.length} and secondListAdditionals has length ${secondListAdditionals.length}`
        return [`listThreats recognises: ${JSON.stringify(firstListAdditionals)}` , `altListThreats recognises ${JSON.stringify(secondListAdditionals)}`, lengthReport]
    }
}

function deepIncludes(array, element){
    for (let i = 0; i < array.length; i++){
        if (JSON.stringify(array[i]) === JSON.stringify(element)) return true
        else {
            continue
        }
    }
    return false
}

function testForNulls(func){
    const boardStates = generateGoodBoardStates(9); 
    let listOfBadBoards = []; 
    //console.log(`boardStates has length ${boardStates.length}`)
    for (let i = 0; i < boardStates.length; i++){
        const threats = func(boardStates[i]); 
        //console.log(`threats has length ${threats.length}`)
        for (let j = 0; j < threats.length; j++){
            //console.log(`for board ${i} we have threat ${threats[j]}`)
            if (!threats[j][1]) {listOfBadBoards.push([boardStates[i],JSON.stringify(threats)])}
    }
}
    return listOfBadBoards; 
}


console.log(testThreats())
//console.log(deepIncludes([[4,"X"],[4,"X"],[4,"O"],[4,"O"]], [4,"O"]))
//console.log(testForNulls(altlistThreats))
// console.log(listThreats([
//     undefined, undefined,
//     undefined, 'X',
//     undefined, 'X',
//     undefined, undefined,
//     'O'
//   ]))