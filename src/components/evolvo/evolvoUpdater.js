import React from 'react';
import { EvolvoTrainingPage } from './evolvoTrainingPage.js';
import { useEffect } from 'react';
import SoundComponent from '../presentational/soundFX/SoundFX.js';
import { runOneGeneration } from '../../auxiliary/geneticAlgo/runOneGeneration.js';

// 1. write a useEffect that reacts to the button being pushed by initiating the genepool, if it isn't already. 
// 2. write a useEffect that reacts to the button being pushed AND to changes in the genepool 
// by starting the evolution, IF the genepool is set AND the button is pressed. This use effect also turns the button off.  
// 3. the evolution should be set to run for a small number of iterations. when it ends, it subtracts
// that number of iterations from iterations, and if iterations is still above 0, continues.  

export function EvolvoUpdater (props) {
    const genepool = props.genepool; 
    const generations = props.generations;
    const setGenerations = props.setGenerations;
    const ranking = props.ranking; 
    const setRanking = props.setRanking; 
    const setGenepool = props.setGenepool; 

    
    useEffect(() => {
        if (generations > 0) {
            const gp = runOneGeneration(genepool, 3, 0.2, 0.2, 0.01, 5) //genepool, encountersPerCompetition, cullFraction, breedFraction, mutationRate, mutationSize
            console.log(`resetting genepool with ${generations} generations remaining...`)
            setGenepool(gp) 
        }
        else console.log("generations = 0")
    }, [generations])

    useEffect(() => {
        setGenerations(prevValue => prevValue-1) ; 
        console.log(`reranking genepool...`)
        const rKing = genomeRanker(); 
        setRanking(rKing); 
    },[genepool])

    function genomeRanker(){
        return genepool.sort((a, b) => b[1] - a[1]);
    }

    return (
        <div>
            <EvolvoTrainingPage
                
                trainingMode = {props.trainingMode}
                setTrainingMode = {props.setTrainingMode}

                setSoundEffect = {props.setSoundEffect}
                
                squares = {props.squares}
                setSquares = {props.setSquares}
                
                generations = {props.generations} 
                setGenerations = {props.setGenerations} 
                genepool = {props.genepool} 
                setGenepool = {props.setGenepool}

                reset = {props.reset}
                returnToGame = {props.returnToGame} 
                name = {props.name} 
                playStyle = {props.playStyle}
                blurb = {props.blurb} 
                src = {props.src}
            />
        </div>
    )

}