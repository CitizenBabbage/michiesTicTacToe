import React from 'react';
import {useState} from 'react';
import { isAnInteger } from '../../auxiliary/general/usefulFunctions.js';

export function EnterGenerations( props ) {
    const trainingMode = props.trainingMode; 
    const setPlayersTurn = props.setPlayersTurn;  
    const [submissionError, setSubmissionError] = useState(""); 
    const setSoundEffect = props.setSoundEffect; 
    const setGenerations = props.setGenerations; 
    const [value, setValue] = useState(0); 

    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        if (isAnInteger(event.target.elements[0].value) && event.target.elements[0].value > 0){
          console.log("submit generations button pressed")
          setGenerations(event.target.elements[0].value); 
          console.log("enterGenerations: number of evolutions set to ", event.target.elements[0].value)

          //setPlayersTurn(false)
          setSoundEffect("evolvoLearn")
        }
        else setSubmissionError("I need a positive whole number")
      }


    
      
      

    if (trainingMode) return (
        <div>
            <form onSubmit={handleSubmit}>
                <input className = "retro-text" type="number" value={value} placeholder = "No. of Generations" onChange={handleChange} />
                {/* <input type="submit" value="Submit" /> */}
            </form>
            <p>{submissionError} </p>
        </div>
    )
}