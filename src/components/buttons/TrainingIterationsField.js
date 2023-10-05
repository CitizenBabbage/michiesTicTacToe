import React from 'react';
import {useState} from 'react';
import { isAnInteger } from '../../auxiliary/general/usefulFunctions.js';

export function TrainingIterationsField( props ) {
    const trainingMode = props.trainingMode; 
    const setTrainingIterations = props.setTrainingIterations; 
    const setPlayersTurn = props.setPlayersTurn; 
    const value = props.value; 
    const setValue = props.setValue; 
    const [submissionError, setSubmissionError] = useState(""); 
    const setSoundEffect = props.setSoundEffect; 
    const setSquares = props.setSquares; 

    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        if (isAnInteger(event.target.elements[0].value) && event.target.elements[0].value > 0){
        //   console.log("submit button pressed")
          setTrainingIterations(event.target.elements[0].value); 
        //   console.log("trainingIterationsField: training iterations set to ", event.target.elements[0].value)
          setSoundEffect("menaceLearn")
        //   console.log("trainingiterationsfield: boardContainer: setting squares in handleSubmit")

          setSquares(Array(9).fill(null)); // this starts the GameCycle by triggering the useEffect at top of GameCycle
        }
        else setSubmissionError("I need a positive whole number")
      }


    
      
      

    if (trainingMode) return (
        <div>
            <form onSubmit={handleSubmit}>
                <input className = "retro-text" type="number" value={value} placeholder = "No. of Games" onChange={handleChange} />
                {/* <input type="submit" value="Submit" /> */}
            </form>
            <p>{submissionError} </p>
        </div>
    )
}