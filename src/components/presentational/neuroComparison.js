// This handles the following functions: 
// writing the player's choice into the appropriate place in the board 
// writing the computer's choice ditto


// FIX : You can double place your token if you click fast enough. 

import React from 'react';
import { useState, useEffect } from 'react';
import Board from '../board/Board';
import { returnArrayOfTypesOf } from '../../auxiliary/testers/errorCheckers';
import { whoseMove, includes, roundOffElementsInArray } from '../../auxiliary/general/usefulFunctions';
import { generateGoodBoardStates } from '../../auxiliary/boardStateDatabase/makeBeadAuxilliaries';
import { neuroChooseMove } from '../../auxiliary/choiceFunctions/neuroChooseMove';
import { minimaxChooseMove } from '../../auxiliary/choiceFunctions/minimaxChooseMove';
import { Button } from 'primereact/button';
import { convertMinimax, computeErrorForLastLayer } from '../neuro/updaterHelpers';

export default function NeuroComparison( props ) {
  
  
    const [neuroPredictions, setNeuroPredictions] = useState([0,0,0,0,0,0,0,0,0])
    const [minimaxRecommendations, setMinimaxRecommendations] = useState([0,0,0,0,0,0,0,0,0])
    const [testBoard, setTestBoard] = useState([,,,,,,,,])
    const [toPlay, setToPlay] = useState()
    const [activationSums, setActivationSums] = useState([0,0,0,0,0,0,0,0,0])
    const [lErrors, setLErrors] = useState([0,0,0,0,0,0,0,0,0])
    const [rErrors, setRErrors] = useState([0,0,0,0,0,0,0,0,0])
    const [avLError, setAvLError] = useState(0)
    const [avRError, setAvRError] = useState(0)
 
    const trainingStates = props.trainingStates;
    const net = props.net;  
                                   
    // get a random training state, set prediction and recommendation, 
    function setPredictionAndRecommendationFromTrainingSet(){
        const rand = Math.floor(Math.random()*trainingStates.length);
        const board = trainingStates[rand]; 
        setPredictionAndRecommendation(board);
    }

    function setPredictionAndRecommendationFromTestingSet(){
        const allStates = generateGoodBoardStates(9); 
        let board; 
        while (!board) {        // select something NOT in the training set
            const rand = Math.floor(Math.random()*allStates.length);
            const selection = allStates[rand]; 
            if (!includes(trainingStates, selection)) board = selection; 
        }
        setPredictionAndRecommendation(board); 
    }

    function setPredictionAndRecommendation(board){
        const data = neuroChooseMove(board, net); 
        const prediction  = roundOffElementsInArray([...data[4]]); 
        console.log("prediction is: ", prediction)
        const whoseTurn = whoseMove(board); 
        //const recommendations = convertMinimax(minimaxChooseMove(board, whoseTurn)[2]); 
        const recommendations = [7,7,7,7,7,7,7,7,7] // for debugging, to check if error correction happens in the upper direction
        setNeuroPredictions(prediction); 
        setMinimaxRecommendations(recommendations);
        setTestBoard(board); 
        setToPlay(whoseTurn); 
        setActivationSums(data[3]); 
    }
   
    useEffect(computeError,[neuroPredictions, minimaxRecommendations, activationSums])

    function computeError(){
        const [learningErrors, rawErrors] = computeErrorForLastLayer(neuroPredictions, minimaxRecommendations, activationSums); 
        const averageLearningError = learningErrors.reduce((acc,item) => acc+item, 0)/9; 
        const averagerawError = rawErrors.reduce((acc,item) => acc+item, 0)/9; 
        setLErrors(roundOffElementsInArray(learningErrors)); 
        setRErrors(roundOffElementsInArray(rawErrors)); 
        setAvLError(averageLearningError); 
        setAvRError(averagerawError)
    }
  return (
    <div>
        <div>
            <Button className = 'retro-button' onClick = { setPredictionAndRecommendationFromTrainingSet } values = {neuroPredictions}> Training Example </Button>
            <Button className = 'retro-button' onClick = { setPredictionAndRecommendationFromTestingSet } values = {minimaxRecommendations}> Test Example</Button>
        </div>
        {toPlay? <p>{toPlay} to play</p>:<p></p>}
        <div className='gameshell'>
            <div className='threeBoards'>
                <Board squaresClassName = "neuroXOtest" values = { testBoard }></Board> 
                <Board squaresClassName = "neuroPredictions" values = { neuroPredictions }></Board> 
                <Board squaresClassName = "minimaxBoard" values = { minimaxRecommendations }></Board> 
            </div> 
            <div className='textList'>
                <p>Raw Errors = {rErrors.join(', ')}</p>
                <p>Average Raw Error = {avRError.toFixed(2)}</p>
                <p>Learning Errors = {lErrors.join(', ')}</p>
                <p>Average Learning Errors = {avLError.toFixed(2)}</p>
            </div> 
        </div>
    </div>
  )

}