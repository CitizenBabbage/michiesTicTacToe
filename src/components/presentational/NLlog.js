import React from 'react';
import {useEffect, useState} from 'react';
import { dataBaseDuplicator } from '../../auxiliary/general/usefulFunctions.js';

export function NLlog( props ) {
    const naturalLanguageLog = props.naturalLanguageLog; 
    const nLLogStats = props.nLLogStats; 
    const setNaturalLanguageLog = props.setNaturalLanguageLog; 
    const [NLlogVisible, setNLlogVisible] = useState(false)

    function handleClick(){
        setNLlogVisible(prevValue => !prevValue)
    }
    
    function updateNLLog(listOfLists) {
        //console.log("CALLING updateNLLog on input ",listOfLists )
        let nLLog = []; 
        //[gameResult, update, log[i], move]
        for (let i = 0; i < listOfLists.length; i++){
            let thisList = listOfLists[i]; 
            let [whoWon, update, initialBoardState, move] = thisList; 
            if (update === 3) update = "+3"; //bc it just reads better
            let winnerTerm, turnPhrase, evaluation, conjunction; 
            if (whoWon === 1){winnerTerm = `X`}
            else if (whoWon === -1){winnerTerm = `O`}
            else winnerTerm = `Nobody`
            if (i % 2 === 0){turnPhrase = `X`}
            else turnPhrase = `O`
            if (winnerTerm === 'Nobody') {
                evaluation = `neither good nor bad`
                conjunction = 'and'
            }
            else if (winnerTerm === turnPhrase) {
                evaluation = `a good move`
                conjunction = `and`
            }
            else {
                evaluation = `a bad move`
                conjunction = `but`
            }
            let newString = `${turnPhrase}'s turn: Since ${winnerTerm} won, this was ${evaluation}. Updating move ${move} on board [${initialBoardState}] by ${update}.`
            nLLog.push(newString); 
        }
        
        return nLLog;     
    }

    useEffect(()=>{
       if (nLLogStats.length > 0) {
        let newNaturalLanguageLog = updateNLLog(nLLogStats)
        setNaturalLanguageLog(newNaturalLanguageLog)
        
       }
    },[nLLogStats])

    // useEffect (()=>{
    //     console.log("naturalLanguageLog is now ", naturalLanguageLog)
    // },[naturalLanguageLog])


    if (NLlogVisible === true)
        return (
            <div> 
                <button className = 'retro-text' onClick = {handleClick}> Hide Menace's Diary</button>
                <ol className = 'retro-text' style = {{fontSize : 12}}>
                    {naturalLanguageLog.map((item, index) => 
                        (
                            <li key={index}>
                                <p>{item}</p>
                            </li>
                        )
                    )}
                </ol>
            </div>
        )
    else return (
        <button className = 'retro-text' onClick = {handleClick}> Read Menace's Diary</button>
    )
    
}