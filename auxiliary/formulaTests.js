import {corner, edge} from './globals.js'
import {rotation, reflectNumber, nextWheel} from './usefulFunctions.js'
import {reverseTransformation} from './chooseMove.js'


// function whetherFlipPlusRotationEqualsAntiCWRotationMinusOne(){
//     let newByFlipPlusRotation, newByAntiCWRotation; 
//     for (let i = 0; i < 9; i++){ // i is square number
//         for (let j = 0; j < 5; j++) { //j is number of 90 degree rotations
//             newByFlipPlusRotation = rotation(reflectNumber(i),j)
//             if (edge.includes(i)){newByAntiCWRotation = edge[(edge.indexOf(i) - (j -1))%4]}
//             else if (corner.includes(i)){newByAntiCWRotation = corner[(corner.indexOf(i) - (j -1))%4]}
//             else newByAntiCWRotation = i; 
//             if (newByFlipPlusRotation !== newByAntiCWRotation){
//                 console.log(`fail for i = ${i}, j = ${j}.newByFlipPlusRotation = ${newByFlipPlusRotation}, newByAntiCWRotation = ${newByAntiCWRotation} `)
//                 return false
//             }
//             else console.log(`succeed for i = ${i}, j = ${j}`)
//             }
//         }
//         return true
//     }

function whetherFlippingMakesADifference(){
    let newByFlipPlusRotation, newByRotationOnly; 
    for (let i = 0; i < 9; i++){ // i is square number
        for (let j = 0; j < 5; j++) { //j is number of 90 degree rotations
            newByFlipPlusRotation = rotation(reflectNumber(i),j)
            if (edge.includes(i)){newByRotationOnly = edge[(edge.indexOf(i) + j)%4]}
            else if (corner.includes(i)){newByRotationOnly = corner[(corner.indexOf(i) + j)%4]}
            else newByRotationOnly = i; 
            if (newByFlipPlusRotation !== newByRotationOnly){
                console.log(`fail for i = ${i}, j = ${j}.newByFlipPlusRotation = ${newByFlipPlusRotation}, newByRotationOnly = ${newByRotationOnly} `)
                return false
            }
            else console.log(`succeed for i = ${i}, j = ${j}`)
            }
        }
        return true
    }
    
function whenFlippingMakesNoDifference(){
    let newByFlipPlusRotation, newByRotationOnly; 
    for (let i = 0; i < 9; i++){ // i is square number
        for (let j = 0; j < 5; j++) { //j is number of 90 degree rotations
            newByFlipPlusRotation = rotation(reflectNumber(i),j)
            if (edge.includes(i)){newByRotationOnly = edge[(edge.indexOf(i) + j)%4]}
            else if (corner.includes(i)){newByRotationOnly = corner[(corner.indexOf(i) + j)%4]}
            else newByRotationOnly = i; 
            if (newByFlipPlusRotation !== newByRotationOnly){
                console.log(`difference for i = ${i}, j = ${j}.newByFlipPlusRotation = ${newByFlipPlusRotation}, newByRotationOnly = ${newByRotationOnly} `)
            }
            else console.log(`no difference for i = ${i}, j = ${j}`)
            }
        }
        console.log(`Done!`)
    }

// gtTest is going to take each number, rotate and reflect it by every possible combination
// then test whether reverseTransformation returns the original number 

function gtTest(){
    let newNum, num;  
    for (let h = 0; h < 2; h++){ // h is whether the square is reflected
        for (let i = 0; i < 9; i++){ // i is the square number
            for (let j = 0; j < 5; j++){ // j is the amount of rotation
                if (h === 1){
                    num = reflectNumber(i);
                }
                else {num = i} 
                if (edge.includes(num)){
                    newNum = edge[nextWheel(edge.indexOf(num),j)]
                }
                else if (corner.includes(num))
                    {newNum = corner[nextWheel(corner.indexOf(num),j)]}
                else newNum = num; //center square
                let oldNum = reverseTransformation(newNum,[h,j])
                if (oldNum !== i) {
                    return false
                }
            
                }
            }
    
        }
        console.log("gtTest passed!")
        return true; 
    }

gtTest()