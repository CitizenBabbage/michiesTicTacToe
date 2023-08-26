import React from 'react';
import { useState, useEffect } from 'react';
import './PortraitButton.css'


export default function PortraitButton(props) {
    const [activeSrc, setActiveSrc] = useState(props.src);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (props.src !== activeSrc) {
            // First slide out the current image
            setAnimationClass('slide-out');

            const slideOutTimer = setTimeout(() => {

                // Trigger slide-in for the new image
                setAnimationClass('slide-in');
                // Update the source to the new image
                setActiveSrc(props.src);
            }, 334); // 1s duration for slide-out

            // Cleanup function
            return () => clearTimeout(slideOutTimer);
        }
    }, [props.src, activeSrc]);
    

    return (
        <button className="portrait">
            <img src={activeSrc} alt={props.alt} className={animationClass} />
            <p>{`\n${props.characterName}`}</p>
        </button>
    );
}