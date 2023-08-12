import React from 'react';
import {NavigationButton} from '../components/NavigationButton'
 
const About = ( props ) => {
    // const dbs = props.dbs, setDBS = props.setDBS; 
    // useEffect(() => {
    //     setDBS(prevValue => prevValue + 1);
    // }, []); 
    // console.log("about, debugging sequencer: ", dbs)
    return (
        <div>
        <h1>Choose your opponent</h1>
        
            <NavigationButton  devMode = {props.devMode} path = '/menace' label = 'menace'/>
            <NavigationButton  devMode = {props.devMode} path = '/minimax' label = 'minimax'/>
        </div>
    );
};
 
export default About;