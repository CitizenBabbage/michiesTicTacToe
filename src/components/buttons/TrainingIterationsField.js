import React from 'react';
import {useState} from 'react';
import { isAnInteger } from '../../auxiliary/general/usefulFunctions';

export function TrainingIterationsField( props ) {
    const trainingMode = props.trainingMode; 
    const setTrainingIterations = props.setTrainingIterations; 
    const setPlayersTurn = props.setPlayersTurn; 
    const foe = props.foe; 
    const value = props.value; 
    const setValue = props.setValue; 
    const [submissionError, setSubmissionError] = useState(""); 

    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        if (isAnInteger(event.target.elements[0].value)){
          setTrainingIterations(event.target.elements[0].value); 
          setPlayersTurn(false)
        }
        else setSubmissionError("Please enter an integer")
      }
      
console.log("trainingMode in TrainingIteratonsField is " , trainingMode)

    if (trainingMode) return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                Training Iterations:
                <input type="number" value={value} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p>{submissionError} </p>
        </div>
    )
}