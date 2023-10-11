import React from 'react';
import {useState, useEffect} from 'react';
import { isAnInteger } from '../../auxiliary/general/usefulFunctions.js';
import { Tooltip } from '../presentational/ToolTip.js';

export function EnterGenePoolSize( props ) {
    const trainingMode = props.trainingMode; 
    const setPlayersTurn = props.setPlayersTurn;  
    const [submissionError, setSubmissionError] = useState(""); 
    const setSoundEffect = props.setSoundEffect; 
    const setGenepoolSize = props.setGenepoolSize; 
    const [value, setValue] = useState(); 

    const tipText = "Changing this value will reset the evolution to zero"

    useEffect(()=>{
        setSubmissionError("")
    },[value])

    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        if (isAnInteger(event.target.elements[0].value) && event.target.elements[0].value > 4 && event.target.elements[0].value < 201){
          setGenepoolSize(event.target.elements[0].value); 
        }
        else setSubmissionError("I need a positive whole number between 5 and 200")
      }

    //   useEffect(()=>{
    //     document.getElementById('myForm').addEventListener('submit', function (e) {
    //         var input = document.getElementById('numberInput');
    //         var errorMessage = document.getElementById('error-message');
            
    //         if (input.value < 5 || input.value > 200) {
    //             // Prevent form submission
    //             e.preventDefault();
    //             // Show the error message
    //             errorMessage.style.display = 'block';
    //         } else {
    //             // Hide the error message if it's visible
    //             errorMessage.style.display = 'none';
    //         }
    //     });
    //   },[])
    
      
      

    return (
        <Tooltip tipText = {tipText} setMouseEventCounter = {props.setMouseEventCounter}>
            <div className='twoRows'>
                <form className = 'text-field' onSubmit={handleSubmit}>
                    <input className = "retro-fill" type="number" value={value} placeholder = "Size of Genepool" onChange={handleChange} />
                </form>
                <h1 className = "retro-text">{submissionError} </h1>
            </div>
        </Tooltip>
    )
}