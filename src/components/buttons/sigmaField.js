import React from 'react';
import {useState} from 'react';
import { isAnInteger } from '../../auxiliary/general/usefulFunctions';

export function SetSigmaField( props ) {
    const trainingMode = props.trainingMode; 
    const setSigma = props.setSigma; 
    const value = props.value; 
    const setValue = props.setValue; 
    const [submissionError, setSubmissionError] = useState(""); 
    

    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        if (isAnInteger(event.target.elements[0].value)){
          setSigma(event.target.elements[0].value); 
        }
        else setSubmissionError("Please enter an integer")
      }
      

    if (trainingMode) return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                Stop Learning When Error Is Below:
                <input type="number" value={value} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p>{submissionError} </p>
        </div>
    )
}