import React from 'react';
// import { Button } from 'primereact/button';
// import { Button } from 'button.esm.js'


export function ChooseSide( props ){

    const promptText = props.promptText; 
    const handleXClick = props.handleXClick; 
    const handleOClick = props.handleOClick; 
    const humansLetter = props.humansLetter; 
    const buttonActivation = props.buttonActivation; 
    const handleTrainingModeClick = props.handleTrainingModeClick; 
    const foe = props.foe; 
    const trainingWord = foe === 'evolvo'? 'Evolve': 'Train'

    return (
    <div className="gameshell"> 
      <p>{ promptText }</p>
      <button 
        disabled = { !buttonActivation } 
        onClick = { handleXClick }
        className={`player-button`}>
        <p className = 'retro-text' style = {{ fontSize: '16px'}}>X</p>
      </button>
      <button 
        disabled = { !buttonActivation }
        onClick = { handleOClick }
        className={`player-button`}>
        <p className = 'retro-text' style = {{ fontSize: '16px'}}>O</p>
      </button>
      {(foe === 'menace' || foe === 'Neuro' || foe === 'evolvo') && 
        <button 
          disabled = { !buttonActivation } 
          onClick = { handleTrainingModeClick }
          className={`player-button`}>
          <p className = 'retro-text' style = {{ fontSize: '14px'}}>{trainingWord}</p>
        </button>
      }
      </div>
    )
}