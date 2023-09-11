import React from 'react';
import {useState} from 'react';
import { isNumber } from '../../auxiliary/general/usefulFunctions';

export function LearningRateField( props ) {
    const trainingMode = props.trainingMode; 
    const setLearningRate = props.setLearningRate; 
    const learningRate = props.learningRate; 
    const setValue = props.setValue; 
    const [submissionError, setSubmissionError] = useState(""); 
    

    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        const input = Number(event.target.elements[0].value)
        if (isNumber(input)){
          setLearningRate(input); 
        }
        else setSubmissionError("Please enter a number")
      }
      

    if (trainingMode) return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                Learning Rate
                <input min="0.00001" max = "0.9" step="any" type="number" onChange={handleChange} defaultValue={learningRate}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p>{submissionError} </p>
        </div>
    )
}