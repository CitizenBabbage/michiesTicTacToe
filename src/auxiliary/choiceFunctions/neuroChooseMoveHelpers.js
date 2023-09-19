export function numerizeBoard(board){
    console.log("numerizeBoard: board length upon receipt is ", board.length)
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