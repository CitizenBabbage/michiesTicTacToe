import React from 'react';
import { useState } from 'react'; 

//import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages';
import About from './pages/about';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import Contact from './pages/contact';
import Menace from './pages/menace';
import Minimax from './pages/minimax'; 
 
export default function App() {
    // eslint-disable-next-line no-unused-vars
    const [developmentMode, setDevelopmentMode] = useState(true); 
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element= {<Home  devMode = {developmentMode} />} />
                <Route path='/about' element={<About devMode = {developmentMode}/>} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path="/menace" element={<Menace devMode = {developmentMode}/>} />
                <Route path="/minimax" element={<Minimax devMode = {developmentMode}/>} />
            </Routes>
        </Router>
    );
}
 
// export default App;



