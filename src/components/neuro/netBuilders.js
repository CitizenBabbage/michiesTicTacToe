export function makeNetwork(size){ // size should be a 4 array [size of input, size of hidden, size of output, depth (i.e. number of hidden +2) ]
    let connectionArray = []; 
    let biasesArray = []; 
    const firstConnections = makeConnections(size[0],size[1]); 
    const firstBiases = makeBiases(size[1])
    const lastConnections = makeConnections(size[1],size[2]); 
    const lastBiases = makeBiases(size[2])
    for (let i = 0; i < size[3]-2; i++){
      connectionArray.push(makeConnections(size[1],size[1]));
      biasesArray.push(makeBiases(size[1]));
    }
    return [firstConnections, ...connectionArray, lastConnections, firstBiases, ...biasesArray, lastBiases]; 
  }

export function makeConnections(afferentLayerSize, efferentLayerSize){
    let matrix = []; 
    for (let i = 0; i < afferentLayerSize; i++){
        let row = []; 
        for (let j = 0; j < efferentLayerSize; j++){
            let x = Math.round(Math.random() * 100) / 1000
            row.push(x)
        }
        matrix.push(row)
    }
    console.log("number of columns is ", matrix.length)
    console.log("number of rows is ", matrix[0].length)

    return matrix; 
}

export function makeBiases(size){
    let biases = []; 
    for (let j = 0; j < size; j++){
        let x = Math.round(Math.random() * 100) / 100
        biases.push(x)
    }
    return biases; 
}