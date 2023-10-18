import React from 'react';
import { useState, useEffect } from 'react';
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
    const [trainingWord,setTrainingWord] = useState(foe === 'evolvo'? 'Evolve': foe === 'menace'? 'Learn': foe === 'huris'? 'Rewire' : 'Train')

    useEffect(()=> {
      setTrainingWord(foe === 'evolvo'? 'Evolve': foe === 'menace'? 'Learn': foe === 'huris'? 'Rewire' :'Train')
    },[foe])

    return (
    <div className="gameshell"> 
      <div className='center-children'>
        <p>{ promptText }</p>
      </div>
      <div className='center-children'>
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
        {(foe === 'menace' || foe === 'Neuro' || foe === 'evolvo' || foe === 'huris') && 
          <button 
            disabled = { !buttonActivation } 
            onClick = { handleTrainingModeClick }
            className={`player-button`}>
            <p className = 'retro-text' style = {{ fontSize: '14px'}}>{trainingWord}</p>
          </button>
      }
      </div> 
      
    </div>
    )
}