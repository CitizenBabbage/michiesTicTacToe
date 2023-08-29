import { checkBoard } from "../testers/errorCheckers";

export function checkWinner(squares) {
  checkBoard(squares, "checkWinner"); 
  return new Promise((resolve, reject) => {
      const result = calculateWinner(squares);
      if ((typeof result === 'string' && result.length === 1)|| result === null) {
        resolve(result);
    } else {
        reject(`Result is ${result} which is not a single character string`);
    }
  });
}

//returns 'X', 'O' or 'D'
export function calculateWinner(squares) { 
    checkBoard(squares, "calculateWinner");
    if (!squares) {
      console.log(`Warning: squares has value ${squares} when calculateWinner called!`)
      return null;
    }
    //part I: check for a winning line 
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    // part II: check if the board is full
    if (squares.every(square => square === 'X' || square === 'O')) {
      return 'D';
    } 
    return null;
  }

  //console.log(calculateWinner(["X","O","X","O","X",null,"O","X","O"]))