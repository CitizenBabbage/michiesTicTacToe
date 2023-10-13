import React from 'react';
import {useState, useEffect} from 'react';
import { isNumber } from '../../auxiliary/general/usefulFunctions.js';
import { Tooltip } from '../presentational/ToolTip.js';
import cursorImage from '../../images/cursor.png';
import pointerImage from '../../images/pointer.png';
import { generateGoodBoardStates } from '../../auxiliary/boardStateDatabase/makeBeadAuxilliaries.js';
import { labelPrepper } from './neuroTFmodel/labelPrepper.js';
import { ohEncodeBoards } from './neuroTFmodel/datafeeder.js';

export function GetTrainingSet( props ) {
    
    const setTrainingSet = props.setTrainingSet; 
    const trainingSet = props.trainingSet; 
    const setValidationSet = props.setValidationSet; 
    const setValidationLabels = props.setValidationLabels; 
    const busy = props.busy; 

    // this is here (rather than in parent) to ensure other components in parent load 
    // before this initiates, since it tends to slow things down. 
    useEffect(() => {
        console.log("getTrainingSet: change in busy recognised...")
        const pauseForRenders = setTimeout(() => {//brief timeout stops this from hogging the thread while other components are rendering
            if (busy && !trainingSet) {
                console.log("getTrainingSet: Creating trainingSet...")
                let x = makeTrainingSet(); 
                setTrainingSet(x[0]);
                setValidationSet(x[1]);
                setValidationLabels(x[2]); 
                console.log("getTrainingSet: trainingSet created!")
            }; 
        }, 300); 
        return () => {
            clearTimeout(pauseForRenders);
          };
    },[busy])

    // this just selects a percentage (percentTraining, or fraction) of all the board states to use as a training set. 
    function makeTrainingSet(percentTraining = 20){
        console.log("get training set called")
        // if (!neuroLearning) return; 
        const fraction = percentTraining/100; 
        const goodStates = generateGoodBoardStates(9);
        let newTrainingSet = [goodStates[0]]; 
        let validationSet = [], validationLabels = [];  
        for (let i = 1; i < goodStates.length; i++){
            const rando = Math.random(); 
            if (rando < fraction) {
              newTrainingSet.push(goodStates[i]); 
            }
            else if (rando < 2 * fraction){
                validationSet.push(goodStates[i])
            }
        }
        validationLabels = labelPrepper(validationSet); 
        validationSet = ohEncodeBoards(validationSet); 
        console.log("validationSet.length is ", validationSet.length)
        return [newTrainingSet,validationSet,validationLabels]; 
        }
      

    return (
        <div>
        </div>
    )
}