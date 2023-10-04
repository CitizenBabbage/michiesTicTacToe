import React from 'react';
import { useEffect, useState } from 'react'; 
import GenomeDisplay from './genomeDisplay.js';
import FlipMove from 'react-flip-move';


export default function GenomeRanking(props){
    
    const [topTen, setTopTen] = useState(props.ranking.slice(0,10))
    const ranking = props.ranking; 


    //its called topTen but I changed it to top five
    useEffect(() => {
        const x = props.ranking.slice(0,5); 
        console.log("ranking length is : ", ranking.length)
        console.log("new top ten is : ", x)
        setTopTen(x); 
    },[ranking])

    
    
    // return (
    //     <div>
    //         <ol className = 'genomeRanking'>
    //             {
    //                 topTen.map((item) => {
    //                 return (
    //                     <li key={item.extendedName}>
    //                         <GenomeDisplay
    //                             trainingMode = {props.trainingMode} genome={item} 
    //                         />
    //                     </li>
    //                 );
    //             })}
    //         </ol>
    //     </div>
    // )

    return (
        <div>
          <ol className='genomeRanking'>
            <FlipMove enterAnimation="accordionVertical" leaveAnimation="accordionVertical">
              {topTen.map((item) => (
                <li key={item.extendedName}>
                  <GenomeDisplay
                    trainingMode={props.trainingMode} 
                    genome={item} 
                  />
                </li>
              ))}
            </FlipMove>
          </ol>
        </div>
      );
    

}

