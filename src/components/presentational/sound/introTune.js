import React, { useState, useEffect, useRef } from 'react';

export default function IntroTune( props ) {
  const [playSound, setPlaySound] = useState(false);
  const [soundSource, setSoundSource] = useState();

  const audioRef = useRef(null); 
  

  let soundInProgress = false; 

useEffect(()=>{
    console.log("start of SoundFX, soundEffect is ", soundEffect)
}, [])


//whenever the sound source changes, play it. 
useEffect(() => {
    console.log(`playing soundSource ${soundSource} because it changed`)
    playAudio(); 
}, [soundSource])




useEffect(() => {
  console.log(`thinking of playing bravado sound...`)
  if (!trainingMode) playBravadoSound()
}, [computerOff])

  function playBravadoSound(){
    console.log(`bravadoCounter is `, bravadoCounter)
    if (bravadoCounter === 0) {
          console.log(`play bravado sound!`)
          const sound = pickSound("bravadoSound");
          if (!sound) return; // if character has no bravadoSound
          const randomCount = 3+Math.floor(Math.random()*5) 
          setBravadoCounter(randomCount); 
          setSoundEffect(sound); 
      }
    else setBravadoCounter(prevValue => prevValue -1)

    // const ran = Math.random(); 
    // if (ran < 0.1) {
    //     const sound = pickSound("bravadoSound")
    //     if (!sound) return 
    //     console.log("sound is : ", sound)
    //     setSoundEffect(sound)
    // }
  }


useEffect(() => {
    const sound = soundMap[soundEffect];
    if (sound) {
      setSoundSource(sound);
    } else {
      setSoundSource(undefined);
    }
  }, [soundEffect]);



  function playAudio(){
    console.log("playaudio triggered")
    // if (soundInProgress) return; 
    // soundInProgress = true; 
    if (audioRef.current) {
        console.log(`audioref has a current, namely ${audioRef.current}`)
        audioRef.current.load(); 

        audioRef.current.play().then(() => {
                    //when the sfx ends, reset to none so that useEffect becomes responsive to it again.  
                    audioRef.current.addEventListener('ended', () => {
                        // soundInProgress = false; 
                        setSoundEffect("");
                    });
                    }).catch((error) => {
                        console.error("Playback failed because: ", error);
    });
  }
}


  return (
    <div> 
        <audio ref={audioRef} >
            <source src={soundSource} type="audio/mpeg" />
        </audio>
    </div>
  );
}


