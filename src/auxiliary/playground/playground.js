function makeDummyNetwork(){
    let matrix = []; 
    for (let i = 0; i < 9; i++){
        let row = []; 
        for (let j = 0; j < 9; j++){
            let x = Math.random()
            let coinFlip = Math.random()
            if (coinFlip < 0.5) x = -x
            row.push(x)
        }
        matrix.push(row)
    }
    return matrix; 
}

console.log(makeDummyNetwork())