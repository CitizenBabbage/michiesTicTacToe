// This is intended to create 81 simple (but mostly badly advised?) 
// heuristics that effectively say "on move n, play square m". I want these as 
// distinct rules so that the genetic program can use each one as individual data.
// The intention is that these be "heuristic noise" that the evolution must mostly
// clear away. But maybe it will stumble on some interesting patterns. 

export function create81dopeyheuristics(){
    let num = 24; 
    let heuristicList = []; 
    for (let i = 0; i < 9; i++){
        for (let j = 1; j < 10; j++){
            let thisHeuristic = `// Rule ${num} Play position ${i} on turn ${j}\n
            export function play${i}on${j}(array){\n
            \t    let filledSquares = array.reduce((acc,item) => item? acc + 1: acc, 0)\n
            \t    if (filledSquares === ${j-1} && !array[${i}]) return ${i}; \n
            \t    else return null; \n
            }\n\n\n`
            heuristicList.push(thisHeuristic)
            num++; 
        }
    }
    return heuristicList.join(`\n`); 
}