const edge = [1,5,7,3] //in cw rotational order
const corner = [0,2,8,6]

function nextWheel(n,m){
    return (n+m) % 4
}

function checkRotationalIdentity(board1, board2){

}

function checkRotationalID0(board1, board2){
    for (let i = 0; i<board1.length; i++){
        if (board1[i] === board2[i]) continue
        else return false; 
    }
    return true; 
}

// function checkRotationalID1(board1, board2){
//     for (let i = 0; i<board1.length; i++){
//         if (edge.includes(i)){
//             if (edge.indexOf(i) < 3){
//                 let indexOfRotation = edge.indexOf(i) +1; 
//                 if (board1[i] === board2[edge[indexOfRotation]]) continue
//                 else {console.log("1 for", i); return false}
//             }
//             else if (board1[3] === board2[1]) continue
//             else {console.log("2 for", i); return false}
//         }
//         else if (corner.includes(i)){
//             if (corner.indexOf(i) < 3){
//                 let indexOfRotation = corner.indexOf(i) +1;
//                 if (board1[i] === board2[corner[indexOfRotation]]) continue
//                 else {console.log("3 for", i); return false}
//             }
//             else if (board1[6] === board2[0]) continue
//             else {console.log("4 for", i); return false}
//         }
//         else if (board1[4] === board2[4]) continue
//         else {console.log("5 for", i); return false}
        
//     }
//     return true; 
// }

function checkRotationalID(board1, board2, n){
    for (let i = 0; i<board1.length; i++){
        if (edge.includes(i)){
            let indexOfRotation = nextWheel(edge.indexOf(i),n); 
            if (board1[i] === board2[edge[indexOfRotation]]) continue
            else {console.log("1 for", i); return false}
            }
        else if (corner.includes(i)){
            let indexOfRotation = nextWheel(corner.indexOf(i),n);
            if (board1[i] === board2[corner[indexOfRotation]]) continue
            else {console.log("3 for", i); return false}
            }
        else if (board1[4] === board2[4]) continue
        else {console.log("5 for", i); return false}
        
    }
    return true; 
}

console.log(checkRotationalID([0,0,0,0,1,0,0,1,0],[0,0,0,1,1,0,0,0,0],1))
//console.log(checkRotationalID([1,1,1,0,0,0,0,0,0],[0,0,1,0,0,1,0,0,1],1))
//console.log(checkRotationalID([1,0,0,1,1,0,1,0,0],[1,1,1,0,1,0,0,0,0],1))