import React from 'react';
import { useState, useEffect} from 'react';
import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import { isOdd,  reverseTransformation, transformationReader, dataBaseDuplicator, areIdentical, normalizeResponses, structureTest, areEquivalent , equivalenceScore, transformation} from '../auxiliary/usefulFunctions.js';



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
        let gameResult = gameresult(winner); // 1 for a win, 0 for a draw, -1 for a loss
        let oddOrEven; 
        if (player === "O") oddOrEven = 2; //if the player is O, computer was X, and took the even turns
        let data = database.slice();  // make a copy for manipulation purposes
        console.log("UpDater/learnFromGame: data structure is: ", structureTest(data)); 
        let newData = updateEachBoardPlayed(gameLog, gameResult, data)
        setDatabase(newData); 
        setUpDatingText("")
    }


    function updateEachBoardPlayed(log, gameResult, data){
        let newData = dataBaseDuplicator(data); 
        gameResult = gameResult/10; 
        for (let i = 0; i < gameLog.length -1; i++){  //for each state in the game log
            let move = getPositionThatChanged(log[i], log[i+1]); 
            console.log("ROUND NUMBER ", i+1)
            console.log("board before move is: ", log[i]); 
            console.log("board after move is: ", log[i+1]); 
            console.log("position that changed is: ", move); 
            let update; 
            if (isOdd(i) &&  player === 'X') { // if computer is 0 and it was an odd round, that was computer's turn. 
                update = gameResult 
            } 
            else if (!isOdd(i) &&  player === 'O'){ // if computer is X and it's an even round, that was computer's turn.
                update = gameResult
            }
            else update = gameResult * (-1); // what's good for your opponent is bad for you, and vice versa
            console.log("update is: ", update)
            if (isOdd(i)){
                if (update < 0) {console.log(`O lost, right?`)}
                else {console.log(`O won, right?`)}
            }
            else {
                if (update < 0) {console.log(`X lost, right?`)}
                else {console.log(`X won, right?`)}
            }
                
            update -= update * gameLog.length/10; 
            newData = findAndUpdateEquivalent(newData, update, move, gameLog[i]); 
            console.log("1. UpDater/updateEachBoardPlayed: newData structure is correct? ", structureTest(newData)); 
            

            }
        console.log("2. UpDater/updateEachBoardPlayed: data structure is: ", structureTest(data)); 
        return newData; 
    }



    function findAndUpdateEquivalent(data, update, move, boardState){
        let newData = dataBaseDuplicator(data); 
        for (let j = 0; j < newData.length; j++){    // look through the db for equivalent board state
            if (areEquivalent(boardState, newData[j].state)){ // when you find it
                console.log(`equivalent board is: id: ${newData[j].id}, ${JSON.stringify(newData[j].state)}`);
                let equivScore = equivalenceScore(boardState, newData[j].state) // get the equivalence score 
                console.log("equivalence score is ", equivScore)
                let newMove = reverseTransformation(move, equivScore)// modify move by that quantity
                console.log(`${transformationReader("move", equivScore)} from ${move} to ${newMove}`)
                //console.log(`move changed from ${move} to ${newMove} under transformation ${equivScore}`)
                newData[j].response[newMove] = Math.max(0.001, newData[j].response[newMove] + update); // modify 
                newData[j].response = normalizeResponses(newData[j].response); 
                console.log(`ID: ${data[j].id} modified, ${JSON.stringify(data[j].response)} at position ${newMove} by ${update} to create ${newData[j].response}`)

                }
        }
        return newData; 
    }

    


    function getPositionThatChanged(array1, array2){
        for (let i = 0; i < array1.length; i++){
            if (array1[i] !== array2[i]) {return i}
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