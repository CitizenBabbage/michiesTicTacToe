import React from 'react';
import GameShell from "./components/GameShell.js"



// export default function App() {
//   return (
//       <div>
//       <GameShell/>
//       </div>
//   )
// }


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
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element= {<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path="/menace" element={<Menace />} />
                <Route path="/minimax" element={<Minimax />} />
            </Routes>
        </Router>
    );
}
 
// export default App;



