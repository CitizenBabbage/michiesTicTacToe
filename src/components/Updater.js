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
    const trainingIterations = props.trainingIterations;
    const setTrainingIterations = props.setTrainingIterations;
    const setWinner = props.setWinner;  
    const setGameLog = props.setGameLog; 
    const setSquares = props.setSquares; 
    const setOpponent = props.setOpponent; 

      

    useEffect(() => {
        console.log("Machine-learning useEffect triggered...")
        if (gameLog === undefined){
            console.log("but gameLog undefined.")
            return
        } ; 
        // console.log("Machine-learning useEffect continues...")
        learnFromGame()
        // console.log("Machine-learning useEffect continues...")

        if (trainingIterations > 0){startNewTrainingIteration()}
        // console.log("Machine-learning useEffect complete.")
    },[winner])


    function startNewTrainingIteration(){
        console.log("RESTARTING with training iterations remaining: ", trainingIterations-1)
        setTrainingIterations(trainingIterations - 1)
        setSquares(Array(9).fill(null)); 
        setWinner(undefined); 
        setGameLog([]); 
        setOpponent("X"); /// 
    }


    function learnFromGame(){
        setUpDatingText("Learning...")
        let gameResult = gameresult(winner); // 1 for a win for X, 0 for a draw, -1 for a loss
        //let data = database.slice();  // make a copy for manipulation purposes
        // console.log("UpDater/learnFromGame: data structure is: ", structureTest(data)); 
        let newData = updateEachBoardPlayed(gameLog, gameResult, database)
        setDatabase(newData); 
        setUpDatingText("")
    }


    function updateEachBoardPlayed(log, gameResult, data){
        let newData = dataBaseDuplicator(data); 
        gameResult = gameResult/10; 
        for (let i = 0; i < gameLog.length -1; i++){  //for each state in the game log
            let move = getPositionThatChanged(log[i], log[i+1]); 
            // some console logs, click to unhide
            // console.log("ROUND NUMBER ", i+1)
            // console.log("board before move is: ", log[i]); 
            // console.log("board after move is: ", log[i+1]); 
            // console.log("position that changed is: ", move); 
            let update; 
            if (isOdd(i)) { // if it was an odd round, that was O's turn. 
                update = gameResult * (-1)
            } 
            else update = gameResult; 
            // console.log("update is: ", update)
            
            // the longer the game, the worse for the winner and better for the loser
            // thus the longer the game, the more the reward should approximate a tie. 
            // 1 - gameLog.length/10 is large for short games and small for long games 
            // when multiplied by update it becomes positive for wins and negative for losses
           
            update = update * (1 - (gameLog.length/10)); 
            newData = findAndUpdateEquivalent(newData, update, move, gameLog[i]); 
            // console.log("1. UpDater/updateEachBoardPlayed: newData structure is correct? ", structureTest(newData)); 
            

            }
        // console.log("2. UpDater/updateEachBoardPlayed: data structure is: ", structureTest(data)); 
        return newData; 
    }



    function findAndUpdateEquivalent(data, update, move, boardState){
        let newData = dataBaseDuplicator(data); 
        for (let j = 0; j < newData.length; j++){    // look through the db for equivalent board state
            if (areEquivalent(boardState, newData[j].state)){ // when you find it
                // console.log(`equivalent board is: id: ${newData[j].id}, ${JSON.stringify(newData[j].state)}`);
                let equivScore = equivalenceScore(boardState, newData[j].state) // get the equivalence score 
                // console.log("equivalence score is ", equivScore)
                let newMove = reverseTransformation(move, equivScore)// modify move by that quantity
                // console.log(`${transformationReader("move", equivScore)} from ${move} to ${newMove}`)
                //console.log(`move changed from ${move} to ${newMove} under transformation ${equivScore}`)
                newData[j].response[newMove] = Math.max(0.001, newData[j].response[newMove] + update); // modify 
                newData[j].response = normalizeResponses(newData[j].response); 
                // console.log(`ID: ${data[j].id} modified, ${JSON.stringify(data[j].response)} at position ${newMove} by ${update} to create ${newData[j].response}`)

                }
        }
        return newData; 
    }

    


    function getPositionThatChanged(array1, array2){
        for (let i = 0; i < array1.length; i++){
            if (array1[i] !== array2[i]) {return i}
        }
    }



    //takes in winner as a symbol 'O' or 'X', determines whether computer won, and returns either 1 or -1 
    function gameresult(winner){
        if (winner !== 'X' && winner !== 'O' && winner !== "D") return; //ignore incomplete games
        if (winner === "X") return 1 // 
        else if (winner === "O") return -1 //
        else return 0; // else it's a draw
    }

    


      return (
        <div>
            <p>{ upDatingText }</p> 
        </div>
      )

}