import { areIdentical, transformBoard } from "../general/usefulFunctions.js";
import { db } from "./dataBeadsFormatted.js";


class EqDatabase {
    constructor({zero = [], one = [], two = [], three = [], four = [], five = [], six = [], seven = [], eight = []} = {}) {
        this.zero = zero; // in which go all the board states with 0 moves made
        this.one = one;  // in which go all the board states with 1 move made
        this.two = two; 
        this.three = three; 
        this.four = four; 
        this.five = five; 
        this.six = six; 
        this.seven = seven; 
        this.eight = eight; 
    }
  }

class EqClass {
    constructor({head = [],all = []}) {
      this.head = head; // a pair: boardstate, transformCode
      this.all = all;  // an array of pairs, each of which contains a boardstate and transformcode
    }
  }

export function makeEquivalenceDatabase(){
    let data = db; 
    let eqDb = new EqDatabase(); 
    // console.log("length of eqDb.one is ... ", eqDb.one.length)
    // console.log("eqDb.one is an array?", Array.isArray(eqDb.one))
    for (let i = 0; i < data.length; i++){
        //console.log(`On iteration ${i}, eqDb.one is an array?`, Array.isArray(eqDb.one))
        let boardState = data[i].state; 
        let allEquivalents = getAllEquivalents(boardState); // this should be an array of [board,transform] pairs
        let eqCl = new EqClass({head: [boardState,[0,0]],all:allEquivalents})
        let newEqDb = updateEqDb(eqDb,eqCl); 
        eqDb = newEqDb; 
    }
    return eqDb; 
}

//adds an equivalence class to the array in the db that contains all equivalence classes with that symbol count
function updateEqDb(eqDb,eqCl){
    const board = eqCl.head[0]; 
    const symbolCount = board.reduce((acc,item) => item? acc+1: acc, 0);  
    switch(symbolCount) {
        case 0:
            eqDb.zero = [...eqDb.zero,eqCl];
            return eqDb; 
        case 1:
            eqDb.one = [...eqDb.one,eqCl];
            return eqDb; 
        case 2:
            eqDb.two = [...eqDb.two,eqCl]; 
            return eqDb; 
        case 3:
            eqDb.three = [...eqDb.three,eqCl];
            return eqDb; 
        case 4:
            eqDb.four = [...eqDb.four,eqCl];  
            return eqDb; 
        case 5:
            eqDb.five = [...eqDb.five,eqCl];
            return eqDb; 
        case 6:
            eqDb.six = [...eqDb.six,eqCl];
            return eqDb; 
        case 7:
            eqDb.seven = [...eqDb.seven,eqCl];
            return eqDb; 
        case 8:
            eqDb.eight = [...eqDb.eight,eqCl]; 
            return eqDb; 
        default:
            throw new Error("Error in updateEqDb, must receive a boardstate with 0 to 8 spaces filled")
    }
}

function getAllEquivalents(board){
    let allEquivalents = []; 
    for (let i = 0; i < 2; i++){ // for every possible reflection
        for (let j = 0; j < 4; j++){ // and every possible rotation
            const transformedBoard = transformBoard(board, [i,j]); 
            if (allEquivalents.length === 0){
                allEquivalents.push([transformedBoard,[[i,j]]])
            }
            else {
                let found = false; 
                for (let k = 0; k < allEquivalents.length; k++){ //check if it's there already
                    if (areIdentical(allEquivalents[k][0], transformedBoard)) {
                        // console.log(`On iteration ${i},${j},${k}, discovered that allEquivalents${k}, which is ${allEquivalents[k]}, already equals boardstate ${transformedBoard}, but should not yet have transform [${i},${j}] `)
                        allEquivalents[k][1].push([i,j]) // if it is, just add the transform to the transform array
                        found = true; 
                    } 
                }
                if (!found) { // otherwise add the pair [  board,  transformArray = [[transform]]  ] to allEquivalents
                    allEquivalents.push([transformedBoard,[[i,j]]]) 
                } 
            }     
        }
    }
    return allEquivalents; 
}

//        const genome = new Genome({genome:genes, basicName:name, extendedName: extName, fitness: 0, generation: "1st"})

// const x = makeEquivalenceDatabase(db);
// console.log(JSON.stringify(x.three))

