import React from 'react';
import { useEffect} from 'react';
//import {db} from '../auxiliary/databaseFormatted.js' //assert { type: "json" };
import { isOdd,  reverseTransformation, dataBaseDuplicator, normalizeResponses, areEquivalent , equivalenceScore, isNumber} from '../auxiliary/usefulFunctions.js';
import { checkDbase, checkIsANumber } from '../auxiliary/errorCheckers.js';



export default function Updater(props){

    const database = props.database; 
    const setDatabase = props.setDatabase; 
    const winner = props.winner; 
    const gameLog = props.gameLog; 
    const trainingIterations = props.trainingIterations;
    const setTrainingIterations = props.setTrainingIterations;
    const setWinner = props.setWinner;  
    const setGameLog = props.setGameLog; 
    const setSquares = props.setSquares; 
    const setOpponent = props.setOpponent; 
    

      

    useEffect(() => {
        if (gameLog === undefined){
            return
        } ; 
        learnFromGame()
        if (trainingIterations > 0){startNewTrainingIteration()}
    },[winner])


    function startNewTrainingIteration(){
        //console.log("RESTARTING with training iterations remaining: ", trainingIterations-1)
        setTrainingIterations(trainingIterations - 1)
        setSquares(Array(9).fill(null)); 
        setWinner(undefined); 
        setGameLog([]); 
        setOpponent("X"); /// 
    }


    function learnFromGame(){
        let gameResult = gameresult(winner); // 1 for a win for X, 0 for a draw, -1 for a loss
        if (!isNumber(gameResult)) return; 
        checkIsANumber(gameResult, "learnFromGame", "gameResult")
        let newData = updateEachBoardPlayed(gameLog, gameResult, database)
        checkDbase(newData, "learnFromGame--newData")
        setDatabase(newData); 
    }


    function updateEachBoardPlayed(log, gameResult, data){
        let newData = dataBaseDuplicator(data); 
        checkDbase(newData, "updateEachBoardPlayed A")
        gameResult = gameResult/10; 
        checkIsANumber(gameResult, "updateEachBoardPlayed", "gameResult")
        for (let i = 0; i < gameLog.length -1; i++){                //for each state in the game log
            let move = getPositionThatChanged(log[i], log[i+1]);    //find the position that changed 
            let update; 
            if (isOdd(i)) {                                         // if it was an odd round, that was O's turn. 
                update = gameResult * (-1)                          // results for 0 are inverted
            } 
            else update = gameResult; 
            checkIsANumber(update, "updateEachBoardPlayed", "update")
            // *see explanation of the following formula below. 
            update = update * (1 - (gameLog.length/10)); 
            newData = findAndUpdateEquivalent(newData, update, move, gameLog[i]); 
            }
        checkDbase(newData, "updateEachBoardPlayed Z")
        return newData; 
    }

            // *The longer the game, the worse for the winner and better for the loser
            // thus the longer the game, the more the reward should approximate a tie. 
            // 1 - gameLog.length/10 is large for short games and small for long games 
            // when multiplied by update it becomes positive for wins and negative for losses

    

    function findAndUpdateEquivalent(data, update, move, boardState){
        checkDbase(data, "findAndUpdateEquivalent A")
        let newData = dataBaseDuplicator(data); 
        checkDbase(data, "findAndUpdateEquivalent B")
        for (let j = 0; j < newData.length; j++){                                                   // look through the db for equivalent board state
            if (areEquivalent(boardState, newData[j].state)){                                       // when you find it
                console.log("1.here")
                let equivScore = equivalenceScore(boardState, newData[j].state)                     // get the equivalence score 
                console.log("2", equivScore)
                let newMove = reverseTransformation(move, equivScore)                               // modify move by that quantity
                console.log("3", newMove)
                console.log("3.1", newData[j].response[newMove])
                console.log("3.2", update)
                newData[j].response[newMove] = Math.max(0, newData[j].response[newMove] + update);  // modify 
                console.log("4", newData[j].response)
                newData[j].response = normalizeResponses(newData[j].response); 
                console.log("5", newData[j].response)
                }
        }
        checkDbase(data, "findAndUpdateEquivalent Z")
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
            {props.devMode? `First probability distribution is ${JSON.stringify(database[0].response)}`:""}
        </div>
      )

}