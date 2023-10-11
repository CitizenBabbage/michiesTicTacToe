// the name manager makes sure each critter is assigned a unique name 
// by assigning a roman numeral after duplicates, Henry II, Henry III etc. 

export class NameManager {
    constructor({
      A = [], B = [], C = [], D = [], E = [], F = [], G = [], H = [], I = [], 
      J = [], K = [], L = [], M = [], N = [], O = [], P = [], Q = [], R = [], 
      S = [], T = [], U = [], V = [], W = [], X = [], Y = [], Z = [] 
    } = {}) {
      this.A = A;
      this.B = B;
      this.C = C;
      this.D = D;
      this.E = E;
      this.F = F;
      this.G = G;
      this.H = H;
      this.I = I;
      this.J = J;
      this.K = K;
      this.L = L;
      this.M = M;
      this.N = N;
      this.O = O;
      this.P = P;
      this.Q = Q;
      this.R = R;
      this.S = S;
      this.T = T;
      this.U = U;
      this.V = V;
      this.W = W;
      this.X = X;
      this.Y = Y;
      this.Z = Z;
    }
  }


export function makeNameUnique(name,nameManager){
  // console.log("makeNameUnique called! ")
    nameManager = addNameToNameManager(name, nameManager); 
    const count = countNamesInManager(name, nameManager); 
    const romanCount = toRoman(count); 
    if (count > 1) {return [name + " " + romanCount, nameManager]}
    else return [name, nameManager]; 
}

function addNameToNameManager(name, nameManager){
    const firstLetter = name[0]; 
    // console.log(`firstLetter of name ${name} is ${name[0]}`)
    // console.log(`nameManager is : ${JSON.stringify(nameManager)}; nameManager first letter is ${nameManager[0]}`)
    let letterCategory = nameManager[firstLetter]; 
    letterCategory.push(name); 
    nameManager[firstLetter] = letterCategory; 
    return nameManager; 
}

function countNamesInManager(name, nameManager){
    const firstLetter = name[0]; 
    let letterCategory = nameManager[firstLetter]; 
    let counter = 0; 
    for (let i = 0; i < letterCategory.length; i++){
        if (letterCategory[i] === name) counter++
    }
    return counter; 
}



function toRoman(num) {
    if (isNaN(num) || num <= 0 || num > 3999) {
      return 'Invalid Input. Please enter a number between 1 and 3999';
    }
    
    const romanNumeralMap = [
      { value: 1000, symbol: 'M' },
      { value: 900, symbol: 'CM' },
      { value: 500, symbol: 'D' },
      { value: 400, symbol: 'CD' },
      { value: 100, symbol: 'C' },
      { value: 90, symbol: 'XC' },
      { value: 50, symbol: 'L' },
      { value: 40, symbol: 'XL' },
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' },
    ];
    
    let romanNumeral = '';
    
    for (const { value, symbol } of romanNumeralMap) {
      while (num >= value) {
        romanNumeral += symbol;
        num -= value;
      }
    }
    
    return romanNumeral;
  }