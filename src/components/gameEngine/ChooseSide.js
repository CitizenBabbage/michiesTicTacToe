import React from 'react';
import { Button } from 'primereact/button';


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
      <Button 
        disabled = { !buttonActivation } 
        onClick = { handleXClick }
        className={`player-button ${humansLetter === 'X' ? 'active' : ''}`}>
        <p className = 'retro-text' style = {{ fontSize: '16px'}}>X</p>
      </Button>
      <Button 
        disabled = { !buttonActivation }
        onClick = { handleOClick }
        className={`player-button ${humansLetter === 'O' ? 'active' : ''}`}>
        <p className = 'retro-text' style = {{ fontSize: '16px'}}>O</p>
      </Button>
      {foe === 'menace' && 
        <Button 
          disabled = { !buttonActivation } 
          onClick = { handleTrainingModeClick }
          className={`player-button ${humansLetter === 'X' ? 'active' : ''}`}>
          <p className = 'retro-text' style = {{ fontSize: '16px'}}>Train</p>
        </Button>
      }
      </div>
    )
}