import fs from 'fs'; 
import { makeEquivalenceDatabase } from './makeEquivalenceDatabase.js';



const data = makeEquivalenceDatabase(); 
const filePath = './equivalenceDatabase.js'
fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error('An error occurred:', err);
    } else {
      console.log('Data has been written to the file successfully!');
    }
  });