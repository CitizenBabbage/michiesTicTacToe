import fs from 'fs'; 
import { createAllBeadStateObjects } from './makeBeadAuxilliaries.js';
import { checkBeadbase } from '../testers/errorCheckers.js';



const data = createAllBeadStateObjects(9); 
const filePath = './dataBeads.json'
console.log("checking dbeads...")
checkBeadbase(data)
fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error('An error occurred:', err);
    } else {
      console.log('Data has been written to the file successfully!');
    }
  });
