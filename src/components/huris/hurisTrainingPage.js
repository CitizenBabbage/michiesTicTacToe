import React from 'react';
// import { Button } from 'primereact/button';
import { useRef, useEffect, useState } from 'react'; 
import { NavigationButton } from '../buttons/NavigationButton.js';




//import NeuroUpdater from './neuroOrdinaryJSarchive/NeuroUpdater.js';


import { IdFacts } from '../presentational/IdFacts.js';

import hurisPortrait from '../../images/chosen/huris2.gif'
import GenomeDisplay from '../presentational/genomeDisplay.js';


//import { getTrainingSet } from './debuggingData/dummyInputs'; //DELETE AFTER DEBUGGING

export function HurisTrainingPage (props) {
      
    const trainingMode = props.trainingMode; 
    const returnToGame = props.returnToGame; 

    const [portrait, setPortrait] = useState(hurisPortrait); 

    const hurisGenome = props.hurisGenome; 
    // const setHurisGenome = props.setHurisGenome; 

    console.log("hurisGenome is ", JSON.stringify(hurisGenome))
    
  
  
  
  
  
    
  

      
      
    

 
    return (
    <div className='page'> 
      <div className='twoRows'>
        <div className='twoColumns'>
            <div label = "row1column1" className='centered'> 
                <NavigationButton path = "/selectOpponent" label = 'Menu'/>
            </div>
            <div label = "row1column2" className='centered'>
                <button className = 'retro-button' onClick = {returnToGame}> Game </button> 
            </div>
        </div>
        
        <div label = "row2" className='centered'>
            <IdFacts name = {props.name} playStyle = {props.playStyle} blurb = {props.blurb} src = {portrait} trainingMode = { trainingMode }/>
        </div>
      </div>
      <div className="vertical-input-container">
            <GenomeDisplay genome = {hurisGenome} setHurisGenome = {props.setHurisGenome} foe = {props.foe}/>
      </div>
    </div>  
    )

}