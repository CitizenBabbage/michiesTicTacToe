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

    return (
    <div className="gameshell"> 
      <p>{ promptText }</p>
      <button 
        disabled = { !buttonActivation } 
        onClick = { handleXClick }
        className={`player-button ${humansLetter === 'X' ? 'active' : ''}`}>
        <p className = 'retro-text' style = {{ fontSize: '16px'}}>X</p>
      </button>
      <button 
        disabled = { !buttonActivation }
        onClick = { handleOClick }
        className={`player-button ${humansLetter === 'O' ? 'active' : ''}`}>
        <p className = 'retro-text' style = {{ fontSize: '16px'}}>O</p>
      </button>
      {(foe === 'menace' || foe === 'Neuro') && 
        <button 
          disabled = { !buttonActivation } 
          onClick = { handleTrainingModeClick }
          className={`player-button ${humansLetter === 'X' ? 'active' : ''}`}>
          <p className = 'retro-text' style = {{ fontSize: '16px'}}>Train</p>
        </button>
      }
      </div>
    )
}