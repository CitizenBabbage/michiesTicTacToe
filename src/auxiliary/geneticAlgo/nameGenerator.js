// it's more fun to watch the evolution with the ability to track certain critters, 
// to see how they fare as the evolution progresses. This generates random names for the 
// critters for that purpose. 

// The algo basically just glues a beginning, a vowel sound, a middle sound and an ending together
// Most of the fuss below is controlling the complexity, so that complex sounds are possible
// but they only rarely aggregate together into a series. 

import { badwords } from "../badwords/badwords.js"


const simpleOpeners = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "V", "W"]
const complexOpeners = ["Bl", "Br", "Cl", "Cr", "Dr", "Fl", "Fr", "Gl", "Gr", "Qu", "Sk", "Sh", "Sl", "Sm", "Sn", "Sp", "Sw"]
const veryComplexOpeners = ["Ll", "Shl", "Shr", "Spl", "Thr"]

const veryRareDipthongs = ["ao", "eo", "eu", "ia", "io", "iu", "ue", "ui", "uo"]
const rareDipthongs = ["aa", "ae", "oe", "ua", "\u00FC"]; 
const weakDipthongs = ["y", "o", "oa", "oi", "oo", "ou", "u", "y", "o", "oa", "oi", "oo", "ou", "u", "y", "o", "oa", "oi", "oo", "ou", "u", "ai", "au", "ee", "ei", "i", "o", "oa", "oi", "oo", "ou", "u" ]; 
const flatVowels = ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u"]

const neverEndings = ["dg", "fl", "fr", "gl", "gr", "thr"]

const simpleFlatMiddles = ["bb", "ck", "dd", "gg", "mm", "th"] 
const complexFlatMiddles = ["dg", "ch", "gh", "mp", "rt", "tch", "th"] 

const complexLongMiddles = [ "fr", "gl", "gr", "mp", "rt", "th", "thr"]
const simpleLongMiddles = ["b", "d", "f", "g", "k", "l", "m", "n", "p", "s", "t", "b", "d", "f", "g", "k", "l", "m", "n", "p", "s", "t", "b", "d", "f", "g", "k", "l", "m", "n", "p", "s", "t", "v"]

const endingPhemes = ["abog", "aboggle", "addle", "agger", "agog", "agoggle", "amble", "ample", "ankh", "arat", "atch", "er", "eth", "ew", "ick", "ickle", "icker", "ig", "ight", "ilk", "itch", "offle", "og", "oggle", "onger", "ongle", "omble", "omp", "ooze", "or", "orm", "ough", "ourgh", "uck", "uddle", "ulch", "umble", "umph", "urk", "ur", "urgh"]

const badWholes = ["ho","ass","cipa"]; 

export default function randomName(){
    let name = "kkk"; 
    while (isABadWord(name)){
        name = baseName(); // keep generating til you get a clean one
    }
    return name; 
}

function baseName() {
    let complexity = 0; 
    const openingData = fixOpening(complexity); 
    const opening = openingData[0]; complexity = openingData[1]; 
    const vowelData = fixFirstVowel(complexity); 
    const vowel = vowelData[0]; complexity = vowelData[1]; const duration = vowelData[2]; 
    const middleData = fixMiddle(complexity, duration); 
    const middle = middleData[0]; complexity = middleData[1]; 
    const ending = fixEnding(complexity, middle); 
    const rand1 = Math.random();
    let name; 
    if (opening !== "" && ending !== "" && rand1 < 0.5)
        {name = capitalizeFirstLetter(opening + ending)}
    else name = capitalizeFirstLetter(opening + vowel + middle + ending)
    
    return name; 
}

function isABadWord(string){
    if (badWholes.includes(string)) return true; 
    const pattern = /^ass/;
    if (pattern.test(string)) return true; 
    for (let i = 0; i < badwords.length; i++){
        if (string.includes(badwords[i])) return true; 
    }
    return false; 
}

// console.log("first element of badwords is ", badwords[0])
// console.log("is kkk a bad word?", isABadWord("kkk"))


function fixOpening(complexity){
    const rand1 = Math.random(); 
    let opening = ""; 
    if (probabilityTest(rand1, 0.8 + complexity)){
        opening = veryComplexOpeners[Math.floor(Math.random()*veryComplexOpeners.length)]
        complexity += 0.2; 
    }
    else if (probabilityTest(rand1, 0.5 + complexity)){
        opening = complexOpeners[Math.floor(Math.random()*complexOpeners.length)]
        complexity += 0.1; 
    }
    else if (probabilityTest(rand1, 0.1 - complexity)) {
        opening = simpleOpeners[Math.floor(Math.random()*simpleOpeners.length)]
    }
    else { // starts with a vowel
        complexity += 0.1; 
    }
    // console.log("opening is :", opening)
    return [opening, complexity]
}

function fixFirstVowel(complexity){
    const rand1 = Math.random();
    let vowel = ""; 
    let duration = 'long'
    if (probabilityTest(rand1, 0.95 + complexity)){
        vowel = veryRareDipthongs[Math.floor(Math.random()*veryRareDipthongs.length)]
        complexity += 0.2; 
    }
    else if (probabilityTest(rand1, 0.9 + complexity)){
        vowel = rareDipthongs[Math.floor(Math.random()*rareDipthongs.length)]
        complexity += 0.1; 
    }
    else if (probabilityTest(rand1, 0.85 + complexity)) {
        vowel = weakDipthongs[Math.floor(Math.random()*weakDipthongs.length)]
    }
    else { // starts with a vowel
        vowel = flatVowels[Math.floor(Math.random()*flatVowels.length)]; 
        duration = 'flat'
    }
    // console.log("vowel is :", vowel)
    return [vowel, complexity, duration]
}

function fixMiddle(complexity, duration){
    const rand1 = Math.random();
    let middle = ""; 
    if (duration === 'flat'){
        if (probabilityTest(rand1, 0.7 + complexity)) {
            middle = complexFlatMiddles[Math.floor(Math.random()*complexFlatMiddles.length)]
            complexity+=0.1; 
        }
        else {
            middle = simpleFlatMiddles[Math.floor(Math.random()*simpleFlatMiddles.length)]
        }
    }
    else {
        if (probabilityTest(rand1, 0.7 + complexity)) {
            middle = complexLongMiddles[Math.floor(Math.random()*complexLongMiddles.length)]
            complexity+=0.1; 
        }
        else {
            middle = simpleLongMiddles[Math.floor(Math.random()*simpleLongMiddles.length)]
        }
    } 
    // console.log("middle is ", middle)
    return [middle, complexity]
}

function fixEnding(complexity, middle){
    const rand1 = Math.random();
    let ending = ""; 
    if (neverEndings.includes(middle) || probabilityTest(rand1, 0.5 + complexity)) {
        ending = endingPhemes[Math.floor(Math.random()*endingPhemes.length)]
    }
    // console.log("ending is ", ending)
    return ending; 
}

function capitalizeFirstLetter(str) {
    if (!str || typeof str !== 'string') return ''; // Return an empty string if input is not a string or is falsy
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// I want the probability of a name to diminish radically with complexity, without ever fully disappearing 
function sigmoid(x) {
    const k = 12, a = 0.5, b = 0.5; 
    return 1 / (1 + Math.exp(-k * (a * (x - b))));
  }

function probabilityTest(rand1, threshold){
    // if (rand1 > threshold) return true; 
    // else return false;
    if (sigmoid(rand1) > threshold) return true; 
    else return false;  
}

function testForDuplicates(sampleSize){
    let nameSet = []; 
    for (let i = 0; i < sampleSize; i++){
        nameSet.push(randomName())
    }
    const originalNameSet = [...nameSet]; 
    let counter = 0; 
    let duplicates = []; 
    while (nameSet.length > 0){
        let candidate = nameSet[0]; 
        nameSet = nameSet.slice(1); 
        for (let i = 0; i < nameSet.length; i++){
            if (candidate === nameSet[i]){
                duplicates.push(candidate)
                //counter++
                break; 
            }
        }
    }
    // console.log("duplicates length is ", duplicates.length)
    return [duplicates, originalNameSet]; 
}

