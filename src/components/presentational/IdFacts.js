import React from 'react';
import TypingText from "./TypingText.js";

export function IdFacts( props ) {
    const trainingMode = props.trainingMode; 
    
    return (
        trainingMode? 
            <div className = 'IdFacts'> 
                <div className='center'>
                <h2 className = 'retro-text'> {props.name} </h2> 
                
                    <img src = {props.src} className = 'thumbnail'/>
                 
                <h2 className = 'retro-text'> Style: {props.playStyle} </h2> 
            </div> 
            </div>
        
        
        : 
            <div className = 'IdFacts'> 
                <h2 className = 'retro-text'> {props.name} </h2> 
                <img src = {props.src} className = 'on-page-portrait'/>
                <TypingText text= { props.blurb } />
            </div>
        
    ) 

}