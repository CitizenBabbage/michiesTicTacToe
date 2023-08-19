import React from 'react';
import { useState } from 'react'; 

//import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages';
import About from './pages/about';
import Menace from './pages/menace';
import Minimax from './pages/minimax'; 
import Huris from './pages/huris';
import Evolvo from './pages/Evolvo';
import Test from './pages/test';
 
export default function App() {
    // eslint-disable-next-line no-unused-vars
    const [developmentMode, setDevelopmentMode] = useState(true); 
    const [playersTurn, setPlayersTurn] = useState( true ); 
    const [foe, setFoe] = useState("")

    return (
        <Router>
            <Navbar devMode = { developmentMode } />
            <Routes>
                <Route path='/' element= {<Home  devMode = {developmentMode} />} />
                <Route path='/about' element={<About devMode = {developmentMode}/>} />
                <Route path="/menace" element={<Menace devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe } />} />
                <Route path="/minimax" element={<Minimax devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>} />
                <Route path="/huris" element={<Huris devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>} />
                <Route path="/evolvo" element={<Evolvo devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>} />
                <Route path="/test" element={<Test devMode = {developmentMode} playersTurn = {playersTurn} setPlayersTurn = {setPlayersTurn} foe = { foe }/>}/>
            </Routes>
        </Router>
    );
}
 
// export default App;



