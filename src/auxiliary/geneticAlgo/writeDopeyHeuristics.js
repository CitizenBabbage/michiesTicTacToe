import fs from 'fs'; 
import { create81dopeyheuristics } from './createHeuristics.js';


const data = create81dopeyheuristics(); 
const filePath = './dopeyHeuristics.txt'
fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error('An error occurred:', err);
    } else {
      console.log('Data has been written to the file successfully!');
    }
  });