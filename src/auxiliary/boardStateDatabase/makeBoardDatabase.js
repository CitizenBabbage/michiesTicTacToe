import fs from 'fs'; 
import { createAllBoardStateObjects } from "./makeBoardAuxiliaries.js";
import { checkDbase } from '../testers/errorCheckers.js';



const data = createAllBoardStateObjects(9); 
const filePath = './dataBase.json'
console.log("checking dbase...")
checkDbase(data)
fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error('An error occurred:', err);
    } else {
      console.log('Data has been written to the file successfully!');
    }
  });

