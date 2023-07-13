//////////////GLOBALS//////////////
export const corner = [0,2,8,6]        //corner squares in cw rotational order
export const reverseCorner = [6,8,2,0]
export const edge = [1,5,7,3]          //non-corner edge squares in cw rotational order
export const reverseEdge = [3,7,5,1]
export const lines = [                 //winning lines
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];