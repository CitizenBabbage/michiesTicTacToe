import React, { useState, useEffect, useRef } from 'react';
import debuggingSound from '../../../soundFX/menaceLoss2.mp3'
import menaceLearn from '../../../soundFX/menaceLearn2.mp3'
import menaceLose from '../../../soundFX/menaceLoss2.mp3'
import evolvoBravado from '../../../soundFX/adapting2.mp3'
import evolvoLearn from '../../../soundFX/metamorphosis2.mp3'
import neuroWin from '../../../soundFX/cylonHAHAHA.mp3'
import neuroLearn from '../../../soundFX/cylonMoreTraining.mp3'
import neuroLose from '../../../soundFX/cylonMoreTraining.mp3'
import menaceBravado from '../../../soundFX/menaceNotThisTime2.mp3'
import minimaxBravado from '../../../soundFX/minimaxLookAhead2.mp3'
import hurisBravado from '../../../soundFX/vindicator2.mp3'

export default function SoundComponent( props ) {
  const [playSound, setPlaySound] = useState(false);
  const [soundSource, setSoundSource] = useState();
//   const trainingSound = props.trainingSound; 
//   const winSound = props.winSound; 
//   const loseSound = props.loseSound; 
//   const bravadoSound = props.bravadoSound; 
//   const startSound = props.startSound; 
  const trainingMode = props.trainingMode; 
  const soundEffect = props.soundEffect; 
  const setSoundEffect = props.setSoundEffect; 
  const whoWon = props.whoWon; 
  const foe = props.foe; 
  const computersTurn = props.computersTurn; 

useEffect(()=>{
    console.log("start of SoundFX, soundEffect is ", soundEffect)
}, [])

function pickSound(soundCode){
    let trainingSound, winSound, loseSound, bravadoSound; 
    if (!foe) console.log("WARNING: Foe is not defined")
    else if (foe === 'menace'){
        trainingSound = "menaceLearn"
        winSound = "" 
        loseSound = "menaceLose";  
        bravadoSound = "menaceBravado"; 
    }
    else if (foe === 'minimax'){
        trainingSound = ""
        winSound = "" 
        loseSound = "";  
        bravadoSound = "minimaxBravado"; 
    }
    else if (foe === 'huris'){
        trainingSound = ""
        winSound = "" 
        loseSound = "";  
        bravadoSound = "hurisBravado"; 
    }
    else if (foe === 'evolvo'){
        trainingSound = "evolvoLearn"
        winSound = "" 
        loseSound = "";  
        bravadoSound = "evolvoBravado"; 
    }
    else if (foe === 'Neuro'){
        trainingSound = "neuroLearn"
        winSound = "neuroWin" 
        loseSound = "neuroLose";  
        bravadoSound = ""; 
    }
    if (soundCode === "trainingSound") return trainingSound;
    else if (soundCode === "winSound") return winSound;
    else if (soundCode === "loseSound") return loseSound;
    else if (soundCode === "bravadoSound") return bravadoSound;
}

//whenever the sound source changes, play it. 
useEffect(() => {
    console.log(`soundSource is ${soundSource}`)
    playAudio(); 
}, [soundSource])





function triggerWinOrLoseSound(){
    console.log("triggerWinOrLoseSound triggered in SoundFX")
    console.log("1. whoWon is : ", whoWon)
    if (whoWon === "human"){
        console.log("2a. whoWon is now : ", whoWon)
        const sound = pickSound("loseSound")
        console.log("sound is : ", sound)
        setSoundEffect(sound)
        // if (soundEffect !== "menaceBravado") setSoundEffect("menaceBravado") 
        // else setSoundEffect("minimaxBravado")
        console.log("soundEffect is ", soundEffect)
    }
    else if (whoWon === "computer"){
        console.log("2b. whoWon is now : ", whoWon)
        const sound = pickSound("winSound")
        console.log("sound is : ", sound)
        setSoundEffect(sound)
    }
    else console.log("2c. whoWon is now : ", whoWon)
}

useEffect(triggerWinOrLoseSound
    ,[whoWon])

// function triggerWinOrLoseSound(){
//     console.log("soundEffect is ", soundEffect)
//     console.log("triggerWinOrLoseSound triggered in SoundFX")
//     setSoundEffect("menaceLearn")
//     console.log("soundEffect is ", soundEffect)
// }

// useEffect(() => console.log("beep"), [soundEffect])

useEffect(playBravadoSound, [computersTurn])

  function playBravadoSound(){
    const ran = Math.random(); 
    if (ran < 0.1) {
        const sound = pickSound("bravadoSound")
        console.log("sound is : ", sound)
        setSoundEffect(sound)
    }
  }

useEffect(() => {
    console.log("change in soundeffect registered")
    console.log(`soundEffect is `, soundEffect)
    switch(soundEffect) {
        case "menaceLearn":
            setSoundSource(menaceLearn); 
            break;
        case "menaceLose":
            setSoundSource(menaceLose);
            break;
        case "evolvoBravado":
            setSoundSource(evolvoBravado);
            break; 
        case "evolvoLearn":
            setSoundSource(evolvoLearn);
            break; 
        case "neuroWin":
            setSoundSource(neuroWin); 
            break;
        case "neuroLearn":
            setSoundSource(neuroLearn); 
            break;
        case "neuroLose":
            setSoundSource(neuroLose);
            break;
        case "hurisBravado":
            setSoundSource(hurisBravado); 
            break;
        case "minimaxBravado":
            setSoundSource(minimaxBravado);
            break;
        case "menaceBravado":
            setSoundSource(menaceBravado);  
            break;          
        default:
            setSoundSource(""); 
      }
},[soundEffect])



  const audioRef = useRef(null); 
  
  function playAudio(){
    console.log("playaudio triggered")
    if (audioRef.current) {
        console.log(`audioref has a current, namely ${audioRef.current}`)
        audioRef.current.load(); 

        audioRef.current.play().then(() => {
                    //when the sfx ends, reset to none so that useEffect becomes responsive to it again.  
                    audioRef.current.addEventListener('ended', () => {
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


