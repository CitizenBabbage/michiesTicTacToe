import React from 'react';
import { useState , useRef, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';

//import useSound from 'use-sound';
import introTune from './music/tektoktao.mp3'

// import './App.css';
// import Navbar from './components/Navbar.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/index.js';
import About from './pages/about.js';
import Menace from './pages/menace.js';
import Minimax from './pages/minimax.js'; 
import Huris from './pages/huris.js';
import Evolvo from './pages/Evolvo.js';
import Neuro from './pages/neuro.js';
import Test from './pages/test.js';
import SelectOpponent from './pages/selectOpponent.js'
import Intro from './pages/intro.js'
import SelectionMusic from './components/presentational/sound/selectionMusic.js';

 
export default function App() {
    // eslint-disable-next-line no-unused-vars
    const [developmentMode, setDevelopmentMode] = useState(true); 
    //const [playersTurn, setPlayersTurn] = useState( true ); 
    const [xsTurn, setXsTurn] = useState( false )
    const [foe, setFoe] = useState("")
    // const audioRef = useRef(null);
    const [audioSelected, setAudioSelected] = useState(false);
    const [musicStarted, setMusicStarted] = useState(false); 
    const [busy,setBusy] = useState(false); // busy triggers hourglass and ...
    const [hourglassActive, setHourglassActive] = useState(false); //... hourglass permits processees to get underway


    //for debugging: remove
    useEffect(()=>{
      if (busy) console.log("busy set to true in app")
      if (!busy) console.log("busy set to false in app")
    },[busy])

    useEffect(() => {
      // When the component mounts, add a class to the body element
      console.log(`in App, busy is ${busy} and so resetting cursor...`)
      if (busy) {
        console.log("...to hourglass")
        document.body.classList.remove('active-pointer');
        document.body.classList.add('inactive-pointer')
      }
      else {
        console.log("...to cursor")
        document.body.classList.remove('inactive-pointer');
        document.body.classList.add('active-pointer')
      };
  
      // When the component unmounts, remove the class from the body element
      return () => {
        document.body.classList.remove('active-pointer', 'inactive-pointer');
      };
    }, [busy]);

    // function keepTryingToSetHourglass(attemptsLeft = 100) { // default max 100 attempts
    //   if (document.body.classList.contains('.inactive-pointer::before')) {
    //     setHourglassActive(true);
    //   } else if (attemptsLeft > 0) {
    //     setTimeout(() => keepTryingToSetHourglass(attemptsLeft - 1), 50);
    //   } else {
    //     console.error("Failed to set hourglass after multiple attempts.");
    //   }
    // }

    // useEffect(() => {
    //   const handleTransitionEnd = () => {
    //     // Logic to execute after transition ends
    //     console.log("transition ended. Setting hourglass active to true...")
    //     setHourglassActive(true);
    //   };
      
    //   if (busy) {
    //     document.body.classList.add('inactive-pointer');
    //     document.body.addEventListener('transitionend', handleTransitionEnd);
    //     document.body.classList.remove('active-pointer');
    //   }
    //   else {
    //     console.log("...to cursor")
    //     document.body.classList.add('active-pointer')
    //     document.body.classList.remove('inactive-pointer');
    //     setHourglassActive(false);
    //   };
    
    //   return () => {
    //     document.body.classList.remove('active-pointer','inactive-pointer');
    //     document.body.removeEventListener('transitionend', handleTransitionEnd);
    //   };
    // }, [busy]);

    useState(() => {
      console.log("audioSelected changed to ", audioSelected)
    },[audioSelected])

    

    // function playAudio(){
    //   if (audioRef.current) {
    //       audioRef.current.play();
    //   }
    // }

    //setAudioSelected = { setAudioSelected } audioSelected = { audioSelected } playAudio = {playAudio}

    return (
      <div> 
        <SelectionMusic audioSelected = {audioSelected} musicStarted = {musicStarted}/>

        {/* <audio ref={audioRef}>
          <source src={introTune} type="audio/mpeg" />
        </audio> */}
        <Router>
          <Routes>
              <Route path='/' element= {<Home  devMode = {developmentMode} setAudioSelected = { setAudioSelected }/>} />
              <Route path='/about' element={<About devMode = {developmentMode}/>} />
              <Route path="/menace" element={<Menace setBusy = {setBusy} devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe } />} />
              <Route path="/minimax" element={<Minimax devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>} />
              <Route path="/huris" element={<Huris devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>} />
              <Route path="/evolvo" element={<Evolvo setBusy = {setBusy} devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>} />
              <Route path="/neuro" element={<Neuro hourglassActive = {hourglassActive} setBusy = {setBusy} busy = {busy} devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>} />
              {/* <Route path="/test" element={<Test devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>}/> */}
              <Route path="/selectOpponent" element={<SelectOpponent devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>}/>
              <Route path="/intro" element={<Intro setMusicStarted = {setMusicStarted} audioSelected = {audioSelected} devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>}/> 

          </Routes>
        </Router>
      </div> 
          
      );
}
 
// export default App;



