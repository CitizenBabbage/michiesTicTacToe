import React from 'react';
import { useState } from 'react';


export function Tooltip( props ) {
    const [tooltipStyle, setTooltipStyle] = useState({});
    const setMouseEventCounter = props.setMouseEventCounter; 
    const tipText = props.tipText; 

    const handleMouseEnter = (e) => {
        console.log("tooltip activated")
       
        const tooltip = e.currentTarget.querySelector('.tooltip-text');
        setTooltipStyle({ visibility: 'hidden', opacity: '0' });

        const boundingBox = tooltip.getBoundingClientRect();
        let newStyle = {};
        

        // If tooltip overflows on the right side of the viewport, align it to the right edge of the container.
        if (boundingBox.right > window.innerWidth) {
            console.log("detecting box has gone off right edge")
            newStyle = {
                right: '0',
                left: 'auto'
            };
        } 
        // If tooltip overflows on the left side of the viewport, align it to the left edge of the container.
        if (boundingBox.left < 0) {
            newStyle = {
                left: '0',
                right: 'auto'
            };
        }
        // If tooltip overflows at the top of the viewport, move it below.
        if (boundingBox.top < 0) {
            newStyle = {
                top: '100%',
                bottom: 'auto'
            };
        }
        // If tooltip overflows at the bottom of the viewport, move it above.
        if (boundingBox.bottom > window.innerHeight) {
            newStyle = {
                bottom: '100%',
                top: 'auto'
            };
        }
        newStyle = { ...newStyle, visibility: 'visible', opacity: '1' };
        if (tipText) setTooltipStyle(newStyle);
    };

    const handleMouseLeave = () => {
        // Reset tooltip visibility and opacity when the mouse leaves the tooltip area.
        setTooltipStyle({ visibility: 'hidden', opacity: '0' });
        if (setMouseEventCounter) setMouseEventCounter(prevValue => prevValue + 1);

    };
    
    return (
        <div className='tooltip-container' onMouseEnter={handleMouseEnter} onMouseLeave = {handleMouseLeave}>
            <div className='tooltip-text' style={tooltipStyle}>
                {tipText}
            </div>
            {props.children}
        </div>
    );
}


