import React from 'react';
import { useState , useEffect } from 'react'; 
import GameShell from "./components/GameShell.js"

//import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Home from './pages';
import About from './pages/about';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import Contact from './pages/contact';
import Menace from './pages/menace';
import Minimax from './pages/minimax'; 
 
export default function App() {
    const [debuggingSequencer, setDebuggingSequencer] = useState(0);
    useEffect(() => {
        setDebuggingSequencer(prevValue => prevValue + 1);
    }, []); 
    console.log("App, debugging sequencer: ", debuggingSequencer)
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element= {<Home dbs = {debuggingSequencer} setDBS = {setDebuggingSequencer} />} />
                <Route path='/about' element={<About dbs = {debuggingSequencer} setDBS = {setDebuggingSequencer}/>} />
                <Route path='/contact' element={<Contact dbs = {debuggingSequencer} setDBS = {setDebuggingSequencer}/>} />
                <Route path='/blogs' element={<Blogs dbs = {debuggingSequencer} setDBS = {setDebuggingSequencer}/>} />
                <Route path='/sign-up' element={<SignUp dbs = {debuggingSequencer} setDBS = {setDebuggingSequencer}/>} />
                <Route path="/menace" element={<Menace dbs = {debuggingSequencer} setDBS = {setDebuggingSequencer}/>} />
                <Route path="/minimax" element={<Minimax dbs = {debuggingSequencer} setDBS = {setDebuggingSequencer}/>} />
            </Routes>
        </Router>
    );
}
 
// export default App;



