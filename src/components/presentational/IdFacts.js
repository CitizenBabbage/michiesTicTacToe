import React from 'react';
import TypingText from "./TypingText.js";

export function IdFacts( props ) {



    return (
        <div className = 'IdFacts'> 
            <h2 className = 'retro-text'> {props.name} </h2> 
            <img src = {props.src} className = 'on-page-portrait'/>
            <TypingText text= { props.blurb } />
        </div>
    ) 

}