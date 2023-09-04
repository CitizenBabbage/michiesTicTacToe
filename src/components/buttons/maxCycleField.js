import React from 'react';
import {useState} from 'react';
import { isAnInteger } from '../../auxiliary/general/usefulFunctions';

export function MaxCycleField( props ) {
    const trainingMode = props.trainingMode; 
    const setMaxCycle = props.setMaxCycle; 
    const value = props.value; 
    const setValue = props.setValue; 
    const [submissionError, setSubmissionError] = useState(""); 
    

    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        if (isAnInteger(event.target.elements[0].value)){
          setMaxCycle(event.target.elements[0].value); 
        }
        else setSubmissionError("Please enter an integer")
      }
      

    if (trainingMode) return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                Max Cycle:
                <input type="number" value={value} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p>{submissionError} </p>
        </div>
    )
}