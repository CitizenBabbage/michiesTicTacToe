import {areEquivalent, equivalenceScore, areIdentical, reverseTransformBoard} from "./usefulFunctions.js"


export function menaceChooseMove(board, dbase){
    testForChangeInFirstObjectInDataBase(dbase); // just a test to make sure learning is updating
    const obj = getBoardObject(board, dbase); 
    if (obj) {return [chooseMoveFromObject(obj),obj.response]}
    else console.log(`Error: no object returned for board state ${board}`)

}

// just a test that helps make sure the database is updating
function testForChangeInFirstObjectInDataBase(dbase){
    if (areIdentical(dbase[0].response, [
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111
     ])){console.log("WARNING: First board state unchanged in database")}
}

//console.log(chooseMove(example))
// console.log(equivalenceScore(example, [
//     'X', null, 'O',
//     'X', null, 'X',
//     'O', null, 'O'
//   ]))

// db contains ARCHETYPAL board states---i.e. not every equivalent flip and rotation
// this function takes board state, and returns the archetype of which it is a flip/rotation
// changes transform, however, to represent the change needed to recover input board state 
export function getBoardArchetype(boardState, dbase){
    for (let i = 0; i < dbase.length; i++){
        if (areEquivalent(boardState, dbase[i].state)){
            //console.log(`BoardState[0] is ${boardState[0]} and boardStatesDB[i].state[8] is ${boardStatesDB[i].state[8]}`)

            //console.log(`type of BoardState is ${typeof boardState} and type of boardStatesDB[i].state is ${typeof boardStatesDB[i].state}`)
            //console.log(`BoardState is ${boardState} and boardStatesDB[i].state is ${boardStatesDB[i].state}`)
            let boardObject = dbase[i]; 
            boardObject.transform = equivalenceScore(boardState, dbase[i].state)
            //console.log("1. transform is: ", boardObject.transform)
            return boardObject; 
        }
    }
    return dummyObject; //if all else fails, return something
}

// this gets an archetypal board state + transform using getBoardArchetype and 
// returns an object with the board state and response array back-rotated and back-flipped
// according to the transform 
export function getBoardObject(boardState, dbase){
    let arche = getBoardArchetype(boardState, dbase) 
    // console.log(`1. corresponding archetype to ${boardState} is: `, JSON.parse(JSON.stringify(arche)));
    // console.log("2. transform is: ", JSON.parse(JSON.stringify(arche.transform)));
    // console.log("3. arche.state BEFORE transform is: ", JSON.parse(JSON.stringify(arche.state)));
    // console.log(`4. corresponding archetype to ${boardState} is: `, JSON.parse(JSON.stringify(arche)));
    arche.state = reverseTransformBoard(arche.state, arche.transform);
    // console.log(arche.state);
    // console.log("5. arche.state AFTER transform is: ", JSON.parse(JSON.stringify(arche.state)));
    if (!areIdentical(arche.state,boardState)){console.log(`Error: ${arche.state} not equal to ${boardState}`); return}
    arche.response = reverseTransformBoard(arche.response, arche.transform)
    return arche; 
}

// takes object, returns move chosen 

export function chooseMoveFromObject(object){
    let rand = Math.random(); 
    let probSum = 0; 
    for (let i = 0; i < object.response.length; i++){
        // console.log("probSum is now:", probSum)
        probSum += object.response[i]; // add the first probability in the response array to probsum
        if (rand < probSum){return i} // if rand is less than that, that's the move
    }
    console.log(`Error: object scanned without probability satisfaction`)
}




//console.log("console log: reverse transformation is: ", reverseTransformation(2, [0,1]))

// console.log(chooseMove(['X', 'X', null, 'X', 'X', 'O', null, 'O', 'O']))

// console.log(equivalenceScore(['X', 'X', null, 'X', 'X', 'O', null, 'O', 'O'], [null, 'X', 'X', 'O', 'X', 'X', 'O', 'O', null]))

const dummyObject = {
    "id":-1,
    "state":[
       "Err",
       "Err",
       "Err",
       "Err",
       "Err",
       "Err",
       "Err",
       "Err",
       "Err"
    ],
    "turn":"Err",
    "response":[
        "Err",
        "Err",
        "Err",
        "Err",
        "Err",
        "Err",
        "Err",
        "Err",
        "Err"
    ],
    "transform":[
       NaN,
       NaN
    ]
 }
