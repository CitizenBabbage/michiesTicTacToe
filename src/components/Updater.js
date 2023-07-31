import React from 'react';
import { useState, useEffect} from 'react';
import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import { normalizeResponses, structureTest, areEquivalent , equivalenceScore, transformation} from '../auxiliary/usefulFunctions.js';



export default function Updater(props){
    const database = props.database; 
    const setDatabase = props.setDatabase; 
    const [upDatingText, setUpDatingText] = useState("")
    const winner = props.winner; 
    const gameLog = props.gameLog; 
    const player = props.player; 

    
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
        if (player === "O") oddOrEven = 2; //if the player is O, computer was X, and took the even turns
        let data = database.slice();  // make a copy for manipulation purposes
        console.log("UpDater/learnFromGame: data structure is: ", structureTest(data)); 
        let newData = updateEachBoardPlayed(oddOrEven, gameLog, gameResult, data)
        setDatabase(newData); 
        setUpDatingText("")
    }


    function updateEachBoardPlayed(oddOrEven, log, gameResult, data){
        let newData = data; 
        for (let i = 0; i < gameLog.length -1; i++){  //for each state in the game log
            let move = getPositionThatChanged(log[i], log[i+1]); 
            let update; 
            if (i % oddOrEven === 0) {update = gameResult} // if number of turn was odd (or even, depending), it was yours
            else update = gameResult * (-1); 
            newData = findAndUpdateEquivalent(data, update, move, gameLog[i])
            console.log("1. UpDater/updateEachBoardPlayed: newData structure is: ", structureTest(data)); 
            }
        console.log("2. UpDater/updateEachBoardPlayed: data structure is: ", structureTest(data)); 
        return newData; 
    }


    function findAndUpdateEquivalent(data, update, move, boardState){
        for (let j = 0; j < data.length; j++){    // look through the db for equivalent board state
            if (areEquivalent(boardState, data[j].state)){ // when you find it
                console.log(`equivalent board state response array is: id: ${data[j].id}, ${data[j].response}`);
                let equivScore = equivalenceScore(boardState, data[j].state) // get the equivalence score 
                move = transformation(move, equivScore)// modify move by that quantity
                data[j].response[move]+=update // modify 
                data[j].response = normalizeResponses(data[j].response); 
                console.log(`Modified ${JSON.stringify(data[j].response)} at position ${move} by ${update}`)

                }
        }
        return data; 
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

    


      return (
        <div>
            <p>{ upDatingText }</p> 
        </div>
      )

}