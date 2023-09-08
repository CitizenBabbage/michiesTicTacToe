import React from 'react';

export function ErrorDisplay( props ) {
    const error = props.error; 
    
    return (
        <div>
            <p>Error is {error}</p>
        </div>
    ) 

}