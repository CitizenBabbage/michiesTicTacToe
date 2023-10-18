import React from 'react';
import { useEffect } from 'react';
import { getRuleText } from '../../auxiliary/geneticAlgo/readGenes.js';
import { Tooltip } from './ToolTip.js';

export default function GenomeDisplay( props ) {
    const genome = props.genome; 
    const trainingMode = props.trainingMode; 
    const foe = props.foe? props.foe: ""
    console.log('setting setHurisGenome to ', JSON.stringify(props.setHurisGenome))
    const setHurisGenome = props.setHurisGenome? props.setHurisGenome: () => {}; 
    console.log('setHurisGenome is ', setHurisGenome)
    let hurisGenome = genome; 
    const setGenome = props.setGenome? props.setGenome : () => {}; 

    //for debugging
    useEffect(() => {
        console.log("genome altered")
    }, [genome])
    
    function getColor(value, highest) {
        let redComponent = 0; 
        let greenComponent = 0; 
        const valueAsPercentage = (value * 100) / highest
        if (value >= 0) greenComponent = valueAsPercentage * 2.55;
        else redComponent = -valueAsPercentage * 2.55
        return `rgb(${redComponent}, ${greenComponent}, 0)`; // red shows negatives, which should never happen. For debugging only. 
    }
    
    function highest(genome){
        return genome.reduce((accum, current) => current > accum? current : accum, 0)
    }

    function increaseValue(index){
        console.log("increasing value...")
        if (hurisGenome) {
            console.log("if condition accessed...")
            let newGenome = {...hurisGenome, genome: [...hurisGenome.genome]};
            if (newGenome.genome[index] < 100) {
                console.log("nested if condition accessed...")
                console.log("old value of newGenome.genome[index] was: ", newGenome.genome[index])
                newGenome.genome[index] = newGenome.genome[index] + 1; 
                console.log("new value of newGenome.genome[index] is: ", newGenome.genome[index])

            } 
            setHurisGenome(newGenome); 
            // setGenome(newGenome); 
        }
    }

    function increaseValueByTen(index){
        console.log("increasing value...")
        if (hurisGenome) {
            console.log("if condition accessed...")
            let newGenome = {...hurisGenome, genome: [...hurisGenome.genome]};
            if (newGenome.genome[index] < 90) {
                console.log("nested if condition accessed...")
                console.log("old value of newGenome.genome[index] was: ", newGenome.genome[index])
                newGenome.genome[index] = newGenome.genome[index] + 10; 
                console.log("new value of newGenome.genome[index] is: ", newGenome.genome[index])

            } 
            else newGenome.genome[index] = 100; 
            setHurisGenome(newGenome); 
            // setGenome(newGenome); 
        }
    }

    function decreaseValueByTen(index){
        console.log("increasing value...")
        if (hurisGenome) {
            console.log("if condition accessed...")
            let newGenome = {...hurisGenome, genome: [...hurisGenome.genome]};
            if (newGenome.genome[index] > 10) {
                console.log("nested if condition accessed...")
                console.log("old value of newGenome.genome[index] was: ", newGenome.genome[index])
                newGenome.genome[index] = newGenome.genome[index] - 10; 
                console.log("new value of newGenome.genome[index] is: ", newGenome.genome[index])

            } 
            else newGenome.genome[index] = 0; 
            setHurisGenome(newGenome); 
            // setGenome(newGenome); 
        }
    }

    function decreaseValue(index){
        console.log("increasing value...")
        if (hurisGenome) {
            console.log("if condition accessed...")
            let newGenome = {...hurisGenome, genome: [...hurisGenome.genome]};
            if (newGenome.genome[index] > 0) {
                newGenome.genome[index] = newGenome.genome[index] - 1; 
            } 
            setHurisGenome(newGenome); 
        }
    }


    const buttons = document.querySelectorAll('.upButton, .downButton', '.tenUpButton');

    buttons.forEach(button => {
    button.addEventListener('mousedown', function() {
        button.classList.add('clicked');
        
        setTimeout(() => {
        button.classList.remove('clicked');
        }, 30);  // Change color briefly
    });
    });

    
   if (genome) return (
    <div className={trainingMode ? 'threeBoards' : 'threeRows'}>
        <div className = 'centered'> 
            <Tooltip tipText = {"Each ruleset gets a unique name!"}>
                <p>{genome.extendedName} </p>
            </Tooltip>
        </div>
        <div className = 'centered'>
            <ol className = 'genome'>
                {   
                    genome.genome.map((item, index) => {
                    // Assuming item.response is an array of values between 0 and 1
                    const colour = getColor(item,100);
                    const ruleText = getRuleText(index); 
                    return (
                        <li key={index}>
                            <div className={foe === 'huris'? 'threeRows': ''}>
                                {foe === 'huris' && <button className='tenUpButton' onClick={() => increaseValueByTen(index)}/> }
                                {foe === 'huris' && <button className='upButton' onClick={() => increaseValue(index)}/> }
                                <Tooltip tipText = {ruleText}>
                                    <button 
                                        className={"gene"} 
                                        style = {{backgroundColor: colour}}
                                    />
                                </Tooltip>
                                {foe === 'huris' && <button className='downButton' onClick={() => decreaseValue(index)}/> }
                                {foe === 'huris' && <button className='tenDownButton' onClick={() => decreaseValueByTen(index)}/> }

                            </div>  
                            
                        </li>
                    );
                })}
            </ol>
        </div> 
       <div className = {trainingMode ? 'twoRows' : 'centered'}>
            <Tooltip tipText = {"The generation the ruleset was spawned on"}>
                {foe !== 'huris' && <p>{genome.generation} Gen </p>}
            </Tooltip>
            <Tooltip tipText = {"Total score for games against other rulesets"}>
                {foe !== 'huris' && <p> &nbsp; Fitness = {genome.fitness}</p>}
            </Tooltip>
       </div>
    </div>
    )
  }

  