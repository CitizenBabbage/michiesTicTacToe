import React from 'react';
import { useState, useEffect } from 'react';
import './PortraitButton.css'


export default function PortraitButton( props ) {
    const [activeSrc, setActiveSrc] = useState(props.src);
    const [animationClass, setAnimationClass] = useState('');
    const [oldIndex, setOldIndex] = useState(props.portraitIndex);
    const portraitArrayLength = props.len; 
    const handlePortraitClick = props.handlePortraitClick; 

    

    useEffect(() => {
        if (props.src !== activeSrc) {
        // if (props.portraitIndex !== oldIndex){
            // First slide out the current image
            // console.log(`portraitIndex is ${props.portraitIndex}, oldIndex is ${oldIndex}`)
            if (isOneGreaterInLoop(props.portraitIndex, oldIndex, portraitArrayLength)) {
                // console.log('slide-out-forwards')
                setAnimationClass('slide-out-forwards');
            }
            else if (isOneLesserInLoop(props.portraitIndex, oldIndex, portraitArrayLength)) {
                // console.log('slide-out-backwards')
                setAnimationClass('slide-out-backwards');
            }
            // const slideOutTimer = setTimeout(() => {
            //     setActiveSrc(props.src);
            // }, 334); // duration for slide-out
    
            // return () => clearTimeout(slideOutTimer);
        }
    }, [props.src, activeSrc]);

    
    useEffect(()=>{
        if (animationClass === 'slide-out-forwards' || animationClass === 'slide-out-backwards'){
            const slideOutTimer = setTimeout(() => {
                setActiveSrc(props.src);
            }, 100); // duration for slide-out
    
            return () => clearTimeout(slideOutTimer);
        }
    },[animationClass])


    useEffect(()=>{
            // Trigger slide-in for the new image
            if (isOneGreaterInLoop(props.portraitIndex, oldIndex, portraitArrayLength)){
                // console.log('slide-in-forwards')
                {setAnimationClass('slide-in-forwards')};
            }
            else if (isOneLesserInLoop(props.portraitIndex, oldIndex, portraitArrayLength)){
                // console.log('slide-in-backwards')
                {setAnimationClass('slide-in-backwards')};
            }
            // Update the source to the new image
            setOldIndex(props.portraitIndex);
    },[activeSrc])

    // the next two functions replace > and < (for size one) for looping numbers, e.g. 0, 1, 2, 3, 0, 1, 2, 3 ... 
    function isOneGreaterInLoop(index1,index2,loopLength){
        if(index1 === index2 + 1 || (index1 === 0 && index2 === loopLength -1)) {
            return true; 
    }
    else return false; 
}

    function isOneLesserInLoop(index1,index2,loopLength){
        if(index1 === index2 - 1 || (index2 === 0 && index1 === loopLength -1)) {
            return true; 
    }
    else return false; 
}
    

    return (
        <div className="portrait" >
            <button className="clickable-area" onClick={handlePortraitClick}></button>
            <img src={activeSrc} alt={props.alt} className={animationClass} />
            <p>{`\n${props.characterName}`}</p>
            <p>Style: {`\n${props.characterStyle}`}</p>
        </div>
    );
}
