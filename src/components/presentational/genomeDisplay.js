import React from 'react';

export default function GenomeDisplay( props ) {
    const genome = props.genome; 
    const trainingMode = props.trainingMode; 
    
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
    
   if (genome) return (
    <div className={trainingMode ? 'threeBoards' : 'threeRows'}>
        <div className = 'centered'> 
            <p>{genome.extendedName} </p>
        </div>
        <div className = 'centered'>
            <ol className = 'genome'>
                {   
                    genome.genome.map((item, index) => {
                    // Assuming item.response is an array of values between 0 and 1
                    const colour = getColor(item,100);

                    return (
                        <li key={index}>
                            <button 
                                className={"gene"} 
                                style = {{backgroundColor: colour}}
                            />
                        </li>
                    );
                })}
            </ol>
        </div> 
       <div className = {trainingMode ? 'twoRows' : 'centered'}>
            <p>{genome.generation} Gen </p>
            <p>Fitness = {genome.fitness}</p>
       </div>
    </div>
    )
  }

  