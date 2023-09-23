    //import fs from 'fs'; 
    import {db} from '../../auxiliary/boardStateDatabase/dataBeadsFormatted.js'

    
    // this looks through the database for board states that are symmetrical
    // for any such found, it doubles the beads in the square on one side of the symmetry, and reduces
    // the beads in the opposite square to zero.   
    
    export function eliminateResponseSymmetries(database){
        database = eliminateHorizontalSymmetries(database);
        database = eliminateVerticalSymmetries(database);
        database = eliminateForwardDiagonalSymmetries(database);
        database = eliminateBackwardDiagonalSymmetries(database);
        return database; 
    }

    function eliminateHorizontalSymmetries(database){
        for (let i = 0; i < database.length; i++){
            if (isHorizontallySymmetrical(database[i].state)){
                database[i].response[2] = 0; 
                database[i].response[5] = 0; 
                database[i].response[8] = 0; 
            }
        }
        return database; 
    }

    function eliminateVerticalSymmetries(database){
        for (let i = 0; i < database.length; i++){
            if (isVerticallySymmetrical(database[i].state)){
                console.log(database[i].id)
                database[i].response[6] = 0; 
                database[i].response[7] = 0; 
                database[i].response[8] = 0; 
            }
        }
        return database; 
    }

    function eliminateForwardDiagonalSymmetries(database){
        for (let i = 0; i < database.length; i++){
            if (isForwardDiagonallySymmetrical(database[i].state)){
                database[i].response[5] = 0; 
                database[i].response[7] = 0; 
                database[i].response[8] = 0; 
            }
        }
        return database; 
    }

    function eliminateBackwardDiagonalSymmetries(database){
        for (let i = 0; i < database.length; i++){
            if (isBackwardDiagonallySymmetrical(database[i].state)){
                database[i].response[3] = 0; 
                database[i].response[6] = 0; 
                database[i].response[7] = 0; 
            }
        }
        return database; 
    }

    

    function isHorizontallySymmetrical(boardstate){
        if (boardstate[0] === boardstate[2] &&
            boardstate[3] === boardstate[5] &&
            boardstate[6] === boardstate[8] ) return true
        else return false; 
    }

    function isVerticallySymmetrical(boardstate){
        if (boardstate[0] === boardstate[6] &&
            boardstate[1] === boardstate[7] &&
            boardstate[2] === boardstate[8] ) return true
        else return false; 
    }

    function isForwardDiagonallySymmetrical(boardstate){
        if (boardstate[0] === boardstate[8] &&
            boardstate[1] === boardstate[5] &&
            boardstate[3] === boardstate[7] ) return true
        else return false; 
    }

    function isBackwardDiagonallySymmetrical(boardstate){
        if (boardstate[1] === boardstate[3] &&
            boardstate[2] === boardstate[6] &&
            boardstate[5] === boardstate[7] ) return true
        else return false; 
    }


    /// this is just for inspection
    function getAllSymmetricals(database){
        let symmetricalsDB = []; 
        for (let i = 0; i < database.length; i++){
            if (isSymmetrical(database[i].state)){
                symmetricalsDB.push(database[i])
            }
        }
        return symmetricalsDB; 
    }

    function isSymmetrical(boardstate){
        if (
            isHorizontallySymmetrical(boardstate) ||
            isVerticallySymmetrical(boardstate) ||
            isForwardDiagonallySymmetrical(boardstate) ||
            isBackwardDiagonallySymmetrical(boardstate)
        ) return true
        else return false; 
    }


// const data = getAllSymmetricals(db); 
// const filePath = './symmetricals.js'
// console.log("checking symmetricals...")
// fs.writeFile(filePath, JSON.stringify(data), (err) => {
//     if (err) {
//       console.error('An error occurred:', err);
//     } else {
//       console.log('Data has been written to the file successfully!');
//     }
//   });