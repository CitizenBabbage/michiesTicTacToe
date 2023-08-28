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


{/* ///////////////////////////// */}


const audioRef = useRef(null);
const [audioSelected, setAudioSelected] = useState(false);

// // this is a player for debugging
// useEffect(() => {
//     audioRef.current.play().then(() => {
//         console.log("Audio played");
//     }).catch((error) => {
//         console.error("Audio play failed", error);
//     });
// }, []);


// there follows two attempts at implementing the audio. The first passes down a playAudio 
// function to the component. The second passes down a useState setter that the component sets, 
// which triggers the useEffect that playes the music. Neither work.  

// Method 1: 
function playAudio(){
    if (audioRef.current) {
        console.log("playAudio triggered. audioRef.current = ", audioRef.current)
        audioRef.current.play().then(() => {
            // Playback started successfully
        }).catch((error) => {
            console.error("Playback failed because: ", error);
        });
    }
}

  // Method 2
  useEffect(() => {
    if (audioSelected) {
        console.log("Audio is selected, recognised at app level.AudioSelected = ", audioSelected)
      if (audioRef.current) {
        console.log("audioRef.current = ", audioRef.current)
        audioRef.current.play();
      }
    } else {
      if (audioRef.current) {
        console.log("Audio is NOT selected at app level. AudioSelected = ", audioSelected)
        audioRef.current.pause();
      }
    }
  }, [audioSelected]);

  const audioPath = "./music/INTRO_David_Renda_2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com.mp3";

// here is an attempt at a third method, using a custom hook. 

// const BoopButton = () => {
//   const [play] = useSound(audioPath);
//   return <button onClick={play}>Boop!</button>;
// };

  return (
    <div> 
    
      <audio ref={audioRef} autoPlay>
        {/* <source src={audioPath} type="audio/mpeg" /> */}
        <source src={introTune} type="audio/mpeg" />
      </audio>
      <Router>

      {/* ///////////////////////////// */}


    {/* return (
        <div>
            <Router> */}
                {/* <Navbar devMode = { developmentMode } /> */}
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



