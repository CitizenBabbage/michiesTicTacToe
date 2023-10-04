import React, { useState, useEffect, useRef } from 'react';
import introTune from '../../../music/tektoktao.mp3'


export default function IntroTune( props ) {
    const audioRef = useRef(null);
    const audioSelected = props.audioSelected; 

    useEffect(() => {
        playAudio(); 
    },[])

    function playAudio(){
      if (audioSelected && audioRef.current) {
          audioRef.current.play();
      }
      else console.log("audioselected is false or audioRef not current")
    }



  return (
    <div> 
        <audio ref={audioRef} >
            <source src={introTune} type="audio/mpeg" />
        </audio>
    </div>
  );
}


