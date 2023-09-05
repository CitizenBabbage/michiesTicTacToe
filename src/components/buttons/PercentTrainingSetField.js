import React from 'react';
import {useState} from 'react';
import { isNumber } from '../../auxiliary/general/usefulFunctions';

export function PercentTrainingSetField( props ) {
    const trainingMode = props.trainingMode; 
    const setPercentTraining = props.setPercentTraining; 
    let value = 20;  
    const setValue = props.setValue; 
    const [submissionError, setSubmissionError] = useState(""); 
    

    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        const input = Number(event.target.elements[0].value)

        if (isNumber(input)){
          setPercentTraining(input); 
        }
        else setSubmissionError("Please enter an integer")
      }
      

    if (trainingMode) return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                Percent Training:
                <input type="number" onChange={handleChange} defaultValue={value}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p>{submissionError} </p>
        </div>
    )
}