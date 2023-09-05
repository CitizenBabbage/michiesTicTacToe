import React from 'react';
import {useState} from 'react';
import { isNumber } from '../../auxiliary/general/usefulFunctions';

export function MaxCycleField( props ) {
    const trainingMode = props.trainingMode; 
    const setMaxCycle = props.setMaxCycle; 
    const maxCycle = props.maxCycle; 
    const setValue = props.setValue; 
    const [submissionError, setSubmissionError] = useState(""); 
    

    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        const input = Number(event.target.elements[0].value)
        if (isNumber(input)){
          setMaxCycle(input); 
        }
        else setSubmissionError("Please enter a number")
      }
      

    if (trainingMode) return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                Max Cycle:
                <input type="number" onChange={handleChange} defaultValue={maxCycle} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p>{submissionError} </p>
        </div>
    )
}