

export function isHorizontallySymmetrical(boardstate){
    if (boardstate[0] === boardstate[2] &&
        boardstate[3] === boardstate[5] &&
        boardstate[6] === boardstate[8] ) return true
    else return false; 
}

export function isVerticallySymmetrical(boardstate){
    if (boardstate[0] === boardstate[6] &&
        boardstate[1] === boardstate[7] &&
        boardstate[2] === boardstate[8] ) return true
    else return false; 
}

export function isForwardDiagonallySymmetrical(boardstate){
    if (boardstate[0] === boardstate[8] &&
        boardstate[1] === boardstate[5] &&
        boardstate[3] === boardstate[7] ) return true
    else return false; 
}

export function isBackwardDiagonallySymmetrical(boardstate){
    if (boardstate[1] === boardstate[3] &&
        boardstate[2] === boardstate[6] &&
        boardstate[5] === boardstate[7] ) return true
    else return false; 
}

export function isSymmetrical(boardstate){
    if (
        isHorizontallySymmetrical(boardstate) ||
        isVerticallySymmetrical(boardstate) ||
        isForwardDiagonallySymmetrical(boardstate) ||
        isBackwardDiagonallySymmetrical(boardstate)
    ) return true
    else return false; 
}

export function returnSymmetries(boardstate){
    let symmetryList = [];
    if (isHorizontallySymmetrical(boardstate)) symmetryList.push('h'); 
    if (isVerticallySymmetrical(boardstate)) symmetryList.push('v'); 
    if (isForwardDiagonallySymmetrical(boardstate)) symmetryList.push('d'); 
    if (isBackwardDiagonallySymmetrical(boardstate)) symmetryList.push('b')
    return symmetryList; 
}

export function returnHorizontalOpposite(square){
    switch (square) {
        case 0 : return 2; 
        case 2 : return 0; 
        case 3: return 5; 
        case 5: return 3; 
        case 6: return 8; 
        case 8: return 6; 
        default: return null; 
    }
}

export function returnVerticalOpposite(square){
    switch (square) {
        case 0 : return 6; 
        case 6 : return 0; 
        case 1: return 7; 
        case 7: return 1; 
        case 2: return 8; 
        case 8: return 2; 
        default: return null; 
    }
}

export function returnForwardDiagonalOpposite(square){
    switch (square) {
        case 0 : return 8; 
        case 8 : return 0; 
        case 1: return 5; 
        case 5: return 1; 
        case 3: return 7; 
        case 7: return 3; 
        default: return null; 
    }
}

export function returnBackwardDiagonalOpposite(square){
    switch (square) {
        case 1 : return 3; 
        case 3 : return 1; 
        case 2: return 6; 
        case 6: return 2; 
        case 5: return 7; 
        case 7: return 5; 
        default: return null; 
    }
}