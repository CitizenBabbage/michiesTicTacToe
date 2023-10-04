import React from 'react';
import { useState , useRef, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';

//import useSound from 'use-sound';
import introTune from './music/tektoktao.mp3'

//import './App.css';
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
              <Route path="/menace" element={<Menace devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe } />} />
              <Route path="/minimax" element={<Minimax devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>} />
              <Route path="/huris" element={<Huris devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>} />
              <Route path="/evolvo" element={<Evolvo devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>} />
              <Route path="/neuro" element={<Neuro devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>} />
              {/* <Route path="/test" element={<Test devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>}/> */}
              <Route path="/selectOpponent" element={<SelectOpponent devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>}/>
              <Route path="/intro" element={<Intro setMusicStarted = {setMusicStarted} audioSelected = {audioSelected} devMode = {developmentMode} xsTurn={xsTurn} setXsTurn={setXsTurn} foe = { foe }/>}/> 

          </Routes>
        </Router>
      </div> 
          
      );
}
 
// export default App;



