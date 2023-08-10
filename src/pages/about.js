import React from 'react';
import {NavigationButton} from '../components/NavigationButton'
 
const About = () => {
    return (
        <div>
        <h1>Choose your opponent</h1>
        
            <NavigationButton path = '/menace' label = 'menace'/>
            <NavigationButton path = '/minimax' label = 'minimax'/>
        </div>
    );
};
 
export default About;