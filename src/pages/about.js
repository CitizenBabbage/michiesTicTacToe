import React from 'react';
import {NavigationButton} from '../components/NavigationButton'
 
const About = ( props ) => {

    return (
        <div>
        <h1>Choose your opponent</h1>
        
            <NavigationButton  devMode = {props.devMode} path = '/menace' label = 'menace'/>
            <NavigationButton  devMode = {props.devMode} path = '/minimax' label = 'minimax'/>
        </div>
    );
};
 
export default About;