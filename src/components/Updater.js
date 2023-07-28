import React from 'react';
import { useState, useEffect} from 'react';
import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import { areEquivalent } from '../auxiliary/usefulFunctions.js';



export default function Updater(props){
    const database = props.database; 
    const setDatabase = props.setDatabase; 
    const [upDatingText, setUpDatingText] = useState("")
    const winner = props.winner; 
    const gameLog = props.gameLog; 

    
    //console.log("dataBase is : ", database); 


    // set odven to even if player was X, odd otherwise
    // when winner changes value, 
    //  for every element in gameLog, 
    //      find the equivalent state in the database
    //      update the response array in the position that changed by 
    //          the gameResult (1, -1 or 0 for win, draw, loss) if this is an odven element
    //          -1 times the game result otherwise
    //      normalize the response array


    useEffect(()=> {console.log("Updater is responsive to changes in gameLog!")},[gameLog])

    // CHANGE THE FOLLOWING SO THAT IT ROTATES/FLIPS MOVE IN THE SAME WAY THAT THE NTH BOARD WAS 
    // FLIPPED/ROTATED TO MATCH THE ARCHETYPE.   

    useEffect(() => {
        console.log("Machine-learning useEffect triggered...")
        if (gameLog === undefined){
            console.log("but gameLog undefined.")
            return
        } ; 
        console.log("Machine-learning useEffect continues...")
        learnFromGame()
    },[winner])


function learnFromGame(){
    setUpDatingText("Learning...")
    let gameResult = gameresult(winner); 
    let oddOrEven; 
    if (props.player === "O") oddOrEven = 2; //if the player is O, computer was X, and took the even turns
    let data = database.slice();  // make a copy for manipulation purposes
    updateEachBoardPlayed(oddOrEven, gameLog, gameResult, data)
    setDatabase(data); 
    setUpDatingText("")
}


function updateEachBoardPlayed(oddOrEven, log, gameResult, data){
    for (let i = 0; i < gameLog.length -1; i++){  //for each state in the game log
        let move = getPositionThatChanged(log[i], log[i+1]); 
        let update; 
        if (i % oddOrEven === 0) {update = gameResult} // if number of turn was odven, it was yours
        else update = gameResult * (-1); 
        findAndUpdateEquivalent(data, update, move, gameLog[i])
}
}


function findAndUpdateEquivalent(data, update, move, boardState){
    for (let j = 0; j < data.length; j++){    // look through the db for equivalent board state
        if (areEquivalent(boardState, data[j].state)){ // when you find it
            // get the equivalence score 
            // modify move by that quantity
            // 
            data[j].response[boardState[move]]+=update // modify 
            console.log(`Modified ${JSON.stringify(data[j])} at position ${move} by ${update}`)
            }
    }
}


function getPositionThatChanged(array1, array2){
    for (let i = 0; i < array1.length; i++){
        if (array1 !== array2) {return i}
    }
}

// function learn(winner){
//     let gameRes = gameResult(winner); 
//     useEffect(()=>{
//         let newDB = updateDB(gameLog, gameRes); // returns new DB, with modifications for learning
//         setDatabase(newDB);
//         console.log("via BoardContainer/learn, database is now:", database)
//     },[])    
//     }

 //takes in winner as a symbol 'O' or 'X', determines whether computer won, and returns either 1 or -1 
 function gameresult(winner){
    if (winner !== 'X' && winner !== 'O') return; //ignore draws and incomplete games
    if (props.player === winner) return -1 // computer lost
    else return 1; // else computer won 
  }

function normalizeResponses(array){
    let sum = array.reduce((accumulator, current) => accumulator + current, 0)
    return sum / array.length
}

      return (
        <div>
            <p>{ upDatingText }</p> 
        </div>
      )

}