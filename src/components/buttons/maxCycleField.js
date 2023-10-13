import React from 'react';
import {useState, useEffect} from 'react';
import { isNumber } from '../../auxiliary/general/usefulFunctions.js';
import { Tooltip } from '../presentational/ToolTip.js';
import cursorImage from '../../images/cursor.png';
import pointerImage from '../../images/pointer.png';
import { generateGoodBoardStates } from '../../auxiliary/boardStateDatabase/makeBeadAuxilliaries.js';

export function MaxCycleField( props ) {
    const trainingMode = props.trainingMode; 
    const [submissionError, setSubmissionError] = useState(""); 
    const [inputValue, setInputValue] = useState(); 
    const setEpochsRemaining = props.setEpochsRemaining; 
    const epochsRemaining = props.epochsRemaining; 
    const trainingSet = props.trainingSet; 
    const [shouldDisable, setShouldDisable] = useState(true); 



    useEffect(() => {
        if (inputValue) setInputValue(epochsRemaining); 
    },[epochsRemaining])

    // useEffect(() => {
    //     console.log("Change in training set...")
    //     if (!trainingSet) {
    //         console.log("Disabling epoch field.")
    //         setShouldDisable(true)} 
    //     else {
    //         console.log("Enabling epoch field.")
    //         setShouldDisable(false)
    //     }
    // }, [trainingSet])

    // const buttonStyle = {
    //     color: shouldDisable ? 'grey' : 'white',
    //     backgroundColor: shouldDisable ? 'grey' : 'white',
    //     cursor: shouldDisable ? `url('${cursorImage}'),auto` : `url('${pointerImage}'),pointer`
    // };

    

    function handleChange(event) {
        console.log("the type of value I get from input is : ", (typeof event.target.value))
        setInputValue(event.target.value, 10);
        // const numericalValue = parseInt(event.target.value, 10)
        // if (isNumber(numericalValue)) setEpochsRemaining(numericalValue); 
    };

    function handleSubmit (event) {
        event.preventDefault();
        const numericalValue = parseInt(inputValue, 10)
        if (isNumber(numericalValue) && numericalValue > 0 && numericalValue < 51){
            console.log(`${numericalValue} is a number!`)
            setEpochsRemaining(numericalValue); 
        }
        else {
            console.log(`${numericalValue} is NOT a number!`)
            setSubmissionError("Please enter a number between 1 and 50")
        }
      }

      

    if (trainingMode) return (
        <div>
            <form className = 'text-field' onSubmit={handleSubmit}>
                <Tooltip tipText = {'Enter number of learning cycles'}>
                    {/* <input className = "retro-fill" type="number" value={inputValue} onChange={handleChange} style = {buttonStyle} placeholder = {shouldDisable ? 'Preparing...' : 'Epochs'}/> */}
                    <input className = "retro-fill" type="number" value={inputValue} onChange={handleChange} placeholder = {'Epochs'}/>
                </Tooltip>
                {/* <input type="submit" value="Submit" /> */}

            </form>
            <p>{submissionError} </p>
        </div>
    )
}