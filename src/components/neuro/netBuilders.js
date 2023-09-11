export function makeConnections(){
    let matrix = []; 
    for (let i = 0; i < 9; i++){
        let row = []; 
        for (let j = 0; j < 9; j++){
            let x = Math.round(Math.random() * 100) / 1000
            row.push(x)
        }
        matrix.push(row)
    }
    return matrix; 
}

export function makeBiases(){
    let biases = []; 
    for (let j = 0; j < 9; j++){
        let x = Math.round(Math.random() * 100) / 100
        biases.push(x)
    }
    return biases; 
}