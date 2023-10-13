// This handles the following functions: 
// writing the player's choice into the appropriate place in the board 
// writing the computer's choice ditto


// FIX : You can double place your token if you click fast enough. 

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Board from '../board/Board.js';
import { returnArrayOfTypesOf } from '../../auxiliary/testers/errorCheckers.js';
import { whoseMove, includes, roundOffElementsInArray } from '../../auxiliary/general/usefulFunctions.js';
import { generateGoodBoardStates } from '../../auxiliary/boardStateDatabase/makeBeadAuxilliaries.js';
import { neuroChooseMove } from '../../auxiliary/choiceFunctions/neuroChooseMoveTF.js';
import { minimaxChooseMove } from '../../auxiliary/choiceFunctions/minimaxChooseMove.js';
import { convertMinimax } from '../neuro/minimaxHandling.js';
import { computeErrorForLastLayer } from '../neuro/errorFunctions.js';

import cursorImage from '../../images/cursor.png';
import pointerImage from '../../images/pointer.png';
import { Tooltip } from './ToolTip.js';

export default function NeuroComparison( props ) {
  
  
    const [neuroPredictions, setNeuroPredictions] = useState([0,0,0,0,0,0,0,0,0])
    const [minimaxRecommendations, setMinimaxRecommendations] = useState([0,0,0,0,0,0,0,0,0])
    const [testBoard, setTestBoard] = useState([,,,,,,,,])
    const [toPlay, setToPlay] = useState()
    // const [activationSums, setActivationSums] = useState([0,0,0,0,0,0,0,0,0])
    const [lErrors, setLErrors] = useState([0,0,0,0,0,0,0,0,0])
    const [rErrors, setRErrors] = useState([0,0,0,0,0,0,0,0,0])
    const [avLError, setAvLError] = useState(0)
    const [avRError, setAvRError] = useState(0)
    const [shouldDisable, setShouldDisable] = useState(true); 
 
    const trainingStates = props.trainingStates;
    const net = props.net; 

    const neuroMinimaxBoardText = props.neuroMinimaxBoardText; 
    const neuroPredictionsBoardText = props.neuroPredictionsBoardText; 
    const challengeBoardText = props.challengeBoardText; 

    // console.log("neuroMinimaxBoardText is ", neuroMinimaxBoardText)
    // console.log("neuroPredictionsBoardText is ", neuroPredictionsBoardText)
    // console.log("challengeBoardText is ", challengeBoardText)

    
    useEffect(() => {if (trainingStates && trainingStates.length > 0) {setShouldDisable(false)} else setShouldDisable(true)}, [trainingStates])
                                   
    // get a random training state, set prediction and recommendation, 
    function setPredictionAndRecommendationFromTrainingSet(){
        const rand = Math.floor(Math.random()*trainingStates.length);
        const board = trainingStates[rand]; 
        //console.log("setPredictionAndRecommendationFromTrainingSet: board is : ", board)
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
        //console.log("setPredictionAndRecommendation: data[1] is ", data[1])
        const prediction  = roundOffElementsInArray(data[1]); 
        const whoseTurn = whoseMove(board); 
        const recommendations = minimaxChooseMove(board, whoseTurn)[2]; 
        //const recommendations = [7,7,7,7,7,7,7,7,7] // for debugging, to check if error correction happens in the upper direction
        setNeuroPredictions(prediction); 
        setMinimaxRecommendations(recommendations);
        setTestBoard(board); 
        setToPlay(whoseTurn); 
        // setActivationSums(data[1][0][2]); 
    }

    const buttonStyle = {
        color: shouldDisable ? 'grey' : 'white',
        borderColor: shouldDisable ? 'grey' : 'white',
        cursor: shouldDisable ? `url('${cursorImage}'),auto` : `url('${pointerImage}'),pointer`
    };

      
   
    // useEffect(computeError,[neuroPredictions, minimaxRecommendations, activationSums])

    // function computeError(){
    //     const [learningErrors, rawErrors] = computeErrorForLastLayer(neuroPredictions, minimaxRecommendations, activationSums); 
    //     const averageLearningError = learningErrors.reduce((acc,item) => acc+item, 0)/9; 
    //     const averagerawError = rawErrors.reduce((acc,item) => acc+item, 0)/9; 
    //     setLErrors(roundOffElementsInArray(learningErrors)); 
    //     setRErrors(roundOffElementsInArray(rawErrors)); 
    //     setAvLError(averageLearningError); 
    //     setAvRError(averagerawError)
    // }
  return (
    <div>
        <div>
            <Tooltip tipText = "Test Neuro on a board it has seen">
                <button className = 'retro-button' disabled={shouldDisable} onClick = { setPredictionAndRecommendationFromTrainingSet } values = {neuroPredictions} style={buttonStyle}>Practiced</button>
            </Tooltip>
            <Tooltip tipText = "Test Neuro on a board it hasn't seen">
                <button className = 'retro-button' onClick = { setPredictionAndRecommendationFromTestingSet } values = {minimaxRecommendations}>Unseen</button>
            </Tooltip>
        </div>
        {toPlay? <p>{toPlay} to play</p>:<p></p>}
        <div className='gameshell'>
            <div className='threeBoards'>
                <Board squaresClassName = "neuroXOtest" values = { testBoard } tipText = {challengeBoardText} ></Board> 
                <Board squaresClassName = "neuroPredictions" values = { neuroPredictions } tipText = {neuroPredictionsBoardText} ></Board> 
                <Board squaresClassName = "minimaxBoard" values = { minimaxRecommendations } tipText = {neuroMinimaxBoardText}></Board> 
            </div> 
            <div className='textList'>
                {/* <p>Raw Errors = {rErrors.join(', ')}</p>
                <p>Average Raw Error = {avRError.toFixed(2)}</p>
                <p>Learning Errors = {lErrors.join(', ')}</p>
                <p>Average Learning Errors = {avLError.toFixed(2)}</p> */}
            </div> 
        </div>
    </div>
  )

}