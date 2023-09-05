import React from 'react';
import {useState} from 'react';
import { isNumber } from '../../auxiliary/general/usefulFunctions';

export function SetSigmaField( props ) {
    const trainingMode = props.trainingMode; 
    const setSigma = props.setSigma; 
    const sigma = props.sigma; 
    const setValue = props.setValue; 
    const [submissionError, setSubmissionError] = useState(""); 
    

    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        const input = Number(event.target.elements[0].value)

        if (isNumber(input)){
          setSigma(input); 
        }
        else setSubmissionError("Please enter a number")
      }
      

    if (trainingMode) return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                Stop Learning When Error Is Below:
                <input type="number"  onChange={handleChange} defaultValue={sigma}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p>{submissionError} </p>
        </div>
    )
}