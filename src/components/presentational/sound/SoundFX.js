import React, { useState, useEffect, useRef } from 'react';
import debuggingSound from '../../../soundFX/menaceLoss2.mp3'
import menaceLearn from '../../../soundFX/menaceLearn2.mp3'
import menaceLose from '../../../soundFX/menaceLoss2.mp3'
import evolvoBravado from '../../../soundFX/evolvo_adapting2.mp3'
import evolvoLearn from '../../../soundFX/evolvo_metamorphosis2.mp3'
import neuroWin from '../../../soundFX/cylonHAHAHA.mp3'
import neuroLearn from '../../../soundFX/cylonMoreTraining.mp3'
import neuroLose from '../../../soundFX/cylonMoreTraining.mp3'
import menaceBravado from '../../../soundFX/menaceNotThisTime2.mp3'
import minimaxBravado from '../../../soundFX/minimaxLookAhead2.mp3'
import hurisBravado from '../../../soundFX/RulesRule.mp3'
import hurisWin from '../../../soundFX/HurisWin.mp3'

export default function SoundComponent( props ) {
  const [playSound, setPlaySound] = useState(false);
  const [soundSource, setSoundSource] = useState();
//   const trainingSound = props.trainingSound; 
//   const winSound = props.winSound; 
//   const loseSound = props.loseSound; 
//   const bravadoSound = props.bravadoSound; 
//   const startSound = props.startSound; 

  const [bravadoCounter, setBravadoCounter] = useState(5); //controls bravado utterance frequencey 
  const trainingMode = props.trainingMode; 
  const soundEffect = props.soundEffect; 
  const setSoundEffect = props.setSoundEffect; 
  const whoWon = props.whoWon; 
  const foe = props.foe; 
  const computersTurn = props.computersTurn; 
  const computerOff = props.computerOff; 
  const audioRef = useRef(null); 
  const soundMap = {
    menaceLearn,
    menaceLose,
    evolvoBravado,
    evolvoLearn,
    neuroWin,
    neuroLearn,
    neuroLose,
    hurisBravado,
    hurisWin,
    minimaxBravado,
    menaceBravado,
  };

  let soundInProgress = false; 

// useEffect(()=>{
//     console.log("start of SoundFX, soundEffect is ", soundEffect)
// }, [])


//whenever the sound source changes, play it. 
useEffect(() => {
    //console.log(`playing soundSource ${soundSource} because it changed`)
    playAudio(); 
}, [soundSource])


useEffect(triggerWinOrLoseSound
    ,[whoWon])

function triggerWinOrLoseSound(){
    //console.log("triggerWinOrLoseSound triggered in SoundFX")
    if (whoWon === "human"){
        const sound = pickSound("loseSound")
        setSoundEffect(sound)
    }
    else if (whoWon === "computer"){
        const sound = pickSound("winSound")
        setSoundEffect(sound)
    }
}


useEffect(() => {
  //console.log(`thinking of playing bravado sound...`)
  if (!trainingMode) playBravadoSound()
}, [computerOff])

  function playBravadoSound(){
    //console.log(`bravadoCounter is `, bravadoCounter)
    if (bravadoCounter === 0) {
          //console.log(`play bravado sound!`)
          const sound = pickSound("bravadoSound");
          if (!sound) return; // if character has no bravadoSound
          const randomCount = 12+Math.floor(Math.random()*5) 
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
        winSound = "hurisWin" 
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


  function playAudio(){
    //console.log("playaudio triggered")
    // if (soundInProgress) return; 
    // soundInProgress = true; 
    if (audioRef.current) {
        //console.log(`audioref has a current, namely ${audioRef.current}`)
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


