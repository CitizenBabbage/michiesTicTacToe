import React from 'react';
import {useState, useEffect} from 'react';
import { isAnInteger } from '../../auxiliary/general/usefulFunctions.js';
import { Tooltip } from '../presentational/ToolTip.js';
import SoundComponent from '../presentational/sound/SoundFX.js';

export function EnterGenerations( props ) {
    const trainingMode = props.trainingMode; 
    const setPlayersTurn = props.setPlayersTurn;  
    const [submissionError, setSubmissionError] = useState(""); 
    const setSoundEffect = props.setSoundEffect; 
    const setGenerations = props.setGenerations; 
    const generations = props.generations; 
    const [value, setValue] = useState(); 
    const tipText = "How long the evolution should run"

    useEffect(()=>{
      setSubmissionError("")
    },[value])

    useEffect(() => {
      if (generations > 0) setValue(prevValue => prevValue -1)
  }, [generations])


    function handleChange(event) {
        setValue(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        if (isAnInteger(event.target.elements[0].value) && event.target.elements[0].value > 0 && event.target.elements[0].value < 30){
          setGenerations(event.target.elements[0].value); 
        }
        else setSubmissionError("I need a positive whole number between 1 and 30")
      }


    
    return (
      <div>
        <Tooltip tipText = {tipText} setMouseEventCounter = {props.setMouseEventCounter}>

        <div className='twoRows'>
            <form className = 'text-field' onSubmit={handleSubmit}>
            <input className = "retro-fill" type="number" value={value} placeholder = "No. of Generations" onChange={handleChange} />
            </form>
            <h1 className = "retro-text">{submissionError} </h1>
        </div>
        </Tooltip> 
      </div>
      
    ) 
      

  
}