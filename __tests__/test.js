//import {checkRotationalID} from '../auxiliary/usefulFunctions'
const { getBoardObject } = require('../auxiliary/chooseMove');

// describe("Filter function", () => {
//     test("it should filter by a search term (link)", () => {
//         expect(checkRotationalID([0,0,0,0,1,0,0,1,0],[0,0,0,1,1,0,0,0,0],1)).toEqual(true);
//         expect(checkRotationalID([1,1,1,0,0,0,0,0,0],[0,0,1,0,0,1,0,0,1],1)).toEqual(true);
//         expect(checkRotationalID([1,0,0,1,1,0,1,0,0],[1,1,1,0,1,0,0,0,0],1)).toEqual(true);
//         expect(checkRotationalID([1,1,1,1,1,0,1,0,0],[1,1,1,0,1,0,0,0,0],1)).toEqual(false);
//         expect(checkRotationalID([1,0,0,1,1,0,1,0,0],[1,1,1,0,1,1,0,0,0],1)).toEqual(false);
//         expect(checkRotationalID([0,0,0,1,1,0,1,0,0],[1,1,1,0,1,0,0,0,0],1)).toEqual(false);
//         expect(checkRotationalID(['O','O','O','X','X','O','X','O','O'],['X','X','X','O','X','O','O','O','O'],1)).toEqual(false);
//         expect(checkRotationalID(['X','O','O','X','X','O','X','O','O'],['X','X','X','O','X','O','O','O','O'],1)).toEqual(true);

//       });
//   });

  describe("get board object test", () => {
    test("it should filter by a search term (link)", () => {
        expect(getBoardObject(['O','X',null,'O',null,'X',null,'O','X']).toEqual({
            "id":491,
            "state":[
               null,
               "X",
               "X",
               "X",
               null,
               "O",
               "O",
               "O",
               null
            ],
            "turn":"X",
            "response":[
               0.3333333333333333,
               0,
               0,
               0,
               0.3333333333333333,
               0,
               0,
               0,
               0.3333333333333333
            ],
            "transform":[
               0,
               3
            ]
         }
         )
        )

      }
      );
  }
  );
