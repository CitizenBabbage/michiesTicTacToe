import React, { useState, useEffect, useRef } from 'react';
import selectionMusic from '../../../music/neon-gaming-by-dopestuff-at-pixabayDOTcomSLASHmusicSLASHsearchSLASH8bitSLASH.mp3'


export default function SelectionMusic( props ) {
    const audioRef = useRef(null);
    const audioSelected = props.audioSelected;
    const musicStarted = props.musicStarted;  

    useEffect(() => {
        playAudio(); 
    },[musicStarted])

    function playAudio(){
      //if (audioSelected && audioRef.current) {
        if (audioRef.current) {

          audioRef.current.play();
      }
      else console.log("audioselected is false or audioRef not current")
    }



  return (
    <div> 
        <audio ref={audioRef} >
            <source src={selectionMusic} type="audio/mpeg" />
        </audio>
    </div>
  );
}


