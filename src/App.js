import React from 'react';
import { useState , useRef, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';

//import useSound from 'use-sound';
import introTune from './music/tektoktao.mp3'

//import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages';
import About from './pages/about';
import Menace from './pages/menace';
import Minimax from './pages/minimax'; 
import Huris from './pages/huris';
import Evolvo from './pages/Evolvo';
import Neuro from './pages/neuro';
import Minxima from './pages/minxima';
import Test from './pages/test';
import SelectOpponent from './pages/selectOpponent'
import Intro from './pages/intro'
 
export default function App() {
    // eslint-disable-next-line no-unused-vars
    const [developmentMode, setDevelopmentMode] = useState(true); 
    const [playersTurn, setPlayersTurn] = useState( true ); 
    const [foe, setFoe] = useState("")



const audioRef = useRef(null);
const [audioSelected, setAudioSelected] = useState(false);



// function playAudio(){
//     if (audioRef.current) {
//         audioRef.current.play().then(() => {
//             // Playback started successfully
//         }).catch((error) => {
//             console.error("Playback failed because: ", error);
//         });
//     }
// }

function playAudio(){
  if (audioRef.current) {
      audioRef.current.play();
  }
}

  return (
    <div> 
      <audio ref={audioRef} autoPlay>
        <source src={introTune} type="audio/mpeg" />
      </audio>
      <Router>
        <Routes>
            <Route path='/' element= {<Home  devMode = {developmentMode} playAudio = {playAudio} setAudioSelected = { setAudioSelected } audioSelected = { audioSelected }/>} />
            <Route path='/about' element={<About devMode = {developmentMode}/>} />
            <Route path="/menace" element={<Menace devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe } />} />
            <Route path="/minimax" element={<Minimax devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>} />
            <Route path="/huris" element={<Huris devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>} />
            <Route path="/evolvo" element={<Evolvo devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>} />
            <Route path="/neuro" element={<Neuro devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>} />
            <Route path="/minxima" element={<Minxima devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>} />
            <Route path="/test" element={<Test devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>}/>
            <Route path="/selectOpponent" element={<SelectOpponent devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>}/>
            <Route path="/intro" element={<Intro devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>}/>

        </Routes>
      </Router>
    </div> 
        
    );
}
 
// export default App;



