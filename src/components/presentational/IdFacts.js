import React from 'react';
import TypingText from "./TypingText.js";

export function IdFacts( props ) {
    const trainingMode = props.trainingMode; 
    
    return (
        trainingMode? 
            <div className = 'IdFacts'> 
                    <h2 className = 'retro-text'> {props.name} </h2> 
                    <div className='id-pic-container'>
                        <img src = {props.src} className = 'id-pic'/>
                    </div>
                    <h2 className = 'retro-text'> Style: {props.playStyle} </h2> 
            </div>
        
        
        : 
            <div className = 'IdFacts'> 
                <h2 className = 'retro-text'> {props.name} </h2>
                <div className='id-pic-container'> 
                    <img src = {props.src} className = 'id-pic'/>
                </div> 
                <TypingText text= { props.blurb } />
            </div>
        
    ) 

}