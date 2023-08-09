export function calculateWinner(squares) { 
    if (!squares) {
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
    // part ii: check if the board is full
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] !== 'X' && squares[i] !== 'O'){
        break // we've found an empty square so exit the loop
      }
      else {
        // if i = 8 then there are no empty squares and it's a draw. 
        if (i === 8){return 'D'} 
        else continue
      }
    }
    return null;
  }

  //console.log(calculateWinner(["X","O","X","O","X",null,"O","X","O"]))