export function numerizeBoard(board){
    //console.log("numerizeBoard: board length upon receipt is ", board.length)
    let numberBoard = []; 
    let j = 0; 
    for (let i = 0; i < board.length; i++){
        if (board[i] === 'X' || board[i] === 1 || board[i] === 1){
            numberBoard[j] = 1
            numberBoard[j+1] = 0
            numberBoard[j+2] = 0
            j+=3; 
        }
        else if (board[i] === 'O' || board[i] === -1 || board[i] === 2){
            numberBoard[j] = 0
            numberBoard[j+1] = 1
            numberBoard[j+2] = 0
            j+=3; 
        }
        else {
            numberBoard[j] = 0
            numberBoard[j+1] = 0
            numberBoard[j+2] = 1
            j+=3; 
        } 
    }
    return numberBoard; 
}

export function cutIntoOneHots(array, cutsize){
    let allOneHotEncodings = []; 
    let justOneHotEncoding = []; 
    for (let i = 0; i < array.length; i++){
        if ((i+1)%cutsize === 0){
            justOneHotEncoding.push(array[i]) 
            allOneHotEncodings.push(justOneHotEncoding); // push the current OHE to the array 
        }
        else if(i%cutsize === 0) {
            justOneHotEncoding = [] // reset to empty
            justOneHotEncoding.push(array[i]) // start the new OHE with current
        }
        else justOneHotEncoding.push(array[i]) 
    }
    return allOneHotEncodings; 
}