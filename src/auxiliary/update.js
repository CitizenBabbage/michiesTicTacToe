// import {db} from './databaseFormatted.js' //assert { type: "json" };
// import { areEquivalent } from './usefulFunctions.js';
// import { useState, useEffect } from 'react'

 

// //takes a database and returns an updated db to be used by setDatabase (in BoardContainer)
// export function updateDB(database, gameLog, gameResult){
//     const database = props.database
//     const setDatabase = props.setDatabase
//     console.log("dataBase is : ", dataBase);

//     useEffect(() => {
//         setDatabase(db.slice()); 
//         console.log("database received with length ", data.length)
//         console.log("first element of database is : " , data[0])
//         for (let i = 0; i < gameLog.length; i++){  //for each state in the game log
//             for (let j = 0; j < db.length; j++){    // look through the db
//                 if (areEquivalent(gameLog[i][0], data[j].state)){ // when you find it
//                     data[j].response[gameLog[i][1]]+=gameResult // modify 
//                     }
//             }
//         let returnValue = normalizeResponses(tempDB); 
//     }
// },[database])
//     return returnValue; 
// }

// function normalizeResponses(array){
//     let sum = array.reduce((accumulator, current) => accumulator + current, 0)
//     return sum / array.length
// }