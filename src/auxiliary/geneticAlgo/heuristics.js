import { corner, edge, lines } from "../general/globals.js";
import { opposite } from "../general/usefulFunctions.js";

export function substantiallyEqual(a, b) {
    if (!a || !b) {
        return false;
    }
    return a === b;
}

function combineRules(rule1, rule2, array, symbol){
    let x = rule1(array, symbol); 
    let y = rule2(array, symbol); 
    if (substantiallyEqual(x,y)){return x}
    else return null; 
}

export function listThreats(array){
    let threats = []; 
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < lines.length; j++){
            if (!array[i]){
                if (lines[j][0] === i && substantiallyEqual(array[lines[j][1]], array[lines[j][2]])) threats.push([i,array[lines[j][1]]])
                if (lines[j][1] === i && substantiallyEqual(array[lines[j][0]], array[lines[j][2]])) threats.push([i,array[lines[j][0]]])
                if (lines[j][2] === i && substantiallyEqual(array[lines[j][0]], array[lines[j][1]])) threats.push([i,array[lines[j][0]]])
            }
        }
    }
    return threats; 
}



function myWins(array, mySymbol){
    let threats = listThreats(array);
    //console.log(`Threats for array ${array} are : `, threats)
    return threats.filter(threatPair => threatPair[1] === mySymbol)
}

function potentialForks(array, symbol){
    let possibleForks = []; 
    for (let i = 0; i < array.length; i++){
        if (!array[i]){
            let hypotheticalArray = [...array]
            hypotheticalArray[i] = symbol; 
            //console.log("hypothetical array for fork is: ", hypotheticalArray)
            let opportunities = myWins(hypotheticalArray, symbol);
            //console.log(`opportunities for hypothetical array ${hypotheticalArray} is ${opportunities}`)
            if (opportunities.length >=2) possibleForks.push(i); 
        }
    }
    return possibleForks; 
}


export function returnEmptySpaces(array) {
    let result = [];
    //console.log("array.length is ", array.length)
    for (let i = 0; i < array.length; i++) {
        //console.log("checking square ", i)
        if (!array[i]) {
            result.push(i);
        }
    }
    
    return result;
}

// function getAllWaysOfBlockingAllForks(array, mySymbol){
//     let opportunities = []; 
//     let emptySpaces = returnEmptySpaces(array); 
//     for (let i = 0; i < emptySpaces.length; i++){
//         let hypotheticalBoard = [...array]; 
//         hypotheticalBoard[emptySpaces[i]] = mySymbol; 
//         let forks = potentialForks(hypotheticalBoard, opposite(mySymbol)); 
//         if (forks.length === 0){opportunities.push(i)}
//     }
//     return opportunities; 
// }

//commented out because it is essentially the same as above
// returns a list of moves that do not result in the opponent being able to fork
function getForkSafeMoves(array, mySymbol){
    let opportunities = []; 
    for (let i = 0; i < 9; i++){
        if (!array[i]) {
            let hypotheticalBoard = [...array]; 
            hypotheticalBoard[i] = mySymbol; 
            let forks = potentialForks(hypotheticalBoard, opposite(mySymbol)); 
            if (forks.length === 0) opportunities.push(i)
        }
    }
    return opportunities; 
    }



///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

//rule NSS0: win: If the player has two in a row, they can place a third to get three in a row.
export function win(array, mySymbol){
    let opportunities = myWins(array, mySymbol); 
    //console.log("myWins are ", opportunities)
    if (opportunities.length > 0){
        let randomChoice = Math.floor(Math.random()*opportunities.length)
        return opportunities[randomChoice][0]
    }
    else return null; 
}

//console.log(win('X',null,'X','X','O','O','O',null,'X'))

//rule NSS1: Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
// As win but with opponentsSymbol as second argument


//Rule NSS2: Fork: Cause a scenario where the player has two ways to win (two non-blocked lines of 2).
export function fork(array, mySymbol){
    let forks = potentialForks(array, mySymbol); 
    if (forks.length > 0){
        let randomChoice = Math.floor(Math.random()*forks.length)
        if (forks.length > 0) return forks[randomChoice]; 
    }
    return null; 
}

// Rule NSS3: Blocking an opponent's fork. If there is only one possible fork for the opponent, the player should block it.
 
export function blockSingleForkingOpportunity(array, opponentsSymbol){
    let forks = potentialForks(array, opponentsSymbol); 
    if (forks.length === 1){return forks[0]};
    return null; 
    } 


// Rule NSS4: Otherwise, the player should block all forks in any way that simultaneously allows them to make two in a row.
export function blockAllForksWhileThreatening(array, mySymbol){
    let opportunities = []; 
    const opportunities1 = getForkSafeMoves(array, mySymbol)
    const opportunities2 = getAllPossibleTwoInALine(array, mySymbol);
    for (let i = 0; i < opportunities1.length; i++){
        if (opportunities2.includes(opportunities1[i])) opportunities.push(opportunities1[i])
    }
    if (opportunities.length > 0){
        let randomChoice = Math.floor(Math.random()*opportunities.length)
        return opportunities[randomChoice]
    }
    else return null; 
}








// Rule NSS5: Otherwise, the player should make a two in a row to force the opponent into defending, as long as it does not result in them producing a fork. 

export function threatenWithoutInvitingAFork(array, mySymbol){
    let opportunities = []; 
    const threatOpportunities = getAllPossibleTwoInALine(array, mySymbol); 
    for (let i = 0; i < threatOpportunities.length; i++){
        let hypotheticalBoard = [...array]; 

        hypotheticalBoard[threatOpportunities[i]] = mySymbol;
 
        const forcedMove = win(hypotheticalBoard, mySymbol)
        hypotheticalBoard[forcedMove] = opposite(mySymbol); 
        const foesOpportunities = myWins(hypotheticalBoard, opposite(mySymbol))

        if (foesOpportunities.length < 2) {
            opportunities.push(threatOpportunities[i])
        }
        }
    const randomChoice = Math.floor(Math.random()*opportunities.length)
    if (opportunities.length > 0) return opportunities[randomChoice]; 
    else return null; 
}

//console.log(threatenWithoutInvitingAFork([null,null,'X',null,'O',null,'X',null,null],'O'))



// Rule NSS6: if first move, play corner. 
export function cornerOnFirst(array){
    if (array.every(element => element === null || element === undefined)) {
        return corner[Math.floor(Math.random()*4)]
    }
    else return null; 
}







//Rule NSS7: Center: A player marks the center. 
export function center(array){
    //console.log("Checking for center square!")
    if (!array[4]) return 4
    //console.log("Center square unavailable!")
    return null; 
}


//Rule NSS8: Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
export function oppositeCorner(array, mySymbol){
    if (!array[0] && array[8] === opposite(mySymbol)) return 0; 
    else if (!array[2] && array[6] === opposite(mySymbol)) return 2;
    else if (!array[6] && array[2] === opposite(mySymbol)) return 6;
    else if (!array[8] && array[0] === opposite(mySymbol)) return 8;
    else return null; 
}


//Rule NSS9: Empty corner: The player plays in a corner square.
export function emptyCorner(array){
    for (let i of corner) {
        if (!array[i]) return i;
    }
    return null; 
}


//Rule NSS10: Empty side: The player plays in a middle square on any of the four sides.
export function emptySide(array){
    for (let i of edge) {
        if (!array[i]) return i;
    }
    return null; 
}

// NonNSS Rules
// the rules above this point form part of a useful algo, specifically if they are ordered as above they 
// comprise Newell, Simon and Shaw's heuristic algo circa 1972. The rules below may or may not comprise an interesting 
// algo if ranked correctly, but they are generally expected to be heuristic noise included to make the evolution 
// non trivial. 


// Rule 11: if first move, play centre. 
export function centreOnFirst(array){
    if (array.every(element => element === null || element === undefined)) {
        return 4
    }
    else return null; 
}



// Rule 12: next corner clockwise as opponent: If the opponent is in the corner, the player plays the next corner clockwise.
export function nextCornerAsOpponentClockwise(array, mySymbol){
    if (!array[0] && array[6] === opposite(mySymbol)) return 0; 
    else if (!array[2] && array[0] === opposite(mySymbol)) return 2;
    else if (!array[6] && array[8] === opposite(mySymbol)) return 6;
    else if (!array[8] && array[2] === opposite(mySymbol)) return 8;
    else return null; 
}



// Rule 13: Next corner anticlockwise as opponent: If the opponent is in the corner, the player plays the next corner anticlockwise.
export function nextCornerAsOpponentAntiClockwise(array, mySymbol){
    if (!array[0] && array[2] === opposite(mySymbol)) return 0; 
    else if (!array[2] && array[8] === opposite(mySymbol)) return 2;
    else if (!array[6] && array[0] === opposite(mySymbol)) return 6;
    else if (!array[8] && array[6] === opposite(mySymbol)) return 8;
    else return null; 
}

// Rule 14: next corner clockwise as self: If self is in the corner, the player plays the next corner clockwise.
export function nextCornerAsSelfClockwise(array, mySymbol){
    if (!array[0] && array[6] === mySymbol) return 0; 
    else if (!array[2] && array[0] === mySymbol) return 2;
    else if (!array[6] && array[8] === mySymbol) return 6;
    else if (!array[8] && array[2] === mySymbol) return 8;
    else return null; 
}

// Rule 15: Next corner anticlockwise as self: If self is in the corner, the player plays the next corner anticlockwise.
export function nextCornerAsSelfAntiClockwise(array, mySymbol){
    if (!array[0] && array[2] === mySymbol) return 0; 
    else if (!array[2] && array[8] === mySymbol) return 2;
    else if (!array[6] && array[0] === mySymbol) return 6;
    else if (!array[8] && array[6] === mySymbol) return 8;
    else return null; 
}


// Rule 16: next edge clockwise as opponent: If the opponent is on the edge, the player plays the next edge clockwise.
export function nextEdgeAsOpponentClockwise(array, mySymbol){
    if (!array[1] && array[3] === opposite(mySymbol)) return 1; 
    else if (!array[3] && array[7] === opposite(mySymbol)) return 3;
    else if (!array[5] && array[1] === opposite(mySymbol)) return 5;
    else if (!array[7] && array[5] === opposite(mySymbol)) return 7;
    else return null; 
}



// Rule 17: Next edge anticlockwise as opponent: If the opponent is on the edge, the player plays the next edge anticlockwise.
export function nextEdgeAsOpponentAntiClockwise(array, mySymbol){
    if (!array[1] && array[5] === opposite(mySymbol)) return 1; 
    else if (!array[3] && array[1] === opposite(mySymbol)) return 3;
    else if (!array[5] && array[7] === opposite(mySymbol)) return 5;
    else if (!array[7] && array[3] === opposite(mySymbol)) return 7;
    else return null; 
}

// Rule 18: next edge clockwise as self: If self is on the edge, the player plays the next edge clockwise.
export function nextEdgeAsSelfClockwise(array, mySymbol){
    if (!array[1] && array[3] === mySymbol) return 1; 
    else if (!array[3] && array[7] === mySymbol) return 3;
    else if (!array[5] && array[1] === mySymbol) return 5;
    else if (!array[7] && array[5] === mySymbol) return 7;
    else return null; 
}

// Rule 19: Next edge anticlockwise as self: If self is on the edge, the player plays the next edge anticlockwise.
export function nextEdgeAsSelfAntiClockwise(array, mySymbol){
    if (!array[1] && array[5] === mySymbol) return 1; 
    else if (!array[3] && array[1] === mySymbol) return 3;
    else if (!array[5] && array[7] === mySymbol) return 5;
    else if (!array[7] && array[3] === mySymbol) return 7;
    else return null; 
}

// Rule 20: Opposite edge as opponent: If opponent is on the edge, the player plays the opposite edge.
export function oppositeEdgeAsOpponent(array, mySymbol){
    if (!array[1] && array[7] === opposite(mySymbol)) return 1; 
    else if (!array[3] && array[5] === opposite(mySymbol)) return 3;
    else if (!array[5] && array[3] === opposite(mySymbol)) return 5;
    else if (!array[7] && array[1] === opposite(mySymbol)) return 7;
    else return null; 
}

// Rule 21: Opposite edge as self: If self is on the edge, the player plays the opposite edge.
export function oppositeEdgeAsSelf(array, mySymbol){
    if (!array[1] && array[7] === mySymbol) return 1; 
    else if (!array[3] && array[5] === mySymbol) return 3;
    else if (!array[5] && array[3] === mySymbol) return 5;
    else if (!array[7] && array[1] === mySymbol) return 7;
    else return null; 
}

// Rule 22: Play center on second move. 
export function playCenterOnSecond(array){
    let filledSquares = array.reduce((acc,item) => item? acc + 1: acc, 0)
    if (filledSquares === 1 && !array[4]) return 4; 
    else return null; 
}


// Rule 23: Play randomly! 
export function playRandom(array){
    const emptySpaces = returnEmptySpaces(array); 
    const randomIndex = Math.floor(Math.random()*emptySpaces.length)
    return emptySpaces[randomIndex] 
}

// Rule 24
export function makeTwoInALine(array, mySymbol){
    const opportunities = getAllPossibleTwoInALine(array, mySymbol); 
    const randomChoice = Math.floor(Math.random()*opportunities.length); 
    if (opportunities.length > 0) return (opportunities[randomChoice])
    else return null; 
}

// Rule 25: block all forks NEEDS TESTING
export function avoidInvitingAFork(array, mySymbol){
    let opportunities = getForkSafeMoves(array, mySymbol)
    if (opportunities.length > 0){
        let randomChoice = Math.floor(Math.random()*opportunities.length)
        return opportunities[randomChoice]
    };
    return null; 
}

//console.log(avoidInvitingAFork(['O',null,'O',null,'X',null,'X','O','X'],'X'))




////////////////////////////////////////////////

function getAllPossibleTwoInALine(array, mySymbol){
    let opportunities = []
    for (let i = 0; i < 9; i++){
        if (array[i] === mySymbol){
            // console.log(`position ${i} in array ${array} is equal to ${mySymbol}`)
            for (let j = 0; j < lines.length; j++){
                // console.log(`lines[${j}][0] is`, lines[j][0])
                // console.log(`lines[${j}][1] is`, lines[j][0])
                // console.log(`lines[${j}][2] is`, lines[j][0])
                if (lines[j][0]===i && !array[lines[j][1]] && !array[lines[j][2]]) {opportunities.push(lines[j][1]), opportunities.push(lines[j][2])}
                if (lines[j][1]===i && !array[lines[j][0]] && !array[lines[j][2]]) {opportunities.push(lines[j][0]),opportunities.push(lines[j][2])}
                if (lines[j][2]===i && !array[lines[j][0]] && !array[lines[j][1]]) {opportunities.push(lines[j][0]), opportunities.push(lines[j][1])}
                }
        }
    }
    return opportunities; 
}

