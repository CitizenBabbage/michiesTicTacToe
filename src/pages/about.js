import React from 'react';
import {NavigationButton} from '../components/buttons/NavigationButton'
 
const About = ( props ) => {

    return (
        <div>
        <h1>Choose your opponent</h1>
        
            <NavigationButton  devMode = {props.devMode} path = '/menace' label = 'Menace'/>
            <NavigationButton  devMode = {props.devMode} path = '/minimax' label = 'Minimax'/>
            <NavigationButton  devMode = {props.devMode} path = '/huris' label = 'Huris'/>
            <NavigationButton  devMode = {props.devMode} path = '/evolvo' label = 'Evolvo'/>
            {props.devMode && (<NavigationButton  devMode = { true } path = '/test' label = 'Test'/>)}
        </div>
    );
};
 
export default About;